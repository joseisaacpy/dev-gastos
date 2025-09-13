// Importa o Link e Outlet para partes filhas do layout
import { Outlet, Link } from "react-router-dom";
// Icons
import { FaPlus, FaListUl, FaChartPie } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
// Hooks
import { useState } from "react";

const MainLayout = () => {
  // Estado para controlar se pode exibir o menu
  const [menu, setMenu] = useState(false);

  // Links (usa no mobile e desk)
  // const menuLinks = [{},{},{}]

  // Estado para controlar se o dropdown pode aparecer
  const [showDrop, setShowDrop] = useState(false);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-white">
          {/* Nav */}
          <nav className="min-w-screen min-h-[75px] shadow-2xl flex items-center justify-around bg-primary-dark">
            <Link to={"/"}>
              <h1 className="font-bold text-2xl transition-all duration-200 hover:text-warning cursor-pointer ">
                &lt;DevGastos/&gt;
              </h1>
            </Link>
            {/* Menu Desktop */}
            <ul className="hidden sm:flex gap-4">
              <li className="relative">
                <button onClick={() => setShowDrop(!showDrop)}>
                  <FaPlus className="transition-all duration-200 hover:text-warning cursor-pointer" />
                </button>
                {/* Dropdown */}
                <div
                  className={`absolute right-0 w-30 bg-primary shadow-lg rounded-md  transition-all duration-300 ${
                    showDrop
                      ? "flex flex-col opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Link
                    onClick={() => {
                      setShowDrop(!showDrop);
                    }}
                    to={"/novoGasto"}
                    className="block text-center rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:text-warning"
                  >
                    + Gasto
                  </Link>
                  <Link
                    onClick={() => {
                      setShowDrop(!showDrop);
                    }}
                    to={"/novaReceita"}
                    className="block text-center rounded-md px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:text-warning"
                  >
                    + Receita
                  </Link>
                </div>
              </li>
              <li>
                <Link to={"/gastos"} title="Listar">
                  <FaListUl className="transition-all duration-200 hover:text-warning cursor-pointer" />
                </Link>
              </li>
              <li>
                <Link to={"/dashboard"} title="Dashboard">
                  <FaChartPie className="transition-all duration-200 hover:text-warning cursor-pointer" />
                </Link>
              </li>
            </ul>

            {/* Botão menu mobile */}
            <button
              onClick={() => {
                setMenu(!menu);
              }}
              className="md:hidden text-3xl cursor-pointer"
            >
              <MdMenu />
            </button>
          </nav>
          {/* Menu mobile */}
          <ul
            className={`overflow-hidden w-full flex flex-col md:hidden pl-2 gap-4 bg-primary-dark transition-all duration-500 ${
              menu ? "max-h-[500px] opacity-100" : "max-h-0"
            }`}
          >
            <li className="mb-2">
              <Link
                to={"/novoGasto"}
                title="Cadastrar"
                className="flex items-center gap-2 "
              >
                <FaPlus className="transition-all duration-200 hover:text-warning cursor-pointer" />
                <span>Link</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to={"/gastos"}
                title="Listar"
                className="flex items-center gap-2 "
              >
                <FaListUl className="transition-all duration-200 hover:text-warning cursor-pointer" />
                <span>Link</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to={"/dashboard"}
                title="Dashboard"
                className="flex items-center gap-2 "
              >
                <FaChartPie className="transition-all duration-200 hover:text-warning cursor-pointer" />
                <span>Link</span>
              </Link>
            </li>
          </ul>
        </header>
        {/* Main */}
        <main className="flex-1">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="min-w-screen shadow-2xl p-2 text-center bg-primary-dark text-white">
          <p className="font-bold">Dev-Gastos</p>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
