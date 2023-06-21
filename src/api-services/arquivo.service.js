import Axios from 'axios'
const RESOURCE_NAME = '/arquivo'
export default {
  listarCalendario(id) {
    return Axios.get(`${RESOURCE_NAME + '/listarcalendario'}/${id}`)
  }
}