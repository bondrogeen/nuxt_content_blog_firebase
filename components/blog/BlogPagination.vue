<template>
  <div class="d-flex">
    <v-btn
      v-if="page >= 2"
      class="font-weight-black"
      color="grey darken-4"
      text
      @click="$router.back()"
    >
      Prev
    </v-btn>
    <v-spacer />
    <v-btn
      v-if="next"
      class="font-weight-black"
      color="grey darken-4"
      text
      :to="`/page/${page + 1}`"
    >
      Next
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 2
    },
    next: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prevLink () {
      return this.page === 2 ? '/' : `/page/${this.page - 1}`
    }
  },
  methods: {
    num (i) {
      this.$emit('input', i)
    }
  }
}
</script>
