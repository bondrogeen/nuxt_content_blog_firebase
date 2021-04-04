<template>
  <div>
    <v-list dense>
      <v-subheader class="text-h5 font-weight-black d-flex justify-center">
        Category
      </v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, category, i) in categories"
          :key="i"
          router
          :to="'/category/' + category"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ category }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            {{ item }}
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-skeleton-loader
      v-if="!isLoad"
      type="list-item-two-line, list-item-two-line, list-item-two-line"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: {},
    isLoad: false
  }),
  async created () {
    const posts = await this.$content('posts', { deep: true }).fetch()
    const categories = {}
    await posts.forEach(function (item, i, arr) {
      if (!categories[item.category]) {
        categories[item.category] = 1
      } else {
        categories[item.category]++
      }
    })
    this.categories = categories
  },
  mounted () {
    this.isLoad = true
  }
}
</script>
