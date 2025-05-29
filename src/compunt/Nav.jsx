import { Link } from "react-router";
const Navs = [
  { name: "Home", path: "/" },
  { name: "Register", path: "/Register" },
  { name: "Login", path: "/Login" },
    { name: "ProfilePage", path: "/ProfilePage" },

  

];

function Nav() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 border-b border-gray-600 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
       
        <div className="text-white font-extrabold text-2xl tracking-wide cursor-pointer select-none">
          MySite
        </div>

        <nav>
          <ul className="flex gap-8 text-white text-lg font-semibold">
            {Navs.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="px-4 py-2 rounded-md hover:bg-white hover:text-blue-900 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
