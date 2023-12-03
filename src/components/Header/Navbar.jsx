import { useEffect, useState } from "react";
import { navItems, navItemsUser, navItemsAdmin } from "../../utils/navigation";
import getSessionToken from "../../utils/getSessionToken";
import getPermission from "../../utils/getPermission"; // Corrected the spelling
import UnauthorizedModal from "../UnauthorizedModal";

const Navbar = () => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [navigationItems, setNavigationItems] = useState(navItems);
  let sessionToken =  localStorage.getItem("sessiontoken")
  useEffect(() => {
    const checkPermissions = async () => {
      if (!sessionToken) {
        const publicPaths = ['/login', '/signup', '/team', '/'];
        if (!publicPaths.includes(window.location.pathname)) {
          window.location.href = '/login';
        }
      } else {
        try {
          const { access, role }  = await getPermission(sessionToken, window.location.pathname);
          if (role === 'user') {
            setNavigationItems(navItemsUser);
          } else if (role === 'admin') {
            setNavigationItems(navItemsAdmin);
          }
          if (!access) {            
            setIsUnauthorized(true);
          }
        } catch (error) {
          console.error('Permission check error:', error);
          setIsUnauthorized(true);
        }
      }
    };

    checkPermissions();
  }, [sessionToken]);

  const handleNavigation = async (path) => {
    if (!sessionToken) {
      window.location.href = path;
      return;
    }

    try {
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          'Authorization': `${sessionToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = path;
      } else {
        console.error('Navigation error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("sessiontoken");
    document.cookie = "sessionToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = '/';
  };

  return (
    <>
      {isUnauthorized && <UnauthorizedModal isOpen={isUnauthorized} />}
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
