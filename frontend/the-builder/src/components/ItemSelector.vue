<template>
  <div class="d-flex justify-space-around">
    <v-menu>
      <template v-slot:activator="{ props }">
        <button
          class="selectorstyle"
          v-bind="props"
        >
          Activator slot
        </button>
      </template>
    <v-list 
    :items="items"
    @update:selected="selected"> 
      <v-list-subheader>REPORTS</v-list-subheader>
          <v-list-item
           v-for="(item, i) in items"
           :key="i"
           :value="item"
           active-color="primary"
           >

            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
    </v-list>
    </v-menu>
  </div>
</template>

<script>
import { ref } from 'vue'

  const selected = ref([])
  const items = ref( [
    { text: 'Real-Time', icon: 'mdi-clock' },
    { text: 'Audience', icon: 'mdi-account' },
    { text: 'Conversions', icon: 'mdi-flag' },
  ])

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