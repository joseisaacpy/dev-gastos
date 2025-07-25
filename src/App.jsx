import { db } from "./Firebase/connect";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function App() {
  // Estados para armazenar os dados do formulário
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");

  // Estado pra armazenar os gastos
  const [gastos, setGastos] = useState([]);

  // Função para adicionar gasto no banco
  const addGasto = async () => {
    if (data === "" || descricao === "" || valor === "" || categoria === "") {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      await addDoc(collection(db, "gastos"), {
        data,
        descricao,
        valor,
        categoria,
      });
      toast.success("Gasto adicionado com sucesso");
      // Limpa os campos do formulário
      setData(new Date().toISOString().slice(0, 10));
      setDescricao("");
      setValor("");
      setCategoria("");
      // Atualiza a lista de gastos
      getGastos();
    } catch (error) {
      toast.error("Erro ao adicionar gasto");
      console.log(error);
    }
  };
  // Função para pegar os gastos no banco
  const getGastos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gastos"));
      const gastosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data().data,
        descricao: doc.data().descricao,
        valor: doc.data().valor,
        categoria: doc.data().categoria,
      }));
      setGastos(gastosData);
      console.log(querySnapshot);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect para buscar os dados do banco
  useEffect(() => {
    getGastos();
  }, []);

  return (
    <>
      <div className="bg-slate-100 flex flex-col h-screen">
        {/* Formulário para adicionar gasto */}
        <section className="w-[90%] mx-auto">
          <h1 className="text-4xl font-bold text-left p-2">Dev Gastos</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addGasto();
            }}
            className="flex flex-col gap-4 p-4 border rounded-md"
          >
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="data">
                Data (hoje por padrão)
              </label>
              <input
                className="border border-gray-900 rounded-md p-2"
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
                className="border border-gray-900 rounded-md p-2"
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
                className="border border-gray-900 rounded-md p-2"
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
                className="border border-gray-900 rounded-md p-2"
                name="categoria"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option disabled value="">
                  Selecione uma categoria:
                </option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Moradia">Moradia</option>
                <option value="Contas e Serviços">Contas e Serviços</option>
                <option value="Lazer">Lazer</option>
                <option value="Educação">Educação</option>
                <option value="Saúde">Saúde</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <button
              className="text-white p-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all duration-300"
              type="submit"
            >
              Adicionar
            </button>
          </form>
        </section>

        {/* Tabela para listar os gastos */}
        <section className="w-[90%] mx-auto">
          <h2 className="text-2xl font-bold text-left p-2">Gastos</h2>
          <table className="w-full p-4">
            <thead className="border">
              <tr className="border p-2">
                <th className="bg-slate-500 text-white border p-2">Data</th>
                <th className="bg-slate-500 text-white border p-2">
                  Descrição
                </th>
                <th className="bg-slate-500 text-white border p-2">Valor</th>
                <th className="bg-slate-500 text-white border p-2">
                  Categoria
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map para listar os gastos */}
              {gastos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center border p-2">
                    Nenhum gasto cadastrado
                  </td>
                </tr>
              ) : (
                gastos.map((gasto) => (
                  <tr
                    key={gasto.id}
                    className="even:bg-slate-200 odd:bg-slate-300 border p-2"
                  >
                    <td className="border p-2">
                      {new Date(gasto.data).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="border p-2">{gasto.descricao}</td>
                    <td className="border p-2">{gasto.valor}</td>
                    <td className="border p-2">{gasto.categoria}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
