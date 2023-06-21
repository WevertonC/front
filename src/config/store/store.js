import { createStore } from 'vuex'
import menu from './modules/menu'
import table from './modules/table'
import calendario from './modules/calendario'

export default createStore({
    modules: {
        menu,
        table,
        calendario
    }
})

