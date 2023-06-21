<script>
import UsuarioService from "@/api-services/usuario.service";

export default {
  name: "UserDropdown",
  data() {
    return {
      idUsuario: 0,
      nomeUsuario: "",
      imagemUsuario: {
        id: 0,
        nome: "",
        uri: "",
        imagemDoUsuarioId: 0,
        mime: null
      }
    };
  },
  created() {
    const jwtPayload = this.$funcoes.parseJwt(window.localStorage.getItem("token"))
    
    this.idUsuario = jwtPayload.nameid;

    this.getUsuario();
  },

  computed: {
    user() {
      return this.$store.state.menu.user;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    editarPerfil() {
      this.$router.push({
        name: "PerfilEditar",
        params: { id: this.idUsuario }
      });
    },

    getUsuario() {
      var id = this.idUsuario;
      UsuarioService.consultar(id).then(response => {
        this.$store.state.menu.user.name = response.data.nome;
        if (response.data.imagemUsuario !== null) {
          this.$store.state.menu.user.imagemUri =
            response.data.imagemUsuario.uri;
        }
      });
    },

    refatoraNome(nome) {
      let arrayNome = [];
      let array = nome.split("");
      arrayNome.push(array[0]);
      array = array.reverse();
      for (let i = 0; i < array.length; i++) {
        if (array[i] === " ") {
          arrayNome.push(array[i - 1]);
          break;
        }
      }
      if (arrayNome.length === 1) {
        return arrayNome[0];
      } else {
        return arrayNome[0] + arrayNome[1];
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="user-dropdown">
      <div class="user-button">
        <span class="d-done d-sm-block">{{ user.name }}</span>
        <div class="user-dropdown-img">
          <q-avatar v-if="this.$store.state.menu.user.imagemUri" size="40px">
            <img :src="this.$store.state.menu.user.imagemUri" />
          </q-avatar>
          <q-avatar v-else size="40px" color="orange-8">{{refatoraNome(user.name)}}</q-avatar>
        </div>
        <q-icon style="font-size:16px;" name="expand_more"></q-icon>
      </div>
      <div class="user-dropdown-content">
        <a style="font-size:16px;" v-on:click="logout()">
          <q-icon name="logout" style="margin-right:5px;"></q-icon>Sair
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  width: 100%;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown-content a:hover {
  text-decoration: none;
  color: #000;
  background-color: #ededed;
}
</style>