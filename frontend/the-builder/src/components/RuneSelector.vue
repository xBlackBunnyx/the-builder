<template>
  <v-container class="d-flex justify-center pa-3">
    <v-menu
      v-model="menu"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <button
          class="selectorstyle"
          v-bind="props"
        >
          <img
          v-if="selectedRune"
          :src="selectedRune.img"
          alt="Selected rune">
          </img>
          <span v-else class="placeholder-text"> Rune </span>
      </button>
      </template>

        <v-list class="d-flex flex-wrap" style="max-width: 300px;">
          <v-list-item
          v-for="rune in runes"
          :key="rune.name"
          class="ma-1 pa-0"
          >
          <v-tooltip location="top left" class="golden-tooltip" :open-delay="100">
            <template #activator="{props}">
              <v-img 
              v-bind="props"
              :src="rune.img"
              class="cursor-pointer"
              alt="Rune"
              @click="selectRune(rune)"
              />
            </template>
            <div class="tooltip-content">
              <strong class="tooltip-title">{{ rune.name }}</strong>
              <ul class="tooltip-stats">
                <li v-for="(value, stat) in rune.stats" :key="stat">
                  <strong>{{ stat }}</strong> {{ value }}
                </li>
              </ul>
            </div>
            </v-tooltip>
          </v-list-item>
        </v-list>

    </v-menu>
  </v-container>
</template>

<script setup>

  import { ref } from 'vue'

  const menu = ref(false)

  const runes = [
    {name: "Absolute Focus", img: "/runes-picture/Absolute_Focus.png"},
    {name: "Absorb Life", img: "/runes-picture/Absorb_Life.png"},
    {name: "Aftershock", img: "/runes-picture/Aftershock.png"},
    {name: "Alacrity", img: "/runes-picture/Alacrity.png"},
    {name: "Approach Velocity", img: "/runes-picture/Approach_Velocity.png"},
    {name: "Arcane Comet", img: "/runes-picture/Arcane_Comet.png"},
    {name: "Axiom Arcanist", img: "/runes-picture/Axiom_Arcanist.png"},
    {name: "Biscuit Delivery", img: "/runes-picture/Biscuit_Delivery.png"},
    {name: "Bloodline", img: "/runes-picture/Bloodline.png"},
    {name: "Bone Plating", img: "/runes-picture/Bone_Plating.png"},
    {name: "Cash Back", img: "/runes-picture/Cash_Back.png"},
    {name: "Celerity", img: "/runes-picture/Celerity.png"},
    {name: "Cheap Shot", img: "/runes-picture/Cheap_Shot.png"},
    {name: "Conditioning", img: "/runes-picture/Conditioning.png"},
    {name: "Conqueror", img: "/runes-picture/Conqueror.png"},
    {name: "Cosmic Insight", img: "/runes-picture/Cosmic_Insight.png"},
    {name: "Coup de Grace", img: "/runes-picture/Coup_Grace.png"},
    {name: "Cut Down", img: "/runes-picture/Cut_Down.png"},
    {name: "Dark Harvest", img: "/runes-picture/Dark_Harvest.png"},
    {name: "Deep Ward", img: "/runes-picture/Deep_Ward.png"},
    {name: "Demolish", img: "/runes-picture/Demolish.png"},
    {name: "Domination", img: "/runes-picture/Domination.png"},
    {name: "Electrocute", img: "/runes-picture/Electrocute.png"},
    {name: "First Strike", img: "/runes-picture/First_Strike.png"},
    {name: "Fleet Footwork", img: "/runes-picture/Fleet_Footwork.png"},
    {name: "Font of Life", img: "/runes-picture/Font_Life.png"},
    {name: "Gathering Storm", img: "/runes-picture/Gathering_Storm.png"},
    {name: "Glacial Augment", img: "/runes-picture/Glacial_Augment.png"},
    {name: "Grasp of the Undying", img: "/runes-picture/Grasp_Undying.png"},
    {name: "Grisly Mementos", img: "/runes-picture/Grisly_Mementos.png"},
    {name: "Guardian", img: "/runes-picture/Guardian.png"},
    {name: "Hail of Blades", img: "/runes-picture/Hail_Blades.png"},
    {name: "Haste", img: "/runes-picture/Haste.png"},
    {name: "Hextech Flashtraption", img: "/runes-picture/Hextech_Flashtraption.png"},
    {name: "Inspiration", img: "/runes-picture/Inspiration.png"},
    {name: "Jack of All Trades", img: "/runes-picture/Jack_All_Trades.png"},
    {name: "Last Stand", img: "/runes-picture/Last_Stand.png"},
    {name: "Lethal Tempo", img: "/runes-picture/Lethal_Tempo.png"},
    {name: "Magical Footwear", img: "/runes-picture/Magical_Footwear.png"},
    {name: "Manaflow Band", img: "/runes-picture/Manaflow_Band.png"},
    {name: "Nimbus Cloak", img: "/runes-picture/Nimbus_Cloak.png"},
    {name: "Overgrowth", img: "/runes-picture/Overgrowth.png"},
    {name: "Phase Rush", img: "/runes-picture/Phase_Rush.png"},
    {name: "Precision", img: "/runes-picture/Precision.png"},
    {name: "Presence of Mind", img: "/runes-picture/Presence_Mind.png"},
    {name: "Press the Attack", img: "/runes-picture/Press_Attack.png"},
    {name: "Relentless Hunter", img: "/runes-picture/Relentless_Hunter.png"},
    {name: "Resolve", img: "/runes-picture/Resolve.png"},
    {name: "Revitalize", img: "/runes-picture/Revitalize.png"},
    {name: "Scorch", img: "/runes-picture/Scorch.png"},
    {name: "Second Wind", img: "/runes-picture/Second_Wind.png"},
    {name: "Shield Bash", img: "/runes-picture/Shield_Bash.png"},
    {name: "Sixth Sense", img: "/runes-picture/Sixth_Sense.png"},
    {name: "Sorcery", img: "/runes-picture/Sorcery.png"},
    {name: "Sudden Impact", img: "/runes-picture/Sudden_Impact.png"},
    {name: "Summon Aery", img: "/runes-picture/Summon_Aery.png"},
    {name: "Taste of Blood", img: "/runes-picture/Taste_Blood.png"},
    {name: "Time Warp Tonic", img: "/runes-picture/Time_Warp_Tonic.png"},
    {name: "Transcendence", img: "/runes-picture/Transcendence.png"},
    {name: "Treasure Hunter", img: "/runes-picture/Treasure_Hunter.png"},
    {name: "Triple Tonic", img: "/runes-picture/Triple_Tonic.png"},
    {name: "Triumph", img: "/runes-picture/Triumph.png"},
    {name: "Ultimate Hunter", img: "/runes-picture/Ultimate_Hunter.png"},
    {name: "Unflinching", img: "/runes-picture/Unflinching.png"},
    {name: "Unsealed Spellbook", img: "/runes-picture/Unsealed_Spellbook.png"},
    {name: "Waterwalking", img: "/runes-picture/Waterwalking.png"},
  ]

  const selectedRune = ref(null)

  function selectRune(rune){
    selectedRune.value = rune;
    menu.value = false;
  }

</script>

<style scoped>
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
    cursor: pointer;
    }

    .cursor-pointer {
      cursor: pointer;
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