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

  const precisionRunes = {
    id:"precision", name: "Precision", img: "/runes-picture/Precision.png",
          keystones: [
            {id: "pressAttack" , slot: 0 ,name: "Press the Attack", img: "/runes-picture/Press_Attack.png"},
            {id: "lethalTempo", slot: 0 ,name: "Lethal Tempo", img: "/runes-picture/Lethal_Tempo.png"},
            {id: "fleetFootwork", slot: 0 ,name: "Fleet Footwork", img: "/runes-picture/Fleet_Footwork.png"},
            {id: "conqueror", slot: 0 ,name: "Conqueror", img: "/runes-picture/Conqueror.png"},
          ],
          runes: [
            {id: "absorbLife", slot: 1 ,name: "Absorb Life", img: "/runes-picture/Absorb_Life.png"},
            {id: "triumph", slot: 1 ,name: "Triumph", img: "/runes-picture/Triumph.png"},
            {id: "presenceMind", slot: 1 ,name: "Presence of Mind", img: "/runes-picture/Presence_Mind.png"},

            {id:"alacrity", slot: 2 ,name: "Alacrity", img: "/runes-picture/Alacrity.png"},
            {id:"haste", slot: 2 ,name: "Haste", img: "/runes-picture/Haste.png"},
            {id: "bloodline", slot: 2 ,name: "Bloodline", img: "/runes-picture/Bloodline.png"},

            {id: "coupGrace", slot: 3 ,name: "Coup de Grace", img: "/runes-picture/Coup_Grace.png"},
            {id: "cutDown", slot: 3 ,name: "Cut Down", img: "/runes-picture/Cut_Down.png"},
            {id: "lastStand", slot: 3 ,name: "Last Stand", img: "/runes-picture/Last_Stand.png"},
          ],
  }

  const dominationRunes = {
    id: "domination", name: "Domination", img: "/runes-picture/Domination.png",
    keystones: [
      {id:"electrocute", slot:0 ,name: "Electrocute", img: "/runes-picture/Electrocute.png"},
      {id: "darkHarvest" , slot:0 ,name: "Dark Harvest", img: "/runes-picture/Dark_Harvest.png"},
      {id:"hailBlades", slot:0 ,name: "Hail of Blades", img: "/runes-picture/Hail_Blades.png"},
    ],
    runes: [
      {id:"cheapShot", slot:1 ,name: "Cheap Shot", img: "/runes-picture/Cheap_Shot.png"},
      {id:"tasteBlood", slot:1 ,name: "Taste of Blood", img: "/runes-picture/Taste_Blood.png"},
      {id:"suddenImpact",  slot:1 ,name: "Sudden Impact", img: "/runes-picture/Sudden_Impact.png"},

      {id: "sixthSense", slot: 2,name: "Sixth Sense", img: "/runes-picture/Sixth_Sense.png"},
      {id: "grislyMementos", slot:2 ,name: "Grisly Mementos", img: "/runes-picture/Grisly_Mementos.png"},
      {id: "deepWard", slot:2 ,name: "Deep Ward", img: "/runes-picture/Deep_Ward.png"},

      {id: "treasureHunter", slot: 3 , name: "Treasure Hunter", img: "/runes-picture/Treasure_Hunter.png"},
      {id: "relentlessHunter", slot:3 ,name: "Relentless Hunter", img: "/runes-picture/Relentless_Hunter.png"},
      {id: "ultimateHunter", slot:3 ,name: "Ultimate Hunter", img: "/runes-picture/Ultimate_Hunter.png"},
    ],
  }

  const sorceryRunes = {
    id: "sorcery", name: "Sorcery", img: "/runes-picture/Sorcery.png",
    keystones: [
      {id: "summonAery", slot:0 ,name: "Summon Aery", img: "/runes-picture/Summon_Aery.png"},
      {id:"arcaneComet", slot: 0 ,name: "Arcane Comet", img: "/runes-picture/Arcane_Comet.png"},
      {id: "phaseRush", slot:0 ,name: "Phase Rush", img: "/runes-picture/Phase_Rush.png"},
    ],
    runes: [
      {id: "axiomArcanist", slot:1 ,name: "Axiom Arcanist", img: "/runes-picture/Axiom_Arcanist.png"},
      {id:"manaflowBand", slot: 1 ,name: "Manaflow Band", img: "/runes-picture/Manaflow_Band.png"},
      {id:"nimbusCloak", slot:1 , name: "Nimbus Cloak", img: "/runes-picture/Nimbus_Cloak.png"},

      {id:"transcendence", slot:2 ,name: "Transcendence", img: "/runes-picture/Transcendence.png"},
      {id:"celerity", slot:2 ,name: "Celerity", img: "/runes-picture/Celerity.png"},
      {id:"absoluteFocus", slot:2 ,name: "Absolute Focus", img: "/runes-picture/Absolute_Focus.png"},

      {id:"scorch", slot:3 ,name: "Scorch", img: "/runes-picture/Scorch.png"},
      {id:"waterwalking", slot:3 ,name: "Waterwalking", img: "/runes-picture/Waterwalking.png"},
      {id:"gatheringStorm", slot:3 ,name: "Gathering Storm", img: "/runes-picture/Gathering_Storm.png"},
    ],
  }

  const resolveRunes = {
    id: "resolve", name: "Resolve", img: "/runes-picture/Resolve.png",
    keystones: [
      {id:"graspUndying", slot:0 ,name: "Grasp of the Undying", img: "/runes-picture/Grasp_Undying.png"},
      {id:"aftershock", slot:0 ,name: "Aftershock", img: "/runes-picture/Aftershock.png"},
      {id:"guardian", slot:0 ,name: "Guardian", img: "/runes-picture/Guardian.png"},
    ],
    runes: [
      {id:"demolish", slot:1 ,name: "Demolish", img: "/runes-picture/Demolish.png"},
      {id:"fontLife", slot:1 ,name: "Font of Life", img: "/runes-picture/Font_Life.png"},
      {id:"shieldBash", slot:1 ,name: "Shield Bash", img: "/runes-picture/Shield_Bash.png"},

      {id:"conditioning", slot:2 ,name: "Conditioning", img: "/runes-picture/Conditioning.png"},
      {id:"secondWind", slot:2 ,name: "Second Wind", img: "/runes-picture/Second_Wind.png"},
      {id:"bonePlating", slot:2 , name: "Bone Plating", img: "/runes-picture/Bone_Plating.png"},

      {id:"overgrowth", slot:3 ,name: "Overgrowth", img: "/runes-picture/Overgrowth.png"},
      {id:"revitalize", slot:3 ,name: "Revitalize", img: "/runes-picture/Revitalize.png"},
      {id:"unflinching", slot: 3 ,name: "Unflinching", img: "/runes-picture/Unflinching.png"},
    ],
  }

  const inspirationRunes = {
    id: "inspiration", name: "Inspiration", img: "/runes-picture/Inspiration.png",
    keystones: [
      {id: "glacialAugment", slot:0 ,name: "Glacial Augment", img: "/runes-picture/Glacial_Augment.png"},
      {id:"unsealedSpellbook", slot:0 ,name: "Unsealed Spellbook", img: "/runes-picture/Unsealed_Spellbook.png"},
      {id: "firstStrike", slot:0 ,name: "First Strike", img: "/runes-picture/First_Strike.png"},
    ],
    runes: [
      {id:"hextechFlashtraption", slot:1 ,name: "Hextech Flashtraption", img: "/runes-picture/Hextech_Flashtraption.png"},
      {id: "magicalFootwear", slot:1 ,name: "Magical Footwear", img: "/runes-picture/Magical_Footwear.png"},
      {id: "cashBack", slot:1 , name: "Cash Back", img: "/runes-picture/Cash_Back.png"},

      {id: "tripleTonic", slot:2 ,name: "Triple Tonic", img: "/runes-picture/Triple_Tonic.png"},
      {id: "timeWarpTonic", slot: 2 ,name: "Time Warp Tonic", img: "/runes-picture/Time_Warp_Tonic.png"},
      {id:"biscuitDelivery", slot:2 ,name: "Biscuit Delivery", img: "/runes-picture/Biscuit_Delivery.png"},

      {id:"approachVelocity", slot: 3 , name: "Approach Velocity", img: "/runes-picture/Approach_Velocity.png"},
      {id:"cosmicInsight", slot: 3 ,name: "Cosmic Insight", img: "/runes-picture/Cosmic_Insight.png"},
      {id:"jackAllTrades", slot: 3 ,name: "Jack of All Trades", img: "/runes-picture/Jack_All_Trades.png"},
    ],
  }
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