import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import FormularioRegistro from "./FormularioRegistro";
import moment from 'moment';
import { nuevoDoctor } from "../api/Services";

const NuevoDoctor = () => {
    const formattedDate = moment(new Date()).format('YYYY/MM/DD'); // Formato deseado
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [dui, setDui] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacimiento, setNacimiento] = useState('');
    const [registro, setRegistro] = useState('' + formattedDate);

    const vaciar=()=>{
        setNombres('')
        setApellidos('')
        setDui('')
        setDireccion('')
        setNacimiento('')
    }
    //Validar dui
    const validarDui = () => {
        const duiRegex = /^\d{8}-\d$/;
        if (duiRegex.test(dui)) {
            return true
        } else {
            return false
        }
    };

    const registrar = async() => {
        if (apellidos === "" || apellidos == null || nombres == "" || nombres == null
            || direccion == "" || direccion == null || nacimiento==='') {
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
                const x=await nuevoDoctor(Doctor);
                if(x.estado===200)
                {
                    Alert.alert('Doctor registrado')
                    vaciar();
                }
                else{
                    Alert.alert('Error '+x.estado)
                }
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
                valuenombres={nombres}
                valueApellidos={apellidos}
                valueDui={dui}
                valueDireccion={direccion}
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
