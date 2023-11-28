import { navItems, navItemsLoggedIn } from "../../utils/navigation";

const Navbar = () => {
  let sessionToken;

  try {
    // Attempt to get the session token from localStorage
    sessionToken = localStorage.getItem("sessiontoken");
  } catch (error) {
    // console.error("Error accessing localStorage:", error.message);
  }
  document.cookie = "sessionToken=" + encodeURIComponent(sessionToken) + "; path=/; secure; HttpOnly";
  

  const navigationItems = sessionToken ? navItemsLoggedIn : navItems;

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
        // Handle errors or redirection based on response
        console.error('Navigation error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSignOut = () => {
    // Remove the session token from local storage when signing out
    localStorage.removeItem("sessiontoken");
    document.cookie = "sessionToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = '/';
  };

  return (
    <nav className="hidden sm:block">
      <ul className="flex justify-center align-middle items-center gap-8 px-3 py-1">
        {navigationItems.map((navItem) => (
          <li key={navItem.path} onClick={() => handleNavigation(navItem.path)}>
            <span className="relative font-medium text-white cursor-pointer ::before:absolute ::before:-bottom-1.5 ::before:h-0.5 ::before:w-full ::before:scale-x-0 ::before:bg-sky-200 ::before:transition hover::before:scale-x-100">
              {navItem.component}
            </span>
          </li>
        ))}
        {sessionToken ? (
          // Render the "Sign Out" button if a valid session token is found
          <li>
            <button onClick={handleSignOut} className="bg-gray-700 hover:bg-gray-800 text-white rounded px-4 py-2 font-bold">Sign Out</button>
          </li>
        ) : (
          // Render the "Sign In" button if no valid session token is found
          <li>
            <a
              href="/login"
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 font-bold"
            >
              Log In
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;