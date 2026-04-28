import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen(props) {
  return (
    <View>
      <Text>Home Screen</Text>

      <TouchableOpacity onPress={props.onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
