<script setup lang="ts">
import axios from 'axios'

const add = async () => {
  // eslint-disable-next-line no-console
  console.log((await axios.get('http://httpbin.org/ip')).data)
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <j-button @click="add" />
  <j-cell />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
