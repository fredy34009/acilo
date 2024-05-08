import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BarraNav from './Components/BarraNav';

const stack=createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <BarraNav />
    </NavigationContainer>
  );
}
