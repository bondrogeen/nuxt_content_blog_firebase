<template>
  <div class="d-flex" @click="click">
    <v-rating
      v-model="rating"
      :color="color"
      dense
      half-increments
      hover
      :readonly="!isUser"
    />
    <span class="mr-5 d-flex align-center">
      ({{ (sum).toFixed(1) }}) / {{ total }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
      isUser: 'auth/isUser',
      userRating: 'rating/getUserRating',
      sum: 'rating/getSumRating',
      total: 'rating/getTotalRating'
    }),
    color () {
      return (this.userRating(this.user)) ? 'yellow accent-4' : 'grey accent-4'
    },
    rating: {
      get () {
        return this.userRating(this.user) || this.sum
      },
      set (value) {
        this.$store.dispatch('rating/send', { title: this.title, value })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.refresh()
    }, 1000)
  },
  methods: {
    async refresh () {
      this.isLoad = false
      await this.$store.dispatch('rating/get', { title: this.title }).then(() => {
        this.isLoad = true
      })
    },
    click () {
      if (!this.isUser) {
        this.$store.dispatch('message/setMessage', { error: 'May vote only to registered users' })
      }
    }
  }
}
</script>
