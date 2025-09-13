// Importa o loader
import Loader from "../../Components/Loader";
// Importa icons
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
// Importa toast
import { toast } from "react-toastify";

// Importa hooks
import { useState, useEffect } from "react";
const ListarReceitas = () => {
  // Estado para armazenar receitas
  const [receitas, setreceitas] = useState([]);
  // Estado para controlar o Loader
  const [loading, setLoading] = useState(true);

  // Função para consumir API de receitas
  const pegarDados = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/receitas`;
      const request = await fetch(url);
      const response = await request.json();
      setreceitas(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // Função para deletar um receita
  const deletarReceita = async (id) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/receitas/${id}`;
      console.log(id);
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar receita");
      }
      const data = await response.json();
      toast.success(data.msg);
      console.log(data.msg);
      // Chama função para atualizar os receitas
      pegarDados();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar receita");
    }
  };

  //   useEffect para mudar titulo e chamar função
  useEffect(() => {
    document.title = "Suas receitas";
    pegarDados();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <section className="flex items-center justify-center ">
        <div className="overflow-x-auto mt-3 sm:mt-5 md:mt-8 rounded-md border shadow-md shadow-primary-dark">
          {/* Tabela */}
          <table className="min-w-full">
            {/* Cabeçalho da tabela */}
            <thead className="bg-primary-dark text-white font-bold">
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
              {/* Se receitas for 0 */}
              {receitas.length === 0 ? (
                <tr>
                  <td
                    className="border-2 p-2 text-center font-bold"
                    colSpan={6}
                  >
                    Nenhuma receita cadastrada
                  </td>
                </tr>
              ) : (
                receitas.map((receita) => {
                  {
                    /* Preço formatado */
                  }
                  const precoReceitaFormatado = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(receita.valor);
                  /* Data formatada */
                  const dataFormatada = new Date(receita.data).toLocaleString(
                    "pt-BR"
                  );
                  return (
                    <tr
                      key={receita.id}
                      className="odd:bg-slate-200 even:bg-slate-300 border-2 hover:bg-slate-50 transition-all duration-300"
                    >
                      <td className="border-2 p-2">{receita.nome}</td>
                      <td className="border-2 p-2">
                        {receita.descricao || "Sem descrição"}
                      </td>
                      <td className="border-2 p-2">{precoReceitaFormatado}</td>
                      <td className="border-2 p-2">{dataFormatada}</td>
                      <td className="border-2 p-2">{receita.categoria}</td>
                      <td className="border-2 p-2">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            title="Deletar receita"
                            onClick={() => deletarReceita(receita.id)}
                          >
                            <FaTrash className="text-red-600 hover:text-red-900 transition-all duration-300 cursor-pointer" />
                          </button>
                          <button title="Editar receita">
                            <FaEdit className="text-blue-600 hover:text-blue-900 transition-all duration-300 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
              <tr className="">
                <td
                  colSpan={6}
                  className="p-1 bg-primary-dark text-white border-2 border-black font-bold text-center"
                >
                  {receitas.length} Receitas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ListarReceitas;
