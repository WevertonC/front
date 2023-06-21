<script>
import UserDropdown from "./UserDropdown.vue";
export default {
  name: "Header",
  components: {
    UserDropdown
  },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    icon() {
      return this.$store.state.menu.isMenuVisible
        ? "fa fa-bars"
        : "fa fa-bars fa-xs";
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
      window.dispatchEvent(new Event("resize"));
    }
  }
};
</script>

<template>
  <header class="header">
    <div class="titulo-menu">
      <div class="title">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <a class="toggle" @click="toggleMenu()" v-if="!hideToggle">
        <i :class="icon"></i>
      </a>
    </div>
    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);
  position: fixed;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
}

.titulo-menu {
  max-width: 18%;
  min-width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}

a.toggle {
  width: 50px;
  height: 100%;
  color: #fff;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

a.toggle:hover {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.informacoes {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100%;
  padding: 0px 30px 0px 30px;
  text-decoration: none;
}

.informacoes:hover {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
</style>