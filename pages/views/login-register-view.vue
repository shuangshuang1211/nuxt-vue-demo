<template>
  <div class="auth-page">
      <div class="container page">
          <div class="row">

              <div class="col-md-6 offset-md-3 col-xs-12">
                  <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                  <p class="text-xs-center">
                    <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                    <nuxt-link v-else to="/login">Have an account?</nuxt-link>
                      <!-- <a href="">Have an account?</a> -->
                  </p>

                  <ul class="error-messages">
                    <template v-for="(messages, field) in errors">
                      <li v-for="(message, index) in messages" :key="index">
                        {{ field }} {{ message }}
                      </li>
                    </template>
                  </ul>

                  <form @submit.prevent="onSubmit">
                      <fieldset class="form-group" v-if="!isLogin" >
                          <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Username" required>
                      </fieldset>
                      <fieldset class="form-group">
                          <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
                      </fieldset>
                      <fieldset class="form-group">
                          <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="6">
                      </fieldset>
                      <button class="btn btn-lg btn-primary pull-xs-right">
                          {{ isLogin ? 'Sign in' : 'Sign up' }}
                      </button>
                  </form>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import { login, register } from '../../api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'noAuthUser',
  name: "LoginRegister",
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {

      }
    }
  },
  computed: {
    isLogin: function () {
      // console.log('this.$route', this.$route);
      return this.$route.name === 'login'
    }
  },
  methods: {
    onSubmit: async function () {
      const submitFn = this.isLogin ? login : register
      try {
        const { data, status} = await submitFn({user: this.user})
        // console.log('res', res);
        if (data && status === 200) {
          this.$router.push('/')
          // TODO: cache login user data
          this.$store.commit('cacheUser', data.user)
          // cache user info in cookie for persit
          // 数据持久化
          // console.log('data.user', data.user, JSON.stringify(data.user));
          Cookie.set('user', JSON.stringify(data.user))
        }
      } catch (error) {
        // console.error('error', error, error.response)
        this.errors = error.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>