import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import BarraNav from './Components/BarraNav';
import SplashScreen from './Components/SplashScreen';

const stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <BarraNav />
    </NavigationContainer>
  );
}
