import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black"
      style={{
        position: "fixed",  // 🔥 Always stays at the top
        top: "0",
        left: "0",
        width: "100%",  // 🔥 Full width
        zIndex: "1000", // 🔥 Ensures it's on top
        padding: "10px 20px"
      }}>
      
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🛠 Mining</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">🏠 Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/addworkers">➕ Add Worker</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
