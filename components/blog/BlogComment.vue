<template>
  <div class="mb-10">
    <div class="caption text-center text--disabled">
      Before leaving a comment, please read the commenting rules. By leaving a comment, you confirm your agreement with these rules and understand the possible responsibility for their violation.
      All comments will be moderated.
    </div>
    <CommentEdit :title="title">
      Leave a comment
    </CommentEdit>
    <v-skeleton-loader
      v-if="!isLoad"
      type="list-item-two-line, list-item-two-line"
    />
    <div v-for="(comment, key) in comments" v-else :key="key">
      <CommentView :id="key" :reply="reply(comment.reply)" :comment="comment">
        <template v-slot:edit>
          <CommentEdit :id="key" :title="comment.title" />
        </template>
      </CommentView>
    </div>
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
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      comments: 'comment/getComments'
    })
  },
  mounted () {
    setTimeout(() => {
      this.refresh()
    }, 1000)
  },
  methods: {
    async refresh () {
      this.isLoad = false
      await this.$store.dispatch('comment/get', { title: this.title }).then(() => {
        this.isLoad = true
      })
    },
    reply (key) {
      return this.comments[key]
    }
  }
}
</script>
