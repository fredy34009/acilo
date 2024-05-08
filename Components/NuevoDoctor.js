import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import FormularioRegistro from "./FormularioRegistro";
import moment from 'moment';
import { nuevoDoctor } from "../api/Services";

const NuevoDoctor = ({ navigation }) => {
    const formattedDate = moment(new Date()).format('YYYY/MM/DD'); // Formato deseado
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [dui, setDui] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacimiento, setNacimiento] = useState('');
    const [registro, setRegistro] = useState('' + formattedDate);
    //Validar dui
    //Validar dui
    const validarDui = () => {
        const duiRegex = /^\d{8}-\d$/;
        if (duiRegex.test(dui)) {
            return true
        } else {
            return false
        }
    };
    //invertir fecha 
    function invertirCadena(cad) {
        var separarCadena = cad.split("");
        var invertirArreglo = separarCadena.reverse();
        var unirArreglo = invertirArreglo.join("");
        console.log(unirArreglo)
        return unirArreglo;
    }
    const registrar = async() => {
        if (apellidos === "" || apellidos == null || nombres == "" || nombres == null
            || direccion == "" || direccion == null) {
            Alert.alert('Error llena todos los campos');
        }
        else {
            if (validarDui()) {

                const Doctor = {
                    nombres: nombres,
                    apellidos: apellidos,
                    dui: dui,
                    direccion: direccion,
                    registro: registro,
                    nacimiento: nacimiento
                }
                await nuevoDoctor(Doctor);
                console.log(Doctor);
            } else {
                Alert.alert('Formato de DUI invalido\nEjemplo: 12345678-9')
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textoPrincipal}>Registrar un Doctor</Text>
            <FormularioRegistro onPress={registrar}
                nombres={e => setNombres(e)}
                apellidos={e => setApellidos(e)}
                dui={e => setDui(e)}
                direccion={e => setDireccion(e)}
                nacimiento={e => setNacimiento(e)}
                valueNacimiento={nacimiento}
                registro={registro}
                textoBoton="Guardar" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 25
    }, textoPrincipal:
    {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    }
})
export default NuevoDoctor
