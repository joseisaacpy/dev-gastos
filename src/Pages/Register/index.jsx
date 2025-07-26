import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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

  return (
    <section className="bg-slate-400 w-full h-screen flex flex-col justify-center items-center">
      <form
        className="w-[96%] max-w-[600px] bg-white p-4 shadow-md rounded-md flex flex-col gap-4"
        onSubmit={cadastrar}
      >
        <h1 className="text-3xl font-bold text-center">Faça seu cadastro!</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Digite seu email:</label>
          <input
            className="border p-2 rounded-md"
            type="text"
            value={email}
            autoFocus
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
      <ToastContainer autoClose={2000} />
    </section>
  );
};

export default Register;
