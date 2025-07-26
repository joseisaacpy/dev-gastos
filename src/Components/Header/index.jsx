import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";

const Header = () => {
  return (
    <header className="">
      <nav className="flex justify-around items-center bg-gray-800 p-4 w-full">
        <h1 className="text-lg md:text-2xl font-bold text-white">
          Controle de Gastos
        </h1>
        <ul className="flex gap-4 text-white">
          <li>
            <Link to="/">
              <FaHome className="text-2xl" />
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FaChartBar className="text-2xl" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
