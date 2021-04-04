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
          Sing in
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
              validate-on-blur
              @keyup.enter="key"
            />
            <v-text-field
              v-model="password"
              name="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password"
              :rules="[rules.length(6)]"
              required
              :type="showPass ? 'text' : 'password'"
              counter
              validate-on-blur
              @keyup.enter="singin"
              @click:append="showPass = !showPass"
            />
          </v-form>
          <div class="mb-3">
            <span color="grey">
              <nuxt-link class="rem" to="/reset">
                Forgot your password?
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
          <v-btn block color="primary" :loading="processing" :disabled="processing" @click="singin">
            Login
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
      password: '',
      dialog: false,
      showPass: false,
      processing: false,
      rules: {
        length: len => v => (v || '').length >= len || `Менее ${len} сим.`,
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    async singin () {
      if (this.$refs.form.validate()) {
        this.processing = true
        const status = await this.$store.dispatch('auth/login', { email: this.email, password: this.password })
        this.processing = false
        if (status) { this.$router.push('/') }
      }
    },
    key () {
      if (this.password.length > 0) {
        this.singin()
      } else {
        this.$refs.form.inputs[1].focus()
      }
    }
  },
  head () {
    return {
      title: `${this.$config.title}, sing in`,
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
          href: `${this.$config.baseURL}/login`
        }
      ]
    }
  }
}
</script>

<style scoped>
.rem {
  color: gray;
}
</style>
