<script>
export default {
  props: [
    "drop",
    "dragenter",
    "dragover",
    "paste",
    "showArq",
    "listaFiles",
    "copiaNome",
    "copiaDataVencimento",
    "onRemoveArquivo",
    "cancelarEnvio",
    "onSubmit",
    "escolherArquivos",
    "getFile",
    "arquivos",
    "categorias",
    "ticketInteracaoArquivosCategoriaId"
  ]
};
</script>

<template>
  <div style="padding:2%;backgroundColor: #f1f1f1;">
    <div
      class="box__input"
      @drop="drop($event)"
      @dragover="dragover($event)"
      @dragenter="dragenter($event)"
      @paste="paste($event)"
      style="padding:6% 10%;backgroundColor: #f3f3f3; border: 3px dotted darkgrey;"
    >
      <div v-if="this.showArq">
        <div v-for="(file, index) in listaFiles" :key="file.id">
          <div
            style="border-radius:5px 5px 5px 5px;background-color:#fff;margin-bottom:15px;box-shadow: 0px 2px 7px -3px black;"
          >
            <div style="background-color: #1976d2; border-radius:5px 5px 0 0; padding: 10px;">
              <span style="color:white">#{{ index + 1 }} - Arquivo: {{ file.name }}</span>
            </div>

            <div style="padding:10px;">
              <div style="display:flex; flex-flow:row wrap; gap:10px;">
                <div style="text-align: center; flex:1;">
                  <label :for="'nome-arquivo'+index" style="font-weight:600;">Nome do Arquivo*</label>
                  <br />
                  <input
                    :id="'nome-arquivo'+index"
                    type="text"
                    required
                    style="width:200px;"
                    v-model="copiaNome[index]"
                  />
                </div>

                <div style="text-align: center; flex:1;">
                  <div v-if="!this.$router.currentRoute._value.path.includes('/tickets')">
                    <label
                      :for="'data-vencimento'+index"
                      style="font-weight:600;"
                    >Data de Vencimento</label>
                    <br />
                    <input
                      :id="'data-vencimento'+index"
                      type="date"
                      style="width:200px;"
                      v-model="copiaDataVencimento[index]"
                    />
                  </div>
                  <div v-else>
                    <label style="font-weight:600;" :for="'categoria'+index">Categorias de Arquivos*</label>
                    <br />
                    <select
                      required
                      :id="'categoria'+index"
                      style="width:200px; height:27px;"
                      v-model="ticketInteracaoArquivosCategoriaId[index]"
                    >
                      <option
                        v-for="categoria in categorias"
                        :value="categoria.value"
                        :key="categoria.id"
                      >{{categoria.text}}</option>
                    </select>
                  </div>
                </div>

                <div style="text-align: center; flex:1;">
                  <label :for="'tamanho-bytes'+index" style="font-weight:600;">Tamanho em Bytes*</label>
                  <br />
                  <input
                    :id="'tamanho-bytes'+index"
                    required
                    type="text"
                    style="width:200px;"
                    v-model="file.size"
                  />
                </div>
              </div>
            </div>
            <div
              style="border-top:1px solid #e6e6e6;display:flex;align-items:center;justify-content:end;"
            >
              <div
                v-if="!this.$router.currentRoute._value.path.includes('/tickets')"
                style="display:flex;align-items:center;justify-content:space-around;padding:10px;"
              >
                <div
                  :id="'bt-removeArquivo-' + index"
                  class="bt"
                  style="background-color:#c82436;"
                  @click="onRemoveArquivo(index)"
                >REMOVER</div>
                <div
                :id="'bt-Enviar-' + index"
                class="bt"
                style="background-color:#21BA45; margin-left: 10px"
                @click="onSubmit(index)"
                >ENVIAR</div>
                <div
                  :id="'bt-cancelarEnvio-' + index"
                  class="bt"
                  style="background-color:#F2C037;color:black;margin-left: 10px; display:none"
                  @click="cancelarEnvio()"
                >CANCELAR ENVIO</div>
              </div>
              <div
                v-else
                style="width:350px;display:flex;align-items:center;justify-content:space-around;padding:5px;"
              >
                <div
                  :id="'bt-removeArquivo-' + index"
                  class="bt"
                  style="background-color:#c82436;"
                  @click="onRemoveArquivo(index)"
                >Remover</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="message" style="text-align:center;font-size:20px;margin:0 auto;">
        <p style="cursor:pointer;" @click="escolherArquivos()">Clique Aqui</p>
        <p>ou</p>
        <input type="file" style="display:none;" id="fileUpload" multiple @change="getFile($event)" />
        <p>Clique + CTRL+V ou Arraste os arquivos para enviar. (Dentro do Pontilhado)</p>

        <span
          id="avisoArquivo"
          style="color: red; display: none; font-weight: 600;"
        >Envie pelo menos um arquivo para prosseguir.</span>
      </div>
    </div>
  </div>
</template>


<style>
.bt {
  cursor: pointer;
  padding: 8px 13px;
  color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.bt:hover {
  opacity: 0.9;
}

.bt:active {
  box-shadow: none;
}
</style>