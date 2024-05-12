
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { getDoctoresForSelect, getPacientesForSelect, nuevaCita } from "../api/Services";
import ModalFecha from "./componentes/ModalFecha";
import ModalHora from "./componentes/ModalHora";

const NuevaCita = () => {
    useEffect(() => {
        async function fethData() {
            setPacientes(await getPacientesForSelect());
            setDoctores(await getDoctoresForSelect());
        }
        fethData();
        generateRandomNumber()
    }, [])

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState(null);
    const [doctores, setDoctores] = useState([]);
    const [doctor, setDoctor] = useState(null);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [numero, setNumero] = useState('');

    const vaciar = () => {
        setPaciente(null)
        setDoctor(null),
        setFecha('')
        setHora('')
        generateRandomNumber();
    }

    //Genera un numero random para la cita
    const generateRandomNumber = () => {
        const min = 100;
        const max = 999999999;
        const randomNumber =
            Math.floor(Math.random() * (max - min + 1)) + min;
        setNumero('' + randomNumber)
        console.log('Numero ' + numero)
    };

    const registrar = async () => {
        if (doctor === '' || paciente === '' || fecha === '' || hora === '' || numero < 0) {
            Alert.alert('Error llena todos los campos')
        }
        else {
            const Cita = {
                'id_paciente': paciente,
                'id_doctor': doctor,
                'fecha': fecha,
                'hora': hora,
                'completa': 'No',
                'numero': numero,
            }
            const respuesta = await nuevaCita(Cita);
            if (respuesta.estado === 200) {
                Alert.alert('Cita creada\npara: ' + fecha + ' \t' + hora);
                vaciar();
            }
            else {
                Alert.alert('Error al crear la cita')
            }
        }
    }
    const [show, setShow] = useState(false);
    const [showHora, setShowHora] = useState(false);
    const mostrarPickerFecha = () => {
        setShow(true);
    }
    const ocultarPickerFecha = (dato) => {
        setFecha(dato)
        setShow(false);
    }
    const mostrarPickerHora = () => {
        setShowHora(true);
    }
    const ocultarPickerHora = (dato) => {
        setHora(dato)
        setShowHora(false);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textoPrincipal}>Agendar Cita</Text>
            <Text style={styles.textStyle}>Numero de cita</Text>
            <TextInput style={styles.input} name="numero" id="numero" value={numero} readOnly={true} />
            <Text style={styles.textStyle}>Seleccione el paciente</Text>
            <SelectList
                setSelected={(val) => setPaciente(val)}
                data={pacientes}
                placeholder="Seleccione una opcion"
                searchPlaceholder="Buscar paciente"
            />
            <Text style={styles.textStyle}>Seleccione el doctor</Text>
            <SelectList
                setSelected={(val) => setDoctor(val)}
                data={doctores}
                placeholder="Seleccione una opcion"
                searchPlaceholder="Buscar doctor"
            />
            <Text style={styles.textStyle}>Fecha de cita</Text>
            <TouchableOpacity onPress={() => mostrarPickerFecha()}><Text>Seleccionar fecha</Text></TouchableOpacity>
            <TextInput style={styles.input} value={fecha} onPressIn={() => mostrarPickerFecha()} name="fecha" placeholder="Fecha de la cita" />
            {show &&
                (
                    <ModalFecha change={(dato) => ocultarPickerFecha(dato)} modalVisible={show} cancelar={() => setShow(false)} />
                )}
            <Text style={styles.textStyle}>Hora</Text>
            <TextInput style={styles.input} value={hora} onPressIn={() => mostrarPickerHora()} name="hora" placeholder="Hora de la cita" />
            {showHora &&
                (
                    <ModalHora change={(hora) => ocultarPickerHora(hora)} modalVisible={showHora} cancelar={() => setShowHora(false)} />
                )}
            <TouchableOpacity style={styles.button} onPress={() => registrar()}>
                <Text style={styles.textStyleButton}>Registrar</Text>
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
export default NuevaCita
