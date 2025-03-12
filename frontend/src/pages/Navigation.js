import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav id="navbar">
      <Link className="cat" to="/">Home-Qu!z</Link> |
      <Link className="cat" to="/List">All Albums</Link> |
      <div 
        className="dropdown-container" 
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <Link className="cat" to="/search">Search</Link>
        {showDropdown && (
          <div className="dropdown-menu">

            <Link to="/search/title" className="dropdown-item">Search by Title</Link>
            <Link to="/search" className="dropdown-item">Search by ID (Current)</Link>
          </div>
        )}
      </div> |
      <Link className="cat" to="/add-album">Add Album</Link> |
      <img className="nav-logo" src="https://i.ibb.co/TMnX1NGk/alquizlogo.png" alt="Logo" />
      
      <style>
        {`
          #navbar {
            background-color: rgba(65, 65, 65);
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .cat {
            color: #ddd;
            text-decoration: none;
            font-size: 25px;
            transition: color 0.3s ease;
          }

          .cat:hover {
            color: white;
          }

          .dropdown-container {
            position: relative;
            display: inline-block;
            background:none;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #222;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            min-width: 180px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            opacity: 1;
            transition: all 0.3s ease;
            z-index: 1000;
          }

          .dropdown-item {
            color: #bbb;
            text-decoration: none;
            padding: 6px 10px;
            transition: color 0.3s ease, background 0.3s ease;
          }

          .dropdown-item:hover {
            color: white;
            background-color: #444;
            border-radius: 3px;
          }

          .nav-logo {
            width: 100px;
            background: transparent;
            padding:10px;
          }
        `}
      </style>
    </nav>
  );
};

export default Navigation;
