<template>
  <v-app dark>
    <AppMessage />
    <AppDarwerMenu />
    <AppBar />
    <BlogHeader />
    <v-main class="mb-7">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="8"
            lg="7"
            xl="6"
            offset-lg="1"
            offset-xl="2"
          >
            <nuxt />
          </v-col>
          <v-col cols="12" md="4" lg="3" xl="2">
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <BlogCategories />
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <BlogRecentPosts />
              </v-col>
              <!-- <v-col cols="4" md="12"></v-col> -->
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from '@/components/main/AppBar'
import AppMessage from '@/components/main/AppMessage'
import AppFooter from '@/components/main/AppFooter'
import BlogHeader from '@/components/blog/BlogHeader'
import AppDarwerMenu from '@/components/main/AppDarwerMenu'
import BlogCategories from '@/components/blog/BlogCategories'
import BlogRecentPosts from '@/components/blog/BlogRecentPosts'

export default {
  components: {
    AppDarwerMenu,
    AppBar,
    AppFooter,
    BlogHeader,
    BlogRecentPosts,
    BlogCategories,
    AppMessage
  }
}
</script>

<style>
</style>
