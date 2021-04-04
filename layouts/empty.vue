<template>
  <v-app dark>
    <AppMessage />
    <AppDarwerMenu />
    <AppBar />
    <BlogHeader />
    <v-main class="mb-7">
      <v-container>
        <v-row class="mt-5">
          <nuxt />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/main/AppBar'
import BlogHeader from '@/components/blog/BlogHeader'
import AppDarwerMenu from '@/components/main/AppDarwerMenu'
import AppMessage from '@/components/main/AppMessage'

export default {
  components: {
    AppDarwerMenu,
    AppBar,
    AppMessage,
    BlogHeader
  }
}
</script>

<style>
</style>
