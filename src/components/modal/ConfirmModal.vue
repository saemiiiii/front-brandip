<template>
  <v-dialog v-model="modal">
    <v-card>
      <p> {{ message }}</p>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    modal: Boolean,
    message: String
  },
  computed: {
    getDialog: {
      get() {
        return this.modal;
      },
      set(value) {
        this.$emit('setDate', value)
      }
    },
    getMessage: {
      get() {
        return this.message;
      },
      set(value) {
        this.$emit('setDate', value)
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  }
}
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>