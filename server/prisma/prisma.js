// Importa o client do Prisma
import { PrismaClient } from "@prisma/client";
// Cria uma instância do client
const prisma = new PrismaClient();
// Exporta o client para ser usado em outros arquivos da aplicação
export default prisma;
