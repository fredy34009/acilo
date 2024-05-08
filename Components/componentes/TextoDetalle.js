import { StyleSheet, Text, View } from "react-native"

const TextoDetalle = (props) => {
    return (
        <View style={styles.contenido}>
            <Text style={styles.texto}>{props.titulo} : </Text>
            <Text style={styles.texto2}>{props.texto}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    texto2: {
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
    ,texto: {
        paddingHorizontal: 25,
        fontSize: 16,
        fontWeight: 'bold'
    },
    contenido: {
        flexDirection: 'row'
    }
})
export default TextoDetalle