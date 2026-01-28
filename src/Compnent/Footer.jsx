import { Link } from 'react-router-dom';

const Footer = ({ isAdmin }) => {
  const navItems = [
    { to: "/", label: "হোম", icon: "https://s.agricare.club/static/home/img/i2.png?v=b4t" },
    { to: "/virtue", label: "পণ্য", icon: "https://s.agricare.club/static/home/img/i11.png?v=b4t" },
    { to: "/share", label: "শেয়ার", icon: "https://s.agricare.club/static/home/img/i8.png?v=b4t" },
    { to: "/profile", label: "আমার", icon: "https://s.agricare.club/static/home/img/i9.png?v=b4t" },
  ];

  const adminItems = [
    { to: "/admin", label: "Admin", icon: "https://cdn-icons-png.flaticon.com/128/1828/1828884.png" },
    { to: "/admin/users", label: "Users", icon: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png" },
    { to: "/admin/products", label: "Products", icon: "https://cdn-icons-png.flaticon.com/128/3081/3081559.png" },
  ];

  return (
<nav className="bg-white fixed bottom-0 left-0 z-50 shadow-md w-full">
      <ul className="flex justify-between items-center px-4 py-3 overflow-x-auto">
        {navItems?.map((item, index) => (
          <li key={index} className="flex-1 text-center">
            <Link to={item.to}>
              <img src={item.icon} className="w-6 h-6 mx-auto" alt={item.label} />
              <p className="text-sm">{item.label}</p>
            </Link>
          </li>
        ))}

        {isAdmin &&
          adminItems?.map((item, index) => (
            <li key={index} className="flex-1 text-center">
              <Link to={item.to}>
                <img src={item.icon} className="w-6 h-6 mx-auto" alt={item.label} />
                <p className="text-xs text-red-500">{item.label}</p>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Footer;
