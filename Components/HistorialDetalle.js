import { StyleSheet, Text } from "react-native"
import { useRoute } from '@react-navigation/native';
import { View } from "react-native";
import TextoDetalle from "./componentes/TextoDetalle";

const HistorialDetalle = () => {
    const route = useRoute();
    const { data } = route.params;
    return (
        <View style={styles.container}>
            <TextoDetalle titulo="N° cita" texto={data.numero} />
            <TextoDetalle titulo="Doctor" texto={data.doctor} />
            <TextoDetalle titulo="Paciente" texto={data.paciente} />
            <TextoDetalle titulo="Completa" texto={data.completa} />
            <TextoDetalle titulo="Fecha" texto={data.fecha} />
            <TextoDetalle titulo="Hora" texto={data.hora} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginTop: 25,
    }
})
export default HistorialDetalle