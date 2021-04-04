<template>
  <v-navigation-drawer v-model="menu" fixed app :disable-resize-watcher="!user.admin">
    <v-list dense>
      <v-list-item>
        <v-list-item-avatar tile>
          <img src="/img/CD.png">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            My blog
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar right>
          <v-btn icon @click.stop="menu = !menu">
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </v-list-item-avatar>
      </v-list-item>
      <v-divider />
      <v-subheader>
        Administration
      </v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" router :to="item.path">
          <v-list-item-avatar tile>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppDarwerMenu',
  data () {
    return {
      miniVariant: false,
      items: [
        { title: 'Users', icon: 'mdi-account-multiple', path: '/admin/users' },
        { title: 'Comments', icon: 'mdi-comment-text-multiple-outline', path: '/admin/comments' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters['auth/getUser']
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
