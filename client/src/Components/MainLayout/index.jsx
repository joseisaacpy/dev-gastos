// Importa o Link e Outlet para partes filhas do layout
import { Outlet, Link } from "react-router-dom";
// Icons
import { FaPlus, FaListUl, FaChartPie } from "react-icons/fa";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="">
          <nav className="min-w-screen min-h-[75px] flex items-center justify-around bg-primary text-white">
            <Link to={"/"}>
              <h1 className="font-bold text-2xl transition-all duration-200 hover:text-warning ">
                DevGastos
              </h1>
            </Link>
            <ul className="flex gap-4">
              <li>
                <Link to={"/novoGasto"} title="Cadastrar">
                  <FaPlus className="transition-all duration-200 hover:text-warning" />
                </Link>
              </li>
              <li>
                <Link to={"/gastos"} title="Listar">
                  <FaListUl className="transition-all duration-200 hover:text-warning" />
                </Link>
              </li>
              <li>
                <Link to={"/dashboard"} title="Dashboard">
                  <FaChartPie className="transition-all duration-200 hover:text-warning" />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* Main */}
        <main className="flex-1">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="p-2 text-center bg-primary text-white">
          <p className="font-bold">Dev-Gastos</p>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
