<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Demo />
  </div>
</template>

<script>
import Demo from '@/components/Demo.vue';

export default {
  name: 'App',
  components: {
    Demo,
  },
};
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .form-group {
    width: 320px;
    margin: 1rem auto;
    text-align: left;
  }

  .form-group input {
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: .375rem .75rem;
    font-size: 1rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }
</style>
