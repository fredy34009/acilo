import axios from "axios";
const API = " https://apiacilofinal2.fly.dev"
//const API = "http://192.168.1.145:3000"
const APi_URL = API + "/paciente/";
const APi_URL_DOCTOR = API + "/doctor/";
const APi_URL_CITAS = API + "/citas/";
const APi_URL_USUARIO = API + "/usuario/";

//servicios
//obtiene todos los registros de la base de datos
export const getPacientes = async () => {
    const response = await axios.get(APi_URL + 'ver')
    console.log(response);
    return response.data;
}
export const getDoctores = async () => {
    const response = await axios.get(APi_URL_DOCTOR + 'ver')
    console.log(response.status);
    return response.data;
}
export const getCitas = async () => {
    const response = await axios.get(APi_URL_CITAS + 'ver')
    console.log('citas ' + response);
    return response.data;
}
export const getPacientesNombre = async (paciente) => {
    const response = await axios.get(APi_URL + 'buscar?usuario=' + paciente + '%')
    console.log('datos filtrados ' + response.data)
    console.log('datos url ' + APi_URL + 'buscar?usuario=' + paciente)
    return response.data;
}
export const getDocotoresNombre = async (doctor) => {
    const response = await axios.get(APi_URL_DOCTOR + 'buscar?usuario=' + doctor + '%')
    console.log('datos filtrados ' + response.data)
    console.log('datos url ' + APi_URL_DOCTOR + 'buscar?usuario=' + doctor)
    return response.data;
}
export const getCitasByNumero = async (numero) => {
    const response = await axios.get(APi_URL_CITAS + 'buscar?usuario=' + numero + '%')
    console.log('datos filtrados ' + response.data)
    console.log('datos url ' + APi_URL_CITAS + 'buscar?usuario=' + numero)
    return response.data;
}
//retorna una lista para el select
export const getPacientesForSelect = async () => {
    const response = await axios.get(APi_URL + 'ver')
    let newArray = response.data.map((item) => {
        return { key: item.id, value: item.nombres + ' ' + item.apellidos }
    })
    console.log('pacientes data :' + newArray)
    return newArray;
}
export const getDoctoresForSelect = async () => {
    const response = await axios.get(APi_URL_DOCTOR + 'ver')
    let newArray = response.data.map((item) => {
        return { key: item.id, value: item.nombres + ' ' + item.apellidos }
    })
    return newArray;
}
//crea un nuevo registro en la base de datos
export const nuevoPaciente = async (o) => {
    const response = await axios.post(APi_URL + 'crear', o)
    console.log(response.data)
    return response.data;
}
export const nuevoDoctor = async (o) => {
    const response = await axios.post(APi_URL_DOCTOR + 'crear', o)
    console.log('Crear doctor')
    console.log(response.data)
    return response.data;
}
export const nuevaCita = async (o) => {
    const response = await axios.post(APi_URL_CITAS + 'crear', o)
    return response.data;
}

//Metodo de eliminar un registro de la base de datos
export const eliminarPaciente = async id => {
    const response = await axios.delete(APi_URL + 'eliminar/' + id)
    console.log(response.data)
    return response.data;
}
export const eliminarDoctor = async id => {
    const response = await axios.delete(APi_URL_DOCTOR + 'eliminar/' + id)
    return response.data;
}
export const eliminarCita = async id => {
    const response = await axios.delete(APi_URL_CITAS + 'eliminar/' + id)
    return response.data;
}

//Metodos de actualizar
export const confirmarCita = async id => {
    const response = await axios.put(APi_URL_CITAS + 'completar/' + id)
    return response.data;
}
export const updateDoctor = async (id, o) => {
    const response = await axios.put(APi_URL_DOCTOR + 'editar/' + id, o)
    console.log(response.data);
    return response.data;
}
export const updatePaciente = async (id, o) => {
    const response = await axios.put(APi_URL + 'editar/' + id, o)
    console.log(response.data);
    return response.data;
}
export const updateCita = async (id, o) => {
    const response = await axios.put(APi_URL_CITAS + 'editar/' + id, o)
    console.log(response.data);
    return response.data;
}
//Metodos ver Historial 
export const getHistorial = async () => {
    const response = await axios.get(API + '/historial/ver')
    return response.data;
}
export const getHistorialByNombresOrNumero = async (dato) => {
    const response = await axios.get(API + '/historial/buscar?dato=' + dato + '%')
    return response.data;
}

//Metodo registrar usuario
export const nuevoUsuario = async (o) => {
    const response = await axios.post(APi_URL_USUARIO + 'crear', o)
    return response.data;
}

//Metodo de iniciar session por login
export const nuevoLogin = async (o) => {
    const response = await axios.post(APi_URL_USUARIO + 'login', o)
    return response.data;
}

