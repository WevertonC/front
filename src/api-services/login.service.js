import Axios from 'axios'
const RESOURCE_NAME = '/login'
export default {
  autenticar(data) {
    return Axios.post(RESOURCE_NAME + '/autenticar', data)
  },
  perfilDoUsuario() {
    return Axios.get(RESOURCE_NAME + '/perfildousuario')
  },
}