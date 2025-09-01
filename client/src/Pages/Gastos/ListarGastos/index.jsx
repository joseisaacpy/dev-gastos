// Importa o loader
import Loader from "../../../Components/Loader";

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
