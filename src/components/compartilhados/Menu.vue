<script>
import EstabelecimentoService from "@/api-services/estabelecimento.service.js";
export default {
  name: "Menu",
  computed: {
    isMenuVisible() {
      return this.$store.state.menu.isMenuVisible;
    }
  },
  data() {
    return {
      estabelecimento: {},
      tipoAcesso: 0,
      nivelAcesso: 0,
      usuarioEstabelecimentosId: [],
      iconCadastro: "chevron_right",
      iconAtendimento: "chevron_right",
      iconRelatorio: "chevron_right",
      link: "",
      treeFilter: "",
      treeFiltered: [],
      treeDataEscritorioSupervisor: [
        {          
          text: "Estabelecimentos",
          parent: "Cadastro",
          data: { nome: "/estabelecimentos" },
          id: 1
        }
      ],
      semFiltro: "Palavra não encontrada!"
    };
  },

  methods: {
    onNodeSelected(node) {
      if (typeof node.id === "number") {
        this.$router
          .push({
            name: node.data.nome,
            params: { id: node.id }
          })
          .catch(() => {});
        if (this.$mq === "xs" || this.$mq === "sm") {
          this.$store.commit("toggleMenu", false);
        }
      }
      if (node.text === "BPO") {
        window.open("http://" + this.link, "_blank");
        this.$router.go(-1);
      }
      node.unselect();
    },
    expand(e = "", node = "") {
      if (e !== "") {
        node = e.target.innerText;
      }
      if (node.includes("chevron_right Cadastro")) {
        this.iconCadastro = "expand_more";
        let nodeList = document.getElementsByClassName("Cadastro");
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.display = "block";
        }
      } else if (node.includes("expand_more Cadastro")) {
        this.iconCadastro = "chevron_right";
        let nodeList = document.getElementsByClassName("Cadastro");
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.display = "none";
        }
      } else if (node.includes("chevron_right Atendimento")) {
        this.iconAtendimento = "expand_more";
        let nodeList = document.getElementsByClassName("Atendimento");
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.display = "block";
        }
      } else if (node.includes("expand_more Atendimento")) {
        this.iconAtendimento = "chevron_right";
        let nodeList = document.getElementsByClassName("Atendimento");
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.display = "none";
        }
      } else if (node.includes("chevron_right Relatório")) {
        this.iconRelatorio = "expand_more";
        let nodeList = document.getElementsByClassName("Relatório");
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.display = "block";
        }
      } else if (node.includes("expand_more Relatório")) {
        this.iconRelatorio = "chevron_right";
        let nodeList = document.getElementsByClassName("Relatório");
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.display = "none";
        }
      }
    },
    redirect(data) {
      if (data.text != "BPO") {
        this.$router.push(data.data.nome);
      } else {
        EstabelecimentoService.consultar(
          window.localStorage.getItem("estabelecimentoSelecionado")
        ).then(response => {
          if (response.data.linkBpo != null) {
            this.$q
              .dialog({
                title: "Atenção",
                message:
                  "Você será redirecionado para " + response.data.linkBpo,
                cancel: true,
                persistent: true
              })
              .onOk(() => {
                window.location.href = response.data.linkBpo;
              });
          } else {
            this.$q.dialog({
              title: "Atenção",
              message: "Este estabelecimento não possui um Link BPO cadastrado."
            });
          }
        });
      }
    },
    arrayIsEmpty(arr) {
      let array = Object.values(arr);
      let count = array.length - 1;
      for (let i = 0; i < array.length; i++) {
        if (array[i] !== undefined) {
          if (array[i].length > 0) {
            count--;
          }
        }
      }
      return count !== array.length - 1 ? true : false;
    }
  },
};
</script>
  

<template>
  <div class="menu" v-show="isMenuVisible">
    <div style="margin-bottom: 10px;"></div>
    <aside v-show="isMenuVisible" >
      <div class="tree-menu">
        <div v-for="data in treeDataEscritorioSupervisor" :key="data.id">
          <div v-if="data.children" @click="expand($event)" class="tree-parent">
            <q-icon
              @click="expand('', iconAtendimento + ' Atendimento')"
              v-if="data.text === 'Atendimento'"
              :name="iconAtendimento"
            />
            <q-icon
              @click="expand('', iconCadastro + ' Cadastro')"
              v-else-if="data.text === 'Cadastro'"
              :name="iconCadastro"
            />
            <q-icon
              @click="expand('', iconRelatorio + ' Relatório')"
              v-else-if="data.text === 'Relatório'"
              :name="iconRelatorio"
            />
            {{ data.text }}
            <div
              v-for="child in data.children"
              :key="child.id"
              @click="this.$router.push(child.data.nome)"
              class="tree-child"
              :class="child.parent"
              style="margin-left:25px;"
            >{{ child.text }}</div>
          </div>

          <div
            v-else
            class="tree-parent"
            @click="this.$router.push(data.data.nome)"
            style="margin-left:25px;"
          >
            {{
            data.text
            }}
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.tree-parent {
  font-size: 16px;
  margin-left: 5px;
  color: #fff;
}

.tree-child {
  font-size: 14px;
  margin-left: 2px;
  color: #fff;
}

.tree-parent:hover,
.tree-child:hover {
  cursor: pointer;
  color: #aaa;
}

.estabelecimentoMenu {
  color: #fff;
  text-decoration: none;
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.tree-arrow.has-child {
  filter: brightness(2);
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 10px;
}

.menu input {
  color: #ccc;
  font-size: 1rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}

.tree-filter-empty {
  color: #ccc;
  margin-left: 20px;
  font-size: 1.3rem;
}

.menu-improvisado {
  color: white;
}

.menu-improvisado:hover {
  cursor: pointer;
  color: #aaa;
}

.Relatório,
.Cadastro,
.Atendimento,
.Relatório {
  display: none;
}
</style>