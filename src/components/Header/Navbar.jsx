import { useState } from "react";

const Navbar = ({ navigationItems }) => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  let sessionToken = localStorage.getItem("sessiontoken");

  const handleSignOut = () => {
    localStorage.removeItem("sessiontoken");
    document.cookie = "sessionToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = '/';
  };

  return (
    <>
      <nav className={`hidden sm:block ${isUnauthorized ? 'hidden' : ''}`}>
        <ul className="flex justify-center align-middle items-center gap-8 px-3 py-1">
          {navigationItems.map((navItem) => (
            <li key={navItem.path} onClick={() => window.location.href = navItem.path}>
              <span className="relative font-medium text-white cursor-pointer ::before:absolute ::before:-bottom-1.5 ::before:h-0.5 ::before:w-full ::before:scale-x-0 ::before:bg-sky-200 ::before:transition hover::before:scale-x-100">
                {navItem.component}
              </span>
            </li>
          ))}
          {sessionToken ? (
            <li>
              <button onClick={handleSignOut} className="bg-gray-700 hover:bg-gray-800 text-white rounded px-4 py-2 font-bold">Sign Out</button>
            </li>
          ) : (
            <li>
              <a href="/login" className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 font-bold">Log In</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
