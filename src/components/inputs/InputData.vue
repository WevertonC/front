<script>
export default {
  props: ["label", "modelValue", "ref", "rules"],
  emits: ['update:modelValue'],
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
    resetComponent() {
      this.$refs.ref.resetValidation();
    }
  }
}
</script>
<template>
  <q-input v-if="label[label.lastIndexOf('') - 1] == '*'" ref="ref" :label="label" v-model="value" stack-label
    type="date" outlined dense hide-bottom-space
    :rules="[val => !!val || `O campo ${label.substring(0, label.length - 1)} é obrigatório`]">
    <q-tooltip v-if="value == null || value == ''" class="bg-secondary" style="font-size: 1rem">
      Digite ou clique no calendário para selecionar uma data
    </q-tooltip>
  </q-input>
  <q-input v-else ref="ref" :label="label" v-model="value" stack-label type="date" outlined dense hide-bottom-space>
    <q-tooltip v-if="value == null || value == ''" class="bg-secondary" style="font-size: 1rem">
      Digite ou clique no calendário para selecionar uma data
    </q-tooltip>
  </q-input>
</template>