// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../styles/AdminSidebar.css";

// const AdminSidebar = () => {
//   const navigate = useNavigate();
//   const [admin, setAdmin] = useState({ name: "", role: "Admin" });

//   // Sync admin info from localStorage
// const syncAdmin = () => {
//   const token = localStorage.getItem("adminToken");

//   let user = null;
//   try {
//     user = JSON.parse(localStorage.getItem("adminUser"));
//   } catch {
//     user = null;
//   }

//   if (token && user) {
//     setAdmin({ name: user.name, role: "Admin" });
//   } else {
//     setAdmin({ name: "", role: "" });
//     navigate("/admin/login", { replace: true });
//   }
// };


//   useEffect(() => {
//     syncAdmin();
//     window.addEventListener("storage", syncAdmin);
//     return () => window.removeEventListener("storage", syncAdmin);
//   }, []);

// const handleLogout = () => {
//   localStorage.removeItem("adminToken");
//   localStorage.removeItem("adminUser");

//   // 🔥 Navbar ko notify karo
//   window.dispatchEvent(new Event("authChanged"));
//     alert("Logout successful 👋");

//   navigate("/admin/login", { replace: true });
// };


//   const getInitials = () => {
//     if (!admin.name) return "?";
//     const parts = admin.name.trim().split(" ");
//     return parts[0]?.charAt(0).toUpperCase() + (parts[1]?.charAt(0).toUpperCase() || "");
//   };

//   return (
//     <aside className="adm-sidebar">
//       <div className="profile-section">
//         <div className="avatar">{getInitials()}</div>
//         <p>{admin.name || "Admin"}</p>
//         <span>{admin.role}</span>
//       </div>

//       <ul className="adm-nav-links">
//         <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
//         <li><NavLink to="/admin/manage-employees">Manage employee</NavLink></li>
//         <li><NavLink to="/admin/ManageTasks">Manage Tasks</NavLink></li>
//         <li><NavLink to="/admin/salary">Salary</NavLink></li>
//       </ul>

//       <button className="adm-logout-btn" onClick={handleLogout}>
//         Logout
//       </button>
//     </aside>
//   );
// };

// export default AdminSidebar;


import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ name: "", role: "Admin" });
  const [open, setOpen] = useState(false); // 🔥 NEW STATE

  // ================= AUTH SYNC =================
  const syncAdmin = () => {
    const token = localStorage.getItem("adminToken");

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("adminUser"));
    } catch {
      user = null;
    }

    if (token && user) {
      setAdmin({ name: user.name, role: "Admin" });
    } else {
      setAdmin({ name: "", role: "" });
      navigate("/admin/login", { replace: true });
    }
  };

  useEffect(() => {
    syncAdmin();
    window.addEventListener("storage", syncAdmin);
    return () => window.removeEventListener("storage", syncAdmin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.dispatchEvent(new Event("authChanged"));
    alert("Logout successful 👋");
    navigate("/admin/login", { replace: true });
  };

  const getInitials = () => {
    if (!admin.name) return "?";
    const parts = admin.name.trim().split(" ");
    return (
      parts[0]?.charAt(0).toUpperCase() +
      (parts[1]?.charAt(0).toUpperCase() || "")
    );
  };

  return (
    <>
      {/* 🔥 MOBILE TOP BAR */}
      <div className="adm-mobile-topbar">
        <button
    className="adm-menu-btn"
    onClick={() => setOpen(!open)}
  >
    {open ? "✖" : "☰"}
  </button>
        <h3>Admin Panel</h3>
      </div>

      {/* 🔥 OVERLAY */}
      {open && (
        <div
          className="adm-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* 🔥 SIDEBAR */}
      <aside className={`adm-sidebar ${open ? "adm-open" : ""}`}>

        {/* Close Button (Mobile only)
        <button className="adm-close-btn" onClick={() => setOpen(false)}>
          ✖
        </button> */}

        <div className="profile-section">
          <div className="avatar">{getInitials()}</div>
          <p>{admin.name || "Admin"}</p>
          <span>{admin.role}</span>
        </div>

        <ul className="adm-nav-links">
          <li>
            <NavLink to="/admin/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/manage-employees" onClick={() => setOpen(false)}>
              Manage employee
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/ManageTasks" onClick={() => setOpen(false)}>
              Manage Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/salary" onClick={() => setOpen(false)}>
              Salary
            </NavLink>
          </li>
        </ul>

        <button className="adm-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;

