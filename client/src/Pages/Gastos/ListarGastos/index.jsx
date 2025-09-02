// Importa o loader
import Loader from "../../../Components/Loader";
// Importa icons
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
// Importa toast
import { toast } from "react-toastify";

// Importa hooks
import { useState, useEffect } from "react";
const ListarGastos = () => {
  // Estado para armazenar gastos
  const [gastos, setGastos] = useState([]);
  // Estado para controlar o Loader
  const [loading, setLoading] = useState(true);

  // Função para consumir API de gastos
  const pegarGastos = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/gastos`;
      const request = await fetch(url);
      const response = await request.json();
      setGastos(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Função para deletar um gasto
  const deletarGasto = async (id) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/gastos/${id}`;
      console.log(id);
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar gasto");
      }
      const data = await response.json();
      toast.success(data.msg);
      console.log(data.msg);
      // Chama função para atualizar os gastos
      pegarGastos();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar gasto");
    }
  };

  //   useEffect para mudar titulo e chamar função
  useEffect(() => {
    document.title = "Seus Gastos";
    pegarGastos();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <section className="flex items-center justify-center ">
        <div className="overflow-x-auto">
          {/* Tabela */}
          <table className="min-w-full">
            {/* Cabeçalho da tabela */}
            <thead className="bg-blue-600 text-white font-bold">
              <tr>
                <td className="border-2 border-black p-2 ">Nome</td>
                <td className="border-2 border-black p-2">Descrição</td>
                <td className="border-2 border-black p-2">Preço</td>
                <td className="border-2 border-black p-2">Data</td>
                <td className="border-2 border-black p-2">Categoria</td>
                <td className="border-2 border-black p-2 ">Ações</td>
              </tr>
            </thead>
            {/* Corpo da tabela */}
            <tbody>
              {/* Se gastos for 0 */}
              {gastos.length === 0 ? (
                <tr>
                  <td
                    className="border-2 p-2 text-center font-bold"
                    colSpan={6}
                  >
                    Nenhum gasto cadastrado
                  </td>
                </tr>
              ) : (
                gastos.map((gasto) => {
                  {
                    /* Preço formatado */
                  }
                  const precoGastoFormatado = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(gasto.preco);
                  /* Data formatada */
                  const dataFormatada = new Date(gasto.data).toLocaleString(
                    "pt-BR"
                  );
                  return (
                    <tr
                      key={gasto.id}
                      className="odd:bg-slate-200 even:bg-slate-300 border-2"
                    >
                      <td className="border-2 p-2">{gasto.nome}</td>
                      <td className="border-2 p-2">
                        {gasto.descricao || "Sem descrição"}
                      </td>
                      <td className="border-2 p-2">{precoGastoFormatado}</td>
                      <td className="border-2 p-2">{dataFormatada}</td>
                      <td className="border-2 p-2"></td>
                      <td className="border-2 p-2">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            title="Deletar gasto"
                            onClick={() => deletarGasto(gasto.id)}
                          >
                            <FaTrash className="text-red-600 hover:text-red-900 transition-all duration-300 cursor-pointer" />
                          </button>
                          <button title="Editar gasto">
                            <FaEdit className="text-blue-600 hover:text-blue-900 transition-all duration-300 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ListarGastos;
