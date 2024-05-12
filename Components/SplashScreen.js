import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function SplashScreen({ navigation }) {
    useEffect(() => {
        async function inicia() {
            setTimeout(() => {
                navigation.replace('Iniciar Session');
            }, 5000);
        }
        inicia();
    });
    return (
        <View style={style.splash}>
            <Text style={style.texto}> "Bienvenido a Acilo Santa Ana"</Text>
            <Text style={style.texto}>Espere...</Text>
        </View>
    );
}
const style = StyleSheet.create({
    splash: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center'
    },
    texto: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25
    }
})

export default SplashScreen