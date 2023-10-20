import React, { useEffect, useState } from "react";
import { navItems } from "../../utils/navigation";

const Sidebar = ({ open = false, setOpen }) => {
    const sidebarClasses = `fixed inset-y-0 right-0 w-full bg-gray-900 transform transition-transform ease-in-out duration-300 ${open ? "translate-x-0" : "translate-x-full"}`;
    return (
        <div className={sidebarClasses}>
            <button
                onClick={() => setOpen(false)}
                className={`absolute top-5 right-8`}
                aria-expanded={open}
                aria-controls="sidebar"
                aria-label="Open Menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
            <div className="flex flex-col items-center justify-center gap-12 h-full list-none">
                {navItems.map((navItem) => (
                    <li key={navItem.route}>
                        <a
                            href={navItem.route}
                            className="relative text-3xl font-medium text-white before:absolute before:-bottom-1.5 before:h-0.5 before:w-full before:scale-x-0 before:bg-sky-200 before:transition hover:before:scale-x-100"
                        >
                            {navItem.text}
                        </a>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
