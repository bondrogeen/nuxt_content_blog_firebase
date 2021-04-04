<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-btn v-for="item in items" :key="item.title" class="my-2" text rounded>
        {{ item.title }}
      </v-btn>
      <v-col class="py-2 text-center" cols="12">
        2017 - {{ new Date().getFullYear() }} <strong>{{ this.$config.baseURL }}</strong>
      </v-col>
      <v-col class="text-center caption text--secondary" cols="12">
        When citing a document, a link to the site with an indication of the author is required. Full borrowing of a document is possible only with the consent of the publisher {{ this.$config.baseURL }}.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    items: [
      // { title: 'Блог', link: '/' },
      // { title: 'GitHub', link: 'https://github.com/bondrogeen' }
    ]
  })
}
</script>

<style scoped>
</style>
