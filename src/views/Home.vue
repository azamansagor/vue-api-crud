<template>
  <div class="w-100">
    <Index msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Index from '@/components/Index.vue'

export default {
  name: 'Home',
  components: {
    Index
  }
}
</script>
