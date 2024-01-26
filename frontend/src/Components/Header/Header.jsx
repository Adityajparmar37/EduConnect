export default function Header() {
  return (
    <header>
      <nav className="dark:bg-white border-black bg-white px-4 py-2.5 shadow-md lg:px-6 border-b-4 ">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <a href="https://flowbite.com" className="flex items-center">
            <img
              src="../../../public/logo2-removebg-preview.png"
              className="mr-3 h-9 sm:h-9"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href="#"
              className="bg-gray-700 mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800  focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5 dark:text-white dark:hover:bg-gray-500 hover:rounded-full delay-100"
            >
              Log in
            </a>
          </div>
          <div
            className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
}
