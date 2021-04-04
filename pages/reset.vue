<template>
  <v-layout align-center justify-center>
    <v-flex
      xs12
      sm8
      md5
      lg4
      xl3
      class="elevation-5"
    >
      <v-card class="pa-3">
        <v-card-title>
          Reset password
        </v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="form">
            <v-text-field
              v-model="email"
              append-icon="mdi-email"
              autofocus
              name="email"
              label="Email"
              :rules="[rules.email]"
              type="text"
              required
              @keyup.enter="key"
            />
          </v-form>
          <div class="mb-3">
            <span>
              <nuxt-link to="/login">
                Sing in
              </nuxt-link>
            </span>
            <v-spacer />
            <span>
              <nuxt-link to="/register">
                Sing up
              </nuxt-link>
            </span>
          </div>
        </v-card-text>
        <div ma-5>
          <v-btn
            block
            color="primary"
            :loading="processing"
            :disabled="processing"
            @click="reset"
          >
            Reset
          </v-btn>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  layout: 'empty',
  data () {
    return {
      email: '',
      processing: false,
      rules: {
        required: value => !!value || 'The field is empty',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    reset () {
      if (this.$refs.form.validate()) {
        this.processing = true
        this.$store.dispatch('auth/resetPass', { email: this.email })
          .then(() => {
            this.processing = false
          })
          .catch(() => {
            this.processing = false
          })
      }
    }
  },
  head () {
    return {
      title: `${this.$config.title}, reset password`,
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
          href: `${this.$config.baseURL}/reset`
        }
      ]
    }
  }
}
</script>
