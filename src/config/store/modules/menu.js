export default {
    state: {
        isMenuVisible: true,
        user: {
            name: 'usuario',
            email: 'usuario@teste.com',
            imagemUri: null
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        hideMenu(state, isVisible) {
            if (isVisible == true) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }
    }
}