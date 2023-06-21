import Axios from 'axios'
const RESOURCE_NAME = '/empresa'
export default {
  listarCombo() {
    return Axios.get(RESOURCE_NAME + '/listarcombo')
  }
}