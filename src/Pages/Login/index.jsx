import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/connect";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
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
      toast.success("Login realizado com sucesso. Redirecionando...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-blue-200 to-blue-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        {/* Formulário de Login */}
        <section className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <form className="flex flex-col gap-4" onSubmit={login}>
            <h1 className="text-3xl font-bold text-center text-blue-700">
              Seja bem-vindo novamente!
            </h1>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">
                Senha:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
            >
              Entrar
            </button>

            <p className="text-center text-sm mt-2">
              Ainda não possui uma conta?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Registrar
              </Link>
            </p>
          </form>
        </section>

        {/* Imagem lateral */}
        <div className="hidden md:flex md:relative md:w-1/2">
          <div className="absolute flex items-center justify-center w-full h-full bg-black opacity-50">
            <h2 className="z-10 font-bold text-center text-white text-2xl md:text-4xl animate-pulse">
              Organização é o primeiro passo para a riqueza.
            </h2>
          </div>

          <img
            src="https://images.pexels.com/photos/259132/pexels-photo-259132.jpeg"
            alt="Ilustração"
            className="object-cover w-full"
          />
        </div>

        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default Login;
