import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CadastrarGasto = () => {
  // Estado para armazenar as categorias
  const [categorias, setCategorias] = useState([]);
  // Estados para inputs
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoriaId: "",
  });

  // Função para pegar as categorias da API
  const pegarCategorias = async () => {
    const url = `${import.meta.env.VITE_API_URL}/categorias`;
    const request = await fetch(url);
    const response = await request.json();
    setCategorias(response.categorias);
  };

  // Função para cadastrar um gasto
  const cadastrarGasto = async (gasto) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/gastos`;
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
        categoriaId: "",
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
      categoriaId: form.categoriaId,
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
    pegarCategorias();
  }, []);

  return (
    <form className="max-w-md mx-auto p-4 space-y-4" onSubmit={handleSubmit}>
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block font-medium">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          className="w-full border rounded p-2"
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
          Descrição
        </label>
        <input
          id="descricao"
          name="descricao"
          type="text"
          className="w-full border rounded p-2"
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
          Preço
        </label>
        <input
          id="preco"
          name="preco"
          type="number"
          step="0.01"
          className="w-full border rounded p-2"
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
        <label htmlFor="categoriaId" className="block font-medium">
          Categoria
        </label>
        <select
          name="categoriaId"
          id="categoriaId"
          className="w-full border rounded p-2"
          value={form.categoriaId}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        >
          <option value="" disabled>
            Selecione:
          </option>

          {categorias.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            );
          })}
        </select>
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
      >
        Salvar
      </button>
    </form>
  );
};

export default CadastrarGasto;
