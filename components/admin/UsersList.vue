<template>
  <div>
    <v-row>
      <v-col v-if="!isLoad" cols="12">
        <v-skeleton-loader
          elevation="2"
          type="article, list-item-avatar-three-line, list-item-avatar-three-line"
        />
      </v-col>
      <v-col v-else cols="12">
        <v-toolbar flat>
          <v-toolbar-title>
            Users
          </v-toolbar-title>
          <v-spacer />
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-badge
                :value="search"
                color="deep-purple accent-4"
                dot
              >
                <v-btn icon small class="ml-1" v-on="on">
                  <v-icon>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </v-badge>
            </template>
            <div class="d-flex flex-no-wrap justify-space-between pa-3 pt-0 white">
              <v-text-field
                v-model="search"
                hide-details
                prepend-inner-icon="mdi-magnify"
                placeholder="Поиск"
                single-line
                clearable
              />
            </div>
          </v-menu>
          <v-btn icon @click="edit = !edit">
            <v-icon>
              mdi-check-box-multiple-outline
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-list v-if="length" two-line flat>
          <template v-for="(user, key, index) in sort">
            <v-hover :key="`hover${key}`" v-slot="{ hover }">
              <v-list-item :key="key">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar tile>
                    <v-badge
                      :value="!user.verified"
                      bordered
                      bottom
                      color="deep-purple accent-4"
                      dot
                      offset-x="10"
                      offset-y="10"
                    >
                      <v-avatar size="40">
                        <v-img :src="user.avatar || '/img/avatar-0.png'" />
                      </v-avatar>
                    </v-badge>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ fullName(user) }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text--primary">
                      {{ user.email }}
                    </v-list-item-subtitle>
                    <v-hover v-slot="{ hover:date }">
                      <v-list-item-subtitle v-if="date">
                        {{ (user.admin ? 'Admin' : 'Guest') }}
                        {{ user.create | formatDate }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-else>
                        {{ (user.admin ? 'Admin' : 'Guest') }}
                        {{ user.lastLogin | formatDate }}
                      </v-list-item-subtitle>
                    </v-hover>
                  </v-list-item-content>
                  <v-list-item-action v-if="!edit">
                    <v-list-item-icon class="ma-0">
                      <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" icon :color="hover ? 'indigo' : 'grey lighten-1'" v-on="on">
                            <v-icon>
                              mdi-dots-vertical
                            </v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item v-for="(item, i) in menus(user)" :key="i">
                            <v-list-item-title @click="action(key,item.key)">
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-list-item-icon>
                  </v-list-item-action>
                  <v-list-item-action v-else>
                    <v-checkbox :input-value="active" />
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-hover>
            <v-divider v-if="index < length - 1" :key="index" />
          </template>
        </v-list>
        <div v-else class="text-center">
          No users
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    edit: false,
    isLoad: false,
    search: ''
  }),
  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    }),
    sort () {
      const search = this.search
      return Object.fromEntries(Object.entries({ ...this.users }).filter((arr) => {
        return search ? arr[1].name.toLowerCase().includes(search.toLowerCase()) ||
          (arr[1].surname ? arr[1].surname.toLowerCase().includes(search.toLowerCase()) : false) ||
          arr[1].email.toLowerCase().includes(search.toLowerCase()) : true
      }))
    },
    length () {
      return (Object.keys(this.sort).length)
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.$store.dispatch('user/refresh').then(() => {
        this.isLoad = true
      })
    },
    menus (user) {
      return [
        { title: (user.admin ? 'Guest' : 'Admin'), key: 'admin' },
        { title: (user.verified ? 'Not approved' : 'Approved'), key: 'verified' }
      ]
    },
    fullName ({ name, surname }) {
      return `${(name) || ''} ${(surname) || ''}`
    },
    action (uid, key) {
      const value = !this.users[uid][key]
      this.$store.dispatch('user/right', { uid, key, value })
    }
  }
}
</script>
