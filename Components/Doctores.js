
import { useEffect, useState } from "react";
import { Alert, Pressable } from "react-native";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Boton from "./componentes/Boton";
import BotonBuscar from "./componentes/BotonBuscar";
import { eliminarDoctor, getDoctores, updateDoctor } from "../api/Services";
import ModalEliminar from "./componentes/ModalEliminar";
import ModalActualizarPacDoc from "./componentes/ModalActualizarPacDoc";

const Doctores = ({ navigation }) => {
    useEffect(() => {
        async function fethData() {
            const doctoresData = await getDoctores();
            setDoctores(doctoresData);
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
    //contiene la lista de doctores almacenados
    const [doctores, setDoctores] = useState([]);
    const [doctor, setDoctor] = useState('');

    //variables para la edicion de un doctor
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [dui, setDui] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacimiento, setNacimiento] = useState('');
    const [registro, setRegistro] = useState('')

    //Id del doctor a eliminar
    const [id, setId] = useState();
    //variables para controlar los modales de eliminar y editar
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    //Abre el modal Eliminar un registro
    const modalConfirmarEliminar = (id) => {
        setModalEliminar(true);
        setId(id)
    }

    //Eliminar un registro
    const eliminar = async (id) => {
        await eliminarDoctor(id);
        setDoctores(await getDoctores());
        Alert.alert('Registro eliminado');
        setModalEliminar(false)
        setId();
    }
    //Metodo de buscar un paciente
    const buscarPacienteNombre = async () => {
        setPacientes(await getPacientesNombre(paciente));
    }
    //Metodo para refrescar la pagina principal
    const refresh = async () => {
        setDoctores(await getDoctores());
    }

    const editarDoctor = (item) => {
        setId('' + item.id)
        setNombres(item.nombres)
        setApellidos(item.apellidos)
        setDui(item.dui)
        setDireccion(item.direccion)
        setRegistro(item.registro)
        setNacimiento(item.nacimiento)
        setModalVisible(true)
    }
    const actualizarDoctor = async () => {
        const Data =
        {
            nombres: nombres,
            apellidos: apellidos,
            dui: dui,
            direccion: direccion,
            nacimiento: nacimiento,
            registro: registro
        }
        const doc = await updateDoctor(id, Data);
        Alert.alert('Registro actualizado');
        refresh();
        setModalVisible(false)
    }
    return (
        <View style={styles.container} >
            <Boton texto="Nuevo Doctor" navigation={() => navigation.navigate('Nuevo Doctor')} />
            <BotonBuscar texto="Buscar Doctor" input={e => setDoctor(e)} placeholder="Nombre del doctor" buscar={() => buscarPacienteNombre()} refresh={() => refresh()} />

            <Text>Doctores</Text>
            <View style={styles.header}>
                <Text style={styles.cell} >Nombres</Text>
                <Text style={styles.cell} >Apellidos</Text>
                <Text style={styles.cell} >Acciones</Text>
            </View>
            <FlatList data={doctores} renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.cell}>{item.nombres}</Text>
                    <Text style={styles.cell}>{item.apellidos}</Text>
                    <View style={styles.botonesAccion}>
                        <TouchableOpacity
                            style={[styles.buttondelete]}
                            onPress={() => modalConfirmarEliminar(item.id)}>
                            <Icon name="delete" type="material" />
                        </TouchableOpacity>
                        <Pressable
                            style={[styles.buttonedit]}
                            onPress={() => editarDoctor(item)}>
                            <Icon name="edit" type="material" />
                        </Pressable>
                    </View>
                </View>
            )} keyExtractor={item => item.id} />
            <ModalActualizarPacDoc
                onPress={() => { actualizarDoctor() }}
                modalVisible={modalVisible}
                cancelar={() => setModalVisible(false)} titulo="Editar Doctor"
                nombres={e => setNombres(e)}
                apellidos={e => setApellidos(e)}
                dui={e => setDui(e)}
                direccion={e => setDireccion(e)}
                nacimiento={e => setNacimiento(e)}

                valueNombres={nombres}
                valueApellidos={apellidos}
                valueDui={dui}
                valueDireccion={direccion}
                valueNacimiento={nacimiento}
                valueRegistro={registro}
            />
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
    buttonedit: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 6,
        elevation: 2,
    },
    botonesAccion: {
        flexDirection: 'row',
        paddingHorizontal: 3,
        marginHorizontal: 1
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
        flex: 1
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
    }, buttonModal: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 6,
        margin: 15,
        width: 50,
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }
});
export default Doctores