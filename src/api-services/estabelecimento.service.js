import Axios from 'axios'
const RESOURCE_NAME = '/estabelecimento'
export default {
  listar(props) {
    return Axios.post(RESOURCE_NAME + '/listar', props)
  },
  consultar(id) {
    return Axios.get(`${RESOURCE_NAME + '/consultar'}/${id}`)
  },
  inserir(data) {
    return Axios.post(RESOURCE_NAME + '/inserir', data)
  },
  atualizar(data) {
    return Axios.put(RESOURCE_NAME + '/atualizar', data)
  },
  listarCombo() {
    return Axios.get(RESOURCE_NAME + '/listarcombo')
  },
  listarComboSelecaoEstabelecimento(id) {
    return Axios.get(`${RESOURCE_NAME + '/listarcomboselecaoestabelecimento'}/${id}`)
  },
  maiorCodigo(empresaId) {
    return Axios.get(`${RESOURCE_NAME + '/maiorcodigo'}/${empresaId}`)
  },
  validaCodigoEstabelecimento(empresaId, codigoEstabelecimento) {
    return Axios.get(`${RESOURCE_NAME + '/validacodigoestabelecimento'}/${empresaId}/${codigoEstabelecimento}`)
  },
  atualizarAtivoGrid(id, data) {
    return Axios.put(`${RESOURCE_NAME + '/atualizarativogrid'}/${id}`, data)
  }
}