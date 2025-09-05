import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Página não encontrada";
  });
  return (
    <>
      <section className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-primary to-primary-light">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-white">
            Ops, página não encontrada...
          </h1>
          <button className="bg-white p-2 rounded-2xl transition-all duration-300 hover:scale-110">
            <Link to={"/painel"}>Voltar</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default NotFound;
