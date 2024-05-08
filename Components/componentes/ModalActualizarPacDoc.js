import { StyleSheet, Pressable, Text, Modal, View, TextInput, TouchableOpacity } from "react-native";
import FormularioRegistro from "../FormularioRegistro";
import { useState } from "react";
import ModalFecha from "./ModalFecha";

const ModalActualizarPacDoc = (props) => {
    const [show, setShow] = useState(false);
    const mostrarPickerFecha = () => {
        setShow(true);
    }
    const ocultarPickerFecha = (dato) => {
        props.nacimiento(dato)
        setShow(false);
    }
    return (
        <Modal style={styles.colorFondo}
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={
                props.cancelar}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{props.titulo}</Text>
                    <View>
                        <Text style={styles.textStyle}>Nombres</Text>
                        <TextInput style={styles.input} value={props.valueNombres} name="nombres" onChangeText={props.nombres} placeholder="Ingrese sus Nombres" />
                        <Text style={styles.textStyle}>Apellidos</Text>
                        <TextInput style={styles.input} value={props.valueApellidos} name="apellidos" onChangeText={props.apellidos} placeholder="Ingrese sus Apellidos" />
                        <Text style={styles.textStyle}>N° DUI</Text>
                        <TextInput style={styles.input} value={props.valueDui} onChangeText={props.dui} name="dui" placeholder="N° DUI" />
                        <Text style={styles.textStyle}>Direccion</Text>
                        <TextInput style={styles.input} value={props.valueDireccion} onChangeText={props.direccion} name="direccion" placeholder="Direccion" />
                        <Text style={styles.textStyle}>Fecha de nacimiento</Text>
                        <TextInput style={styles.input} value={props.valueNacimiento} onChangeText={props.nacimiento} onPressIn={() => mostrarPickerFecha()} name="nacimiento" placeholder="Fecha de Nacimiento" />
                        <Text style={styles.textStyle}>Fecha de Registro</Text>
                        <TextInput style={styles.input} readOnly={true} value={props.valueRegistro} name="registro" placeholder="Fecha de registro" />
                    </View>
                    <View style={styles.modalButton}>
                        <Pressable style={styles.buttonModalCancelar} onPress={props.cancelar}>
                            <Text style={styles.textStyleButton}>Cancelar</Text>
                        </Pressable>
                        <Pressable style={styles.buttonModalConfirmar} onPress={props.onPress}>
                            <Text style={styles.textStyleButton}>Actualizar</Text>
                        </Pressable>
                        {show &&
                            (
                                <ModalFecha change={(dato) => ocultarPickerFecha(dato)} modalVisible={show} cancelar={() => setShow(false)} />
                            )}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
    }, buttonModalCancelar: {
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 6,
        margin: 5,
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    }
    , buttonModalConfirmar: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 6,
        margin: 5,
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
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
});
export default ModalActualizarPacDoc