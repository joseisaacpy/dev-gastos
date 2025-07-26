import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/connect";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  // Estados pra armazenar os dados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Limpa os campos do formulário
      setEmail("");
      setPassword("");
      toast.success("Login realizado com sucesso");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Senha incorreta.");
          break;

        case "auth/user-not-found":
          toast.error("Usuário não encontrado.");
          break;

        case "auth/invalid-email":
          toast.error("Email inválido.");
          break;

        case "auth/too-many-requests":
          toast.error("Muitas solicitações. Tente novamente mais tarde.");
          break;

        default:
          toast.error("Erro ao fazer login");
          break;
      }
    }
  };

  return (
    <section className="bg-slate-400 w-full h-screen flex flex-col justify-center items-center">
      <form
        className="w-[96%] max-w-[600px] bg-white p-4 shadow-md rounded-md flex flex-col gap-4"
        onSubmit={login}
      >
        <h1 className="text-3xl font-bold text-center">
          Seja bem-vindo novamente!
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Digite seu email:</label>
          <input
            className="border p-2 rounded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Digite sua senha:</label>
          <input
            className="border p-2 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Login
        </button>
        <span className="text-center">
          Ainda não possui uma conta?
          <Link
            className="ml-2 p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 transition duration-300"
            to="/register"
          >
            Registrar
          </Link>
        </span>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
