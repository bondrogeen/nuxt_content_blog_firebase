<template>
  <div>
    <v-list dense>
      <v-subheader class="text-h5 font-weight-black d-flex justify-center">
        Recent posts
      </v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(post, i) in posts" :key="i" router :to="post.dir">
          <v-list-item-content>
            <v-list-item-title>{{ post.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ post.date | formatDate }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-skeleton-loader v-if="!isLoad" type="list-item-two-line, list-item-two-line, list-item-two-line" />
  </div>
</template>

<script>
export default {
  data: () => ({
    posts: {},
    isLoad: false
  }),
  async created () {
    const posts = await this.$content('posts', { deep: true }).sortBy('date', 'desc').limit(5).fetch()
    this.posts = posts
    this.isLoad = true
  }
}
</script>
