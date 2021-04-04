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
            Сomments
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
        </v-toolbar>
        <div v-if="length">
          <template v-for="(comment, key) in sort">
            <CommentView :id="key" :key="key" :reply="reply(comment.reply)" :comment="comment">
              <template v-slot:edit>
                <CommentEdit :id="key" :title="comment.title">
                  Аnswer
                </CommentEdit>
              </template>
            </CommentView>
          </template>
        </div>
        <div v-else class="text-center">
          No comments
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentView from '@/components/comments/CommentView'
import CommentEdit from '@/components/comments/CommentEdit'
export default {
  components: {
    CommentView,
    CommentEdit
  },
  data: () => ({
    search: '',
    isLoad: false
  }),
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      comments: 'comment/getComments'
    }),
    sort () {
      const search = this.search
      return Object.fromEntries(Object.entries({ ...this.comments }).filter((arr) => {
        return search ? arr[1].name.toLowerCase().includes(search.toLowerCase()) ||
          arr[1].comment.toLowerCase().includes(search.toLowerCase()) : true
      }).reverse())
    },
    length () {
      return (Object.keys(this.sort).length)
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    async refresh () {
      this.isLoad = false
      await this.$store.dispatch('comment/getAll').then(() => {
        this.isLoad = true
      })
    },
    reply (key) {
      return this.comments[key]
    }
  }
}
</script>
