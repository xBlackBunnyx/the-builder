<template>
  <v-container>
   <v-row>
    <v-col>
      <button @click="goToDailyBuild" class="buttonsettings"> Daily Build </button>
      <v-sheet class="ml-11">
      <v-img
        :width="100"
        src = "/Chevrons_up.png">
      </v-img>
      </v-sheet>
      <span class="text-secondary"> Challenge yourself</span>
      <br>
      <span class="text-secondary">with the daily build!</span>
      </v-col>
    </v-row>
</v-container>  
</template>

<script setup>

  import { useRouter} from 'vue-router';
  const router = useRouter();

  function goToDailyBuild(){
      return router.push({name: "DailyBuild"});
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
      width: 200px;
      height: 100px;
      }

</style>