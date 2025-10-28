<template>

<v-dialog max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <button
      v-bind="activatorProps"
      class="button-settings justify-center"
    >Get your results!</button>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card class="card-settings">
        <v-card-title class="text-center card-title"> Here is what you scored! </v-card-title>
      <v-card-text>
        Placeholder para los resultados
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
        class="card-options"
          text="Close Dialog"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

</template>

<script>

</script>

<style>

  .button-settings{
      font-size: 21px;
      color: black;
      font-family: "BeaufortforLOLBold", sans-serif;
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
      padding:  20px 20px;
      width: 200px;
      height: 100px;
      }

      .card-settings {
        color: black;
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
        padding:  20px 20px;
      }

    .card-title {
        font-family: "BeaufortforLOLBold", sans-serif;
        font-size: 30px;
    }

    .card-options {
        font-family: "BeaufortforLOLItalic", sans-serif;
        font-size: 15px;
    }

</style>