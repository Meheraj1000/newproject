import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import { createProductApi } from "../api/services/productApi";

const ProductsAdd = ({ balance = 0 }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    dailyProfit: "",
    maxInvestCount: "",
    investmentDayCycle: "",
    price: ""
  });




  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleOnSubmitAddProduct = async (e) => {
    e.preventDefault();

    try {
      const addPData = {
        ...newProduct,
        price: Number(newProduct.price),
        dailyProfit: Number(newProduct.dailyProfit),
        maxInvestCountPerPerson: Number(newProduct.maxInvestCount),
        investmentDayCycle: Number(newProduct.investmentDayCycle),
      }
      
      await createProductApi(addPData);
      setProducts([...products, addPData])
      Swal.fire("সফল!", "নতুন পণ্য যোগ করা হয়েছে।", "success");
    } catch (error) {
      console.error("Error creating product:", error.response?.data?.errorSources[0].message);
      Swal.fire("ত্রুটি!", error.response?.data?.errorSources[0]?.message || "নাম, দাম, এবং ছবি অবশ্যই দিতে হবে।", "error");
    }
  };



  // show products grid by store localstorage
  const handleBuyRequest = (item) => {
    if (balance < Number(item?.price)) {
      Swal.fire("ত্রুটি!", "অপর্যাপ্ত ব্যালেন্স!", "error");
      return;
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-10">

      {/* ================= ADD PRODUCT FORM ================= */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          নতুন পণ্য যোগ করুন
        </h2>
        <form onSubmit={handleOnSubmitAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(newProduct)?.map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-left text-gray-700 dark:text-gray-300 font-medium mb-1 capitalize">{key}</label>
              <input
                type={["price", "maxInvestCount", "income", "investmentDayCycle", "dailyProfit"].includes(key) ? "number" : "text"}
                name={key}
                required
                placeholder={key}
                value={newProduct[key]}
                onChange={handleProductChange}
                className="w-full text-left border border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          ))}
          <button
            type="submit"
            className="sm:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaShoppingCart /> পণ্য যোগ করুন
          </button>
        </form>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition cursor-pointer"
          >
            <div className="relative">
              <img
                src={item?.image}
                alt={item?.title}
                className="w-full h-56 object-cover rounded-t-3xl"
              />
              <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-2xl shadow-md">
                Tk {item?.dailyProfit}
              </span>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item?.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">Target: {item?.price || "N/A"}</p>
              <p className="text-gray-600 dark:text-gray-300">Daily Profit: {item?.dailyProfit || "N/A"}</p>
              <button
                onClick={() => handleBuyRequest(item)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <FaShoppingCart /> কিনুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdd;
