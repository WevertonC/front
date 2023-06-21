<script>
import EstabelecimentoService from "@/api-services/estabelecimento.service";
import TabelaQuasar from "@/components/Tabela/TabelaQuasar.vue";
import RotinasService from "@/api-services/rotinas.service.js";
import Calendario from "@/components/calendario/FullCalendar.vue";
import ArquivoService from "@/api-services/arquivo.service";
import EmpresaService from "@/api-services/empresa.service";
export default {
  components: { TabelaQuasar, Calendario},
  data() {
    return {
      columns: [
        {
          id: 0,
          name: "empresa",
          label: "Empresa",
          field: "empresa",
          sortable: true,
          align: "left",
          headerStyle: "font-size: 1.1rem"
        },
        {
          id: 1,
          name: "estabelecimento",
          label: "Estabelecimento",
          field: "estabelecimento",
          sortable: true,
          align: "left",
          headerStyle: "font-size: 1.1rem",
          format: val => this.formatCnpjCpf(val)
        },
        {
          id: 2,
          name: "nickname",
          label: "Nickname",
          field: "nickname",
          sortable: true,
          align: "left",
          headerStyle: "font-size: 1.1rem"
        },
        {
          id: 3,
          name: "telefone",
          label: "Telefone",
          field: "telefone",
          sortable: true,
          align: "left",
          headerStyle: "font-size: 1.1rem"
        },
        {
          id: 4,
          name: "email",
          label: "E-mail",
          field: "email",
          sortable: true,
          align: "left",
          headerStyle: "font-size: 1.1rem",
          format: val => (val = val.replace(/;/g, ", "))
        },
        {
          id: 5,
          name: "ativo",
          label: "Ativo",
          field: "ativo",
          sortable: true,
          align: "center",
          headerStyle: "font-size: 1.1rem"
        },
        {
          name: "calendario",
          label: "Calendário",
          field: "calendario",
          align: "center",
          headerStyle: "font-size: 1.1rem"
        },
        {
          name: "acoes",
          label: "Ações",
          align: "center",
          headerStyle: "font-size: 1.1rem"
        }
      ],
      rows: [],
      titleTable: "Estabelecimentos",
      pagination: {
        sortBy: "id",
        descending: "true",
        page: 1,
        rowsPerPage: 10,
        rowsNumber: null
      },
      loading: true,
      mostrarFiltros: false,
      rowsPerPage: [1, 5, 10, 20, 50, 100],
      filters: {
        empresa: "",
        estabelecimento: "",
        nickname: "",
        telefone: "",
        email: "",
        ativo: ""
      },
      filterArray: ["", "", "", "", "", ""],
      showCalendar: false,
      empresas: []
    };
  },
  methods: {
    consultar(obj) {
      this.loading = true;
      RotinasService.transformInToFormObjectWithFile(obj);
      EmpresaService.listarCombo().then(response => {
        this.empresas = response.data.empresas;
      });
      EstabelecimentoService.listar({
        nomeColunaOrdem: obj.sortBy,
        ordem: obj.descending,
        page: obj.page,
        size: obj.rowsPerPage,
        filtroArray: this.filterArray
      })
        .then(response => {
          this.rows = response.data["estabelecimentos"];
          obj.rowsNumber = response.data["totalDeRegistros"];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    filtersOn() {
      if (this.mostrarFiltros) {
        this.pagination.rowsPerPage = 10;
        this.filters.empresa = "";
        this.filters.estabelecimento = "";
        this.filters.nickname = "";
        this.filters.telefone = "";
        this.filters.email = "";
        this.filters.ativo = "";
        this.filterArray[0] = "";
        this.filterArray[1] = "";
        this.filterArray[2] = "";
        this.filterArray[3] = "";
        this.filterArray[4] = "";
        this.filterArray[5] = "";
        this.mostrarFiltros = !this.mostrarFiltros;
        return this.consultar(this.pagination);
      } else {
      }
      this.mostrarFiltros = !this.mostrarFiltros;
      this.pagination.rowsPerPage = this.rowsNumberFilter;
      this.consultar(this.pagination);
    },
    onEnter(params, index) {
      this.filterArray[index] = this.filters[params];
      this.consultar(this.pagination);
    },
    update(row) {
      for (let i in this.rows) {
        if (row.id == this.rows[i].id) {
          this.rows[i].ativo = row.ativo;
          EstabelecimentoService.atualizarAtivoGrid(row.id, this.rows[i]).then(
            response => {
              this.consultar(this.pagination);
            }
          );
        }
      }
      this.$q.notify({
        type: "positive",
        message: "Operação concluída com sucesso!",
        position: "top-right"
      });
    },
    selectEstabelecimento(id) {
      ArquivoService.listarCalendario(id)
        .then(response => {
          this.events = response.data["events"];
        })
        .finally(() => {
          this.showCalendar = true;
        });
    },
    closeCalendar() {
      this.showCalendar = false;
    },
    formatCnpjCpf(est) {
      est = est.split("").reverse();
      let cnpjCpf = est.splice(
        0,
        est.findIndex(e => e === " ")
      );
      if (cnpjCpf.length == 11) {
        cnpjCpf.splice(8, 0, ".");
        cnpjCpf.splice(5, 0, ".");
        cnpjCpf.splice(2, 0, "-");
      } else if (cnpjCpf.length == 14) {
        cnpjCpf.splice(2, 0, "-");
        cnpjCpf.splice(7, 0, "/");
        cnpjCpf.splice(11, 0, ".");
        cnpjCpf.splice(15, 0, ".");
      }
      cnpjCpf = cnpjCpf.reverse().join("");
      est.splice(
        0,
        est.findIndex(e => e === " "),
        cnpjCpf
      );
      est = est.reverse().join("");
      return est;
    }
  },
  computed: {
    events: {
      get() {
        return this.$store.state.calendario.events;
      },
      set(valor) {
        this.$store.commit("setEvents", valor);
      }
    }
  },
  mounted() {
    RotinasService.transformInToFormObjectWithFile(this.pagination);
    this.consultar(this.pagination);
  }
};
</script>
<template>
  <div>
    <q-card>
      <q-card-section>
        <TabelaQuasar
          :columns="columns"
          :rows="rows"
          :pagination="pagination"
          :titleTable="titleTable"
          :filters="filters"
          :filterArray="filterArray"
          :mostrarFiltros="mostrarFiltros"
          :rowsPerPage="rowsPerPage"
          :loading="loading"
          :consultar="consultar"
          :filtersOn="filtersOn"
          :onEnter="onEnter"
          :update="update"
          :selectEstabelecimento="selectEstabelecimento"
          :showCalendar="showCalendar"
          :closeCalendar="closeCalendar"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
</style>