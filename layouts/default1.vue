<template>
  <div>
    <ul id="nav">
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
      <li><nuxt-link to="/users">用户</nuxt-link></li>
    </ul>
    <nuxt />
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #nav {
    display: flex;
    justify-content: space-between;
    width: 200px
  }
</style>