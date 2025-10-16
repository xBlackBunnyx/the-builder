<template>
  <button @click="goToDailyBuild" class="buttonsettings"> Daily Build </button>
  <br>
 <button @click="goToBuildCreator" class="buttonsettings"> Create your build </button>
</template>

<script setup>

  import { useRouter} from 'vue-router';
  const router = useRouter();

  function goToDailyBuild(){
      return router.push({name: "DailyBuild"});
  }
  function goToBuildCreator(){
      router.push({name: "BuildCreator"});
  }
</script>

<style>
    .buttonsettings{
      font-size: 20px;
      color: black;
      font-family: "BeaufortforLOLRegular", sans-serif;
      border-radius: 10px;
      border: 3px solid;
      border-color: #653a1b;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(222, 200, 128, 1) 8%,
        rgba(222, 197, 118, 1) 35%,
        rgba(191, 145, 59, 1) 75%,
        rgba(142, 96, 42, 1) 94%
      );
      padding:  20px 32px;
      }
</style>