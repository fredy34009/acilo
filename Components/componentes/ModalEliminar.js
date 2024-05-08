import { StyleSheet, Pressable, Text, Modal, View } from "react-native";

const ModalEliminar = (props) => {
    return (
        <Modal style={styles.colorFondo}
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={props.cancelar}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Seguro que Deseas eliminar este registro</Text>
                    <View style={styles.modalButton}>
                        <Pressable style={styles.buttonModalCancelar} onPress={props.cancelar}>
                            <Text>Cancelar</Text>
                        </Pressable>
                        <Pressable style={styles.buttonModalConfirmar} onPress={props.confirmar}>
                            <Text>Confirmar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        marginHorizontal: 25,
        elevation: 2,
        width: 'auto',
        backgroundColor: 'blue',
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
    }, buttonModalCancelar: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 6,
        margin: 5,
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }
    , buttonModalConfirmar: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 6,
        margin: 5,
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }
});
export default ModalEliminar