<template>

<v-dialog v-model="dialog" max-width="500">
  <template v-slot:activator="{ props: activatorProps }">
    <button
      v-bind="activatorProps"
      class="button-settings justify-center"
      @click="calculateScoreAndSave"
      :disabled="loading"
    >{{ loading ? 'Calculating score please wait...' : 'Get your results!' }}</button>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card class="card-settings">
        <v-card-title class="text-center card-title"> {{resultTitle }} </v-card-title>
      <v-card-text>
        <!-- Loading -->
         <div v-if="loading" class="text-center">
            <v-progress-circular indeterminate color="white"></v-progress-circular>
            <p>Calculating your build score...</p>
         </div>

         <!-- Results -->
          <div v-else-if="score !== null" class="text-center">
            <div class="score-display mb-4">
              <h2 class="text-h3"> {{ score }}/100</h2>
            </div>
            <v-alert v-if="buildSaved" type="success"></v-alert>
          </div>

          <!-- Everything explodes -->
           <div v-else-if="error" class="error-message text-center">
            <v-alert type="error" class="mb-4"> {{ error }} </v-alert>
           </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
        class="card-options"
          text="Close"
          @click="dialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

</template>

<script setup>
import {ref, computed} from 'vue'
import { calculateScore } from '../api';
import axios from 'axios';

const props = defineProps({
  selectedChampion: String,
  selectedItems: Array,
  selectedRunes: Object
})

//Debug to check if all items are getting stored properly
console.log('BuildResults props: ', {
  champion: props.selectedChampion,
  items: props.selectedItems,
  runes: props.selectedRunes
})

const dialog = ref(false)
const loading = ref(false)
const score = ref(null)
const buildSaved = ref(false)
const error = ref(null)

const resultTitle = computed(() => {
  if (loading.value) return 'Calculating...'
  if (error.value) return 'Calculation Failed'
  if (score.value !== null) return 'Your build results are in!'
  return 'Build Results'
})

const calculateScoreAndSave = async() => {
  score.value = null
  buildSaved.value = false
  error.value = null
  loading.value = true

  if (!props.selectedChampion) {
    error.value = 'Please, select a champion'
    loading.value = false
    dialog.value = true
    return
  }
  if (!props.selectedItems || props.selectedItems.length !== 6) {
    error.value = "Please, select all the items"
    loading.value = false
    dialog.value = true
    return
  }
  if (!props.selectedRunes) {
    error.value = 'Please, select the runes'
    loading.value = false
    dialog.value = true
    return
  }

  //Checking that none of the items are null/undefined
  const invalidItems = props.selectedItems.filter(item => !item)
  if (invalidItems.length > 0) {
    error.value = `Some items are not selected, or some items incompatible. Check all slots`
    loading.value = false
    dialog.value = true
    return
  }

  try {
    const frontendData = {
      champion: props.selectedChampion.name,
      items: props.selectedItems.map(item => {
        return typeof item === 'string' ? item : item.name || item
      }),
      runes: {
        primary: props.selectedRunes.primary || {},
        secondary: props.selectedRunes.secondary || {}
      }
    }
    console.log('Sending build data: ', frontendData)
    
    //Here we call the API
    const result = await calculateScore(frontendData)

    if (result.success) {
      score.value = result.score
      buildSaved.value = true
      dialog.value = true
    } else {
      error.value = result.error || `Failed to calculate score`
      dialog.value = true
    }
  } catch (err) {
    console.error('API call failed: ', err)
    if (err.code === 'ECONNREFUSED')   {
      error.value = 'Backend server is not running.'
    } else {
      error.value = 'Network error. Please check your connection and try again'
    }
    dialog.value = true
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>

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

    .score-display {
      color: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

.error-message {
  padding: 10px;
}

.button-settings:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>