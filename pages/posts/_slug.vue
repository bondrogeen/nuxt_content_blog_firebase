<template>
  <div class="post">
    <h1 class="mb-10">
      {{ post.title }}
    </h1>
    <nuxt-content :document="post" />
    <div>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip
          v-for="(tag, i) in post.tags"
          :key="i"
          color="green"
          label
          outlined
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </div>
    <v-row>
      <v-col cols="12" sm="6">
        <BlogRating :title="post.title" />
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-end">
        <LinkShare :url="`${this.$config.baseURL}${post.dir}`" :title="post.title" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BlogComment :title="post.title" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Prism from '~/plugins/prism'
import LinkShare from '~/components/general/LinkShare'
import BlogRating from '~/components/blog/BlogRating'
import BlogComment from '~/components/blog/BlogComment'
export default {
  layout: 'blog',
  components: {
    LinkShare,
    BlogRating,
    BlogComment
  },
  async asyncData ({ params, error, $content }) {
    try {
      let posts = await $content('posts', { deep: true }).where({ dir: `/posts/${params.slug}` }).fetch()
      if (posts.length === 0) {
        posts = await $content('posts', { deep: true }).where({ title: params.slug }).fetch()
      }
      if (!posts.length) {
        error({ statusCode: 404, message: 'Page could not be found' })
        return
      }
      return { post: posts[0] }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found'
      })
    }
  },
  mounted () {
    Prism.highlightAll()
  },
  head () {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.baseURL}${this.post.dir}`
        }
      ]
    }
  }
}
</script>

<style scoped>
  .nuxt-content h1, h2, h3, h4, h5 {
    margin: 20px 0px;
  }
  .nuxt-content p {
    margin: 20px 0px;
    text-align: justify;
  }
  .nuxt-content .img {
    padding: 20px;
  }
  .nuxt-content ol {
    margin: 20px 0px;
  }
  .nuxt-content blockquote {
    text-align: justify;
    background: #f9f9f9;
    border-left: 3px solid #ccc;
    margin: 1em 10px;
    padding: 0.5em 10px;
    font-style: oblique;
  }
  .nuxt-content blockquote:before {
    color: #ccc;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }
  .nuxt-content blockquote p {
    display: inline;
  }
</style>
