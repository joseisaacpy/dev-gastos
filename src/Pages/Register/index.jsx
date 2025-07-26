import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  return (
    <section className="bg-slate-400 w-full h-screen flex flex-col justify-center items-center">
      <form className="w-[96%] max-w-[600px] bg-white p-4 shadow-md rounded-md flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center">Faça seu cadastro!</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Digite seu email:</label>
          <input className="border p-2 rounded-md" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Digite sua senha:</label>
          <input className="border p-2 rounded-md" type="text" />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition duration-300"
        >
          Registrar
        </button>
        <span className="text-center">
          Já possui uma conta?
          <Link
            className="ml-2 p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition duration-300"
            to="/login"
          >
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Register;
