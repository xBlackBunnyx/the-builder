<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"

    >
      <template v-slot:activator="{ props }">
        <button
          class="selectorstyle"
          v-bind="props"
        >
          Item
      </button>
      </template>

      <v-card min-width="250" class="bgselector">
        <v-card-actions>
          <button
            variant="text"
            @click="menu = false"
          >
            Cancel
        </button>
          <button
            color="primary"
            variant="text"
            @click="menu = false"
          >
            Save
    </button>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import { ref } from 'vue'

  const menu = ref(false)

</script>

<style>
    .selectorstyle{
      font-size: 20px;
      text-align: center;
      color: black;
      font-family: "BeaufortforLOLItalic", sans-serif;
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

      .bgselector{
        background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(222, 200, 128, 1) 8%,
        rgba(222, 197, 118, 1) 35%,
        rgba(191, 145, 59, 1) 75%,
        rgba(142, 96, 42, 1) 94%
        );
        border-radius: 10px;
        border: 3px solid;
        border-color: #653a1b;
      }
</style>