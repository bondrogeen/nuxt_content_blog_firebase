<template>
  <v-menu v-model="menu" close-on-click offset-x>
    <template v-slot:activator="{on}">
      <v-badge :value="false" dot overlap class="mr-1">
        <v-avatar left size="35" v-on="on">
          <v-img :src="user.avatar || '/img/avatar-0.png'" />
        </v-avatar>
        <v-icon v-on="on">
          mdi-menu-down
        </v-icon>
      </v-badge>
    </template>
    <v-card class="mx-auto" tile>
      <v-list flat>
        <v-list-item to="/profile">
          <v-list-item-action>
            <v-avatar left size="35">
              <v-img :src="(user.avatar || '/img/avatar-0.png')" />
            </v-avatar>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="title" color="primary">
              {{ fullName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.admin ? 'Admin' : 'Guest' }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list dense>
        <template v-for="(menu, i) in menus">
          <v-list-item :key="i" color="primary" @click="click(menu.type)">
            <v-list-item-icon>
              <v-icon>
                {{ menu.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ menu.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Util from '@/util'
export default {
  data: () => ({
    menu: false,
    fullScreen: false,
    menus: [
      { title: 'Profile', icon: 'mdi-account-box-multiple', type: 'profile' },
      { title: 'Fullscreen', icon: 'mdi-fullscreen', type: 'fullscreen' },
      { title: 'Logout', icon: 'mdi-exit-to-app', type: 'logout' }
    ]
  }),
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      fullName: 'auth/getFullName'
    })
  },
  methods: {
    click (type) {
      if (type === 'logout') { this.$store.dispatch('auth/logout') }
      if (type === 'fullscreen') {
        this.fullScreen = !this.fullScreen
        Util.toggleFullScreen(this.fullScreen)
      }
      if (type === 'profile') { this.$router.push('/profile') }
    }
  }
}
</script>
