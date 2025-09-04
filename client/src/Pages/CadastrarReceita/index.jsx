import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";

const cadastrarReceita = () => {
  // Estados para inputs
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    valor: "",
    categoria: "",
  });

  // Função para cadastrar um gasto
  const cadastrarReceita = async (gasto) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/receita`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gasto),
      });

      // Pega a resposta do back
      const data = await response.json();

      // Se não foi bem sucedido, retorna um erro
      if (!response.ok) {
        // Mensagem de erro
        toast.error(data.msg || "Erro ao cadastrar receita.");
        throw new Error(data.msg || "Erro ao cadastrar receita");
      }
      // Mensagem de sucesso
      toast.success(data.msg || "Gasto cadastrado com sucesso!");
      // Reseta o formulário para os valores iniciais
      setForm({
        nome: "",
        descricao: "",
        valor: "",
        categoria: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar gasto: ", error);
    }
  };
  // Função para lidar com o envio do form
  const handleSubmit = async (e) => {
    // Evita o recarregamento
    e.preventDefault();
    // Gasto para usar na função de cadastro
    const receita = {
      nome: form.nome,
      descricao: form.descricao,
      valor: parseFloat(form.valor),
      categoria: form.categoria,
    };
    try {
      // Chama a função de cadastro
      await cadastrarReceita(receita);
    } catch (error) {
      console.error("Erro ao cadastrar receita:", error);
    }
  };

  // Atualiza nome e chama função de pegar categorias
  useEffect(() => {
    document.title = "Cadastro de Receita";
  }, []);

  return (
    <form
      className="max-w-md mx-auto p-4 space-y-6 m-4 bg-slate-100 shadow-md border border-slate-600 rounded-2xl"
      onSubmit={handleSubmit}
    >
      {/* Título */}
      <div className="">
        <h1 className="text-2xl font-bold ">Cadastro de Receita</h1>
        <p>
          Quer cadastrar{" "}
          <Link to={"/novoGasto"} className="font-bold">
            gasto?
          </Link>
        </p>
      </div>

      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block font-medium">
          Nome:
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          className="w-full border rounded p-2 focus:outline-primary-dark transition-all duration-300"
          placeholder="Ex: Cinema"
          required
          value={form.nome}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="block font-medium">
          Descrição:
        </label>
        <input
          id="descricao"
          name="descricao"
          type="text"
          className="w-full border rounded p-2 focus:outline-primary-dark transition-all duration-300"
          placeholder="Ex: Saída ao cinema com amigos"
          value={form.descricao}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
      </div>

      {/* Preço */}
      <div>
        <label htmlFor="preco" className="block font-medium">
          Preço:
        </label>
        <input
          id="preco"
          name="valor"
          type="number"
          step="0.01"
          className="w-full border rounded p-2 focus:outline-primary-dark transition-all duration-300"
          placeholder="Ex: 45.90"
          required
          value={form.valor}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
      </div>

      {/* Categoria */}
      <div>
        <label htmlFor="categoria" className="block font-medium">
          Categoria:
        </label>
        <select
          name="categoria"
          id="categoria"
          className="w-full border rounded p-2 focus:outline-primary-dark transition-all duration-300"
          value={form.categoria}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        >
          <option value="" disabled>
            Selecione:
          </option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="bg-primary-dark text-white px-4 py-2 rounded cursor-pointer w-full hover:opacity-90 transition-all duration-300"
      >
        Salvar
      </button>
    </form>
  );
};

export default cadastrarReceita;
