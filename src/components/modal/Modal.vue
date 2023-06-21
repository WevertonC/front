
<script>
export default {
  props: ["modal", "categorias", "categoriaId", "usuarios", "usuariosIds"]
};
</script>

<template>
  <q-dialog
    v-model="modal.open"
    persistent
  >
    <q-card v-if="this.$router.currentRoute._value.path.includes('/tickets/detalhe/') && this.modal.action === 'create'">
      <q-card-section>
        <div class="text-h6">{{modal.title}}</div>
      </q-card-section>

      <q-card-section>
        <q-select
          required
          outlined
          dense
          v-model="categoriaId"
          :options="categorias"
          option-value="value"
          option-label="text"
          map-options
          emit-value
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar" color="primary" flat v-close-popup />
        <q-btn
          label="Selecionar"
          color="primary"
          @click="this.$emit('categoriaId', this.categoriaId)"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="this.$router.currentRoute._value.path.includes('/arquivos') && this.modal.action === 'create'">
      <q-card-section>
        <div class="text-h6">{{modal.title}}</div>
      </q-card-section>

      <q-card-section>
        <q-select
          required
          outlined
          dense
          v-model="usuariosIds"
          :options="usuarios"
          option-value="value"
          option-label="text"
          multiple
          map-options
          emit-value
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar" color="primary" flat v-close-popup />
        <q-btn
          label="Selecionar"
          color="primary"
          @click="this.$emit('usuariosIds', this.usuariosIds,)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
</style>