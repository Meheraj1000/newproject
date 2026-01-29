import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getProductApi } from "../api/services/productApi";
import { createInvestmentsApi } from "../api/services/investmentApi";
import { useAuth } from "../Context/AuthContext";

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProductApi();
        setProducts(res?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  const handleBuyRequest = (item) => {
    if (user?.balance < Number(item?.price)) {
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

    console.log(item);

    Swal.fire({
      text: "আপনি কি নিশ্চিত এই পণ্যটি কিনতে চান?",
      showCancelButton: true,
      cancelButtonText: "না",
      confirmButtonText: "হ্যাঁ",
      confirmButtonColor: "#6366f1",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const requestData = {
          amount: item?.price,
          productId: item?._id
        };

        try {
          await createInvestmentsApi(requestData);
          Swal.fire({
            icon: "info",
            title: "অনুরোধ জমা হয়েছে!",
            text: "অ্যাডমিন আপনার অনুরোধ অনুমোদন করবেন।",
          });
        } catch (error) {
          console.error("Error creating investment request:", error);
          Swal.fire({
            icon: "error",
            title: "ত্রুটি!",
            text: error.response?.data?.errorSources[0]?.message || "অনুরোধ প্রক্রিয়াকরণে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।",
          });
        }
      }
    });
  };
  // console.log(products);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 gap-4">
        {products?.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            কোনো পণ্য নেই।
          </p>
        ) : (
          products?.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl  shadow bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 relative">
                <div className="flex gap-3 items-start sm:items-center flex-1">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col space-y-0.5 text-left text-sm">
                    <h3 className="font-semibold text-base text-gray-800 dark:text-gray-100">
                      {item?.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300">
                      {item?.investmentDayCycle}  দিন মেয়াদী
                    </p>

                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      Tk {item?.dailyProfit}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300">
                      দৈনিক আয়
                    </p>
                  </div>
                </div>

                <div className="">
                  <p className="text-start text-blue-700 font-bold">Tk {item?.totalProfit}</p>
                  <p className="text-start">মোট আয়</p>
                </div>

                <div className="absolute top-2 right-2">
                  <p className="text-purple-600 font-semibold text-xs">
                    কোটা: {item?.maxInvestCountPerPerson}
                  </p>
                </div>
              </div>

              <div className="px-3 pb-3">
                <button
                  onClick={() => handleBuyRequest(item)}
                  className="w-full py-3 font-semibold text-white rounded-lg
                  bg-gradient-to-r from-indigo-600 to-purple-500
                  hover:from-purple-500 hover:to-indigo-600
                  transition duration-300"
                >
                  কিনুন: {item?.price} টাকা
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
