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
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-400 text-white p-4 font-semibold shadow-md flex items-center justify-between relative">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-1 text-white text-lg hover:opacity-80"
        >
          <span className="text-xl">←</span> ফিরে
        </Link>

        {/* Center Title */}
        <h2 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          News
        </h2>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 p-5">
  {news.map((item) => (
    <Link 
      to={`/news/${item.id}`}  // ক্লিক করলে এখানে যাবে
      key={item.id}
      className="block rounded-xl p-4 shadow hover:shadow-lg transition hover:scale-[1.02]"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold flex mt-3">{item.name}</h2>
      <p className="text-gray-600 mt-1 text-right">Views: {item.view}</p>
    </Link>
  ))}
</div>
    </div>
  );
};

export default News;
