import { useEffect } from 'react';
import {Text, View } from 'react-native';

export default function SplashScreen({navigation}) {
    useEffect(() => {
        async function inicia() {
            setTimeout(() => {
                // Redirigir a la siguiente pantalla después de 5 segundos
                navigation.replace('Iniciar Session');
            }, 5000);
        }
        inicia();
    });
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text>
                "Pantalla de Bienvenida Acilo Santa Ana"
            </Text>
        </View>
    );

}