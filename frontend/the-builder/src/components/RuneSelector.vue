<template>
  <v-container class="pa-4 text-center">

    <!-- Primary runes -->

    <v-row class="justify-center mb-6">
      <v-col>
        <button class="selector-style ma-2" @click="showPrimaryDialog = true">
            <v-img
              v-if="selectedPrimaryBranch"
              :src="selectedPrimaryBranch.icon"
              width="30"
              height="30"
              class="me-2"
            ></v-img>
            {{ selectedPrimaryBranch ? selectedPrimaryBranch.name : "Primary runes" }}
        </button>
      </v-col>
      <v-col v-if="selectedPrimaryBranch">
        <h3>{{ selectedPrimaryBranch.name }}</h3>
        <v-row class="justify-center mb-2">
          <v-col
          v-for="rune in selectedPrimaryBranch.keystones"
          :key="rune.name"
          cols="auto"
          >
            <v-tooltip>
              <template #activator="{props}">
                <v-img
                  v-bind="props"
                  :src="rune.img"
                  :class="{'selected-rune': selectedRunes.primary.keystone === rune.name,}"
                  @click="selectRunes('primary', 'keystone', rune.name)"
                ></v-img>
              </template>
              <span class="golden-tooltip">{{ rune.stat }}</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row
          v-for="(row, rowIndex) in selectedPrimaryBranch.rows"
          :key="rowIndex"
          class="justify-center mb-2"
        >
          <v-col 
            v-for="rune in row"
            :key="rune.name"
            cols="auto"
          >
            <v-tooltip>
              <template #activator="{props}">
                <v-img
                  v-bind="props"
                  :src="rune.img"
                  :class="{ 'selected-rune' : selectedRunes.primary.rows[rowIndex] === rune.name,}"
                  @click="selectRunes('primary', 'row', rune.name, rowIndex)"
                ></v-img>
              </template>
              <span class="golden-tooltip"> {{ rune.stat }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Secondary runes -->

    <v-row class="justify-center">
      <v-col>
        <button class="selector-style ma-2" @click="showSecondaryDialog = true">
          <v-img
            v-if="selectedSecondaryBranch"
            :src="selectedSecondaryBranch.icon"
            width="30"
            height="30"
            class="me-2"
          ></v-img>
          {{ selectedSecondaryBranch ? selectedSecondaryBranch.name : "Secondary runes" }}
        </button>
      </v-col>

      <v-col v-if="selectedSecondaryBranch">
        <h3>{{ selectedSecondaryBranch.name }}</h3>
        <v-row class="justify-center">
          <v-col
            v-for="rune in selectedSecondaryBranch.allRunes"
            :key="rune.name"
            cols="auto"
          >
            <v-tooltip>
              <template #activator="{props}">
                <v-img
                  v-bind="props"
                  :src="rune.img"
                  :class="{ 'selected-rune' : selectedRunes.secondary.includes(rune.name),}"
                  @click="selectRune('secondary', 'flat', rune.name)"
                ></v-img>
              </template>
              <span class="golden-tooltip">{{ rune.stat }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="showPrimaryDialog" max-width="600">
      <v-card>
        <v-card-title> Select Primary Path </v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <v-col
              v-for="branch in runeBranches"
              :key="branch.name"
              cols="auto"
            >
              <v-img
                :src="branch.img"
                class="selector-style"
                @click="selectBranch('primary', branch)"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showSecondaryDialog" max-width="600">
      <v-card>
        <v-card-title> Select Secondary Path </v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <v-col
              v-for="branch in runeBranches"
              :key="branch.name"
              cols="auto"
            >
              <v-img
                :src="branch.img"
                class="selector-style"
                @click="selectBranch('secondary', branch)"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>

  import { ref} from 'vue'

  const runeBranches = [
  {
    name: "Precision", icon: "/runes-picture/Precision.png",
    keystones: [
      {name: "Press the Attack", img: "/runes-picture/Press_Attack.png"},
      {name: "Lethal Tempo", img: "/runes-picture/Lethal_Tempo.png"},
      {name: "Fleet Footwork", img: "/runes-picture/Fleet_Footwork.png"},
      {name: "Conqueror", img: "/runes-picture/Conqueror.png"},
    ],
    rows: [
      [
      {name: "Absorb Life", img: "/runes-picture/Absorb_Life.png"},
      {name: "Triumph", img: "/runes-picture/Triumph.png"},
      {name: "Presence of Mind", img: "/runes-picture/Presence_Mind.png"},
    ],
    [
      {name: "Alacrity", img: "/runes-picture/Alacrity.png"},
      {name: "Haste", img: "/runes-picture/Haste.png"},
      {name: "Bloodline", img: "/runes-picture/Bloodline.png"},
      ],
      [
      {name: "Coup de Grace", img: "/runes-picture/Coup_Grace.png"},
      {name: "Cut Down", img: "/runes-picture/Cut_Down.png"},
      {name: "Last Stand", img: "/runes-picture/Last_Stand.png"},
      ],
    ],
  },
  {
    name: "Domination", icon: "/runes-picture/Domination.png",
    keystones: [
      {name: "Electrocute", img: "/runes-picture/Electrocute.png"},
      {name: "Dark Harvest", img: "/runes-picture/Dark_Harvest.png"},
      {name: "Hail of Blades", img: "/runes-picture/Hail_Blades.png"},
    ],
    rows: [
      [
      {name: "Cheap Shot", img: "/runes-picture/Cheap_Shot.png"},
      {name: "Taste of Blood", img: "/runes-picture/Taste_Blood.png"},
      {name: "Sudden Impact", img: "/runes-picture/Sudden_Impact.png"},
      ],
      [
      {name: "Sixth Sense", img: "/runes-picture/Sixth_Sense.png"},
      {name: "Grisly Mementos", img: "/runes-picture/Grisly_Mementos.png"},
      {name: "Deep Ward", img: "/runes-picture/Deep_Ward.png"},
      ],
      [
      {name: "Treasure Hunter", img: "/runes-picture/Treasure_Hunter.png"},
      {name: "Relentless Hunter", img: "/runes-picture/Relentless_Hunter.png"},
      {name: "Ultimate Hunter", img: "/runes-picture/Ultimate_Hunter.png"},
      ],
    ],
  },
  {
    name: "Sorcery", icon: "/runes-picture/Sorcery.png",
    keystones: [
      {name: "Summon Aery", img: "/runes-picture/Summon_Aery.png"},
      {name: "Arcane Comet", img: "/runes-picture/Arcane_Comet.png"},
      {name: "Phase Rush", img: "/runes-picture/Phase_Rush.png"},
    ],
    rows: [
      [
      {name: "Axiom Arcanist", img: "/runes-picture/Axiom_Arcanist.png"},
      {name: "Manaflow Band", img: "/runes-picture/Manaflow_Band.png"},
      {name: "Nimbus Cloak", img: "/runes-picture/Nimbus_Cloak.png"},
      ],
      [
      {name: "Transcendence", img: "/runes-picture/Transcendence.png"},
      {name: "Celerity", img: "/runes-picture/Celerity.png"},
      {name: "Absolute Focus", img: "/runes-picture/Absolute_Focus.png"},
      ],
      [
      {name: "Scorch", img: "/runes-picture/Scorch.png"},
      {name: "Waterwalking", img: "/runes-picture/Waterwalking.png"},
      {name: "Gathering Storm", img: "/runes-picture/Gathering_Storm.png"},
      ],
    ],
  },
  {
    name: "Resolve", icon: "/runes-picture/Resolve.png",
    keystones: [
      {name: "Grasp of the Undying", img: "/runes-picture/Grasp_Undying.png"},
      {name: "Aftershock", img: "/runes-picture/Aftershock.png"},
      {name: "Guardian", img: "/runes-picture/Guardian.png"},
    ],
    rows: [
      [
      {name: "Demolish", img: "/runes-picture/Demolish.png"},
      {name: "Font of Life", img: "/runes-picture/Font_Life.png"},
      {name: "Shield Bash", img: "/runes-picture/Shield_Bash.png"},
      ],
      [
      {name: "Conditioning", img: "/runes-picture/Conditioning.png"},
      {name: "Second Wind", img: "/runes-picture/Second_Wind.png"},
      {name: "Bone Plating", img: "/runes-picture/Bone_Plating.png"},
      ],
      [
      {name: "Overgrowth", img: "/runes-picture/Overgrowth.png"},
      {name: "Revitalize", img: "/runes-picture/Revitalize.png"},
      {name: "Unflinching", img: "/runes-picture/Unflinching.png"},
      ],
    ],
  },
  {
    name: "Inspiration", icon: "/runes-picture/Inspiration.png",
    keystones: [
      {name: "Glacial Augment", img: "/runes-picture/Glacial_Augment.png"},
      {name: "Unsealed Spellbook", img: "/runes-picture/Unsealed_Spellbook.png"},
      {name: "First Strike", img: "/runes-picture/First_Strike.png"},
    ],
    rows: [
      [
      {name: "Hextech Flashtraption", img: "/runes-picture/Hextech_Flashtraption.png"},
      {name: "Magical Footwear", img: "/runes-picture/Magical_Footwear.png"},
      {name: "Cash Back", img: "/runes-picture/Cash_Back.png"},
      ],
      [
      {name: "Triple Tonic", img: "/runes-picture/Triple_Tonic.png"},
      {name: "Time Warp Tonic", img: "/runes-picture/Time_Warp_Tonic.png"},
      {name: "Biscuit Delivery", img: "/runes-picture/Biscuit_Delivery.png"},
      ],
      [
      {name: "Approach Velocity", img: "/runes-picture/Approach_Velocity.png"},
      {name: "Cosmic Insight", img: "/runes-picture/Cosmic_Insight.png"},
      {name: "Jack of All Trades", img: "/runes-picture/Jack_All_Trades.png"},
      ],
    ],
  },
  ]

  const showPrimaryDialog = ref(false)
  const showSecondaryDialog = ref(false)

  const selectedPrimaryBranch = ref(null)
  const selectedSecondaryBranch = ref(null)
  const selectedRunes = ref({
    primary: {keystone: null, rows: [null, null, null]}, 
    secondary:[],
  })


  function selectBranch(type, branch) {
    if (type === 'primary') {
      selectedPrimaryBranch.value = branch
      showPrimaryDialog.value = false
    } else {
      selectedSecondaryBranch.value = branch
      showSecondaryDialog.value = false
    }
  }

  function selectRune(type, section, runeName, rowIndex){
    if (type === 'primary') {
      if (section === 'keystone') selectedRunes.value.primary.keystone = runeName
      else if (section === 'row') selectedRunes.value.primary.rows[rowIndex] = runeName
    } else {
      const selected = selectedRunes.value.secondary
      if (selected.includes(runeName)) {
        selectedRunes.value.secondary = selected.filter(r => r !== runeName)
      } else if (selected.length < 2) {
        selectedRunes.value.secondary.push(runeName)
      }
    }
  }

</script>

<style scoped>
  .selector-style{
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
    cursor: pointer;
    }

    .selected-rune{
      border: 3px solid var(#653a1b);
      border-radius: 8px;
    }

  .golden-tooltip :deep(.v-overlay__content) {
    background-color: #653a1b !important; /* gold background */
    color: #1a1a1a !important; /* dark text */
    border-radius: 6px;
    padding: 8px 10px;
    max-width: 200px;
    font-family: "BeaufortforLOL-Regular", sans-serif;
    box-shadow: 0 0 10px rgba(191, 145, 59, 0.6);
  }

  .golden-tooltip :deep(.v-overlay__content) strong {
    color: #1a1a1a !important;
  }

    .tooltip-content {
      background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(222, 200, 128, 1) 8%,
      rgba(222, 197, 118, 1) 35%,
      rgba(191, 145, 59, 1) 75%,
      rgba(142, 96, 42, 1) 94%
    );
      color: black;
      border-radius: 8px;
      padding: 8px 12px;
      max-width: 220px;
      font-family: "BeaufortforLOLRegular", sans-serif;
    }

    .tooltip-title{
      font-family: "BeaufortforLOLBold", sans-serif;
      font-size: 1rem;
      margin-bottom: 4px;
    }
    
    .tooltip-stats{
      list-style: none;
      padding: 0;
      margin: 0 0 6px 0;
      font-size: 0.85rem;
    }
</style>