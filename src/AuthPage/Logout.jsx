// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Logout = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     logout();                 // 🔐 logout user
//     navigate("/login");       // 🔁 redirect to login
//   }, [logout, navigate]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Logging out...</h2>
//     </div>
//   );
// };

// export default Logout;


import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); // 🛑 prevent double logout

  useEffect(() => {
    if (hasLoggedOut.current) return;

    hasLoggedOut.current = true;

    (async () => {
      await logout();          // 🔐 clear auth
      navigate("/login", { replace: true }); // 🔁 redirect
    })();
  }, [logout, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
