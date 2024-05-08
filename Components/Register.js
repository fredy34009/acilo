
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { nuevoUsuario } from "../api/Services";
import moment from 'moment';
import ModalFecha from "./componentes/ModalFecha";

const Register = ({ navigation }) => {
    const formattedDate = moment(new Date()).format('YYYY/MM/DD')
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [usuario, setUsuario] = useState('');
    const [pass, setPass] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [registro, setRegistro] = useState('' + formattedDate);
    const [dui, setDui] = useState('');
    const [show, setShow] = useState(false);

    const mostrarPickerFecha = () => {
        setShow(true);
    }
    const ocultarPickerFecha = (dato) => {
        setNacimiento(dato)
        setShow(false);
    }
    const registrar = async () => {
        if (apellidos === "" || apellidos == null || nombres == "" || nombres == null
            || nacimiento == "" || nacimiento == null || pass == "" || pass == null) {
            Alert.alert('Error llena todos los campos');
        } else {
            const Usuario = {
                nombres: nombres,
                apellidos: apellidos,
                usuario: usuario,
                pass: pass,
                nacimiento: nacimiento,
                dui: dui,
                registro: registro
            }
            const respuesta = await nuevoUsuario(Usuario);
            if (respuesta.estado === 200) {
                Alert.alert('Registro completo')
            }
            else {
                Alert.alert('Error al registrar')
            }
        }
    }

    return (
        <View>
            <Text style={styles.textStyle}>Nombres</Text>
            <TextInput style={styles.input} name="nombres" onChangeText={e => setNombres(e)} placeholder="Ingrese sus Nombres" />
            <Text style={styles.textStyle}>Apellidos</Text>
            <TextInput style={styles.input} name="apellidos" onChangeText={e => setApellidos(e)} placeholder="Ingrese sus Apellidos" />
            <Text style={styles.textStyle}>Usuario</Text>
            <TextInput style={styles.input} p name="usuario" onChangeText={e => setUsuario(e)} placeholder="Ingrese un usuario" />
            <Text style={styles.textStyle}>Contraseña</Text>
            <TextInput style={styles.input} secureTextEntry={true} name="pass" onChangeText={e => setPass(e)} placeholder="Ingrese una contraseña" />
            <Text style={styles.textStyle}>Fecha de Nacimiento</Text>
            <TextInput style={styles.input} name="nacimiento" value={nacimiento}  onPressIn={()=>mostrarPickerFecha()} placeholder="Fecha de nacimiento" />
            <Text style={styles.textStyle}>N° DUI</Text>
            <TextInput style={styles.input} onChangeText={e => setDui(e)} name="dui" placeholder="N° DUI" />
            <Text style={styles.textStyle}>Fecha de Registro</Text>
            <TextInput style={styles.input} name="registro" value={registro} readOnly={true} placeholder="Fecha de nacimiento" />

            <TouchableOpacity style={styles.button} onPress={() => registrar()}>
                <Text style={styles.textStyleButton}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Iniciar Sesion')}>
                <Text style={styles.textStyleButton}>Iniciar</Text>
            </TouchableOpacity>
            {show &&
                (
                    <ModalFecha change={(dato) => ocultarPickerFecha(dato)} modalVisible={show} cancelar={() => setShow(false)} />
                )}
        </View>
    )
}
const styles = StyleSheet.create(
    {
        input: {
            backgroundColor: 'gray',
            borderRadius: 15,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            paddingTop: 8,
            flexDirection: 'row',
            alignContent: 'center',
            color: 'white'
        },
        button: {
            marginTop: 25,
            borderRadius: 15,
            padding: 10,
            marginHorizontal: 100,
            elevation: 3,
            width: 'auto',
            backgroundColor: 'green'
        },
        button2: {
            marginTop: 25,
            borderRadius: 15,
            padding: 10,
            marginHorizontal: 100,
            elevation: 3,
            width: 'auto',
            backgroundColor: 'black'
        },
        textStyleButton: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            alignContent: 'center'
        }
        ,
        textStyle: {
            color: 'black',
            fontWeight: 'bold',
            padding: 10
        }
    })
export default Register