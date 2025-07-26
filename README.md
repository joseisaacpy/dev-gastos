# 💸 ControleFácil - App de Controle de Gastos

Aplicação web simples para controle de gastos pessoais, desenvolvida com **React + Vite** e integrada ao **Firebase (Auth + Firestore)**.

---

## 🚀 Funcionalidades

- 🔐 Cadastro e login de usuários (Firebase Authentication)
- ➕ Adição de gastos com descrição, valor, categoria e data
- 📋 Listagem de gastos em tabela
- 📊 Página de dashboard (em construção/expansão)
- 🔒 Proteção de rotas para usuários autenticados

---

## 📁 Estrutura do Projeto

```bash
src/
├── assets/
│   └── fonts/
│       └── Poppins-Regular.ttf
├── Components/
│   ├── Footer/
│   ├── Header/
│   ├── LayoutHF/
│   └── Loader/
├── Firebase/
│   └── connect.js   #Configuração do Firebase
├── Pages/
│   ├── Dashboard/
│   ├── Error/
│   ├── Home/
│   ├── Login/
│   └── Register/
├── AllRoutes.jsx   #Gerenciamento das rotas
├── index.css
└── main.jsx        # Ponto de entrada da aplicação

Outros arquivos:
- vite.config.js
- eslint.config.js
- .gitignore
- index.html
- package.json
```

## 🛠️ Tecnologias
- React
- Vite
- Firebase (Auth + Firestore)
- React Router Dom
- TailwindCSS
- React Icons
- React Toastify