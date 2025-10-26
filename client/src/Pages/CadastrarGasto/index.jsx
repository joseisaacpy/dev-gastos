import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const CadastrarGasto = () => {
  // Estados para inputs
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    data: new Date().toISOString().split("T")[0],
    categoria: "",
  });
  // Estado para controlar msg do button
  const [isSalvando, setIsSalvando] = useState(false);

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
        data: new Date().toISOString().split("T")[0],
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
      data: form.data,
      categoria: form.categoria,
    };
    try {
      // Chama a função de cadastro
      setIsSalvando(true);
      await cadastrarGasto(gasto);
      console.log(gasto);
    } catch (error) {
      console.error("Erro ao cadastrar gasto:", error);
    } finally {
      setIsSalvando(false);
    }
  };

  // Atualiza nome e chama função de pegar categorias
  useEffect(() => {
    document.title = "Cadastro de Gasto";
  }, []);

  return (
    <form
      className="w-full max-w-md mx-auto mt-2 flex flex-col gap-5 p-2 bg-slate-100 shadow-md border border-slate-600 rounded-md"
      onSubmit={handleSubmit}
    >
      {/* Título */}
      <div className="">
        <h1 className="text-2xl font-bold ">Cadastro de Gasto</h1>
        <p className="text-[12px] text-left">
          Quer cadastrar{" "}
          <Link to={"/novaReceita"} className="font-bold underline">
            receita?
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

      {/* Data */}
      <div>
        <label htmlFor="data" className="block font-medium">
          Data:
        </label>

        <input
          type="date"
          name="data"
          id="data"
          className="w-full border rounded p-2 focus:outline-primary-dark transition-all duration-300"
          required
          value={form.data}
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
        className="bg-primary-dark text-white px-4 py-2 rounded cursor-pointer w-full hover:opacity-90 transition-all duration-300 focus:outline-primary-dark focus:opacity-90"
      >
        {isSalvando ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
};

export default CadastrarGasto;
