// Hooks
import { useState, useEffect } from "react";
// Card
import Card from "../../Components/Card";
// Loader
import Loader from "../../Components/Loader";

const Dashboard = () => {
  // Estado para controlar loader
  const [loader, setLoader] = useState(true);

  // Estado para armazenar os dados da api
  const [gastos, setGastos] = useState([]);

  // Valor total
  const totalGastado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(
    gastos.reduce((acumulador, gasto) => {
      return acumulador + gasto.preco;
    }, 0)
  );
  //   Quantidade
  const quantidadeGastos = gastos.length;

  // Função de consumir API
  const consumirApi = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/gastos`;
      const response = await fetch(url);
      const data = await response.json();
      setGastos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  //
  useEffect(() => {
    consumirApi();
    document.title = "Dashboard";
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <section className="px-4 py-2">
        <h1 className="text-3xl font-bold mb-3">Seu Dashboard</h1>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card nomeCartao={"Quantidade de Gastos"} valor={quantidadeGastos} />
          <Card nomeCartao={"Valor total gasto"} valor={totalGastado} />
          <Card nomeCartao={"Oi"} valor={"oi"} />
        </div>
      </section>
    </>
  );
};
export default Dashboard;
