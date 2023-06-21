import Axios from 'axios'
const RESOURCE_NAME = '/sulprog'
export default {
  consultarApi() {
    return Axios.get(RESOURCE_NAME + '/consultarapi')
  }
}