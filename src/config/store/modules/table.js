export default {
    state: {
        isBusy: true,
        botaoFiltro: true,
        mostrarCampoFiltro: false,
        totalRows: null,
        currentPage: 1,
        pageOptions: [1,10, 25, 50, 100],
        sortBy: 'id',
        sortDesc: true,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        perPage: 10,
        fields: [
          { key: 'id', sortable: true },
          { key: 'titulo', sortable: true  },
          { key: 'razaoSocial', sortable: true },
          { key: 'solicitante', sortable: true },
          { key: 'dataAbertura', sortable: true },
          {key: '-',class: "text-center"}],
        items: [],
        filters: {
          id: '',
          titulo: '',
          razaoSocial: '',
          solicitante: '',
          dataAbertura:''
        },
        textoBotao: 'Filtrar Colunas'
    },
    mutations: {
        setIsBusy(state, payload) {
            state.isBusy = payload
        },
        setCurrentPage(state, payload) {
            state.currentPage = payload
        },
        setPerPage(state, payload) {
            state.perPage = payload
        },
        setFilter(state, payload) {
            state.filter = payload
        },
        setFilterOn(state, payload) {
            state.filterOn = payload
        },
        setItems(state, payload) {
            state.items = payload
        },
        setSortBy(state, payload) {
            state.sortBy = payload
        },
        setSortDesc(state, payload) {
            state.sortDesc = payload
        },
        setTotalRows(state, payload) {
            state.totalRows = payload
        },
        setMostrarCampoFiltro(state, payload) {
            state.mostrarCampoFiltro = payload
        },
        setBotaoFiltro(state, payload) {
            state.botaoFiltro = payload
        },
        setTextoBotao(state, payload) {
            state.textoBotao = payload
        }
    }
}