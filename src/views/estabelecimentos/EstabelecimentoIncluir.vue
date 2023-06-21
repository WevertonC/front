<script>
import EstabelecimentoService from "@/api-services/estabelecimento.service";
import EmpresaService from "@/api-services/empresa.service";
import MunicipioService from "@/api-services/municipio.service";
import InputData from "../../components/inputs/InputData.vue";
import InputCnpjCpf from "../../components/inputs/InputCnpjCpf.vue";
export default {
  components: { InputData, InputCnpjCpf },
  data() {
    return {
      estabelecimento: {
        id: 0,
        razaoSocial: "",
        nickname: "",
        nomeFantasia: "",
        cnpjCpf: "",
        inicioAtividade: null,
        cep: "",
        endereco: "",
        numeroEndereco: "",
        complementoEndereco: "",
        bairro: "",
        nomeMunicipio: "",
        uf: "",
        dddTelefone: "",
        telefone: "",
        dddCelular: "",
        celular: "",
        email: "",
        linkBpo: "",
        ativo: true,
        codigoEstabelecimento: "",
        imagemLogoMarca: {
          id: 0,
          imagemLogomarcaId: 0,
          nomeImagem: "",
          uri: "",
          mime: null
        },
        empresaId: "",
        codigoMunicipio: ""
      },
      date: "",
      foto: null,
      url: null,
      temFoto: false,
      empresas: [],
      emailRules: [
        val => !!val || "O campo E-mail é obrigatório",
        val => {
          if (val != null) {
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
              this.botaoEmailDesabilitado = false;
              return true;
            } else {
              this.botaoEmailDesabilitado = true;
              return "Insira um e-mail válido";
            }
          }
        }
      ],
      linkBpoRules: [
        val => {
          if (val != "") {
            try {
              let url = new URL(val)
              return true;
            } catch (err) {
              return "Insira uma URL válida";
            }
          }
        }
      ],
      notValid: false,
      maiorMaisUm: "",
      botaoDesabitado: false,
      emails: [],
      botaoEmailDesabilitado: true
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      window.scrollTo(0, 0);
      this.showLoading();
      this.botaoDesabitado = true;
      if (this.emails.length > 0) {
        if (this.estabelecimento.email != this.emails[this.emails.length - 1]) {
          this.emails.push(this.estabelecimento.email);
        }
        let aux = this.emails.toString();
        if (aux.length > 200) {
          this.$q.dialog({
            title: "Erro",
            message: "Limite de 200 caracteres do campo E-mail excedido."
          });
          this.botaoDesabitado = false;
          this.$q.loading.hide();
          return;
        } else {
          this.estabelecimento.email = aux.replace(/,/g, ";");
        }
      }
      if (this.temFoto) {
        this.estabelecimento.imagemLogoMarca.mime = this.foto;
        this.estabelecimento.imagemLogoMarca.nomeImagem = this.foto.name;
      }
      if (this.estabelecimento.cnpjCpf != null) {
        this.estabelecimento.cnpjCpf = this.estabelecimento.cnpjCpf
          .replaceAll("-", "")
          .replaceAll(".", "")
          .replaceAll("/", "")
          .trim();
      }
      if (this.estabelecimento.cep != null) {
        this.estabelecimento.cep = this.estabelecimento.cep.replaceAll("-", "");
      }
      if (this.notValid == true) {
        this.estabelecimento.codigoEstabelecimento = this.maiorMaisUm;
      }
      EstabelecimentoService.inserir(this.estabelecimento)
        .then(response => {
          this.$q.notify({
            type: "positive",
            message: "Operação concluída com sucesso!",
            position: "top-right"
          });
          this.clear();
          this.temFoto = false;
          this.notValid = false;
        })
        .catch(error => {
          this.$q.loading.hide();
          this.$q.dialog({
            title: "Erro",
            message: JSON.stringify(error.response.data.message)
          });
        })
        .finally(() => {
          this.$q.loading.hide();
          this.botaoDesabitado = false;
          this.resetVal();
        });
    },
    clear() {
      this.estabelecimento.razaoSocial = "";
      this.estabelecimento.nickname = "";
      this.estabelecimento.nomeFantasia = "";
      this.estabelecimento.cnpjCpf = "";
      this.estabelecimento.inicioAtividade = null;
      this.estabelecimento.cep = "";
      this.estabelecimento.endereco = "";
      this.estabelecimento.numeroEndereco = "";
      this.estabelecimento.complementoEndereco = "";
      this.estabelecimento.bairro = "";
      this.estabelecimento.nomeMunicipio = "";
      this.estabelecimento.uf = "";
      this.estabelecimento.dddTelefone = "";
      this.estabelecimento.telefone = "";
      this.estabelecimento.dddCelular = "";
      this.estabelecimento.celular = "";
      this.estabelecimento.email = "";
      this.estabelecimento.linkBpo = "";
      this.estabelecimento.imagemLogoMarca = {};
      this.estabelecimento.codigoMunicipio = "";
      this.foto = null;
      this.url = null;
      this.emails = [];
      this.maior();
    },
    resetVal() {
      this.$refs.empresa.resetValidation();
      this.$refs.codigoEstabelecimento.resetValidation();
      this.$refs.razaoSocial.resetValidation();
      this.$refs.endereco.resetValidation();
      this.$refs.codigoMunicipio.resetValidation();
      this.$refs.email.resetValidation();
      this.$refs.cnpjCpf.resetComponent();
      this.$refs.inicioAtividade.resetComponent();
      this.$refs.linkBpo.resetValidation();
    },
    onReset(event) {
      this.$router.go(-1);
    },
    findCep(value) {
      if (value.length === 9) {
        const Http = new XMLHttpRequest();
        let res = "";
        var self = this;
        Http.onload = function () {
          res = this.responseText;
          let obj = JSON.parse(res);
          if (!obj.erro) {
            self.estabelecimento.endereco = obj.logradouro.toUpperCase();
            self.estabelecimento.complementoEndereco = obj.complemento.toUpperCase();
            self.estabelecimento.bairro = obj.bairro.toUpperCase();
            self.estabelecimento.nomeMunicipio = obj.localidade.toUpperCase();
            self.estabelecimento.uf = obj.uf.toUpperCase()
            self.estabelecimento.codigoMunicipio = obj.ibge;
            self.estabelecimento.dddTelefone = obj.ddd;
          } else {
            self.$q.dialog({
              title: "Alerta",
              message: "Nenhuma informação localizada."
            });
          }
        };
        const url = "https://viacep.com.br/ws/" + value + "/json/";
        Http.open("GET", url, true);
        Http.send();
      } else if (value.length === 10) {
        let arr = value.replaceAll(".", "");
        value = arr;
        this.findCep(value);
      } else {
        self.$q.dialog({
          title: "Alerta",
          message: "Nenhuma informação localizada."
        });
      }
    },
    getFoto() {
      this.url = URL.createObjectURL(this.foto);
      this.temFoto = true;
    },
    escolherFoto() {
      let qFile = document.getElementById("fotoUpload");
      qFile.click();
    },
    maior() {
      if (this.estabelecimento.empresaId != null) {
        EstabelecimentoService.maiorCodigo(this.estabelecimento.empresaId).then(
          response => {
            this.estabelecimento.codigoEstabelecimento = response.data + 1;
            this.maiorMaisUm = response.data + 1;
          }
        );
      }
    },
    findMunicipio(value) {
      if (value != "") {
        MunicipioService.consultarPorCodigoMunicipio(value)
          .then(response => {
            this.estabelecimento.nomeMunicipio = response.data.nomeMunicipio.toUpperCase();
            this.estabelecimento.uf = response.data.uf.toUpperCase();
          })
          .catch(error => {
            this.$q.dialog({
              title: "Erro",
              message: JSON.stringify(error.response.data.message)
            });
            this.estabelecimento.codigoMunicipio = "";
            this.estabelecimento.nomeMunicipio = "";
            this.estabelecimento.uf = "";
          });
      }
    },
    checaMunicipio(value) {
      MunicipioService.consultarPorCodigoMunicipio(value)
        .then(response => { })
        .catch(error => {
          this.estabelecimento.codigoMunicipio = "";
          this.estabelecimento.nomeMunicipio = "";
          this.estabelecimento.uf = "";

        });
    },
    validaCodigoEstabelecimento(codigoEstabelecimento) {
      if (codigoEstabelecimento != '') {
        EstabelecimentoService.validaCodigoEstabelecimento(
          this.estabelecimento.empresaId,
          codigoEstabelecimento
        ).then(response => {
          this.notValid = response.data;
        });
      } else {
        this.notValid = false;
      }
    },
    addEmail(email) {
      if (this.emails.length > 0) {
        let aux = this.emails.toString();
        if (aux.length + email.length <= 200) {
          if (email == "") {
            this.$refs.email.focus();
          }
          if (email != "" && email != this.emails[this.emails.length - 1]) {
            this.emails.push(email);
            this.$refs.email.focus();
          } else {
            this.$refs.email.focus();
          }
        } else {
          this.$q.dialog({
            title: "Alerta",
            message: "Limite de 200 caracteres do campo E-mail excedido."
          });
        }
      } else {
        if (email == "") {
          this.$refs.email.focus();
        }
        if (email != "" && email != this.emails[this.emails.length - 1]) {
          this.emails.push(email);
          this.$refs.email.focus();
        }
      }
    },
    removeEmail(email, id) {
      this.emails.splice(id, 1);
      if (email == this.estabelecimento.email) {
        if (this.emails.length > 0) {
          this.estabelecimento.email = this.emails[this.emails.length - 1];
        } else {
          this.estabelecimento.email = "";
        }
      }
    },
    showLoading() {
      this.$q.loading.show({
        message: "Salvando. Por favor, aguarde...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary"
      });
    },
    update(val, i) {
      switch (i) {
        case 0: this.estabelecimento.razaoSocial = val
          break;
        case 1: this.estabelecimento.nomeFantasia = val
          break;
        case 2: this.estabelecimento.inicioAtividade = val
          break;
        case 3: this.estabelecimento.cep = val
          break;
        case 4: this.estabelecimento.endereco = val
          break;
        case 5: this.estabelecimento.numeroEndereco = val
          break;
        case 6: this.estabelecimento.bairro = val
          break;
        case 7: this.estabelecimento.complementoEndereco = val
          break;
        case 8: this.estabelecimento.nomeMunicipio = val
          break;
        case 9: this.estabelecimento.uf = val
          break;
        case 10: this.estabelecimento.dddTelefone = val
          break;
        case 11: this.estabelecimento.telefone = val
          break;
        case 12: this.estabelecimento.email = val
          break;
      }
      this.estabelecimento.cep != "" ? this.findCep(this.estabelecimento.cep) : false
    }
  },
  mounted() {
    $("html, body").animate({ scrollTop: 0 }, "medium");
    EmpresaService.listarCombo().then(response => {
      this.empresas = response.data["empresas"];
    })
  }
};
</script>
<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset">
      <q-card>
        <div class="q-pa-md">
          <q-card-section>
            <div>
              <strong>Dados do Estabelecimento</strong>
            </div>
            <div class="row justify-center items-center q-pt-md">
              <div class="col-md-3 col-sm-auto col-xs-auto">
                <figure class="container-image-form" @click="escolherFoto()">
                  <img v-if="url" :src="url" />
                  <img v-else src="@/assets/img-default-1.png" />
                </figure>
                <q-file for="fotoUpload" style="display: none;" type="file" v-model="foto"
                  @update:model-value="getFoto()" />
              </div>
              <div class="col-sm-9 col-xs-12 q-col-gutter-y-md">
                <div class="row q-col-gutter-md">
                  <div class="col-sm-7 col-xs-12">
                    <q-select ref="empresa" required label="Empresa*" outlined dense autofocus
                      v-model="estabelecimento.empresaId" option-label="text" :options="empresas" map-options emit-value
                      @update:model-value="maior()" :rules="[val => !!val || 'O campo Empresa é obrigatório']"
                      hide-bottom-space options-selected-class="bg-blue-8 text-white" />
                  </div>
                  <div class="col-sm-5 col-xs-12">
                    <q-input ref="codigoEstabelecimento" required label="Código Estabelecimento*" outlined dense
                      v-model="estabelecimento.codigoEstabelecimento" mask="##########"
                      :rules="[val => !!val || 'O campo Código Estabelecimento é obrigatório']" hide-bottom-space
                      @update:model-value="validaCodigoEstabelecimento(estabelecimento.codigoEstabelecimento)">
                      <q-tooltip v-model="notValid" anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        style="font-size: 1rem" class="bg-negative" no-parent-event>Este Cód. Estab. já está sendo
                        utilizado nessa Empresa</q-tooltip>
                    </q-input>
                  </div>
                </div>
                <div>
                  <InputCnpjCpf :ref="'cnpjCpf'" :label="'CNPJ/CPF*'" v-model="estabelecimento.cnpjCpf"
                    :nome="estabelecimento.razaoSocial" @update-nome="update" :fantasia="estabelecimento.nomeFantasia"
                    @update-fantasia="update" :abertura="estabelecimento.inicioAtividade" @update-abertura="update"
                    :cep="estabelecimento.cep" @update-cep="update" :logradouro="estabelecimento.endereco"
                    @update-logradouro="update" :numero="estabelecimento.numeroEndereco" @update-numero="update"
                    :bairro="estabelecimento.bairro" @update-bairro="update"
                    :complemento="estabelecimento.complementoEndereco" @update-complemento="update"
                    :municipio="estabelecimento.nomeMunicipio" @update-municipio="update" :uf="estabelecimento.uf"
                    @update-uf="update" :dddTelefone="estabelecimento.dddTelefone" @update-dddTelefone="update"
                    :telefone="estabelecimento.telefone" @update-telefone="update" :email="estabelecimento.email"
                    @update-email="update" />
                </div>
                <div>
                  <q-input ref="razaoSocial" required label="Razão Social*" type="text" maxlength="60" dense outlined
                    v-model="estabelecimento.razaoSocial" :rules="[val => !!val || 'O campo Razão Social é obrigatório']"
                    hide-bottom-space />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-md q-pt-md">
              <div class="col-sm-6 col-xs-12">
                <q-input ref="nomeFantasia" label="Nome Fantasia" type="text" maxlength="60" outlined dense
                  v-model="estabelecimento.nomeFantasia" />
              </div>
              <div class="col-sm-3 col-xs-12">
                <q-input ref="nickname" label="Nickname" type="text" maxlength="40" outlined dense
                  v-model="estabelecimento.nickname" />
              </div>
              <div class="col-sm-3 col-xs-12">
                <InputData :ref="'inicioAtividade'" v-model="estabelecimento.inicioAtividade"
                  :label="estabelecimento.cnpjCpf != null && estabelecimento.cnpjCpf.length > 14 ? 'Início Atividade*' : 'Início Atividade'" />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div>
              <strong>Dados de Endereço</strong>
            </div>
            <div class="row q-col-gutter-md q-pt-md">
              <div class="col-sm-3 col-xs-12">
                <q-input ref="cep" label="CEP" type="text" maxlength="9" dense outlined mask="#####-###"
                  v-model="estabelecimento.cep">
                  <template v-slot:append>
                    <q-btn icon="search" flat rounded @click="findCep(estabelecimento.cep)" />
                  </template>
                </q-input>
              </div>
              <div class="col-sm-4 col-xs-12">
                <q-input ref="endereco" label="Endereço*" type="text" maxlength="60" outlined dense required
                  v-model="estabelecimento.endereco" :rules="[val => !!val || 'O campo Endereço é obrigatório']"
                  hide-bottom-space />
              </div>
              <div class="col-sm-2 col-xs-12">
                <q-input ref="numero" label="Número" type="text" maxlength="10" outlined dense
                  v-model="estabelecimento.numeroEndereco" />
              </div>
              <div class="col-sm-3 col-xs-12">
                <q-input ref="bairro" label="Bairro" type="text" maxlength="60" outlined dense
                  v-model="estabelecimento.bairro" />
              </div>
              <div class="col-sm-4 col-xs-12">
                <q-input ref="complemento" label="Complemento" type="text" maxlength="60" outlined dense
                  v-model="estabelecimento.complementoEndereco" />
              </div>
              <div class="col-sm-3 col-xs-12">
                <q-input ref="codigoMunicipio" label="Código Município*" outlined dense mask="#######"
                  v-model="estabelecimento.codigoMunicipio" required lazy-rules
                  :rules="[val => !!val || 'O campo Código Município é obrigatório']" hide-bottom-space
                  @blur="checaMunicipio(estabelecimento.codigoMunicipio)">
                  <template v-slot:append>
                    <q-btn icon="search" flat rounded @click="findMunicipio(estabelecimento.codigoMunicipio)" />
                  </template>
                </q-input>
              </div>
              <div class="col-sm-4 col-xs-12">
                <q-input ref="nomeMunicipio" label="Nome Município" type="text" maxlength="60" outlined dense
                  v-model="estabelecimento.nomeMunicipio" disable />
              </div>
              <div class="col-sm-1 col-xs-12">
                <q-input ref="uf" label="UF" outlined dense v-mask="'AA'" v-model="estabelecimento.uf" disable />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div>
              <strong>Dados de Contato</strong>
            </div>
            <div class="row q-col-gutter-md q-pt-md">
              <div class="col-sm-2 col-xs-12">
                <q-input ref="dddFone" label="DDD Fone" outlined dense v-mask="'##'"
                  v-model="estabelecimento.dddTelefone" />
              </div>
              <div class="col-sm-4 col-xs-12">
                <q-input ref="telefone" label="Telefone" outlined dense v-mask="'##############'"
                  v-model="estabelecimento.telefone" />
              </div>
              <div class="col-sm-2 col-xs-12">
                <q-input ref="dddCelular" label="DDD Celular" outlined dense v-mask="'##'"
                  v-model="estabelecimento.dddCelular" />
              </div>
              <div class="col-sm-4 col-xs-12">
                <q-input ref="celular" label="Celular" outlined dense v-mask="'##############'"
                  v-model="estabelecimento.celular" />
              </div>
              <div class="col-sm-12 col-xs-12">
                <q-input class="q-mb-xs" ref="email" required label="E-mail*" type="email" maxlength="200" outlined dense
                  v-model="estabelecimento.email" :rules="emailRules">
                  <template v-slot:append>
                    <q-btn icon="add" color="primary" flat rounded @click="addEmail(estabelecimento.email)"
                      :disable="botaoEmailDesabilitado" />
                  </template>
                  <q-tooltip v-if="emails.length == 0" style="font-size: 1rem" class="bg-secondary">Pressione o botão para
                    adicionar um ou mais e-mails</q-tooltip>
                </q-input>
                <q-badge v-for="(email, id) in emails" :key="id" :label="email" class="q-mt-xs q-mr-xs cursor-pointer"
                  @click="removeEmail(email, id)" outline color="primary">
                  <q-tooltip style="font-size: 1rem" class="bg-secondary">Clique para remover o e-mail</q-tooltip>
                </q-badge>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div>
              <strong>Link BPO</strong> (Obs. Informar o endereço completo(http:\\www.exemplo.com))
            </div>
            <div class="row q-pt-md">
              <div class="col-sm-12 col-xs-12">
                <q-input ref="linkBpo" label="Link BPO" maxlength="100" outlined dense
                  v-model="estabelecimento.linkBpo" :rules="linkBpoRules"/>
              </div>
            </div>
          </q-card-section>
        </div>
        <q-card-actions style="background-color: #F6F6F6; border-top: 1px solid #9a9a9a;" class="justify-end">
          <q-btn type="reset" color="primary" outline>Voltar</q-btn>
          <q-btn type="submit" :disable="botaoDesabitado" color="primary" style="margin-left: 10px;">Salvar</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
<style scoped>
strong {
  font-size: 1.3rem;
}

.container-image-form {
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
}

.container-image-form img {
  border: 1px solid rgb(108, 117, 125);
  cursor: pointer;
  min-width: 200px;
  min-height: 200px;
}
</style>
