import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Pressable, Alert, FlatList,TouchableOpacity } from "react-native";
import { getPacientes, eliminarPaciente, getPacientesNombre, updatePaciente, } from "../api/Services";
import { Icon } from "react-native-elements";
import Boton from "./componentes/Boton";
import BotonBuscar from "./componentes/BotonBuscar";
import ModalEliminar from "./componentes/ModalEliminar";
import ModalActualizarPacDoc from "./componentes/ModalActualizarPacDoc";

const Pacientes = ({ navigation }) => {
    //Use efecct para cargar la informacion por primera vez
    useEffect(() => {
        async function fethData() {
            const pacientesData = await getPacientes();
            console.log(pacientesData)
            setPacientes(pacientesData);
        }
        fethData();
        //crea el boton de salir de la app
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Text onPress={() => navigation.navigate('Iniciar Session')} >SALIR
                        <Icon name="logout" type="material" />
                    </Text>
                )
            }
        })
    }, [])

    //Almacena todos los pacientes registrados
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState('');

    //Variables de los campos de editar un paciente
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [dui, setDui] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacimiento, setNacimiento] = useState('');
    const [registro, setRegistro] = useState('');

    //Id del paciente a eliminar
    const [id, setId] = useState()
    //variables para controlar los modales de eliminar y editar
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    //Eliminar un registro
    const modalConfirmarEliminar = (id) => {
        setModalEliminar(true);
        setId(id)
    }
    const eliminar = async (id) => {
        const eliminar = await eliminarPaciente(id);
        if (eliminar.estado === 200) {
            setPacientes(await getPacientes());
            Alert.alert('Registro eliminado');
        }
        else {
            Alert.alert('Error al eliminar registro');
        }
        setModalEliminar(false);
        setId();
    }
    //Metodo de buscar un paciente
    const buscarPacienteNombre = async () => {
        console.log(paciente)
        setPacientes(await getPacientesNombre(paciente));
    }
    //Metodo para refrescar la pagina principal
    const refresh = async () => {
        setPacientes(await getPacientes());
    }
    const editarPaciente = (item) => {
        setId(item.id)
        setNombres(item.nombres)
        setApellidos(item.apellidos)
        setDui(item.dui)
        setDireccion(item.direccion)
        setRegistro(item.registro)
        setNacimiento(item.nacimiento)
        setModalVisible(true)
    }
    const actualizarPaciente = async () => {
        const Data =
        {
            nombres: nombres,
            apellidos: apellidos,
            dui: dui,
            direccion: direccion,
            nacimiento: nacimiento,
            registro: registro
        }
        const doc = await updatePaciente(id, Data);
        if (doc.estado=== 200) {
            Alert.alert('Registro actualizado');
            refresh();
            setModalVisible(false)
        }
        else{
            Alert.alert('Ha ocurrido un error '+doc);
            setModalVisible(false)
        }

    }
    return (
        <View style={styles.container} >
            <Boton texto="Nuevo Paciente" navigation={() => navigation.navigate('Nuevo Paciente')} />
            <BotonBuscar texto="Buscar Paciente" input={e => setPaciente(e)} placeholder="Nombre del paciente" buscar={() => buscarPacienteNombre()} refresh={() => refresh()} />

            <Text>Pacientes</Text>
            <View style={styles.header}>
                <Text style={styles.cell} >Nombres</Text>
                <Text style={styles.cell} >Apellidos</Text>
                <Text style={styles.cell} >Acciones</Text>
            </View>
            <FlatList data={pacientes} renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.cell}>{item.nombres}</Text>
                    <Text style={styles.cell}>{item.apellidos}</Text>
                    <View style={styles.botonesAccion}>
                        <TouchableOpacity
                            style={styles.buttondelete}
                            onPress={() => modalConfirmarEliminar(item.id)}>
                            <Icon name="delete" type="material" />
                        </TouchableOpacity>
                        <Pressable
                            style={styles.buttonedit}
                            onPress={() => editarPaciente(item)}>
                            <Icon name="edit" type="material" />
                        </Pressable>
                    </View>
                </View>
            )} keyExtractor={item => item.id} />
            <ModalActualizarPacDoc
                onPress={() => { actualizarPaciente() }}
                modalVisible={modalVisible}
                cancelar={() => setModalVisible(false)} titulo="Editar Paciente"
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
    }
});
export default Pacientes