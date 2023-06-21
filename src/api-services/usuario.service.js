import Axios from 'axios'
const RESOURCE_NAME = '/usuario'
export default {
  consultar(id) {
    return Axios.get(`${RESOURCE_NAME + '/consultar'}/${id}`)
  }
}