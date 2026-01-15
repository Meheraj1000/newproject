import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthPage/AuthProvider";

const Prodect = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("prodect.json")
      .then((res) => res.json())
      .then((data) => {
        const storedProducts =
          JSON.parse(localStorage.getItem("products")) || [];
        setProducts([...data, ...storedProducts]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleBuyRequest = (item) => {
    if (user.balance < Number(item.price)) {
      Swal.fire({
        icon: "error",
        title: "অপর্যাপ্ত ব্যালেন্স!",
        html: `
          <p style="margin-bottom:10px;">প্রথমে টাকা জমা দিন।</p>
          <a href="/deposit"
             style="display:inline-block;background:#6366f1;color:white;
             padding:8px 15px;border-radius:8px;font-weight:bold;
             text-decoration:none;">
             রিচার্জ করুন
          </a>
        `,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      text: "আপনি কি নিশ্চিত এই পণ্যটি কিনতে চান?",
      showCancelButton: true,
      cancelButtonText: "না",
      confirmButtonText: "হ্যাঁ",
      confirmButtonColor: "#6366f1",
    }).then((result) => {
      if (result.isConfirmed) {
        const newRequest = {
          ...item,
          status: "pending",
          date: new Date().toLocaleString(),
          requestId: Math.random().toString(36).substr(2, 9),
          userPhone: user.phone,
        };

        const allRequests =
          JSON.parse(localStorage.getItem("allRequests")) || [];
        allRequests.push(newRequest);
        localStorage.setItem("allRequests", JSON.stringify(allRequests));

        Swal.fire({
          icon: "info",
          title: "অনুরোধ জমা হয়েছে!",
          text: "অ্যাডমিন আপনার অনুরোধ অনুমোদন করবেন।",
        });
      }
    });
  };

  return (
    <div className="p-3 md:p-5 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 gap-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            কোনো পণ্য নেই।
          </p>
        ) : (
          products.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 relative">
                <div className="flex gap-3 items-start sm:items-center flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md"
                  />

                  <div className="flex flex-col space-y-0.5 text-left text-sm">
                    <h3 className="font-semibold text-base text-gray-800 dark:text-gray-100">
                      {item.name}
                    </h3>

                    {item.years && (
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.years}
                      </p>
                    )}

                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      Tk {item.price}.00
                    </p>

                    {item.Day && (
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.Day}
                      </p>
                    )}
                  </div>
                </div>

                {item.count && (
                  <div className="absolute top-2 right-2">
                    <p className="text-purple-600 font-semibold text-xs">
                      কোটা: {item.count}
                    </p>
                  </div>
                )}
              </div>

              <div className="px-3 pb-3">
                <button
                  onClick={() => handleBuyRequest(item)}
                  className="w-full py-3 font-semibold text-white rounded-lg
                  bg-gradient-to-r from-indigo-600 to-purple-500
                  hover:from-purple-500 hover:to-indigo-600
                  transition duration-300"
                >
                  কিনুন: {item.price}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Prodect;
