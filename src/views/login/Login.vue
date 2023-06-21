<script>
import LoginService from "@/api-services/login.service";
import SulprogService from "@/api-services/sulprog.service";
import Axios from "axios";
import { useQuasar } from "quasar";
export default {
  name: "Login",
  data() {
    return {
      $q: useQuasar(),
      login: {
        email: "",
        senha: ""
      },
      numeroDeSerie: localStorage.numeroDeSerie,
      numeroDeSerieAntigo: localStorage.numeroDeSerie,
      token: "",
      validou: true,
      perfil: {},
      usuario: {},
      estabelecimentoNome: "",
      botaoDesabitado: false,
      emailRules: [
        val => val != "" || "O campo E-mail é obrigatório",
        val => {
          let user = val.substring(0, val.indexOf("@"));
          let dom = val.substring(val.indexOf("@") + 1, val.length);
          if (
            user.length >= 1 &&
            dom.length >= 3 &&
            user.search("@") == -1 &&
            dom.search("@") == -1 &&
            user.search(" ") == -1 &&
            dom.search(" ") == -1 &&
            dom.search(".") != -1 &&
            dom.indexOf(".") >= 1 &&
            dom.lastIndexOf(".") < dom.length - 1
          ) {
            return true;
          } else {
            return "Insira um e-mail válido";
          }
        }
      ]
    };
  },
  methods: {
    autenticar() {
      this.showLoading();
      this.botaoDesabitado = true;
      $("body").css("cursor", "progress");
      localStorage.numeroDeSerie = this.numeroDeSerie;
      Axios.defaults.headers.common["numeroDeSerie"] =
        localStorage.numeroDeSerie;
      LoginService.autenticar(this.login)
        .then(response => {
          this.token = response.data["token"];
          this.usuario = response.data["user"];
          localStorage.token = response.data["token"];
          Axios.defaults.headers.Authorization = `Bearer ${localStorage.token}`;
          this.$router.push("estabelecimentos");
        })
        .catch(e => {
          this.$q.loading.hide()
          this.token = "";
          localStorage.removeItem("token");
          this.$q.dialog({
            title: "Erro",
            message: JSON.stringify(e.response.data.message)
          });
        })
        .finally(() => {
          this.$q.loading.hide();
          this.botaoDesabitado = false;
        });
      $("body").css("cursor", "default");
    },
    showLoading() {
      this.$q.loading.show({
        message: "Acessando o sistema. Por favor, aguarde...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary"
      });
    }
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    if (localStorage.numeroDeSerie) {
      this.numeroDeSerie = localStorage.numeroDeSerie;
    }
  }
};
</script>

<template>
  <div class="fundo">
    <div style="box-sizing:border-box;width:350px;height:350px;">
      <div class="text-center" style="margin-bottom:10px;">
        <img class="imagem" src="/src/assets/logo.png" />
      </div>
      <q-form style="padding: 20px; border-radius:20px;" class="bg-white flex justify-center items-center"
        @submit="autenticar()">
        <q-input style="width:100%;" filled :dense="true" v-model="numeroDeSerie" label="Número de Série"
          v-mask="'######'" :rules="[val => val != '' || 'O campo Numero de Série é obrigatório']" />

        <q-input style="width:100%;" filled type="text" :dense="true" v-model="login.email" label="E-mail"
          :rules="emailRules" />

        <q-input style="margin-bottom: 5px; width:100%;" filled type="password" :dense="true" v-model="login.senha"
          label="Senha" :rules="[val => val != '' || 'O campo Numero de Série é obrigatório']" />
        <div class="column" style="width:100%;">
          <q-btn style="width:100%; margin-bottom: 20px;" :disable="botaoDesabitado" label="Acessar o Sistema"
            type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #1e469a;
}
</style>
  

  
