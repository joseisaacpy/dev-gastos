import { Link } from "react-router-dom";
import { useEffect } from "react";

const Painel = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <main className="min-w-screen min-h-screen bg-slate-300">
        <section className="max-w-2xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold mb-6">
            Seja bem-vindo ao <span className="text-primary">Dev-Gastos</span>
          </h1>
          <p className="mb-8 text-gray-600">
            Escolha uma das opções abaixo para começar:
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <Link
              to="/novoGasto"
              className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
            >
              Cadastrar gasto
            </Link>
            <Link
              to="/gastos"
              className="bg-secondary text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
            >
              Listar gastos
            </Link>
            <Link
              to="/dashboard"
              className="bg-secondary text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
            >
              Dashboard
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
export default Painel;
