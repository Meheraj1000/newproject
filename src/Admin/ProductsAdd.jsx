import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ProductsAdd = ({
  balance = 0,
  setBalance,
  virtues = [],
  setVirtues,
  setRequests,
}) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    years: "",
    price: "",
    Day: "",
    income: "",
    total: "",
    target: "",
    count: "",
  });

  // ================= LOAD EXISTING PRODUCTS =================
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // ================= SAVE PRODUCTS =================
  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // ================= HANDLE INPUT CHANGE =================
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // ================= ADD NEW PRODUCT =================
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      Swal.fire("ত্রুটি!", "নাম, দাম, এবং ছবি অবশ্যই দিতে হবে।", "error");
      return;
    }
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);

    Swal.fire("সফল!", "নতুন পণ্য যোগ করা হয়েছে।", "success");

    setNewProduct({
      name: "",
      image: "",
      years: "",
      price: "",
      Day: "",
      income: "",
      total: "",
      target: "",
      count: "",
    });
  };

  // ================= BUY REQUEST =================
  const handleBuyRequest = (item) => {
    if (balance < Number(item.price)) {
      Swal.fire("ত্রুটি!", "অপর্যাপ্ত ব্যালেন্স!", "error");
      return;
    }
    const allRequests = JSON.parse(localStorage.getItem("allRequests")) || [];
    allRequests.push({ ...item, userAction: "pending" });
    localStorage.setItem("allRequests", JSON.stringify(allRequests));
    Swal.fire("অনুরোধ পাঠানো হয়েছে!", "অ্যাডমিন অনুমোদন করবেন।", "info");
  };

  return (
    <div className="p-5 space-y-5">

      {/* ================= ADD PRODUCT FORM ================= */}
      <div className="max-w-lg mx-auto border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-3">নতুন পণ্য যোগ করুন</h2>
        <form onSubmit={handleAddProduct} className="space-y-2">
          {Object.keys(newProduct).map((key) => (
            <input
              key={key}
              type={key === "price" || key === "target" ? "number" : "text"}
              name={key}
              placeholder={key}
              value={newProduct[key]}
              onChange={handleProductChange}
              className="w-full border p-2 rounded"
            />
          ))}
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
          >
            পণ্য যোগ করুন
          </button>
        </form>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {products.map((item, idx) => (
          <div key={idx} className="p-4 border rounded shadow bg-white">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{item.name}</h3>
            <p>মূল্য: Tk {item.price}</p>
            <button
              onClick={() => handleBuyRequest(item)}
              className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              কিনুন
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdd;
