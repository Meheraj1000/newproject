import { Link } from "react-router-dom"; 
import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 font-semibold shadow-md flex items-center justify-between relative">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-1 text-white text-lg hover:opacity-80 transition"
        >
          <span className="text-xl">←</span> ফিরে
        </Link>

        {/* Center Title */}
        <h2 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          News
        </h2>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 p-5 gap-5">
        {news.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            কোনো খবর নেই।
          </p>
        ) : (
          news.map((item) => (
            <Link
              to={`/news/${item.id}`}
              key={item.id}
              className="block rounded-xl p-4 shadow-md hover:shadow-lg transition hover:scale-[1.02] bg-white dark:bg-gray-800"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-bold flex mt-3 text-gray-900 dark:text-gray-100">
                {item.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-right">
                Views: {item.view}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
