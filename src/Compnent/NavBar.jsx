import { Link } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { to: "/news", label: "নিউজ", icon: "https://s.agricare.club/static/home/img/index_ico1.png?v=gf2" },
    { to: "/deposit", label: "জমা", icon: "https://s.agricare.club/static/home/img/index_ico2.png?v=gf2" },
    { to: "/bonus", label: "বোনাস", icon: "https://s.agricare.club/static/home/img/index_ico6.png?v=gf2" },
    { to: "/voucher", label: "ভাউচার", icon: "https://s.agricare.club/static/home/img/index_ico3.png?v=gf2" },
    { to: "https://t.me/+uo7WHq7dtQc4MWE1", label: "টেলিগ্রাম", icon: "https://i.ibb.co.com/1Gjkpms4/download-1.jpg" }
  ];

  return (
    <nav className="bg-white shadow-md w-full">
      <ul className="flex flex-nowrap justify-between items-center gap-2 px-4 py-3 text-lg font-semibold">
        {navItems?.map((item, index) => (
          <li key={index} className="flex-1 min-w-0 text-center">
            <Link to={item.to} className="flex flex-col items-center gap-1 py-2 rounded-md hover:bg-gray-100 transition-all duration-300">
              <img src={item.icon} alt={item.label} className="w-6 h-6 transition-transform duration-300 hover:scale-110" />
              <span className="text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
