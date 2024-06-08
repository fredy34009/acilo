
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { getDoctoresForSelect, getPacientesForSelect, nuevaCita, updateCita } from "../api/Services";
import ModalFecha from "./componentes/ModalFecha";
import ModalHora from "./componentes/ModalHora";
import { useRoute } from '@react-navigation/native';

const EditarCita = () => {

    const route = useRoute();
    const { data } = route.params;
    const [numero, setNumero] = useState('' + data.numero);
    useEffect(() => {
        async function fethData() {
            setDoctores(await getDoctoresForSelect());
        }
        fethData();
    }, [])
    const [paciente, setPaciente] = useState('');
    const [doctores, setDoctores] = useState([]);
    const [doctor, setDoctor] = useState(null);
    const [fecha, setFecha] = useState(''+data.fecha);
    const [hora, setHora] = useState(''+data.hora);


    const vaciar = () => {
        setPaciente(null)
        setDoctor(null),
        setFecha('')
        setHora('')
    }
    const registrar = async () => {
        if (doctor === '' || doctor===null|| fecha === '' || hora === '' || numero < 0) {
            Alert.alert('Error llena todos los campos')
        }
        else {
            const Cita = {
                'id':data.id,
                'id_paciente': data.id_paciente,
                'id_doctor': doctor,
                'fecha': fecha,
                'hora': hora,
                'completa': 'No',
                'numero': numero,
            }
            const respuesta = await updateCita(data.id,Cita);
            if (respuesta.estado === 200) {
                Alert.alert('Cita Actualizada\npara: ' + fecha + ' \t' + hora);
            }
            else {
                Alert.alert('Error al crear la cita')
            }
        }
    }
    const [show1, setShow1] = useState(false);
    const [showHora1, setShowHora1] = useState(false);
    const mostrarPickerFechaEdit = () => {
        setShow1(true);
    }
    const ocultarPickerFechaEdit = (dato) => {
        setFecha(dato)
        setShow1(false);
    }
    const mostrarPickerHoraEdit = () => {
        setShowHora1(true);
    }
    const ocultarPickerHoraEdit = (dato) => {
        setHora(dato)
        setShowHora1(false);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textoPrincipal}>Editar Cita</Text>
            <Text style={styles.textStyle}>Numero de cita</Text>
            <TextInput style={styles.input} name="numero" id="numero" value={numero} readOnly={true} />
            <Text style={styles.textStyle}>paciente</Text>
            <TextInput style={styles.input} name="paciente" id="paciente" value={data.paciente} readOnly={true} />
            <Text style={styles.textStyle}>Seleccione el doctor</Text>
            <SelectList
                setSelected={(val) => setDoctor(val)}
                data={doctores}
                placeholder="Seleccione una opcion"
                searchPlaceholder="Buscar doctor"
            />
            <Text style={styles.textStyle}>Fecha de cita</Text>
            <TouchableOpacity onPress={() => mostrarPickerFechaEdit()}><Text>Seleccionar fecha</Text></TouchableOpacity>
            <TextInput style={styles.input} value={fecha} onPressIn={() => mostrarPickerFechaEdit()} name="fecha" placeholder="Fecha de la cita" />
            {show1 &&
                (
                    <ModalFecha change={(dato) => ocultarPickerFechaEdit(dato)} modalVisible={show1} cancelar={() => setShow1(false)} />
                )}
            <Text style={styles.textStyle}>Hora</Text>
            <TextInput style={styles.input} value={hora} onPressIn={(e) => mostrarPickerHoraEdit(e)} name="hora" placeholder="Hora de la cita" />
            {showHora1 &&
                (
                    <ModalHora change={(hora) => ocultarPickerHoraEdit(hora)} modalVisible={showHora1} cancelar={() => setShowHora1(false)} />
                )}
            <TouchableOpacity style={styles.button} onPress={() => registrar()}>
                <Text style={styles.textStyleButton}>Actualizar</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingHorizontal: 10,
            marginTop: 25
        },
        input: {
            backgroundColor: 'gray',
            borderRadius: 8,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            paddingTop: 8,
            flexDirection: 'row',
            alignContent: 'center',
            color: 'white',
            padding: 8
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
        }, textoPrincipal:
        {
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18
        }
    })
export default EditarCita
