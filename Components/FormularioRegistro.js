
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import ModalFecha from "./componentes/ModalFecha";

const FormularioRegistro = (props) => {
    const [show, setShow] = useState(false);
    const mostrarPickerFecha = () => {
        setShow(true);
    }
    const ocultarPickerFecha = (dato) => {
        props.nacimiento(dato)
        setShow(false);
    }
    return (
        <View>
            <Text style={styles.textStyle}>Nombres</Text>
            <TextInput style={styles.input} value={props.valuenombres} name="nombres" onChangeText={props.nombres} placeholder="Ingrese sus Nombres" />
            <Text style={styles.textStyle}>Apellidos</Text>
            <TextInput style={styles.input} value={props.valueApellidos} name="apellidos" onChangeText={props.apellidos} placeholder="Ingrese sus Apellidos" />
            <Text style={styles.textStyle}>N° DUI</Text>
            <TextInput style={styles.input} value={props.valueDui} onChangeText={props.dui} name="dui" placeholder="N° DUI" />
            <Text style={styles.textStyle}>Direccion</Text>
            <TextInput style={styles.input} value={props.valueDireccion} onChangeText={props.direccion} name="direccion" placeholder="Direccion" />
            <Text style={styles.textStyle}>Fecha de nacimiento</Text>
            <TextInput style={styles.input} value={props.valueNacimiento} onChangeText={props.nacimiento} onPressIn={() => mostrarPickerFecha()} name="nacimiento" placeholder="Fecha de Nacimiento" />
            <Text style={styles.textStyle}>Fecha de Registro</Text>
            <TextInput style={styles.input} readOnly={true} value={props.registro} name="registro" placeholder="Fecha de registro" />
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Text style={styles.textStyleButton}>{props.textoBoton}</Text>
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
            marginHorizontal: 75,
            elevation: 3,
            width: 'auto',
            backgroundColor: 'blue'
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
export default FormularioRegistro