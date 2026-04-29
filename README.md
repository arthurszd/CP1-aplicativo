# 🔬 FIAP Labs — Reserva de Laboratórios

> **Checkpoint 2** — Cross-Platform Application Development
> FIAP · Ciência da Computação · 2º Ano

---

## 👨‍💻 Equipe

| Nome | Responsabilidade | RM |
|------|------------------|----|
| Arthur de Souza Mtos Dias | UI & Componentes | RM566068 |
| Guilherme Carreri Giampietro | Navegação & Lógica | RM565676 |

---

## 🎥 Demonstração

<div align="center">

| Login | Lista de Labs |
|-------|---------------|
| ![Login](https://github.com/user-attachments/assets/e493a944-8132-4802-9b8a-41e010daf5e5) | ![Lista de Labs](https://github.com/user-attachments/assets/fca4457c-5756-42e6-8526-a34c8a90aac4) |

</div>

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

> Escaneie o QR Code com o **Expo Go** (Android/iOS) ou pressione `a` para abrir no emulador Android.

---

## 📱 Telas

| # | Tela | Arquivo | Descrição |
|---|------|---------|-----------|
| 1 | Login | `screens/LoginScreen.js` | E-mail e senha com validação em tempo real |
| 2 | Cadastro | `screens/RegisterScreen.js` | Criação de conta com confirmação de senha |
| 3 | Home | `screens/HomeScreen.js` | Dashboard com acesso rápido às seções |
| 4 | Lista de Labs | `app/labs/index.tsx` | Cards com status, horários e busca |
| 5 | Reservar | `app/labs/reservar.tsx` | Formulário com formatação automática |
| 6 | Confirmação | `app/labs/sucesso.tsx` | Resumo da reserva concluída |
| 7 | Minhas Reservas | `app/minhas-reservas.tsx` | Gerenciamento e cancelamento |

---

## 🆕 Novidades do CP2

### 🔐 Autenticação completa
- Login por **e-mail e senha** (substituiu o RM do aluno)
- Tela de **cadastro** com validação de nome, e-mail, senha e confirmação
- **Sessão persistente** via AsyncStorage — usuário continua logado ao reabrir o app
- **Logout** acessível direto da Home

### 🧠 AuthContext
- `context/AuthContext.js` centraliza `login`, `register`, `logout` e restauração de sessão
- Hook `useAuth()` consumido por todas as telas que precisam do usuário autenticado

### 🎨 Melhorias de UX
- **Busca e filtro em tempo real** na lista de laboratórios
- **Formatação automática** de data (`DD/MM/AAAA`) e horário (`HH:MM`) no formulário de reserva
- **Tela de confirmação** com resumo completo após reserva concluída
- **Loading spinner** e `KeyboardAvoidingView` em todos os formulários
- Mensagem de erro inline por campo

### 💾 Persistência de reservas
- Reservas salvas com `AsyncStorage` via `ReservasContext` — sobrevivem ao fechamento do app

---

## 🧩 Hooks e Contextos

| Hook / Contexto | Arquivo(s) | Finalidade |
|-----------------|------------|------------|
| `useState` | Todas as telas | Formulários, loading, erros, busca |
| `useEffect` | `AuthContext`, `ReservasContext`, `labs/index.tsx` | Carregamento de sessão, reservas e dados |
| `useContext` via `useAuth` | `LoginScreen`, `RegisterScreen`, `HomeScreen` | Usuário autenticado e ações de auth |
| `useContext` via `useReservas` | `labs/reservar.tsx`, `minhas-reservas.tsx` | Estado global de reservas persistido |
| `createContext` | `AuthContext.js`, `ReservasContext.tsx` | Provedores de contexto global |
| `useRouter` | `labs/index.tsx`, `labs/reservar.tsx` | Navegação programática |
| `useLocalSearchParams` | `labs/reservar.tsx` | Recebe `id` e `name` do lab via rota |

---

## 🗂️ Estrutura de Pastas

```
CP1-aplicativo/
├── App.js                          ← Entry point — switch entre Login / Register / Home
│
├── app/                            ← Telas gerenciadas pelo Expo Router
│   ├── _layout.tsx                 ← Stack Navigator
│   ├── minhas-reservas.tsx         ← Gerenciamento de reservas
│   └── labs/
│       ├── index.tsx               ← Lista de labs com busca em tempo real
│       ├── reservar.tsx            ← Formulário de reserva
│       └── sucesso.tsx             ← Tela de confirmação
│
├── screens/                        ← Telas do fluxo de autenticação
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   └── HomeScreen.js
│
├── context/
│   ├── AuthContext.js              ← login, register, logout, sessão
│   └── ReservasContext.tsx         ← Estado global de reservas + AsyncStorage
│
├── services/
│   ├── auth.js                     ← registerUser, loginUser, getSession
│   ├── storage.js                  ← Wrapper AsyncStorage
│   └── items.js                    ← CRUD genérico de itens
│
├── components/
│   ├── Button.tsx                  ← Botão (primary / secondary / danger)
│   ├── LabCard.tsx                 ← Card de laboratório
│   └── ReservaItem.tsx             ← Item de reserva com cancelamento
│
└── constants/
    └── styles.ts                   ← Paleta de cores global
```

---

## ⚙️ Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React Native + Expo | ~52 | Base do app mobile |
| Expo Router | v4 | Navegação file-based nas telas de labs |
| TypeScript | — | Tipagem estática em componentes e contextos |
| React Context API | — | Estado global (auth + reservas) |
| AsyncStorage | — | Persistência local de sessão e reservas |
