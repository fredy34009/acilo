import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { color } from "react-native-elements/dist/helpers";
import Doctores from "./Doctores";
import Citas from "./Citas";
import Historial from "./Historial";
import Pacientes from "./Pacientes"
import { createStackNavigator } from "@react-navigation/stack"
import NuevoPaciente from "./NuevoPaciente";
import NuevoDoctor from "./NuevoDoctor";
import NuevaCita from "./NuevaCita";
import Index from "./Login/Index";
import Register from "./Register";
import HistorialDetalle from "./HistorialDetalle";
import SplashScreen from "./SplashScreen";
import EditarCita from "./EditarCita";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BarraNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Iniciar Session" component={Index} />
            <Stack.Screen name="Menu" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Registrar" component={Register} />
            <Stack.Screen name="Nuevo Paciente" component={NuevoPaciente} />
            <Stack.Screen name="Nuevo Doctor" component={NuevoDoctor} />
            <Stack.Screen name="Agendar Cita" component={NuevaCita} />
            <Stack.Screen name="Editar Cita" component={EditarCita} />
            <Stack.Screen name="Detalles" component={HistorialDetalle} />
        </Stack.Navigator>
    )
}
function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Pacientes" component={Pacientes} options={{ tabBarIcon: () => (<Icon name="person" type="material" color={color} />) }}></Tab.Screen>
            <Tab.Screen name="Doctores" component={Doctores} options={{ tabBarIcon: () => (<Icon name="user-md" type="font-awesome" color={color} />) }}></Tab.Screen>
            <Tab.Screen name="Citas" component={Citas} options={{ tabBarIcon: () => (<Icon name="article" type="material" color={color} />) }}></Tab.Screen>
            <Tab.Screen name="Historial" component={Historial} options={{ tabBarIcon: () => (<Icon name="history" type="font-awesome" color={color} />) }}></Tab.Screen>
        </Tab.Navigator>
    );
}
export default BarraNav