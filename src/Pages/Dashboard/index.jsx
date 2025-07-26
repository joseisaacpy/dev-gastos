import { useState, useEffect } from "react";
import { db } from "../../Firebase/connect";
import { getDocs, collection } from "firebase/firestore";
import Loader from "../../Components/Loader";
import { FaRegMoneyBillAlt, FaRegFileAlt } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie } from "react-chartjs-2";

const Dashboard = () => {
  // Estado pra armazenar os gastos
  const [gastos, setGastos] = useState([]);
  // Estado pra armazenar o status do loader
  const [loading, setLoading] = useState(true);
  //   Função pra carregar os gastos
  const getGastos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gastos"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setGastos(data);
    } catch (error) {
      console.log(error);
    } finally {
      // Para de carregar
      setLoading(false);
    }
  };

  // Chama a função de buscar dados com useEffect
  useEffect(() => {
    document.title = "Dashboard";
    getGastos();
  });

  // Total de gastos
  const totalGastos = gastos.reduce(
    (total, gasto) => total + Number(gasto.valor),
    0
  );
  //   Agrupa por categoria
  const categorias = {};
  gastos.forEach((g) => {
    categorias[g.categoria] = (categorias[g.categoria] || 0) + Number(g.valor);
  });

  //   Função pra montar o gráfico
  const chartData = {
    labels: Object.keys(categorias),
    datasets: [
      {
        data: Object.values(categorias),
        backgroundColor: [
          "#60A5FA",
          "#F87171",
          "#34D399",
          "#FBBF24",
          "#A78BFA",
          "#F472B6",
          "#4ADE80",
        ],
      },
    ],
  };

  /* Renderiza o dashboard */
  if (loading) {
    return <Loader />;
  }
  {
    return (
      <section className="bg-slate-300 min-h-screen p-4">
        <div className="p-4 flex flex-col gap-4 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white shadow p-4 rounded-md">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Total de Gastos <FaRegMoneyBillAlt />
              </h2>
              <p className="text-2xl text-blue-600 font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalGastos)}
              </p>
            </div>
            <div className="bg-white shadow p-4 rounded-md">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Número de registros <FaRegFileAlt />
              </h2>
              <p className="text-2xl text-blue-600 font-bold">
                {gastos.length}
              </p>
            </div>
          </div>

          <div className="bg-white shadow p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Gastos por Categoria</h2>
            <div className="w-full max-w-[400px] mx-auto">
              <Pie data={chartData} />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Dashboard;
