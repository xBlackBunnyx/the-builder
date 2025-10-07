<template>
  <!-- Everything that you put inside here will appear in all the pages inside the project -->
   <!-- Therefore we should clean up this mess -->
  <v-card theme="dark"> 
    <!-- This will set the website to dark mode until we figure out how to really make it with a theme-->
  <div class="titles"> Welcome to The Builder</div>
  <ContactUs> </ContactUs>
  <button-setler> </button-setler>
  <v-app>
    <v-content>
      
      <router-view> </router-view>

    </v-content>
  </v-app>
  </v-card>
</template>

<script setup>
import ContactUs from './components/Home/ContactUs.vue';
import ButtonComponent from './components/ButtonComponent.vue';

</script>

<style>
    .titles{
      font-size: 60px;
      color: #bf913b;
      font-family: "BeaufortforLOLBold", sans-serif;
    }
    .regulartext{
      font-size: 32px;
      color: whitesmoke;
      font-family: "BeaufortforLOLRegular", sans-serif;
    }
    .italictext{
      font-size: 20px;
      color: #bf913b;
      font-family: "BeaufortforLOLItalic", sans-serif;
    }
    .subtitles{
      font-size: 40px;
      color: #bf913b;
      font-family: "BeaufortforLOLMedium", sans-serif;
    }
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
    .bgstyle{
        background: radial-gradient(
          50% 50% at 108% 55%,
          rgba(2, 209, 221, 0.84) 0%,
          rgba(1, 36, 58, 1) 100%
        );
        width: 100%;
        width:auto;
        height: auto;
        position: relative;
    }
</style>