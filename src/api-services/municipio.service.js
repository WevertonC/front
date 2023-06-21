import Axios from 'axios'
const RESOURCE_NAME = '/municipiosibge'
export default {
  consultarPorCodigoMunicipio(codigoMunicipio) {
    return Axios.get(`${RESOURCE_NAME + '/consultarporcodigomunicipio'}/${codigoMunicipio}`)
  }
}