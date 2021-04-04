<template>
  <v-speed-dial v-model="fab" direction="left">
    <template v-slot:activator>
      <v-btn v-model="fab" x-small fab plain>
        <v-icon>
          {{ fab ? 'mdi-close' : 'mdi-share-variant' }}
        </v-icon>
      </v-btn>
    </template>
    <template v-for="(item, i) in items">
      <v-btn :key="i" fab x-small>
        <a target="_blank" :href="item.link" class="text-decoration-none">
          <v-icon :color="item.color">
            {{ item.icon }}
          </v-icon>
        </a>
      </v-btn>
    </template>
  </v-speed-dial>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fab: false,
      items: [
        {
          link: `https://telegram.me/share/url?url=${this.url}&text=${this.title}`,
          icon: 'mdi-telegram',
          color: 'blue'
        },
        {
          link: `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
          icon: 'mdi-facebook',
          color: 'indigo darken-1'
        },
        {
          link: `https://twitter.com/home?status=${this.title}%20-%20${this.url}`,
          icon: 'mdi-twitter',
          color: 'blue'
        },
        {
          link: `http://vk.com/share.php?url=${this.url}`,
          icon: 'mdi-vk',
          color: 'blue darken-4'
        }
      ]
    }
  }
}
</script>
