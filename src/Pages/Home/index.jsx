import { useState, useEffect } from "react";
import Loader from "../../Components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { db, auth } from "../../Firebase/connect";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function Home() {
  // Hook para navegação
  const navigate = useNavigate();
  // Estado pra editar gasto
  const [editGastoId, setEditGastoId] = useState(null);
  // Estados para armazenar os dados do formulário
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");

  // Estado pra armazenar os gastos
  const [gastos, setGastos] = useState([]);
  // Estado pra armazenar o status do loader
  const [loading, setLoading] = useState(true);

  // Função para adicionar gasto no banco
  const addGasto = async () => {
    if (data === "" || descricao === "" || valor === "" || categoria === "") {
      toast.error("Preencha todos os campos");
      return;
    }

    try {
      if (editGastoId) {
        // Atualizar gasto existente
        const docRef = doc(db, "gastos", editGastoId);
        await updateDoc(docRef, {
          data,
          descricao,
          valor: Number(valor),
          categoria,
        });
        toast.success("Gasto atualizado com sucesso.");
        setEditGastoId(null); // Sai do modo edição
      } else {
        // Adicionar novo gasto
        await addDoc(collection(db, "gastos"), {
          data,
          descricao,
          valor: Number(valor),
          categoria,
          userId: auth.currentUser.uid, // opcional se quiser associar ao usuário
        });
        toast.success("Gasto adicionado com sucesso.");
      }

      // Limpa o formulário
      setData(new Date().toISOString().slice(0, 10));
      setDescricao("");
      setValor("");
      setCategoria("");
      // Atualiza a lista de gastos
      getGastos();
    } catch (error) {
      toast.error("Erro ao salvar gasto.");
      console.log(error);
    }
  };

  // Função para deletar gasto no banco
  const deleteGasto = async (id) => {
    try {
      const docRef = doc(db, "gastos", id);
      await deleteDoc(docRef);
      toast.success("Gasto deletado com sucesso.");
      getGastos();
    } catch (error) {
      toast.error("Erro ao deletar gasto.");
      console.log(error);
    }
  };
  // Função para editar gasto no banco
  const editGasto = (id) => {
    const gasto = gastos.find((g) => g.id === id);
    if (gasto) {
      setData(gasto.data);
      setDescricao(gasto.descricao);
      setValor(gasto.valor);
      setCategoria(gasto.categoria);
      setEditGastoId(id); // Esse estado deve existir
    }
  };
  // Função para pegar os gastos no banco
  const getGastos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gastos"));
      const gastosData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          data: doc.data().data,
          descricao: doc.data().descricao,
          valor: doc.data().valor,
          categoria: doc.data().categoria,
        }))
        .sort((a, b) => new Date(b.data) - new Date(a.data));
      setGastos(gastosData);
      console.log(querySnapshot);
    } catch (error) {
      console.log(error);
    } finally {
      // Para de carregar
      setLoading(false);
    }
  };

  // useEffect para buscar os dados do banco
  useEffect(() => {
    // Muda o title da aba
    document.title = "ControleFácil - Home";
    // Função pra verificar se o usuário está logado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Se não tiver logado, redireciona para a tela de login
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false); // Para de carregar
        getGastos();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-slate-100 flex flex-col min-h-screen">
        {/* Formulário para adicionar gasto */}
        <section className="w-[90%] mx-auto">
          <h1 className="text-4xl font-extrabold p-4 flex items-center gap-3 text-blue-700">
            <FaMoneyBillAlt className="text-3xl" />
            ControleFácil
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addGasto();
            }}
            className="flex flex-col gap-4 p-4 border rounded-md shadow-md"
          >
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="data">
                Data (hoje por padrão):
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
                Descrição:
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
                Valor:
              </label>
              <input
                className="border border-gray-900 rounded-md p-2"
                type="number"
                placeholder="Valor"
                step={0.01}
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
              {editGastoId ? "Salvar Edição" : "Adicionar"}
            </button>
          </form>
        </section>

        {/* Tabela para listar os gastos */}
        <section className="w-[90%] mx-auto">
          <h2 className="text-2xl font-bold text-left p-2">Seus Gastos:</h2>
          <div className="overflow-x-auto">
            <table className="w-full shadow-md">
              <thead className="">
                <tr className="">
                  <th className="bg-black text-white border p-2">Data</th>
                  <th className="bg-black text-white border p-2">Descrição</th>
                  <th className="bg-black text-white border p-2">Valor</th>
                  <th className="bg-black text-white border p-2">Categoria</th>
                  <th className="bg-black text-white border p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* Map para listar os gastos */}
                {gastos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center border p-2">
                      Nenhum gasto cadastrado
                    </td>
                  </tr>
                ) : (
                  gastos.map((gasto) => (
                    <tr
                      key={gasto.id}
                      className="even:bg-slate-200 odd:bg-slate-300"
                    >
                      <td className="border p-2">
                        {new Date(gasto.data).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="border p-2">{gasto.descricao}</td>
                      <td className="border p-2 font-bold">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(gasto.valor)}
                      </td>
                      <td className="border p-2">{gasto.categoria}</td>
                      <td className="border p-2">
                        <div className="flex gap-2 justify-around items-center">
                          <button
                            className="cursor-pointer"
                            onClick={() => deleteGasto(gasto.id)}
                            title="Deletar"
                          >
                            <FaDeleteLeft className="text-red-600 hover:text-red-800 transition-all" />
                          </button>
                          <button
                            className="cursor-pointer"
                            onClick={() => editGasto(gasto.id)}
                            title="Editar"
                          >
                            <FaRegEdit className="text-blue-600 hover:text-blue-800 transition-all" />
                          </button>
                        </div>
                      </td>{" "}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
