import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/connect";
import { signOut } from "firebase/auth";
import { FaHome, FaChartBar, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
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
          <Link
            to="#"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await signOut(auth);
                navigate("/login");
              } catch (error) {
                console.error("Erro ao sair:", error);
              }
            }}
          >
            <FaSignOutAlt className="text-2xl" />
          </Link>{" "}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
