<template>
  <div>
    <div class="d-flex">
      <v-avatar class="mt-5" size="35">
        <v-img :src="user.avatar || '/img/avatar-0.png'" />
      </v-avatar>
      <v-form ref="form" class="col pa-0">
        <v-textarea
          v-model="comment"
          :rules="[rules.length(6)]"
          class="mx-2"
          rows="3"
          counter
          :loading="processing"
          auto-grow
          :disabled="!isUser"
          validate-on-blur
          :placeholder="isUser ? 'Leave your comment ...' : 'Login or register'"
          prepend-inner-icon="mdi-comment"
          @click="start = true"
        />
      </v-form>
    </div>
    <div v-if="start" class="d-flex justify-end">
      <v-btn text small color="black" @click="send">
        <slot>
          Answer
        </slot>
      </v-btn>
    </div>
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
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      start: false,
      comment: '',
      processing: false,
      rules: {
        length: len => v => (v || '').length >= len || `less than ${len} characters`
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      isUser: 'auth/isUser'
    })
  },
  methods: {
    send () {
      if (this.$refs.form.validate()) {
        this.processing = true
        this.$store.dispatch('comment/send', { title: this.title, comment: this.comment, reply: this.id })
          .then(() => {
            this.$refs.form.reset()
            this.start = false
            this.processing = false
          })
      }
    }
  }
}
</script>
