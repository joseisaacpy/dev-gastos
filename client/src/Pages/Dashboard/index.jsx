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

  // Estados para filtros
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

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

  // Função de filtro por data
  const filtrarPorData = (lista, campoData) => {
    return lista.filter((item) => {
      const dataItem = new Date(item[campoData]);
      const inicio = dataInicial ? new Date(dataInicial) : null;
      const fim = dataFinal ? new Date(dataFinal) : null;
      // Valida datas
      if (inicio && dataItem < inicio) return false;
      if (fim && dataItem > fim) return false;
      return true;
    });
  };

  // Aplica filtros
  const gastosFiltrados = filtrarPorData(gastos, "data");
  const receitasFiltradas = filtrarPorData(receitas, "data");

  // Cálculos
  const totalGastado = gastosFiltrados.reduce((acumulador, gasto) => {
    return acumulador + gasto.preco;
  }, 0);

  const totalRecebido = receitasFiltradas.reduce((acumulador, receita) => {
    return acumulador + receita.valor;
  }, 0);

  // Saldo (receitas - gastoss)
  const saldo = totalRecebido - totalGastado;

  // Função para formatar moeda
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  //   Quantidades
  const quantidadeGastos = gastosFiltrados.length;
  const quantidadeReceitas = receitasFiltradas.length;

  // Conteúdo principal
  return (
    <>
      <section className="px-4 py-2">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">Seu Dashboard</h1>
        {/* Div de inputs de filtro */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <div className="flex flex-col w-full md:w-auto">
            {/* Data inicial */}
            <label htmlFor="data-inicial" className="font-bold">
              Data inicial
            </label>
            <input
              type="date"
              name="data-inicial"
              id="data-inicial"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 transition-all"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
          </div>
          {/* Data final */}
          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="data-inicial" className="font-bold">
              Data final:
            </label>
            <input
              type="date"
              name="data-final"
              id="data-final"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 transition-all"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
        </div>
        {/* Div de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Card
            nomeCartao={"Quantidade de Gastos"}
            valor={quantidadeGastos}
            tipo={"gasto"}
          />
          <Card
            nomeCartao={"Quantidade de Receitas"}
            valor={quantidadeReceitas}
            tipo={"receita"}
          />
          <Card
            nomeCartao={"Valor total gasto"}
            valor={formatarMoeda(totalGastado)}
            tipo={"gasto"}
          />
          <Card
            nomeCartao={"Valor total recebido"}
            valor={formatarMoeda(totalRecebido)}
            tipo={"receita"}
          />
          <Card
            nomeCartao={"Saldo"}
            valor={formatarMoeda(saldo)}
            tipo={saldo < 0 ? "gasto" : "receita"}
          />
        </div>
      </section>
    </>
  );
};
export default Dashboard;
