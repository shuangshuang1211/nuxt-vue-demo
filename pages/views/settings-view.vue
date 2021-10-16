<template>

  <div class="settings-page">
      <div class="container page">
          <div class="row">

              <div class="col-md-6 offset-md-3 col-xs-12">
                  <h1 class="text-xs-center">Your Settings</h1>

                  <form>
                      <fieldset>
                          <fieldset class="form-group">
                              <input v-model="newUserInfo.image" class="form-control" type="text" placeholder="URL of profile picture">
                          </fieldset>
                          <fieldset class="form-group">
                              <input v-model="newUserInfo.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                          </fieldset>
                          <fieldset class="form-group">
                              <textarea v-model="newUserInfo.bio" class="form-control form-control-lg" rows="8"
                                        placeholder="Short bio about you"></textarea>
                          </fieldset>
                          <fieldset class="form-group">
                              <input v-model="newUserInfo.email" class="form-control form-control-lg" type="text" placeholder="Email">
                          </fieldset>
                          <fieldset class="form-group">
                              <input v-model="newUserInfo.password" class="form-control form-control-lg" type="password" placeholder="Password">
                          </fieldset>
                          <button class="btn btn-lg btn-primary pull-xs-right" type="button" @click="updateProfileHandler">
                              Update Settings
                          </button>
                      </fieldset>
                  </form>
                  <hr>
                  <button class="btn btn-outline-danger" type="button" @click="logoutHandler">
                    Click here to logout
                  </button>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateProfile } from '../../api/user'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authUser',
  name: 'Settings',
  data () {
    return {
      newUserInfo: {
        username: '',
        email: '',
        image: '',
        bio: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async updateProfileHandler () {
      // console.log('this.store.state', this.$store)
      const res = await updateProfile({user: this.newUserInfo})
      if (res && res.status === 200) {
        const currUser = res.data.user
        console.log('updateProfile', currUser)
        this.$store.commit('cacheUser', currUser)
        this.$router.push(`/profile/${currUser.username}`)
      }
    },
    logoutHandler () {
      this.$store.commit('cacheUser', null)
      Cookie.remove('user')
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>