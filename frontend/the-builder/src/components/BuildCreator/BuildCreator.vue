<template>
    <v-container>
        <v-row>
            <v-col>
                  <h1 class="text-secondary">  Create your build!  </h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col offset="3">
                <item-selector></item-selector>
                <v-spacer></v-spacer>
                <br />
            </v-col>
        </v-row>
        
        <v-row>
            <v-col>
                <button @click="$router.go(-1)" class="buttonsettings"> Return to Home </button>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

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