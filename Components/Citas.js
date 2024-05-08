
import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, TouchableOpacity, Alert, Modal } from "react-native";
import { Icon } from "react-native-elements";
import Boton from "./componentes/Boton";
import BotonBuscar from "./componentes/BotonBuscar";
import { confirmarCita, eliminarCita, getCitas, getCitasByNumero } from "../api/Services";
import ModalEliminar from "./componentes/ModalEliminar";

const Citas = ({ navigation }) => {
    useEffect(() => {
        async function fethData() {
            const citasData = await getCitas();
            setCitas(citasData);
        }
        fethData();
        //crea el boton de salir de la app
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Text onPress={() => navigation.navigate('Iniciar Sesion')} >SALIR
                        <Icon name="logout" type="material" />
                    </Text>
                )
            }
        })
    }, [])
    //Lista de citas activas  sin finalizar
    const [citas, setCitas] = useState([]);
    const [cita, setCita] = useState('');

    //Id de la cita a eliminar
    const [id, setId] = useState();

    //variables para controlar los modales de eliminar y editar
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [idCita, setIdCita] = useState('');

    //Muestra el modal de Eliminar un registro
    const modalConfirmarEliminar = (id) => {
        setModalEliminar(true);
        setId(id)
    }

    //elimina un registro de la base de datos
    const eliminar = async (id) => {
        const respuesta = await eliminarCita(id);
        if (respuesta.estado === 200) {
            setCitas(await getCitas());
            setModalEliminar(false)
            Alert.alert('Registro eliminado');
        }
        else {
            Alert.alert('Ha ocurrido un error');
        }
    }
    //Metodo de buscar un paciente
    const buscarCitaByNumero = async () => {
        const citass = await getCitasByNumero(cita)
        if (citass.length > 0) {
            setCitas(await getCitasByNumero(cita));
        } else {
            Alert.alert('No hay resultados')
        }

    }
    //Metodo para refrescar la pagina principal
    const refresh = async () => {
        setCitas(await getCitas());
    }
    //comletar una cita
    const completarCita = () => {
        setModalVisible(false)
        confirmarCita(idCita);
        refresh()
    }
    const mostrarModal = (idCita) => {
        setModalVisible(true)
        setIdCita(idCita)
    }
    return (
        <View style={styles.container} >
            <Boton texto="Agendar Cita" navigation={() => navigation.navigate('Agendar Cita')} />
            <BotonBuscar texto="Numero de Cita" input={e => setCita(e)} placeholder="N° de Cita" buscar={() => buscarCitaByNumero()} refresh={() => refresh()} />
            <Text>Citas</Text>
            <View style={styles.header}>
                <Text style={styles.cell} >N° Cita</Text>
                <Text style={styles.cell} >Doctor</Text>
                <Text style={styles.cell} >Paciente</Text>
                <Text style={styles.cell} >Acciones</Text>
            </View>
            <FlatList data={citas} renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.cell}>{item.numero}</Text>
                    <Text style={styles.cell}>{item.doctor}</Text>
                    <Text style={styles.cell}>{item.paciente}</Text>
                    <View style={styles.botonesAccion}>
                        <TouchableOpacity
                            style={styles.buttondelete}
                            onPress={() => modalConfirmarEliminar(item.id)}>
                            <Icon name="delete" type="material" />
                        </TouchableOpacity>
                        <Pressable
                            style={styles.buttonedit}
                            onPress={() => navigation.navigate('Nuevo Doctor')}>
                            <Icon name="edit" type="material" />
                        </Pressable>
                    </View>
                    <View style={styles.botonesAccion}>
                        <Pressable
                            style={styles.buttonedit}
                            onPress={() => navigation.navigate('Detalles', { data: item })}>
                            <Icon name="eye" type="font-awesome" />
                        </Pressable>
                        <Pressable
                            style={styles.buttonedit}
                            onPress={() => mostrarModal(item.id)}>
                            <Icon name="check" type="font-awesome" />
                        </Pressable>
                    </View>
                </View>
            )} keyExtractor={item => item.id} />
            <Modal style={styles.colorFondo}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Completar esta Cita</Text>
                        <View style={styles.modalButton}>
                            <Pressable style={styles.buttonModal} onPress={() => setModalVisible(false)}>
                                <Text>No</Text>
                            </Pressable>
                            <Pressable style={styles.buttonModal} onPress={() => completarCita()}>
                                <Text>Si</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <ModalEliminar modalVisible={modalEliminar} cancelar={() => setModalEliminar(false)} confirmar={() => eliminar(id)} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 25
    },
    buttondelete: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 6,
        elevation: 2,
    },
    buttonModal: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 6,
        margin: 15,
        width: 50,
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    buttonedit: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 6,
        elevation: 2,
    },
    botonesAccion: {
        flexDirection: 'column',
        marginHorizontal: 1,
        columnGap: 2
    }
    //Para la tabla
    , header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 2,
        marginVertical: 3,
        elevation: 1,
        borderRadius: 3,
        borderColor: '#fff',
        padding: 10,
        backgroundColor: '#fff'
    }
    , cell: {
        textAlign: 'left',
        flex: 1,
        padding: 1
    }, centeredView: {
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
    }
})
export default Citas