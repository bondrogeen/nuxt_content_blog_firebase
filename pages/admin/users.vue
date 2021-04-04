<template>
  <UsersList />
</template>
<script>
import UsersList from '~/components/admin/UsersList'
export default {
  middleware: ['auth', 'admin'],
  layout: 'blog',
  components: {
    UsersList
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
          href: `${this.$config.baseURL}/admin/users`
        }
      ]
    }
  }
}
</script>
