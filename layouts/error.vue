<template>
  <div class="col-12 notfound text-center">
    <h1>
      4
      <span class="primary--text">
        0
      </span>
      4
    </h1>
    <h2>
      {{ (error.statusCode === 404) ? pageNotFound : otherError }}
    </h2>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      pageNotFound: 'Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>

.notfound h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 165px;
  font-weight: 700;
  margin: 0px;
  color: #262626;
  text-transform: uppercase;
}

.notfound h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 400;
  text-transform: uppercase;
  color: #151515;
  margin-top: 0px;
  margin-bottom: 25px;
}

</style>
