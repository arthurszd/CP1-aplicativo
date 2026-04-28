import { saveData, getData } from './storage';

const USER_KEY = '@user_data';
const SESSION_KEY = '@userLogged';

// Feature 2: Cadastro de usuário
export const registerUser = async (nome, email, senha) => {
  try {
    const user = { nome, email, senha };
    await saveData(USER_KEY, user);
    return { success: true, message: 'Usuário cadastrado com sucesso', user };
  } catch (error) {
    return { success: false, message: 'Erro ao cadastrar usuário' };
  }
};

// Feature 3: Login e validação de credenciais
export const loginUser = async (email, senha) => {
  try {
    const user = await getData(USER_KEY);
    
    if (!user) {
      return { success: false, message: 'Usuário não encontrado' };
    }
    
    if (user.email === email && user.senha === senha) {
      await saveData(SESSION_KEY, user);
      return { success: true, message: 'Login realizado com sucesso', user };
    } else {
      return { success: false, message: 'Email ou senha incorretos' };
    }
  } catch (error) {
    return { success: false, message: 'Erro ao realizar login' };
  }
};

// Feature 4: Recuperar sessão
export const getSession = async () => {
  try {
    const session = await getData(SESSION_KEY);
    return { success: true, session };
  } catch (error) {
    return { success: false, message: 'Erro ao recuperar sessão' };
  }
};
