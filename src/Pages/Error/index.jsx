import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Ops, página não encontrada!</h1>
      <Link
        className="p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition duration-300"
        to="/"
      >
        Voltar para home
      </Link>
    </section>
  );
};

export default Error;
