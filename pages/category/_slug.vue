<template>
  <div class="col col-12">
    <BlogPostCard v-for="post in posts" :key="post.dir" :post="post" />
  </div>
</template>
<script>
import BlogPostCard from '~/components/blog/BlogPostCard'
export default {
  layout: 'blog',
  components: {
    BlogPostCard
  },
  async asyncData ({ params, error, $content }) {
    try {
      const category = params.slug
      const posts = await $content('posts', { deep: true })
        .where({ category: { $contains: category } })
        .fetch()
      return { posts, category }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page could not be found'
      })
    }
  },
  head () {
    return {
      title: `${this.$config.title}, category ${this.category}`,
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
          href: `${this.$config.baseURL}/category/${this.category}`
        }
      ]
    }
  }
}
</script>
