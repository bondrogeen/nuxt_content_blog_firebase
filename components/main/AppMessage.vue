<template>
  <v-snackbar
    v-model="snackbar"
    right
    top
    outlined
    :color="color"
    text
  >
    {{ message }}
    <template #action="{ attrs }">
      <v-btn plain icon v-bind="attrs" @click="snackbar = false">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    message () {
      return (this.$store.getters['message/getMessage'])
    },
    color () {
      return (this.$store.getters['message/getColor'])
    },
    snackbar: {
      get () {
        return this.$store.getters['message/getSnackbar']
      },
      set (value) {
        this.$store.dispatch('message/setSnackbar', value)
      }
    }
  }
}
</script>
