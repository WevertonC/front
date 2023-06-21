<script>
import EstabelecimentoService from "@/api-services/estabelecimento.service";
export default {
  data() {
    return {
      estabelecimento: {
        imagemLogoMarca: {
          id: 0,
          imagemLogomarcaId: 0,
          nomeImagem: "",
          uri: "",
          mime: null
        }
      },
      foto: null,
      emails: []
    };
  },
  methods: {
    getFoto(e) {
      const file = e;
      this.estabelecimento.imagemLogoMarca.uri = URL.createObjectURL(file);
      this.temFoto = true;
    },
    escolherFoto() {
      let qFile = document.getElementById("fotoUpload");
      qFile.click();
    },
    editarEstabelecimento(id) {
      this.$router.push({ name: "EstabelecimentoEditar", params: { id: id } });
    },
    voltar() {
      this.$router.go(-1);
    }
  },
  mounted() {
    EstabelecimentoService.consultar(this.$router.currentRoute._value.params.id).then(
      response => {
        this.estabelecimento = response.data;
        this.emails = this.estabelecimento.email.split(';');
        this.estabelecimento.email = this.estabelecimento.email.replace(/;/g, ', ');
        if (this.estabelecimento.cnpjCpf.length === 11) {
          const arr = this.estabelecimento.cnpjCpf.split("");
          arr.splice(3, 0, ".");
          arr.splice(7, 0, ".");
          arr.splice(11, 0, "-");
          this.estabelecimento.cnpjCpf = arr.join("");
        } else if (this.estabelecimento.cnpjCpf.length === 14) {
          const arr = this.estabelecimento.cnpjCpf.split("");
          arr.splice(2, 0, ".");
          arr.splice(6, 0, ".");
          arr.splice(10, 0, "/");
          arr.splice(15, 0, "-");
          this.estabelecimento.cnpjCpf = arr.join("");
        }
        if (this.estabelecimento == "") {
          this.$router.push("/naoautorizado");
        }
      }
    );
  }
};
</script>
<template>
  <div>
    <q-card>
      <div class="row q-pa-md">
        <div class="col-sm-8 col-xs-12">
          <q-card-section>
            <div>
              <strong>Dados do Estabelecimento</strong>
            </div>
            <div class="q-pa-md">
              <q-list>
                <q-item-label>
                  <b>Razão Social:</b>
                  {{ estabelecimento.razaoSocial }}
                </q-item-label>
                <q-item-label>
                  <b>Nome Fantasia:</b>
                  {{ estabelecimento.nomeFantasia }}
                </q-item-label>
                <q-item-label>
                  <b>Nickname:</b>
                  {{ estabelecimento.nickname }}
                </q-item-label>
                <q-item-label>
                  <b>CNPJ/CPF:</b>
                  {{ estabelecimento.cnpjCpf }}
                </q-item-label>
              </q-list>
            </div>
          </q-card-section>

          <q-card-section>
            <div>
              <strong>Dados de Endereço</strong>
            </div>

            <div class="q-pa-md">
              <q-list>
                <q-item-label>
                  <b>Endereço:</b>
                  {{ estabelecimento.endereco }}
                </q-item-label>
                <q-item-label>
                  <b>N°:</b>
                  {{ estabelecimento.numeroEndereco }}
                </q-item-label>
                <q-item-label>
                  <b>Bairro:</b>
                  {{ estabelecimento.bairro }}
                </q-item-label>
                <q-item-label>
                  <b>CEP:</b>
                  {{ estabelecimento.cep }}
                </q-item-label>
                <q-item-label>
                  <b>Complemento:</b>
                  {{ estabelecimento.complementoEndereco }}
                </q-item-label>
                <q-item-label>
                  <b>Cidade:</b>
                  {{ estabelecimento.nomeMunicipio }}
                </q-item-label>
                <q-item-label>
                  <b>UF:</b>
                  {{ estabelecimento.uf }}
                </q-item-label>
              </q-list>
            </div>
          </q-card-section>
        </div>
        <div class="col-sm-4 col-xs-12 q-mt-md flex justify-end">
          <figure class="container-image-form">
            <img class="cursor-not-allowed"
              v-if="estabelecimento.imagemLogoMarca != null && estabelecimento.imagemLogoMarca.uri"
              :src="estabelecimento.imagemLogoMarca.uri" />
            <img class="cursor-not-allowed" v-else src="@/assets/img-default-2.png" />
          </figure>
          <q-file for="fotoUpload" style="display: none;" type="file" v-model="foto"
            @update:model-value="getFoto($event)" />
        </div>
        <div class="col-sm-12 col-xs-12">
          <q-card-section>
            <div>
              <strong>Dados de Contato</strong>
            </div>
            <div class="q-pa-md">
              <q-list>
                <q-item-label>
                  <b>DDD Telefone:</b>
                  {{ estabelecimento.dddTelefone }}
                </q-item-label>
                <q-item-label>
                  <b>Telefone:</b>
                  {{ estabelecimento.telefone }}
                </q-item-label>
                <q-item-label>
                  <b>DDD Celular:</b>
                  {{ estabelecimento.dddCelular }}
                </q-item-label>
                <q-item-label>
                  <b>Celular:</b>
                  {{ estabelecimento.celular }}
                </q-item-label>
                <q-item-label>
                  <b v-if="emails.length > 1">E-mails:</b>
                  <b v-else>E-mail:</b>
                  {{ estabelecimento.email }}
                </q-item-label>
              </q-list>
            </div>
          </q-card-section>
        </div>
        <q-card-section>
          <div>
            <strong>Outros</strong>
          </div>

          <div class="q-pa-md">
            <q-list>
              <q-item-label>
                <b class="q-mr-xs">Link BPO:</b>
                <a class="text-primary" :href="estabelecimento.linkBpo">{{ estabelecimento.linkBpo }}</a>
              </q-item-label>
              <q-item-label>
                <b>Ativo:</b>
                {{ estabelecimento.ativo == true ? 'Sim' : 'Não' }}
              </q-item-label>
            </q-list>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>
<style scoped>
strong {
  font-size: 1.3rem;
}

.container-image-form {
  display: flex;
  justify-content: left;
  max-width: min-content;
}

.container-image-form img {
  border: 1px solid rgb(108, 117, 125);
  max-width: 200px;
  min-width: 200px;
  max-height: 200px;
  min-height: 200px;
}

.botao-todos-tickets {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
