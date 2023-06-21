<script>
import Calendario from "@/components/calendario/FullCalendar.vue";
export default {
  data() {
    return {
      nivelAcesso: 0,
    };
  },
  components: {
    Calendario
  },
  created() {
    const jwtPayload = this.$funcoes.parseJwt(
      window.localStorage.getItem("token")
    );
    if (jwtPayload.role == "Escritorio Gerente") {
      this.nivelAcesso = 1 < 2;
    }
    if (jwtPayload.role == "Escritorio Operador") {
      this.nivelAcesso = 2 < 2;
    }
    if (jwtPayload.role == "Empresa Operador") {
      this.nivelAcesso = 2 < 2;
    }
  },
  props: [
    "columns",
    "rows",
    "titleTable",
    "filters",
    "filterArray",
    "pagination",
    "loading",
    "mostrarFiltros",
    "rowsPerPage",
    "consultar",
    "deleteItem",
    "filtersOn",
    "onEnter",
    "moveParaCima",
    "moveParaBaixo",
    "update",
    "prioridades",
    "status",
    "responsaveis",
    "selectFilterPrioridade",
    "selectFilterStatus",
    "selectFilterResponsavel",
    "disableCheckbox",
    "selectEstabelecimento",
    "showCalendar",
    "closeCalendar"
  ],
  computed: {
    events: {
      get() {
        return this.$store.state.calendario.events;
      },
      set(valor) {
        this.$store.commit("setEvents", valor);
      }
    }
  }
};
</script>
<template>
  <div>
    <q-table row-key="id" binary-state-sort :rows="rows" :loading="loading" :columns="columns" :pagination="pagination">
      <template #top>
        <div class="flex items-center justify-between" style="width:100%;">
          <div style="float:left">
            <h4>{{ this.titleTable }}</h4>
          </div>

          <div style="float:right;">
            <q-btn v-if="!mostrarFiltros" color="green" @click="filtersOn()">Mostrar Filtros</q-btn>
            <q-btn v-else color="yellow" class="text-black" @click="filtersOn()">Esconder Filtros</q-btn>
            <q-btn color="primary" style="margin-left: 10px;"
              @click="this.$router.push(this.$route.path + '/incluir')">Adicionar</q-btn>
          </div>
        </div>
      </template>

      <template #header>
        <tr>
          <td auto-width v-for="(field, index ) in columns" :key="field.id"
            :style="{ 'text-align': field.align, 'width': field.maxWidth }">
            <span v-if="!mostrarFiltros">{{ field.label }}</span>
            <span v-else>
              <q-input style="width:100px;" v-if="field.id != null" v-model="this.filters[field.name]"
                @keyup.enter="onEnter(field.name, index)" type="text" :placeholder="field.label" filled dense>
                <template v-slot:append>
                  <q-icon name="close" @click="this.filters[field.name] = ''; onEnter(field.name, index)"
                    class="cursor-pointer" />
                </template>
                <q-tooltip v-if="field.name === 'ativo'" class="bg-secondary" style="fontSize: 16px;" anchor="top middle"
                  self="center middle">Digite "sim" para filtrar registros ativos e "não" para inativos.</q-tooltip>
              </q-input>
              <span v-else>{{ field.label }}</span>
            </span>
          </td>
        </tr>
      </template>

      <template #body-cell-ordemDeVisualizacao="props">
        <q-td>
          <q-btn dense flat size="sm" icon="north" v-if="props.pageIndex != 0 && rows[props.pageIndex - 1]"
            @click="moveParaCima(props)">
            <q-tooltip class="bg-secondary" style="font-size:1rem;">Mover acima</q-tooltip>
          </q-btn>
          <q-btn dense flat size="sm" icon="south" v-if="props.pageIndex != rows.length - 1 && rows[props.pageIndex + 1]"
            @click="moveParaBaixo(props)">
            <q-tooltip class="bg-secondary" style="font-size:1rem;">Mover abaixo</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template #body-cell-ativo="props">
        <q-td :props="props">
          <q-checkbox :disable="props.row.nome != undefined ? disableCheckbox(props.row.id) : false" size="sm"
            v-model="props.row.ativo" @update:model-value="update(props.row)" />
        </q-td>
      </template>

      <template #body-cell-calendario="props">
        <q-td auto-width :props="props">
          <q-btn dense flat icon="calendar_month" @click="selectEstabelecimento(props.row.id)" />
          <q-dialog v-model="showCalendar" @hide="closeCalendar" transition-show="none">
            <q-card>
              <q-card-section>
                <Calendario />
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-td>
      </template>

      <template #body-cell-downloadArquivo="props">
        <q-td auto-width :props="props">
          <q-btn dense flat icon="cloud_download" :href="props.row.uri" padding="none">
            <q-tooltip class="bg-secondary" style="font-size:1rem;">Download</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template #body-cell-reenviarNotificacao="props">
        <q-td auto-width :props="props">
          <q-btn dense flat icon="send" @click="this.$emit('notificar', props.key)" padding="none">
            <q-tooltip class="bg-secondary" style="font-size:1rem;">Reenviar notificação</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template #body-cell-acoes="props">
        <q-td auto-width :props="props">
          <q-btn v-if="this.$route.path != '/categorias' && this.$route.path != '/empresas'" dense flat icon="info"
            @click="this.$router.push(this.$route.path + '/detalhe/' + props.key)" padding="none">
            <q-tooltip class="bg-secondary" style="font-size:1rem;">Detalhar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="build" @click="this.$router.push(this.$route.path + '/editar/' + props.key)"
            padding="none">
            <q-tooltip class="bg-secondary" style="font-size:1rem;">Editar</q-tooltip>
          </q-btn>
          <q-btn v-if="props.row.ativo == null && this.$router.currentRoute._value.path !== '/tickets' && nivelAcesso"
            dense flat icon="delete" @click="deleteItem(props.key)" padding="none">
            <q-tooltip class="bg-secondary" style="font-size:1rem;">Excluir</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template #bottom>
        <div v-if="!mostrarFiltros" class="flex items-center justify-evenly" style="width:100%;">
          <div style="width: 50%" class="flex items-baseline">
            <p style="margin-right: 10px;">Registros por página:</p>
            <q-select flat dense borderless v-model="this.pagination.rowsPerPage"
              @update:model-value="this.consultar(this.pagination)" :options="rowsPerPage"
              options-selected-class="bg-blue-8 text-white" />
          </div>

          <div>
            <q-pagination color="black" v-model="this.pagination.page"
              @update:model-value="this.consultar(this.pagination)"
              :max="Math.ceil(this.pagination.rowsNumber / this.pagination.rowsPerPage)" :max-pages="10"
              :boundary-numbers="false" />
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>

