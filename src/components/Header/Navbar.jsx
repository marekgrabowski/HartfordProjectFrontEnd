import { navItems } from "../../utils/navigation";

const Navbar = () => {
  return (
    <nav class="hidden sm:block"> 
      <ul className="flex justify-center align-middle items-center gap-8 px-3 py-1 ">
        {
          navItems.map((navItem) => (
            <li key={navItem.route}>
              <a
                href={navItem.route}
                className="relative font-medium text-white before:absolute before:-bottom-1.5 before:h-0.5 before:w-full before:scale-x-0 before:bg-sky-200 before:transition hover:before:scale-x-100"
              >
                {navItem.text}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Navbar;