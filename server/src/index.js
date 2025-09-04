// Imports
import express from "express";
import cors from "cors";
import gastosRoutes from "./routes/gastos.routes.js";
import receitasRoutes from "./routes/receitas.routes.js";

// Contantes
const app = express();
const port = 3000;

// Middlewares
app.use(express.json()); // Aceitar JSON
app.use(express.urlencoded({ extended: true })); // Aceitar dados do corpo da requisição
app.use(cors());
app.use("/api/gastos", gastosRoutes); // Faz com que todas as rotas começem com /api/gastos
app.use("/api/receitas", receitasRoutes); // Faz com que todas as rotas começem com /api/gastos

// Rotas
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Ouvinte
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
