import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { getSession } from './services/auth';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  useEffect(() => {
    verificarSessao();
  }, []);

  const verificarSessao = async () => {
    const resultado = await getSession();
    if (resultado.success && resultado.session) {
      setCurrentScreen('home');
    }
  };

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onGoToRegister={() => navigate('register')}
            onGoToHome={() => navigate('home')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onGoToLogin={() => navigate('login')}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onLogout={() => navigate('login')}
          />
        );
      default:
        return <LoginScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
    </View>
  );
}
