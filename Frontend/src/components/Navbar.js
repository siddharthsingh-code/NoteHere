import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;
  const userName = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          NoteHere
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active text-warning" : ""
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/yournotes"
                        ? "active text-warning"
                        : ""
                    }`}
                    to="/yournotes"
                  >
                    Your Notes
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active text-warning" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {!token ? (
            <div className="d-flex gap-2 mt-2 mt-lg-0">
              <Link className="btn btn-outline-primary" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Signup
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
              <span className="fw-semibold text-dark">Hi! {userName}</span>
              <button onClick={handleLogout} className="btn btn-danger px-4">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
