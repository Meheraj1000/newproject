import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Prodect = ({ balance, setBalance, virtues, setVirtues, requests, setRequests }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("prodect.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleBuyRequest = (item) => {
    if (balance < item.price) {
      Swal.fire({
        icon: "error",
        title: "অপর্যাপ্ত ব্যালেন্স!",
        html: `<p style="margin-bottom:10px;">প্রথমে টাকা জমা দিন।</p>
               <a href="/deposit"
                  style="display:inline-block; background:#16a34a; color:white;
                         padding:8px 15px; border-radius:8px; font-weight:bold;
                         text-decoration:none; margin-top:8px;">
                  রিচার্জ করুন
               </a>`,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      text: "আপনি কি নিশ্চিত আপনি এই পণ্যটি কিনতে চান?",
      showCancelButton: true,
      cancelButtonText: "না",
      confirmButtonText: "হ্যাঁ",
    }).then((result) => {
      if (result.isConfirmed) {
        // Add to admin requests
        setRequests([...requests, { ...item, userAction: "pending" }]);
        Swal.fire({
          icon: "info",
          title: "অনুরোধ জমা হয়েছে!",
          text: "অ্যাডমিন আপনার অনুরোধ অনুমোদন করবেন।",
        });
      }
    });
  };

  return (
    <div className="p-3 md:p-5">
      <div className="grid grid-cols-1 gap-4">
        {products.map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow bg-white overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 relative">
              <div className="flex gap-3 items-start sm:items-center flex-1">
                <img
                  src={item.image}
                  className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md"
                />
                <div className="flex flex-col space-y-0.5 text-left text-sm">
                  <h3 className="font-semibold text-base">{item.name}</h3>
                  <p>{item.years}</p>
                  <p>Tk {item.price}.00</p>
                  <p>{item.Day}</p>
                </div>
              </div>

              <div className="flex flex-col items-start text-sm">
                <h3 className="font-semibold text-base">{item.income}.00</h3>
                <p>{item.total}</p>
              </div>

              <div className="absolute top-2 right-2">
                <p className="text-xs font-semibold text-red-600">
                  কোটা: {item.count}
                </p>
              </div>
            </div>

            <div className="px-3 pb-3">
              <button
                onClick={() => handleBuyRequest(item)}
                className="bg-green-600 text-white w-full py-3 font-semibold text-sm rounded hover:bg-green-700"
              >
                কিনুন: {item.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prodect;
