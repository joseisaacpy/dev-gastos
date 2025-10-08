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
  const menuLinks = [
    {
      name: "Cadastrar Gasto",
      link: "/cadastrar-gasto",
      icon: <FaPlus />,
    },
    {
      name: "Listar Gastos",
      link: "/listar-gastos",
      icon: <FaListUl />,
    },
    {
      name: "Cadastrar Receita",
      link: "/cadastrar-receita",
      icon: <FaPlus />,
    },
    {
      name: "Listar Receitas",
      link: "/listar-receitas",
      icon: <FaListUl />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <FaChartPie />,
    },
  ];

  // Estado para controlar se o dropdown pode aparecer
  const [showDrop, setShowDrop] = useState(false);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-white">
          {/* Nav */}
          <nav className="min-w-screen min-h-[75px] shadow-2xl flex items-center justify-around bg-primary-dark">
            {/* Logo */}
            <Link to={"/"}>
              <h1 className="font-bold text-2xl transition-all duration-200 hover:text-warning cursor-pointer ">
                &lt;DevGastos/&gt;
              </h1>
            </Link>
            {/* Menu Desktop */}
            <ul className="hidden sm:flex gap-4">
              {menuLinks.map((link) => (
                <li
                  key={link.name}
                  className="transition-all duration-200 hover:text-warning cursor-pointer"
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
            {/* Botão Mobile para exibir o menu */}
            <button
              onClick={() => setMenu(!menu)}
              className="sm:hidden transition-all duration-200 hover:text-warning cursor-pointer"
            >
              <MdMenu />
            </button>
          </nav>
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
