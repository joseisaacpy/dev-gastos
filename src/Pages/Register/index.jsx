import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../Firebase/connect";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  // Estados pra armazenar os dados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Função pra cadastrar o usuário
  const cadastrar = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Limpa os campos do formulário
      setEmail("");
      setPassword("");
      toast.success("Cadastro realizado com sucesso. Redirecionando...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email já cadastrado.");
          break;

        case "auth/invalid-email":
          toast.error("Email inválido.");
          break;

        case "auth/weak-password":
          toast.error("Senha fraca.");
          break;

        default:
          toast.error("Erro ao cadastrar");
          break;
      }
    }
  };

  // useEffect
  useEffect(() => {
    document.title = "Registro";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-blue-600 to-blue-200 px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        {/* Formulário de cadastro */}
        <section className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <form className="flex flex-col gap-4" onSubmit={cadastrar}>
            <h1 className="text-3xl font-bold text-center text-blue-700">
              Faça seu cadastro!
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
              Registrar
            </button>

            <p className="text-center text-sm mt-2">
              Já possui uma conta?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Login
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

export default Register;
