<template>
  <nav>
    <ul class="pagination">
      <li
        class="page-item"
        :class="{
          active: item === currPage
        }"
        v-for="item in totalPage"
        :key="item"
      >
        <nuxt-link
          class="page-link"
          :to="{
            name: rootPath,
            query: {
              page: item,
              ...query
            }
          }"
        >{{ item }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPage: Number,
    currPage: Number,
    query: Object,
    rootPath: String
  }
}
</script>

<style>

</style>