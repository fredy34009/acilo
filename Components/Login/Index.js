import { useState } from "react"
import { StyleSheet, Text, TextInput, View, Pressable, Alert, TouchableOpacity } from "react-native"
import { nuevoLogin } from "../../api/Services";

const Index = ({ navigation }) => {

    const [usuario, setUsuario] = useState('');
    const [pass, setPass] = useState('');

    const login = async () => {
        const Usuario = {
            usuario: usuario,
            pass: pass
        }
        const respuesta = await nuevoLogin(Usuario).then(function (response) {
            console.log('Respuesta ',response)
            if(response.length > 0)
                {
                    navigation.navigate('Menu');
                }
                else{
                    Alert.alert('Error usuario no valido')
                }
        }).catch((error )=>{
            Alert.alert('Ha ocurido un Error');
        });
    }
    return (
        <View style={style.content}>
            <View style={style.banner}>
                <Text style={style.title}>Acilo Santa Ana</Text>
            </View>
            <View>
                <Text style={style.title2} >Usuario</Text>
                <TextInput style={style.input} name="usuario" placeholder="Ingrese su usuario" onChangeText={(e) => setUsuario(e)} />
            </View>
            <View>
                <Text style={style.title2} >Contraseña</Text>
                <TextInput style={style.input} secureTextEntry={true} name="pass" placeholder="Ingrese su contraseña" onChangeText={(e) => setPass(e)} />
            </View>
            <TouchableOpacity
                style={style.button}
                onPress={() => login()}>
                <Text style={style.textStyle}>Ingresar</Text>
            </TouchableOpacity>
            <Pressable
                style={style.buttonGoogle}
                onPress={() => navigation.navigate('Menu')}>
                <Text style={style.textStyle}>Login With Google</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Registrar')}>
                <Text style={style.textStyleUnderline}>Registrar</Text>
            </Pressable>
        </View>

    )
}
const style = StyleSheet.create({
    content: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
    },
    title: {
        padding: 25,
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        borderRadius: 10,
        textAlign: 'center',
    },
    title2: {
        margin: 15,
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        borderRadius: 10,
    },
    input: {
        padding: 5,
        backgroundColor: "gray",
        borderRadius: 20,
        width: 200,
        color: 'white'
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: 'green'
    }, buttonGoogle:
    {
        marginTop: 25,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: 'red'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    textStyleUnderline: {
        marginTop: 25,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
    , banner:
    {
        backgroundColor: 'gray',
        marginHorizontal: 75,
        marginTop: 75
    }
})
export default Index