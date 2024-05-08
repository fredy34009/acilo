import { StyleSheet, Pressable,Text} from "react-native";

const Boton = (props) => {
    return (
        <Pressable
            style={styles.button}
            onPress={props.navigation}>
            <Text style={styles.textStyle} >{props.texto}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 75,
        elevation: 2,
        width: 'auto',
        backgroundColor: 'blue',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
export default Boton