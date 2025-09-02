// Importa o loader
import Loader from "../../../Components/Loader";
// Importa icons
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

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
      alert(data.msg);
      console.log(data.msg);
      // Chama função para atualizar os gastos
      pegarGastos();
    } catch (error) {
      console.log(error);
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
      <table className="border">
        <thead>
          <tr>
            <td className="border-2 p-2">Nome</td>
            <td className="border-2 p-2">Descrição</td>
            <td className="border-2 p-2">Preço</td>
            <td className="border-2 p-2">Data</td>
            <td className="border-2 p-2">Categoria</td>
            <td className="border-2 p-2">Ações</td>
          </tr>
        </thead>
        <tbody>
          {gastos.length === 0 ? (
            <tr>
              <td className="border-2 p-2 text-center" colSpan={5}>
                Nenhum gasto cadastrado
              </td>
            </tr>
          ) : (
            gastos.map((gasto) => {
              return (
                <tr key={gasto.id} className="border-2">
                  <td className="border-2 p-2">{gasto.nome}</td>
                  <td className="border-2 p-2">{gasto.descricao}</td>
                  <td className="border-2 p-2">{gasto.preco}</td>
                  <td className="border-2 p-2">{gasto.data}</td>
                  <td className="border-2 p-2">{gasto.nome}</td>
                  <td className="border-2 p-2">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => deletarGasto(gasto.id)}>
                        <FaTrash />
                      </button>
                      <button>
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default ListarGastos;
