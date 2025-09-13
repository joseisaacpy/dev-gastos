// Hooks
import { useState, useEffect } from "react";
// Card
import Card from "../../Components/Card";
// Loader
import Loader from "../../Components/Loader";

const Dashboard = () => {
  // Estado para controlar loader
  const [loader, setLoader] = useState(true);

  // Estados para armazenar os dados da api
  const [gastos, setGastos] = useState([]);
  const [receitas, setReceitas] = useState([]);

  // Valor de totais
  const totalGastado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(
    gastos.reduce((acumulador, gasto) => {
      return acumulador + gasto.preco;
    }, 0)
  );

  const totalRecebido = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(
    receitas.reduce((acumulador, receita) => {
      return acumulador + receita.valor;
    }, 0)
  );

  //   Quantidades
  const quantidadeGastos = gastos.length;
  const quantidadeReceitas = receitas.length;

  // Função de consumir API
  const consumirApi = async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const [resGastos, resReceitas] = await Promise.all([
        fetch(`${baseURL}/api/gastos`),
        fetch(`${baseURL}/api/receitas`),
      ]);
      const dataGasto = await resGastos.json();
      const dataReceita = await resReceitas.json();
      setGastos(dataGasto);
      setReceitas(dataReceita);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  // Chama função de consumir ao carregar tela
  useEffect(() => {
    consumirApi();
    document.title = "Dashboard"; // Muda o title
  }, []);

  // Se loader for true, mostra loader
  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <section className="px-4 py-2">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">Seu Dashboard</h1>
        {/* Div de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card
            imagemUrl={
              "https://images.pexels.com/photos/5466788/pexels-photo-5466788.jpeg"
            }
            nomeCartao={"Quantidade de Gastos"}
            valor={quantidadeGastos}
            tipo={"gasto"}
          />
          <Card
            imagemUrl={
              "https://images.pexels.com/photos/5466788/pexels-photo-5466788.jpeg"
            }
            nomeCartao={"Quantidade de Receitas"}
            valor={quantidadeReceitas}
            tipo={"receita"}
          />
          <Card
            imagemUrl={
              "https://images.pexels.com/photos/5466788/pexels-photo-5466788.jpeg"
            }
            nomeCartao={"Valor total gasto"}
            valor={totalGastado}
            tipo={"gasto"}
          />
          <Card
            imagemUrl={
              "https://images.pexels.com/photos/5466788/pexels-photo-5466788.jpeg"
            }
            nomeCartao={"Valor total recebido"}
            valor={totalRecebido}
            tipo={"receita"}
          />
        </div>
      </section>
    </>
  );
};
export default Dashboard;
