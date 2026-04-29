# 🔬 FIAP Labs — Reserva de Laboratórios

> Checkpoint 2 — Cross-Platform Application Development | FIAP · Ciência da Computação 2º Ano

---

## 👨‍💻 Membros

| Membro | Papel | RM |
|--------|-------|----|
| Arthur de Souza Mtos Dias | UI & Componentes | RM566068 |
| Guilherme Carreri Giampietro | Navegação & Lógica | RM565676 |

---

## 🚀 Como Executar

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Entre na pasta do projeto
cd CP1-aplicativo

# 3. Instale as dependências
npm install

# 4. Inicie o projeto
npx expo start
```

Após iniciar, escaneie o QR Code com o app **Expo Go** (Android/iOS) ou pressione `a` para abrir no emulador Android.

---

## 📱 Telas

| Tela | Arquivo | Descrição |
|------|---------|-----------|
| Login | `screens/LoginScreen.js` | Entrada com e-mail e senha, validação em tempo real |
| Cadastro | `screens/RegisterScreen.js` | Criação de conta com nome, e-mail, senha e confirmação |
| Home | `screens/HomeScreen.js` | Dashboard com acesso a Laboratórios e Minhas Reservas |
| Lista de Labs | `app/labs/index.tsx` | Cards com status, horários e busca em tempo real |
| Reservar | `app/labs/reservar.tsx` | Formulário de reserva com formatação automática de data/hora |
| Confirmação | `app/labs/sucesso.tsx` | Tela de sucesso exibida após reserva concluída |
| Minhas Reservas | `app/minhas-reservas.tsx` | Reservas ativas com opção de cancelamento |

---

## 🆕 O que mudou no CP2

### Autenticação completa
- Login por **e-mail e senha** (substituiu o RM do aluno)
- Tela de **cadastro de usuário** com validação de todos os campos
- **Persistência de sessão** via AsyncStorage — usuário continua logado ao reabrir o app
- **Logout** disponível na tela Home

### AuthContext
- Novo `context/AuthContext.js` centraliza login, register, logout e carregamento de sessão
- Todas as telas consomem `useAuth()` para acessar o usuário autenticado e as ações de autenticação

### Melhorias de UX
- **Busca e filtro em tempo real** na lista de laboratórios
- **Formatação automática** de data (`DD/MM/AAAA`) e horário (`HH:MM`) no formulário de reserva
- **Tela de sucesso** exibida após reserva concluída com resumo dos dados
- **Loading spinner** e `KeyboardAvoidingView` em todos os formulários
- Validação inline com mensagem de erro por campo

### Persistência de reservas
- Reservas salvas com `AsyncStorage` via `ReservasContext` — sobrevivem ao fechamento do app

---

## 🧩 Hooks e Contextos

| Hook / Contexto | Onde | Para quê |
|-----------------|------|----------|
| `useState` | Todas as telas | Formulários, loading, erros, busca |
| `useEffect` | `AuthContext`, `ReservasContext`, `labs/index.tsx` | Carregamento de sessão, reservas e dados |
| `useContext` (via `useAuth`) | `LoginScreen`, `RegisterScreen`, `HomeScreen` | Acesso ao usuário e ações de autenticação |
| `useContext` (via `useReservas`) | `labs/reservar.tsx`, `minhas-reservas.tsx` | Estado global de reservas persistido |
| `createContext` | `AuthContext.js`, `ReservasContext.tsx` | Contextos globais com Provider |
| `useRouter` | `labs/index.tsx`, `labs/reservar.tsx` | Navegação programática entre telas |
| `useLocalSearchParams` | `labs/reservar.tsx` | Recebe `id` e `name` do lab selecionado |

---

## 🗂️ Estrutura de Pastas

```
CP1-aplicativo/
├── App.js                        ← Entry point com navegação por switch (Login/Register/Home)
├── app/
│   ├── _layout.tsx               ← Stack Navigator (Expo Router)
│   ├── minhas-reservas.tsx       ← Minhas Reservas
│   └── labs/
│       ├── index.tsx             ← Lista de Laboratórios com busca
│       ├── reservar.tsx          ← Formulário de Reserva
│       └── sucesso.tsx           ← Tela de confirmação de reserva
├── screens/
│   ├── LoginScreen.js            ← Login com e-mail e senha
│   ├── RegisterScreen.js         ← Cadastro de usuário
│   └── HomeScreen.js             ← Dashboard principal
├── context/
│   ├── AuthContext.js            ← Autenticação (login, register, logout, sessão)
│   └── ReservasContext.tsx       ← Estado global de reservas persistido
├── services/
│   ├── auth.js                   ← registerUser, loginUser, getSession
│   ├── storage.js                ← Wrapper AsyncStorage (saveData, getData, removeData)
│   └── items.js                  ← CRUD genérico de itens (getItems, addItem, removeItem)
├── components/
│   ├── Button.tsx                ← Botão reutilizável (primary/secondary/danger)
│   ├── LabCard.tsx               ← Card de laboratório
│   └── ReservaItem.tsx           ← Item de reserva com cancelamento
└── constants/
    └── styles.ts                 ← Paleta de cores global
```

---

## ⚙️ Tecnologias

- **React Native** + **Expo** (~52)
- **Expo Router** v4 — Navegação file-based nas telas de labs
- **TypeScript** — Tipagem estática nos componentes e contextos
- **React Context API** — Gerenciamento de estado global (auth + reservas)
- **AsyncStorage** — Persistência local de sessão e reservas
