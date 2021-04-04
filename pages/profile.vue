<template>
  <div>
    <v-card>
      <v-img
        height="200px"
        src="/img/server-room.jpg"
        gradient="to top right, rgba(100,115,201,.72), rgba(25,32,72,.97)"
      >
        <v-app-bar flat color="rgba(0, 0, 0, 0)">
          <v-toolbar-title class="title white--text pl-0">
            Profile
          </v-toolbar-title>
          <v-spacer />
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title @click="logout(item.type)">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
        <v-card-title class="pa-2">
          <v-row>
            <v-col align-self="start" class="pa-5" cols="3">
              <v-hover>
                <template #default="{ hover }">
                  <v-avatar class="profile" color="grey" size="100">
                    <v-img :src="user.avatar || '/img/avatar-0.png'" />
                    <v-fade-transition>
                      <v-overlay v-if="!user.avatar || hover" absolute color="#036358">
                        <v-file-input
                          class="ml-3 mb-5"
                          hide-input
                          accept="image/png, image/jpeg, image/bmp"
                          prepend-icon="mdi-camera-plus"
                          @change="onFile"
                        />
                      </v-overlay>
                    </v-fade-transition>
                  </v-avatar>
                </template>
              </v-hover>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    {{ fullName }}
                  </v-list-item-title>
                  <span class="text-subtitle-1">
                    {{ user.email }}
                  </span>
                  <span class="caption">
                    {{ user.admin ? 'Admin' : 'Guest' }}
                  </span>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-title>
      </v-img>
      <v-card-text class="py-0">
        <v-form>
          <v-container grid-list-xl>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="user.name"
                  color="blue-grey lighten-2"
                  label="Name"
                  :disabled="processing"
                  class="purple-input"
                />
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="user.surname"
                  color="blue-grey lighten-2"
                  label="Surname"
                  :disabled="processing"
                  class="purple-input"
                />
              </v-flex>
              <v-flex xs12 class="text-right">
                <v-btn
                  class="mx-0 font-weight-light"
                  color="success"
                  :loading="processing"
                  :disabled="processing"
                  @click="update(user)"
                >
                  Edit
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  middleware: 'auth',
  data () {
    return {
      items: [
        { title: 'Logout', type: 'logout' }
      ],
      image: {
        type: Object,
        default: () => {}
      },
      processing: false
    }
  },
  computed: {
    fullName () {
      const { name, surname } = this.user
      return `${name || ''} ${surname || ''}`
    },
    user () {
      return Object.assign({}, this.$store.getters['auth/getUser'])
    }
  },
  methods: {
    update ({ uid, name, surname }) {
      this.processing = true
      const user = {
        name: name || '',
        surname: surname || ''
      }
      this.$store.dispatch('auth/update', { uid, image: this.image, user })
        .then(() => {
          this.processing = false
        })
        .catch(() => {
          this.processing = false
        })
    },
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
    onFile (file) {
      if (file.size <= 200000) {
        this.image = file
        this.user.avatar = URL.createObjectURL(file)
      } else {
        this.$store.dispatch('message/setMessage', { error: 'Не более 200kB' })
      }
    }
  },
  head () {
    return {
      title: `${this.$config.title}, профиль`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.$config.description}`
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.baseURL}/profile`
        }
      ]
    }
  }
}
</script>
