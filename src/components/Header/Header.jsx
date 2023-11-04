import NavMenu from "./Navbar.jsx";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div className="flex items-center z-20">
        <NavMenu />
      </div>
      <div className="flex sm:hidden items-center">
        <button
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="sidebar"
          aria-label="Open Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
        </button>
        <Sidebar open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Header;