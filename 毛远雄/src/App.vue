<template>
  <HomeIndex />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomeIndex from './components/home/homeIndex.vue';

@Options({
  components: {
    HomeIndex
  }
})
export default class App extends Vue {}
</script>
