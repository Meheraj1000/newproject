import React, { useState } from "react";
import Swal from "sweetalert2";

const ProductsAdd = ({
  balance,
  setBalance,
  virtues = [],
  setVirtues,
  products = [],
  setProducts,
  setRequests,
}) => {
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

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      Swal.fire("ত্রুটি!", "নাম, দাম, এবং ছবি অবশ্যই দিতে হবে।", "error");
      return;
    }
    setProducts([...products, newProduct]);
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

  const handleBuyRequest = (item) => {
    if (balance < item.price) {
      Swal.fire("ত্রুটি!", "অপর্যাপ্ত ব্যালেন্স!", "error");
      return;
    }
    setRequests(prev => [...prev, { ...item, userAction: "pending" }]);
    Swal.fire("অনুরোধ পাঠানো হয়েছে!", "অ্যাডমিন অনুমোদন করবেন।", "info");
  };

  return (
    <div className="p-5 space-y-5">
      {/* Add Product Form */}
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
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
            পণ্য যোগ করুন
          </button>
        </form>
      </div>

      {/* Products Grid */}
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
