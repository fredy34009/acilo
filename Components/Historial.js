
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import BotonBuscar from "./componentes/BotonBuscar";
import { getHistorial, getHistorialByNombresOrNumero } from "../api/Services";

const Historial = ({ navigation }) => {

    useEffect(() => {
        async function fethData() {
            const historialData = await getHistorial();
            setHistorial(historialData);
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
    const [historial, setHistorial] = useState([])
    const [cita, setCita] = useState([])
    //Metodo para refrescar la pagina principal
    const refresh = async () => {
        setHistorial(await getHistorial());
    }
    const buscarCitaHistorial = async () => {
        setHistorial(await getHistorialByNombresOrNumero(cita));
    }
    return (
        <View style={styles.container}>
            <BotonBuscar texto="Buscar" input={e => setCita(e)} placeholder="Buscar Paciente" buscar={() => buscarCitaHistorial()} refresh={() => refresh()} />
            <Text>Historial Citas Completas</Text>
            <View style={styles.header}>
                <Text style={styles.cell} >N° Cita</Text>
                <Text style={styles.cell} >Doctor</Text>
                <Text style={styles.cell} >Paciente</Text>
                <Text style={styles.cell} >Accion</Text>
            </View>
            <FlatList data={historial} renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.cell}>{item.numero}</Text>
                    <Text style={styles.cell}>{item.doctor}</Text>
                    <Text style={styles.cell}>{item.paciente}</Text>
                    <View style={styles.botonesAccion}>
                        <Pressable
                            style={styles.buttonedit}
                            onPress={() => navigation.navigate('Detalles',{data:item})}>
                            <Icon name="eye" type="font-awesome" />
                        </Pressable>
                    </View>
                </View>
            )} keyExtractor={item => item.id} />
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
export default Historial