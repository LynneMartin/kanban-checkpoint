<template>

    <div id="app">
      <div id="nav">
        <router-link to="/">Boards</router-link> |
        <!-- FIXME Learn how to move router-link to board.vue page -->
        <!--TODO Add "Logout" link on other side of pipe instead of red outline button-->
      </div>
      <router-view /> <!--REVIEW What does this do?-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() { }
  };
</script>

<style>



  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(203, 248, 233);
    height: 2000px;
    width: auto
    
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #42b983;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

</style>