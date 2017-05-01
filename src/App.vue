<template>
  <div id="app">
<!--     <img src="./assets/logo.png"> -->
    <router-link to="/" exact>
      <div class="ui icon header">
        <i class="calculator icon"></i>
        九龍計算機
      </div>
    </router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  /*color: #FFFFFF;*/
  margin-top 2em
  hr
    max-width 250px
</style>
