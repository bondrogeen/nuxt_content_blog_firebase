<template>
  <CommentsList />
</template>
<script>
import CommentsList from '~/components/admin/CommentsList'
export default {
  middleware: ['auth', 'admin'],
  layout: 'blog',
  components: {
    CommentsList
  },
  head () {
    return {
      title: `${this.$config.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${this.$config.baseURL}/admin/comments`
        }
      ]
    }
  }
}
</script>
