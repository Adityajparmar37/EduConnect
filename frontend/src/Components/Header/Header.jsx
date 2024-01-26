import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="border-b-4 border-black bg-white px-4 py-2.5 shadow-md lg:px-6 dark:bg-white ">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <Link to="/">
            <div className="flex items-center">
              <img
                src="../../../public/logo2-removebg-preview.png"
                className="mr-3 h-9 sm:h-9"
                alt="Flowbite Logo"
              />
            </div>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="mr-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-gray-800  delay-100 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 lg:px-5 lg:py-2.5 dark:text-white dark:hover:bg-gray-500"
            >
              Log in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
