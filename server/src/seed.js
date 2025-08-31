// Importa o prisma
import prisma from "../prisma/prisma.js";

// Função pra criar as categorias
async function main() {
  // Array de objetos com os nomes das categorias vinda do enum
  const categorias = [
    { nome: "ALIMENTACAO" },
    { nome: "MORADIA" },
    { nome: "TRANSPORTE" },
    { nome: "SAUDE" },
    { nome: "EDUCACAO" },
    { nome: "LAZER" },
    { nome: "ROUPAS" },
    { nome: "SERVICOS" },
    { nome: "OUTROS" },
  ];

  // Laço for para percorrer todas as categorias do array
  for (const categoria of categorias) {
    // prisma upsert: cria o registro se não existir, ou atualiza se já existir
    await prisma.categoria.upsert({
      // Condição para checar se a categoria existe
      where: { nome: categoria.nome },
      // Se existir, não vamos atualizar nada (objeto vazio)
      update: {},
      // Se não existir, cria com os dados passados
      create: categoria,
    });
  }
}

// Função que executa a main e trata erros
async function runSeed() {
  try {
    // Executa a função principal que cria as categorias
    await main();
    console.log("Categorias criadas com sucesso!");
    // Sai do processo Node.js com código 0 (sucesso)
    process.exit(0);
  } catch (error) {
    // Se tiver erro, mostra uma mensagem no console
    console.error("Erro ao criar categorias:", error);
    // Sai do processo Node.js com código 1 (erro)
    process.exit(1);
  }
}

runSeed();
