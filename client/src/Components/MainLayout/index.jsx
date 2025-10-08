// Importa o Link e Outlet para partes filhas do layout
import { Outlet, Link } from "react-router-dom";
// Icons
import { FaPlus, FaListUl, FaChartPie, FaTimes } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
// Hooks
import { useState } from "react";

const MainLayout = () => {
  // Estado para controlar se pode exibir o menu
  const [menu, setMenu] = useState(false);

  // Links (usa no mobile e desk)
  const menuLinks = [
    {
      name: "+ Gasto",
      link: "/novoGasto",
      icon: <FaPlus />,
    },
    {
      name: "Gastos",
      link: "/gastos",
      icon: <FaListUl />,
    },
    {
      name: "+ Receita",
      link: "/novaReceita",
      icon: <FaPlus />,
    },
    {
      name: "Receitas",
      link: "/receitas",
      icon: <FaListUl />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <FaChartPie />,
    },
  ];

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
              className="sm:hidden transition-all duration-200 hover:text-warning cursor-pointer z-20"
            >
              {menu ? (
                <FaTimes className="text-3xl" />
              ) : (
                <MdMenu className="text-3xl" />
              )}
            </button>
          </nav>
          {/* Menu lateral mobile */}
          <article
            className={`z-10 overflow-hidden h-screen w-[300px] fixed top-0 right-0 ${
              menu ? "translate-x-0" : "translate-x-full"
            } bg-primary-dark transition-all duration-500`}
          >
            <ul className="pt-[75px] flex flex-col items-baseline h-full gap-6 p-4 bg-primary-dark shadow-2xl sm:hidden">
              {menuLinks.map((link) => (
                <li
                  key={link.name}
                  onClick={() => setMenu(!menu)}
                  className="transition-all duration-200 hover:text-warning cursor-pointer"
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </article>
        </header>
        {/* Main */}
        <main className="flex-1" onClick={() => setMenu(false)}>
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="z-10 min-w-screen shadow-2xl p-2 text-center bg-primary-dark text-white">
          <p className="font-bold">Dev-Gastos</p>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
