import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import './App.css';

import Banner from './Compnent/Banner';
import NavBar from './Compnent/NavBar';
import Prodect from './Compnent/Prodect';
import Footer from './Compnent/Footer';

// Nav Components
import Bonus from './NavCompnent/Bonus';
import Deposit from './NavCompnent/Deposit';
import News from './NavCompnent/News';
import Voucher from './NavCompnent/Voucher';

// Footer Components
import Virtue from './FooterComponent/Virtue';
import Share from './FooterComponent/Share';
import Profile from './FooterComponent/Profile';

// Auth
import Registration from './AuthPage/Registration';
import Login from './AuthPage/Login';
import Withdraw from './NavCompnent/withdraw';
import WithdrawPanding from './NavCompnent/WithdrawPanding';
import DepositPanding from './NavCompnent/DepositPanding';

import PrivateRoute from './AuthPage/PrivateRoute';
// import { AuthContext } from './AuthPage/AuthProvider';
import Logout from './AuthPage/Logout';
import { AuthContext } from './AuthPage/AuthProvider';
import Admin from './Admin/Admin';
import User from './Admin/User';
import ProductsAdd from './Admin/ProductsAdd';
// import Logout from './AuthPage/Logout';

function App() {
  const location = useLocation();

  const { user } = useContext(AuthContext);

  // ✅ ADMIN DETECTION (FIX)
  const isAdmin = user?.role === "admin";

  const [balance, setBalance] = useState([]);
  const [virtues, setVirtues] = useState([]);

  const authPages = ["/login", "/registration"];
  const isAuthPage = authPages.includes(location.pathname);

  useEffect(() => {
    if (location.pathname === "/") {
      Swal.fire({
        html: `
          <div style="
            display:flex;
            flex-direction:column;
            align-items:center;
            text-align:center;
            font-family:'Arial', sans-serif;
            padding: 10px 20px;
          ">
            <h2 style="font-size:24px;font-weight:bold;margin-bottom:15px;">
              সর্বশেষ ঘোষণা
            </h2>

            <img src="https://s.agricare.club/uploads/image/2511/18a94b6301beea.jpg"
              style="width:280px;height:180px;border-radius:12px;object-fit:cover;margin-bottom:15px;" />

            <p style="color:red;font-weight:bold;">৩০ ডিসেম্বর, ২০২৫</p>

            <p style="color:#b91c1c;font-weight:bold;">
              সকল অ-জৈব কৃষি পণ্যের মূলধন ফেরত
            </p>

            <p style="font-size:14px;color:#374151;">
              সাত ধরণের জৈব কৃষি পণ্য বিনিয়োগের জন্য উপলব্ধ।<br/>
              দৈনিক রিটার্ন ৭%-১২% পর্যন্ত পৌঁছাতে পারে।<br/>
              রিটার্ন ৪০০ টাকায় পৌঁছালে টাকা তোলা সম্ভব।
            </p>
          </div>
        `,
        confirmButtonText: "OK",
        confirmButtonColor: "#16a34a",
        width: 420,
      });
    }
  }, [location.pathname]);

  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isAuthPage && isHomePage && (
        <div className="bg-gray-100 w-full">
          <header className="w-full bg-base-400 shadow-md">
            <Banner />
            <NavBar />
          </header>
        </div>
      )}

      <main className="w-full">
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Prodect
                  balance={balance}
                  setBalance={setBalance}
                  virtues={virtues}
                  setVirtues={setVirtues}
                />
              </PrivateRoute>
            }
          />

          {/* NAV */}
          <Route path="/bonus" element={<PrivateRoute><Bonus /></PrivateRoute>} />
          <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
          <Route path="/depositPanding" element={<PrivateRoute><DepositPanding /></PrivateRoute>} />
          <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
          <Route path="/voucher" element={<PrivateRoute><Voucher /></PrivateRoute>} />

          {/* FOOTER */}
          <Route path="/virtue" element={<PrivateRoute><Virtue virtues={virtues} /></PrivateRoute>} />
          <Route path="/share" element={<PrivateRoute><Share /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile user={user} /></PrivateRoute>} />
          <Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
          <Route path="/withdrawPanding" element={<PrivateRoute><WithdrawPanding /></PrivateRoute>} />

          {/* AUTH */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />


          {/* ADMIN */}
          {isAdmin && (
            <>
              <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute><User /></PrivateRoute>} />
              <Route path="/admin/products" element={<PrivateRoute><ProductsAdd /></PrivateRoute>} />
            </>
          )}

        </Routes>
      </main>

      {!isAuthPage && (
        <footer className="w-full sticky bottom-0">
          <Footer isAdmin={isAdmin} />
        </footer>
      )}
    </>
  );
}

export default App;
