<template>
  <div class="img">
    <img :src="imgSrc()" :alt="alt">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  methods: {
    imgSrc () {
      try {
        const { post } = this.$parent
        return require(`~/content${post.dir}/images/${this.src}`)
      } catch (error) {
        return null
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
