import { useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <>
      <div className="bg-slate-400 flex flex-col h-screen">
        <h1 className="text-4xl font-bold text-center p-2">
          Controle de Gastos - Dev
        </h1>

        {/* Formulário para adicionar gasto */}
        <section>
          <form className="flex flex-col gap-4 p-4 border rounded-md">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="data">
                Data de Criação
              </label>
              <input
                className="border border-gray-300 rounded-md p-2"
                type="date"
                placeholder="Data de Criação"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="descricao">
                Descrição
              </label>
              <input
                className="border border-gray-300 rounded-md p-2"
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="valor">
                Valor
              </label>
              <input
                className="border border-gray-300 rounded-md p-2"
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="categoria">
                Categoria
              </label>
              <select
                className="border border-gray-300 rounded-md p-2"
                name="categoria"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Lazer">Lazer</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
              type="submit"
            >
              Adicionar
            </button>
          </form>
        </section>

        {/* Tabela para listar os gastos */}
        <section>
          <table className="w-[80vw] m-auto p-4 border rounded-md">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>{/* Aqui você renderiza os gastos */}</tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default App;
