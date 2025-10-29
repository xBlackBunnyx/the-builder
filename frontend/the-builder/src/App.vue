<template>
<v-app>
<router-view v-slot="{ Component }"> 
    <component :is="Component" />
</router-view>
</v-app>
</template>

<script setup>

</script>

