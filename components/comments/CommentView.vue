<template>
  <div class="d-flex mt-5">
    <div class="col col-1 pa-0">
      <v-badge
        :value="!(comment.verified)"
        bordered
        bottom
        color="deep-purple accent-4"
        dot
        offset-x="10"
        offset-y="10"
      >
        <v-avatar class="mt-3" size="35">
          <v-img :src="comment.avatar || '/img/avatar-0.png'" />
        </v-avatar>
      </v-badge>
    </div>
    <v-hover v-slot="{ hover }">
      <div class="col pa-0">
        <v-divider class="mx-4 mt-2" />
        <v-col class="d-flex pb-0" cols="12">
          <strong>
            {{ comment.name }}
          </strong>
          <v-spacer />
          <nuxt-link v-if="user.admin" class="caption mt-1 mr-3" :to="`/posts/${comment.title}`">
            {{ comment.title }}
          </nuxt-link>
          <v-menu v-if="user.admin" bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                small
                :color="hover ? 'indigo' : 'grey'"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in menus" :key="item.type + i">
                <v-list-item-title @click="clickMenu(comment.title, id, item.type)">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col class="py-0" cols="12">
          <p
            v-if="reply"
            class="caption ow font-italic text--secondary mb-1"
          >
            <strong>
              {{ reply.name }} -
            </strong>
            &#8220;{{ reply.comment }}&#8221;
          </p>
          <p class="ow text-subtitle-2 mb-2">
            {{ comment.comment }}
          </p>
        </v-col>
        <v-col class="d-flex py-0" cols="12">
          <v-btn v-if="isUser" text small color="primary" @click="open = !open">
            Answer
          </v-btn>
          <v-spacer />
          <span class="py-0 grey--text caption">{{
            comment.timestamp | timeAgo
          }}</span>
        </v-col>
        <v-col v-if="open" cols="12">
          <slot name="edit" />
        </v-col>
      </div>
    </v-hover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    comment: {
      type: Object,
      default: () => {}
    },
    reply: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      open: false,
      menus: [
        { title: 'Approved', type: 'approved' },
        { title: 'Remove', type: 'remove' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      isUser: 'auth/isUser'
    })
  },
  methods: {
    clickMenu (title, key, type) {
      if (type === 'remove') {
        this.$store.dispatch('comment/remove', { title, key })
      }
      if (type === 'approved') {
        this.$store.dispatch('comment/approved', { title, key, value: true })
      }
    }
  }
}
</script>

<style scoped>
.ow {
  word-wrap: break-word;
  hyphens: auto;
}
.hover {
  transition: opacity 0.7s ease-in-out;
}
.hover:not(.on-hover) {
  opacity: 0.9;
}
</style>
