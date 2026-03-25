# 🔬 FIAP Labs — Reserva de Laboratórios

> Checkpoint 1 — Cross-Platform Application Development | FIAP · Ciência da Computação 2º Ano

---

## 👨‍💻 Membros

| Membro | Papel | RM |
|--------|-------|----|
| [Nome do Membro 1] | UI & Componentes | RM[XXXXX] |
| [Nome do Membro 2] | Navegação & Lógica | RM[XXXXX] |

---

## 🎥 Demonstração

> Adicionar aqui o GIF/Vídeo de demonstração do aplicativo rodando.

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

| Tela | Rota | Descrição |
|------|------|-----------|
| Login | `/` | Entrada com RM do aluno |
| Lista de Labs | `/labs` | Cards com status e horários |
| Reservar | `/labs/reservar` | Formulário de reserva com validação |
| Minhas Reservas | `/minhas-reservas` | Reservas ativas com cancelamento |

---

## 🧩 Hooks Utilizados

| Hook | Onde | Para quê |
|------|------|----------|
| `useState` | Todas as telas | Controle de formulários, loading, cancelamento |
| `useEffect` | `labs/index.tsx` | Simula carregamento de dados com `setTimeout` |
| `useRouter` | `index.tsx`, `labs/index.tsx`, `labs/reservar.tsx` | Navegação programática entre telas |
| `useLocalSearchParams` | `labs/reservar.tsx` | Recebe `id` e `name` do lab selecionado |
| `useContext` (via `useReservas`) | `labs/reservar.tsx`, `minhas-reservas.tsx` | Estado global de reservas compartilhado |
| `createContext` | `context/ReservasContext.tsx` | Contexto de reservas com Provider |

---

## 🗂️ Estrutura de Pastas

```
CP1-aplicativo/
├── app/
│   ├── _layout.tsx           ← Stack Navigator (Expo Router)
│   ├── index.tsx             ← Tela de Login
│   ├── minhas-reservas.tsx   ← Minhas Reservas
│   └── labs/
│       ├── index.tsx         ← Lista de Laboratórios
│       └── reservar.tsx      ← Formulário de Reserva
├── components/
│   ├── Button.tsx
│   ├── LabCard.tsx
│   └── ReservaItem.tsx
├── constants/
│   └── styles.ts             ← Paleta de cores global
└── context/
    └── ReservasContext.tsx   ← Estado global de reservas
```

---

## ⚙️ Tecnologias

- **React Native** + **Expo** (~52)
- **Expo Router** v4 — Navegação file-based
- **TypeScript** — Tipagem estática
- **React Context API** — Gerenciamento de estado global
