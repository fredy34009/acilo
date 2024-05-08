import { StyleSheet, Text,View,TextInput,TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";

const BotonBuscar = (props) => {
    return (
        <View style={styles.buscarMain}>
            <Text style={styles.centrarTexto}>{props.texto}</Text>
            <View style={styles.buscarInput}>
                <TextInput onChangeText={props.input} style={styles.inputBuscar} placeholder={props.placeholder} />
                <TouchableOpacity
                    style={styles.buttonedit}
                    onPress={props.buscar}>
                    <Icon name="search" type="material" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonedit}
                    onPress={props.refresh}>
                    <Icon name="autorenew" type="material" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    //classes para buscar un pciente
    buscarMain: {
        paddingTop: 25,
        paddingBottom: 25,

    },
    inputBuscar: {
        borderRadius: 15,
        backgroundColor: 'gray',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1
    },
    centrarTexto: {
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16
    }
    , buscarInput: {
        flexDirection: 'row',
        marginHorizontal: 1,
        paddingHorizontal: 3,
    },
    buttonedit: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 6,
        elevation: 2,
    }
});
export default BotonBuscar