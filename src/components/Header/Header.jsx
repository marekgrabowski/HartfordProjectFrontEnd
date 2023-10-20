import NavMenu from "./Navbar.jsx";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className=" bg-blue-500 shadow-md">
      <div className="flex p-2 gap-8 justify-between sm:justify-center px-8">
        <div className="flex items-center">
          <img className="w-14" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/The_Hartford_Financial_Services_Group_logo.svg/1200px-The_Hartford_Financial_Services_Group_logo.svg.png" alt="Hartford Logo" />
        </div>
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
    </header>
  );
};

export default Header;