<template>
  <div>
    <div class="col col-12">
      <BlogPostCard v-for="post in posts" :key="post.dir" :post="post" />
    </div>
    <div class="col col-12">
      <BlogPagination :next="next" :page="page" />
    </div>
  </div>
</template>

<script>
import BlogPostCard from '~/components/blog/BlogPostCard'
import BlogPagination from '~/components/blog/BlogPagination'

export default {
  layout: 'blog',
  components: {
    BlogPostCard,
    BlogPagination
  },
  async asyncData ({ $content, $config, params, error }) {
    try {
      const size = $config.postsSize
      const page = parseInt(params.number)
      const posts = await $content('posts', { deep: true })
        .sortBy('date', 'desc')
        .skip(size * (page - 1))
        .limit(size)
        .fetch()
      const next = posts.length === size
      if (!posts.length) {
        return error({ statusCode: 404, message: 'No posts found!' })
      }
      return { next, posts, page }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found'
      })
    }
  },
  head () {
    return {
      title: `${this.$config.title}, page ${this.page}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.$config.description}`
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.baseURL}/page/${this.page}`
        }
      ]
    }
  }
}
</script>
