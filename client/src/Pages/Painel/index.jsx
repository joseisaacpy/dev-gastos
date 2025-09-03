import { Link } from "react-router-dom";
import { useEffect } from "react";

const Painel = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <main className="min-w-screen min-h-screen bg-gradient-to-bl from-primary to-primary-light">
        <section className="min-h-screen max-w-2xl mx-auto flex flex-col items-center justify-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl text-center font-bold">
              Seja bem-vindo ao{" "}
              <span className="text-white animate-pulse">
                Dev-Gastos
              </span>
              !
            </h1>
            <p className="text-center">
              Escolha uma das opções abaixo para começar:
            </p>
          </div>

          <ul className="px-4 w-[95%] flex flex-col gap-3 justify-center items-center">
            <li className="w-full">
              <Link
                to="/novoGasto"
                className="block font-bold text-center bg-primary-dark text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                Cadastrar gasto
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/gastos"
                className="block font-bold text-center bg-primary-dark text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                Listar gastos
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/dashboard"
                className="block font-bold text-center bg-primary-dark text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};
export default Painel;
