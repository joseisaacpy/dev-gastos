import { useState, useEffect } from "react";
const ListarGastos = () => {
  // Estado para armazenar gastos
  const [gastos, setGastos] = useState([]);

  // Função para consumir API de gastos
  const pegarGastos = async () => {
    const url = `${import.meta.VITE_API_URL}/gastos`;
    const request = await fetch(url);
    const response = await request.json();
    setGastos(response);
  };

  //   useEffect para mudar titulo e chamar função
  useEffect(() => {
    document.title = "Seus Gastos";
    pegarGastos();
  }, []);
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
                  <td className="border-2 p-2">{gasto.categoria}</td>
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
