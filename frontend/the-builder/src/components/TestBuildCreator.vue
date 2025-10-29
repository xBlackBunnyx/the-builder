<template>
  <div style="padding: 20px; background: lightblue;">
    <h1>🎯 SIMPLE TEST COMPONENT</h1>
    <p>Route: {{ $route.path }}</p>
    <p>Query: {{ $route.query }}</p>
    <p>Champion: {{ $route.query.championName || 'None' }}</p>
    <button @click="$router.push('/')">Force Go Home</button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log('🎯 SIMPLE TEST - Component created')

onMounted(() => {
  console.log('🎯 SIMPLE TEST - Component MOUNTED')
  console.log('Current route:', route.path)
  console.log('Current query:', route.query)
})

onUnmounted(() => {
  console.log('🎯 SIMPLE TEST - Component UNMOUNTED')
})
</script>