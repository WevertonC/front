<script>
import Header from "@/components/compartilhados/Header.vue";
import Menu from "@/components/compartilhados/Menu.vue";
import Contents from "@/components/compartilhados/Contents.vue";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Contents
  },
  computed: {
    isMenuVisible() {
      return this.$store.state.menu.isMenuVisible;
    }
  }
};
</script>

<template>
  <div id="grid" :class="{'hide-menu': !isMenuVisible}">
    <Header title="E-Folha" :hideToggle="false" :hideUserDropdown="false" />
    <Menu />
    <Contents />
  </div>
</template>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#grid {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 45px 1fr;
  grid-template-columns: minmax(220px, 18%) 82%;
  grid-template-areas: "header header" "menu contents";
}

#grid.hide-menu {
  grid-template-areas: "header header" "contents contents";
}

@media (max-width: 600px) {
  #grid {
    display: grid;
    grid-template-columns: 220px 1fr;
  }
}
</style>