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
          Sing up
        </v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="form">
            <v-text-field
              v-model="name"
              append-icon="mdi-account"
              autofocus
              name="name"
              label="Name"
              type="text"
              :rules="[rules.required]"
              validate-on-blur
              required
            />
            <v-text-field
              v-model="email"
              append-icon="mdi-email"
              autofocus
              name="email"
              label="Email"
              type="text"
              :rules="[rules.required, rules.email]"
              validate-on-blur
              required
            />
            <v-text-field
              v-model="password"
              append-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              validate-on-blur
              :rules="[rules.length(6)]"
            />
            <v-text-field
              v-model="confirm"
              append-icon="mdi-lock"
              name="confirm"
              label="Password Confirmation"
              type="password"
              required
              validate-on-blur
              :rules="[rules.equal, rules.length(6)]"
            />
          </v-form>
          <div class="text-right mb-3">
            <span class="mb-4">
              <nuxt-link to="/login">
                Sing in
              </nuxt-link>
            </span>
          </div>
        </v-card-text>
        <div class="login-btn">
          <v-btn
            block
            color="primary"
            :loading="processing"
            :disabled="processing"
            @click="register"
          >
            Register
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
      name: '',
      email: '',
      password: '',
      processing: false,
      confirm: '',
      rules: {
        required: value => !!value || 'The field is empty',
        length: len => v => (v || '').length >= len || `Less than ${len} characters`,
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        equal: () => {
          return (this.password === this.confirm) || 'Password mismatch'
        }
      }
    }
  },
  methods: {
    async register () {
      if (this.$refs.form.validate()) {
        this.processing = true
        const status = await this.$store.dispatch('auth/register', { name: this.name, email: this.email, password: this.password })
        if (status) {
          this.$refs.form.reset()
          this.$router.push('/')
        }
        this.processing = false
      }
    }
  },
  head () {
    return {
      title: `${this.$config.title}, registration`,
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
          href: `${this.$config.baseURL}/register`
        }
      ]
    }
  }
}
</script>
