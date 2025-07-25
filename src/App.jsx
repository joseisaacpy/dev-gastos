import { db } from "./Firebase/connect";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function App() {
  // Estados para armazenar os dados do formulário
  const [data, setData] = useState("");
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
      setData("");
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
      <div className="bg-slate-400 flex flex-col h-screen">
        <h1 className="text-4xl font-bold text-center p-2">
          Controle de Gastos - Dev
        </h1>

        {/* Formulário para adicionar gasto */}
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addGasto();
            }}
            className="flex flex-col gap-4 p-4 border rounded-md"
          >
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
              <tr className="border p-2">
                <th className="border p-2">Descrição</th>
                <th className="border p-2">Valor</th>
                <th className="border p-2">Categoria</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((gasto) => {
                return (
                  <tr key={gasto.id} className="border p-2">
                    <td className="border p-1">{gasto.descricao}</td>
                    <td className="border p-1">{gasto.valor}</td>
                    <td className="border p-1">{gasto.categoria}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
