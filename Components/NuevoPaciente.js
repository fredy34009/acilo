import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import FormularioRegistro from "./FormularioRegistro";
import { nuevoPaciente } from "../api/Services";
import moment from 'moment';

const NuevoPaciente = () => {
    const formattedDate = moment(new Date()).format('YYYY/MM/DD'); // Formato deseado
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [dui, setDui] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacimiento, setNacimiento] = useState('');
    const [registro, setRegistro] = useState(''+formattedDate);

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
    const registrar =async () => {
        if (apellidos === "" || apellidos == null || nombres == "" || nombres == null
            || direccion == "" || direccion == null) {
            Alert.alert('Error llena todos los campos');
        }
        else {
            if (validarDui()) {
                const Paciente = {
                    nombres: nombres,
                    apellidos: apellidos,
                    dui: dui,
                    direccion: direccion,
                    registro:registro,
                    nacimiento:nacimiento
                }
                const x=await nuevoPaciente(Paciente);
                if(x.estado===200)
                {
                    vaciar();
                    Alert.alert('Paciente registrado')
                }
                else{
                    Alert.alert('Error '+x.estado)
                }
            } else{
                Alert.alert('Formato de DUI invalido\nEjemplo: 12345678-9')
            }
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.textoPrincipal}>Registrar un paciente</Text>
            <FormularioRegistro onPress={registrar}
                nombres={e => setNombres(e)}
                apellidos={e => setApellidos(e)}
                dui={e => setDui(e)}
                nacimiento={e=>setNacimiento(e)}
                direccion={e => setDireccion(e)}
                registro={registro}

                valuenombres={nombres}
                valueApellidos={apellidos}
                valueDui={dui}
                valueDireccion={direccion}
                valueNacimiento={nacimiento}
                textoBoton="Guardar"/>
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
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
})
export default NuevoPaciente