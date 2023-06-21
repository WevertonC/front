<script>
export default {
  data() {
    return {
      cnpjCpfRules: [
        val => !!val || "O campo CNPJ/CPF é obrigatório",
        val => {
          if (val != null) {
            var value = val.replaceAll("-", "").replaceAll(".", "").replaceAll("/", "").trim();
            if (value.length == 11 || value.length == 14) {
              return true;
            } else {
              return "Insira um CNPJ/CPF válido";
            }
          }
        }
      ]
    }
  },
  props: [
    "ref",
    "label",
    "modelValue",
    "fantasia",
    "abertura",
    "nome",
    "cep",
    "logradouro",
    "numero",
    "bairro",
    "complemento",
    "municipio",
    "uf",
    "email",
    "dddTelefone",
    "telefone",
    "autofocus"
  ],
  emits: [
    "update:modelValue",
    "update-fantasia",
    "update-abertura",
    "update-nome",
    "update-cep",
    "update-logradouro",
    "update-numero",
    "update-bairro",
    "update-complemento",
    "update-municipio",
    "update-uf",
    "update-email",
    "update-dddTelefone",
    "update-telefone"
  ],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    findCnpj(value) {
      value = value.replaceAll("-", "").replaceAll(".", "").replaceAll("/", "").trim();
      var self = this;
      if (value.length === 14) {
        const url = $.ajax({
          url: "https://www.receitaws.com.br/v1/cnpj/" + value,
          type: "GET",
          crossDomain: true,
          dataType: "jsonp",
          success: function (data) {
            if (data.status != "ERROR") {
              let nomeAux = data.nome;
              self.$emit('update-nome', nomeAux, 0);
              let fantasiaAux = data.fantasia;
              self.$emit('update-fantasia', fantasiaAux, 1);
              if (data.abertura != undefined) {
                let arr = data.abertura.split("/");
                arr.reverse();
                let aberturaAux = arr[0] + "-" + arr[1] + "-" + arr[2];
                self.$emit('update-abertura', aberturaAux, 2);
              }
              let cepAux = data.cep;
              self.$emit('update-cep', cepAux, 3);
              let logradouroAux = data.logradouro;
              self.$emit('update-logradouro', logradouroAux, 4);
              let numeroAux = data.numero;
              self.$emit('update-numero', numeroAux, 5);
              let bairroAux = data.bairro;
              self.$emit('update-bairro', bairroAux, 6);
              let complementoAux = data.complemento;
              self.$emit('update-complemento', complementoAux, 7);
              let municipioAux = data.municipio;
              self.$emit('update-municipio', municipioAux, 8);
              let ufAux = data.uf;
              self.$emit('update-uf', ufAux, 9);
              if (data.telefone != undefined) {
                let arr2 = data.telefone.split(" ");
                let dddTelefoneAux = arr2[0];
                self.$emit('update-dddTelefone', dddTelefoneAux, 10);
                let telefoneAux = arr2[1];
                self.$emit('update-telefone', telefoneAux, 11);
              }
              let emailAux = data.email;
              self.$emit('update-email', emailAux, 12);
            } else {
              self.$q.dialog({
                title: "Alerta",
                message: "CNPJ não encontrado na consulta."
              })
            }
          },
          error: function (e) {
            self.$q.dialog({
              title: "Alerta",
              message: "CNPJ não encontrado na consulta."
            })
          },
          beforeSend: null
        });
      } else {
        self.$q.dialog({
          title: "Alerta",
          message: "CNPJ inválido."
        });
      }
    },
    resetComponent() {
      this.$refs.ref.resetValidation();
      this.$refs.ref.focus();
    }
  }
}
</script>
<template>
  <q-input ref="ref" :label="label" v-model="value" :fantasia="fantasia" :abertura="abertura" :nome="nome" :cep="cep"
    :logradouro="logradouro" :numero="numero" :bairro="bairro" :complemento="complemento" :municipio="municipio" :uf="uf"
    :email="email" :dddTelefone="dddTelefone" :telefone="telefone" outlined dense hide-bottom-space maxlength="18"
    v-mask="['###.###.###-##', '##.###.###/####-##']" :autofocus="autofocus" :rules="cnpjCpfRules">
    <template v-slot:append>
      <q-btn :disable="!value || value.length <= 14" icon="search" flat rounded @click="findCnpj(value)" />
    </template>
    <q-tooltip style="font-size: 1rem" class="bg-secondary">Pressione o botão para adicionar um CNPJ, (3 consultas por
      minuto!)</q-tooltip>
  </q-input>
</template>