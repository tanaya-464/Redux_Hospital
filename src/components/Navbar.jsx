import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";
import { Menu } from '@mui/base/Menu';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { useTheme } from '@mui/system';

const Navbar = () => {
  const allusers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);
const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" data-bs-theme="dark">
        <div className="container-fluid">
          <h4 className="navbar-brand">Apollo Hospital</h4>
          {/* Dropdown Menu */}
              <li className="nav-item dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-theme="dark"
                >
                  Dropdown
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/read" className="dropdown-item">Action</Link>
                  </li>
                  <li>
                    <Link to="/read" className="dropdown-item">Another action</Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item">Something else here</Link>
                  </li>
                </ul>
              </li>
          <div className="collapse navbar-collapse">
            <input
              className="form-control me-2 w-25"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Add patients
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                 Display Patients({allusers.length})
                </Link>
              </li>
              <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
          
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
