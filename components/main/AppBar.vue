<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon v-if="user.admin" @click.stop="menu = !menu" />
    <v-toolbar-title class="text-uppercase grey--text">
      <nuxt-link to="/">
        <img src="/img/logo.png" class="d-flex" height="45">
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      v-if="!isUser"
      to="/login"
      class="ma-2"
      text
      plain
      color="black"
    >
      Sing in
    </v-btn>
    <BottonSing v-else />
  </v-app-bar>
</template>

<script>
import BottonSing from '@/components/main/BottonSing'

export default {
  components: {
    BottonSing
  },
  data: () => ({}),
  computed: {
    user () {
      return this.$store.getters['auth/getUser']
    },
    isUser () {
      return this.$store.getters['auth/isUser']
    },
    menu: {
      get () {
        return this.$store.getters['settings/getDrawerMenu']
      },
      set (value) {
        this.$store.dispatch('settings/setDrawerMenu', value)
      }
    }
  }
}
</script>

<style scoped>
</style>
