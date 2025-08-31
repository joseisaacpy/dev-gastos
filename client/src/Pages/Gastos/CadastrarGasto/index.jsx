import { useState, useEffect } from "react";

const CadastrarGasto = () => {
  // Estado para armazenar as categorias
  const [categorias, setCategorias] = useState([]);

  // Função para pegar as categorias da API
  const pegarCategorias = async () => {
    const url = `${import.meta.env.VITE_API_URL}/categorias`;
    const request = await fetch(url);
    const response = await request.json();
    setCategorias(response.categorias);
  };

  // Atualiza nome e chama função de pegar categorias
  useEffect(() => {
    document.title = "Cadastro de Gasto";
    pegarCategorias();
  }, []);

  return (
    <form className="max-w-md mx-auto p-4 space-y-4">
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
        />
      </div>

      {/* Categoria */}
      <div>
        <label htmlFor="categoria" className="block font-medium">
          Categoria
        </label>
        <select
          name="categoria"
          id="categoria"
          className="w-full border rounded p-2"
          defaultValue=""
        >
          <option value="" selected disabled>
            Selecione:
          </option>
          ;
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
