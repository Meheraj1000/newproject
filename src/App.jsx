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
import Withdraw from "./NavCompnent/withdraw";
import WithdrawPanding from "./NavCompnent/WithdrawPanding";
import DepositPanding from "./NavCompnent/DepositPanding";

import Virtue from "./FooterComponent/Virtue";
import Share from "./FooterComponent/Share";
import Profile from "./FooterComponent/Profile";

import Registration from "./AuthPage/Registration";
import Login from "./AuthPage/Login";
import Logout from "./AuthPage/Logout";
import PrivateRoute from "./AuthPage/PrivateRoute";
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
    <div style="
      text-align:center;
      padding:20px;
      font-family: 'Segoe UI', sans-serif;
    ">
      <h2 style="
        font-size:24px;
        font-weight:800;
        color:#6d28d9;
        margin-bottom:10px;
      ">
        🌟 সর্বশেষ ঘোষণা 🌟
      </h2>

      <img
        src="https://i.ibb.co.com/skmK3bb/photo-2026-01-16-22-39-26.jpg"
        style="
          width:100%;
          max-width:300px;
          height:190px;
          border-radius:16px;
          object-fit:cover;
          margin:15px auto;
          border:4px solid #8b5cf6;
          box-shadow:0 10px 25px rgba(139,92,246,0.4);
        "
      />

      <p style="
        color:#7c3aed;
        font-size:16px;
        font-weight:600;
        margin-top:10px;
      ">
        নতুন বছর মানেই নতুন আশার বীজ 🌱
      </p>

      <p style="
        color:#5b21b6;
        font-size:17px;
        font-weight:700;
        margin:8px 0 16px;
      ">
        সবাইকে ইংরেজি নববর্ষের আন্তরিক শুভেচ্ছা 🎉
      </p>

      <a
        href="https://t.me/+030i31XPhlw0OWFl"
        style="
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:10px 18px;
          background:linear-gradient(135deg,#7c3aed,#9333ea);
          color:#fff;
          text-decoration:none;
          border-radius:30px;
          font-weight:700;
          box-shadow:0 8px 20px rgba(124,58,237,0.4);
          transition:transform 0.2s ease;
        "
        onmouseover="this.style.transform='scale(1.05)'"
        onmouseout="this.style.transform='scale(1)'"
      >
        <img
          src="https://i.ibb.co.com/1Gjkpms4/download-1.jpg"
          style="width:22px;height:22px;border-radius:50%;"
        />
        গ্রুপে যোগদান করুন
      </a>
    </div>
  `,
  confirmButtonText: "ঠিক আছে",
  confirmButtonColor: "#7c3aed",
  width: 440,
  background: "#faf5ff",
  backdrop: `
    rgba(124,58,237,0.25)
  `,
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
        <Route path="/depositPanding" element={<PrivateRoute><DepositPanding /></PrivateRoute>} />
        <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
        <Route path="/voucher" element={<PrivateRoute><Voucher /></PrivateRoute>} />
        <Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
        <Route path="/withdrawPanding" element={<PrivateRoute><WithdrawPanding /></PrivateRoute>} />

        {/* FOOTER */}
        <Route path="/virtue" element={<PrivateRoute><Virtue /></PrivateRoute>} />
        <Route path="/share" element={<PrivateRoute><Share /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        {/* AUTH */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {isAdmin ? <Admin /> : <p>Access Denied</p>}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              {isAdmin ? <User /> : <p>Access Denied</p>}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              {isAdmin ? <ProductsAdd /> : <p>Access Denied</p>}
            </PrivateRoute>
          }
        />
      </Routes>

      {!isAuthPage && <Footer isAdmin={isAdmin} />}
    </>
  );
}

export default App;
