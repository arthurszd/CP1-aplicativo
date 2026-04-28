import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

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
