import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import Swal from "sweetalert2";
import "./App.css";

import Banner from "./Compnent/Banner";
import NavBar from "./Compnent/NavBar";
import Prodect from "./Compnent/Prodect";
import Footer from "./Compnent/Footer";

import Bonus from "./NavCompnent/Bonus";
import Deposit from "./NavCompnent/Deposit";
import News from "./NavCompnent/News";
import Voucher from "./NavCompnent/Voucher";

import Virtue from "./FooterComponent/Virtue";
import Share from "./FooterComponent/Share";
import Profile from "./FooterComponent/Profile";

import Registration from "./AuthPage/Registration";
import Login from "./AuthPage/Login";
import Withdraw from "./NavCompnent/withdraw";
import WithdrawPanding from "./NavCompnent/WithdrawPanding";
import DepositPanding from "./NavCompnent/DepositPanding";

import PrivateRoute from "./AuthPage/PrivateRoute";
import Logout from "./AuthPage/Logout";
import { AuthContext } from "./AuthPage/AuthProvider";

import Admin from "./Admin/Admin";
import User from "./Admin/User";
import ProductsAdd from "./Admin/ProductsAdd";

function App() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const authPages = ["/login", "/registration"];
  const isAuthPage = authPages.includes(location.pathname);

  useEffect(() => {
    if (location.pathname === "/") {
      Swal.fire({
        html: `
          <div style="text-align:center; font-family:'Arial'; padding:10px;">
            <h2 style="font-size:24px; font-weight:bold;">সর্বশেষ ঘোষণা</h2>
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

  return (
    <>
      {!isAuthPage && location.pathname === "/" && (
        <>
          <Banner />
          <NavBar />
        </>
      )}

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Prodect />
            </PrivateRoute>
          }
        />

        {/* NAV */}
        <Route path="/bonus" element={<PrivateRoute><Bonus /></PrivateRoute>} />
        <Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
        <Route
          path="/depositPanding"
          element={
            <PrivateRoute>
              <DepositPanding />
            </PrivateRoute>
          }
        />
        <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
        <Route path="/voucher" element={<PrivateRoute><Voucher /></PrivateRoute>} />

        {/* FOOTER */}
        <Route path="/virtue" element={<PrivateRoute><Virtue /></PrivateRoute>} />
        <Route path="/share" element={<PrivateRoute><Share /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
        <Route path="/withdrawPanding" element={<PrivateRoute><WithdrawPanding /></PrivateRoute>} />

        {/* AUTH */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* ADMIN */}
        {isAdmin && (
          <>
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route path="/admin/users" element={<PrivateRoute><User /></PrivateRoute>} />
            <Route path="/admin/products" element={<PrivateRoute><ProductsAdd /></PrivateRoute>} />
          </>
        )}
      </Routes>

      {!isAuthPage && <Footer isAdmin={isAdmin} />}
    </>
  );
}

export default App;
