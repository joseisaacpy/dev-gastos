import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader";

const CadastrarGasto = () => {
  // Estado para controlar loader
  // const [loader, setLoader] = useState(true);
  // Estados para inputs
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
  });

  // Função para cadastrar um gasto
  const cadastrarGasto = async (gasto) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/gastos`;
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
        toast.error(data.msg || "Erro ao cadastrar gasto.");
        throw new Error(data.msg || "Erro ao cadastrar gasto");
      }
      // Mensagem de sucesso
      toast.success(data.msg || "Gasto cadastrado com sucesso!");
      // Reseta o formulário para os valores iniciais
      setForm({
        nome: "",
        descricao: "",
        preco: "",
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
    const gasto = {
      nome: form.nome,
      descricao: form.descricao,
      preco: parseFloat(form.preco),
      categoria: form.categoria,
    };
    try {
      // Chama a função de cadastro
      await cadastrarGasto(gasto);
    } catch (error) {
      console.error("Erro ao cadastrar gasto:", error);
    }
  };

  // Atualiza nome e chama função de pegar categorias
  useEffect(() => {
    document.title = "Cadastro de Gasto";
  }, []);

  return (
    <form
      className="max-w-md mx-auto p-4 space-y-6 m-4 bg-slate-100 shadow-md border border-slate-600 rounded-2xl"
      onSubmit={handleSubmit}
    >
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
          name="preco"
          type="number"
          step="0.01"
          className="w-full border rounded p-2 focus:outline-primary-dark transition-all duration-300"
          placeholder="Ex: 45.90"
          required
          value={form.preco}
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
          <option value="Alimentacao">Alimentação</option>
          <option value="Moradia">Moradia</option>
          <option value="Transporte">Transporte</option>
          <option value="Saude">Saúde</option>
          <option value="Educacao">Educação</option>
          <option value="Lazer">Lazer</option>
          <option value="Roupas e Acessorios">Roupas e Acessórios</option>
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

export default CadastrarGasto;
