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
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="">
          {/* Nav */}
          <nav className="min-w-screen min-h-[75px] flex items-center justify-around bg-primary text-white">
            <Link to={"/"}>
              <h1 className="font-bold text-2xl transition-all duration-200 hover:text-warning cursor-pointer ">
                DevGastos
              </h1>
            </Link>
            {/* Menu Desktop */}
            <ul className="hidden sm:flex  gap-4">
              <li>
                <Link to={"/novoGasto"} title="Cadastrar">
                  <FaPlus className="transition-all duration-200 hover:text-warning cursor-pointer" />
                </Link>
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
                console.log(menu);
              }}
              className="md:hidden text-3xl cursor-pointer"
            >
              <MdMenu />
            </button>
            {/* Nav mobile */}
            <nav className="hidden">
              <ul className="flex gap-4">
                <li>
                  <Link to={"/novoGasto"} title="Cadastrar">
                    <FaPlus className="transition-all duration-200 hover:text-warning cursor-pointer" />
                  </Link>
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
            </nav>
          </nav>
        </header>
        {/* Main */}
        <main className="flex-1">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="min-w-screen p-2 text-center bg-primary text-white">
          <p className="font-bold">Dev-Gastos</p>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
