<template>
  <div class="row elevation-2 mb-5">
    <div class="col col-4 d-none d-sm-flex align-center pa-0">
      <v-img-blog class="img" :src="post.image" :alt="post.dir" />
    </div>
    <div class="col">
      <div class="d-flex">
        <h3>
          <nuxt-link :to="post.dir" class="heading">
            {{ post.title }}
          </nuxt-link>
        </h3>
        <v-spacer />
        <LinkShare :url="this.$config.baseURL + post.dir" :title="post.title" />
      </div>
      <div class="text--primary mt-3">
        {{ post.description }}
      </div>
      <v-divider class="mx-4 my-2" />
      <div class="d-flex">
        <div class="caption text--disabled d-flex align-center">
          {{ post.date | formatDate }}
        </div>
        <v-spacer />
        <v-btn color="deep-purple lighten-2" text :to="post.dir">
          Go
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import LinkShare from '~/components/general/LinkShare'
export default {
  components: {
    LinkShare
  },
  props: {
    post: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: aliceblue;
}
.post {
  border-radius: 8px;
  box-shadow: 1px 1px 10px 0 rgba(32, 33, 36, 0.1);
  display: flex;
}
.heading {
  margin-bottom: 5px;
  text-decoration: none;
  color: #000 !important;
}
</style>
