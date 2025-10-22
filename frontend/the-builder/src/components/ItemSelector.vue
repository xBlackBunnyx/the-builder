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
          v-if="selectedItem"
          :src="selectedItem.img"
          alt="Selected item">
          </img>
          <span v-else class="placeholder-text"> Item</span>
      </button>
      </template>

        <v-list class="d-flex flex-wrap" style="max-width: 300px;">
          <v-list-item
          v-for="item in items"
          :key="item.name"
          class="ma-1 pa-0"
          >
          <v-tooltip location="top left" class="golden-tooltip" :open-delay="100">
            <template #activator="{props}">
              <v-img 
              v-bind="props"
              :src="item.img"
              class="cursor-pointer"
              alt="Item"
              @click="selectItem(item)"
              />
            </template>
            <div class="tooltip-content">
              <strong class="tooltip-title">{{ item.name }}</strong>
              <ul class="tooltip-stats">
                <li v-for="(value, stat) in item.stats" :key="stat">
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

  const items = [
    {name: "Berserker's Greaves", img: "/items-picture/Berserker_Greaves.png", stats: {"Attack Speed": "+25%", "Movement Speed": "+45"},},
    {name: "Boots of Swiftness", img: "/items-picture/Boots_Swiftness.png"},
    {name: "Ionian Boots of Lucidity", img: "/items-picture/Ionian_Boots_Lucidity.png"},
    {name: "Mercury's Treads", img: "/items-picture/Mercury_Treads.png"},
    {name: "Plated Steelcaps", img: "/items-picture/Plated_Steelcaps.png"},
    {name: "Sorcerer's Shoes", img: "/items-picture/Sorcerer_Shoes.png"},
    {name: "Bloodsong", img: "/items-picture/Bloodsong.png"},
    {name: "Celestial Opposition", img: "/items-picture/Celestial_Opposition.png"},
    {name: "Dream Maker", img: "/items-picture/Dream_Maker.png"},
    {name: "Solstice Sleigh", img: "/items-picture/Solstice_Sleigh.png"},
    {name: "Zaz'Zak's Realmspike", img: "/items-picture/ZazZak_Realmspike.png"},
    {name: "Abyssal Mask", img: "/items-picture/Abyssal_Mask.png"},
    {name: "Arden Censer", img: "/items-picture/Ardent_Censer.png"},
    {name: "Axiom Arc", img: "/items-picture/Axiom_Arc.png"},
    {name: "Banshee's Veil", img: "/items-picture/Banshee_Veil.png"},
    {name: "Black Cleaver", img: "/items-picture/Black_Cleaver.png"},
    {name: "Blackfire Torch", img: "/items-picture/Blackfire_Torch.png"},
    {name: "Blade of the Ruined King", img: "/items-picture/Blade_Ruined_King.png"},
    {name: "Bloodletter's Curse", img: "/items-picture/Bloodletter_Curse.png"},
    {name: "Bloodthirster", img: "/items-picture/Bloodthirster.png"},
    {name: "Chempunk Chainsword", img: "/items-picture/Chempunk_Chainsword.png"},
    {name: "Cosmic Drive", img: "/items-picture/Cosmic_Drive.png"},
    {name: "Cryptbloom", img: "/items-picture/Cryptbloom.png"},
    {name: "Dawncore", img: "/items-picture/Dawncore.png"},
    {name: "Dead Man's Plate", img: "/items-picture/Dead_Man_Plate.png"},
    {name: "Death's Dance", img: "/items-picture/Death_Dance.png"},
    {name: "Echoes of Helia", img: "/items-picture/Echoes_Helia.png"},
    {name: "Eclipse", img: "/items-picture/Eclipse.png"},
    {name: "Edge of Night", img: "/items-picture/Edge_Night.png"},
    {name: "Essence Reaver", img: "/items-picture/Essence_Reaver.png"},
    {name: "Experimental Hexplate", img: "/items-picture/Experimental_Hexplate.png"},
    {name: "Fimbulwinter", img: "/items-picture/Fimbulwinter.png"},
    {name: "Force of Nature", img: "/items-picture/Force_Nature.png"},
    {name: "Frozen Heart", img: "/items-picture/Frozen_Heart.png"},
    {name: "Guardian Angel", img: "/items-picture/Guardian_Angel.png"},
    {name: "Guinsoo's Rageblade", img: "/items-picture/Guinsoo_Rageblade.png"},
    {name: "Heartsteel", img: "/items-picture/Heartsteel.png"},
    {name: "Hextech Rocketbelt", img: "/items-picture/Hextech_Rocketbelt.png"},
    {name: "Hollow Radiance", img: "/items-picture/Hollow_Radiance.png"},
    {name: "Horizon Focus", img: "/items-picture/Horizon_Focus.png"},
    {name: "Hubris", img: "/items-picture/Hubris.png"},
    {name: "Hullbreaker", img: "/items-picture/Hullbreaker.png"},
    {name: "Iceborn Gauntlet", img: "/items-picture/Iceborn_Gauntlet.png"},
    {name: "Immortal Shieldbow", img: "/items-picture/Immortal_Shieldbow.png"},
    {name: "Imperial Mandate", img: "/items-picture/Imperial_Mandate.png"},
    {name: "Infinity Edge", img: "/items-picture/Infinity_Edge.png"},
    {name: "Jak'Sho, The Protean", img: "/items-picture/Jak_The_Protean.png"},
    {name: "Kaenic Rookern", img: "/items-picture/Kaenic_Rookern.png"},
    {name: "Knight's Vow", img: "/items-picture/Knight_Vow.png"},
    {name: "Kraken Slayer", img: "/items-picture/Kraken_Slayer.png"},
    {name: "Liandry's Torment", img: "/items-picture/Liandry_Torment.png"},
    {name: "Lich Bane", img: "/items-picture/Lich_Bane.png"},
    {name: "Locket of the Iron Solari", img: "/items-picture/Locket_Solari.png"},
    {name: "Lord Dominik's Regards", img: "/items-picture/Lord_Dominik_Regards.png"},
    {name: "Luden's Companion", img: "/items-picture/Luden_Companion.png"},
    {name: "Malignance", img: "/items-picture/Malignance.png"},
    {name: "Maw of Malmortius", img: "/items-picture/Maw_Malmortius.png"},
    {name: "Mejai's Soulstealer", img: "/items-picture/Mejai_Soulstealer.png"},
    {name: "Mercurial Scimitar", img: "/items-picture/Mercurial_Scimitar.png"},
    {name: "Mikael's Blessing", img: "/items-picture/Mikael_Blessing.png"},
    {name: "Moonstone Renewer", img: "/items-picture/Moonstone_Renewer.png"},
    {name: "Morellonomicon", img: "/items-picture/Morellonomicon.png"},
    {name: "Mortal Reminder", img: "/items-picture/Mortal_Reminder.png"},
    {name: "Muramana", img: "/items-picture/Muramana.png"},
    {name: "Nashor's Tooth", img: "/items-picture/Nashor_Tooth.png"},
    {name: "Navori Flickerblade", img: "/items-picture/Navori_Flickerblade.png"},
    {name: "Opportunity", img: "/items-picture/Opportunity.png"},
    {name: "Overlord's Bloodmail", img: "/items-picture/Overlord_Bloodmail.png"},
    {name: "Phantom Dancer", img: "/items-picture/Phantom_Dancer.png"},
    {name: "Profane Hydra", img: "/items-picture/Profane_Hydra.png"},
    {name: "Rabadon's Deathcap", img: "/items-picture/Rabadon_Deathcap.png"},
    {name: "Randuin's Omen", img: "/items-picture/Randuin_Omen.png"},
    {name: "Rapid Firecannon", img: "/items-picture/Rapid_Firecannon.png"},
    {name: "Ravenous Hydra", img: "/items-picture/Ravenous_Hydra.png"},
    {name: "Redemption", img: "/items-picture/Redemption.png"},
    {name: "Riftmaker", img: "/items-picture/Riftmaker.png"},
    {name: "Rod of Ages", img: "/items-picture/Rod_Ages.png"},
    {name: "Serpent's Fang", img: "/items-picture/Serpent_Fang.png"},
    {name: "Serylda's Grudge", img: "/items-picture/Serylda_Grudge.png"},
    {name: "Shadowflame", img: "/items-picture/Shadowflame.png"},
    {name: "Shurelya's Battlesong", img: "/items-picture/Shurelya_Battlesong.png"},
    {name: "Spear of Shojin", img: "/items-picture/Spear_Shojin.png"},
    {name: "Spirit Visage", img: "/items-picture/Spirit_Visage.png"},
    {name: "Staff of Flowing Water", img: "/items-picture/Staff_Flowing_Water.png"},
    {name: "Statikk Shiv", img: "/items-picture/Statikk_Shiv.png"},
    {name: "Sterak's Gage", img: "/items-picture/Sterak_Gage.png"},
    {name: "Stormsurge", img: "/items-picture/Stormsurge.png"},
    {name: "Stridebreaker", img: "/items-picture/Stridebreaker.png"},
    {name: "Sundered Sky", img: "/items-picture/Sundered_Sky.png"},
    {name: "Sunfire Aegis", img: "/items-picture/Sunfire_Aegis.png"},
    {name: "Terminus", img: "/items-picture/Terminus.png"},
    {name: "The Collector", img: "/items-picture/The_Collector.png"},
    {name: "Thornmail", img: "/items-picture/Thornmail.png"},
    {name: "Titanic Hydra", img: "/items-picture/Titanic_Hydra.png"},
    {name: "Trailblazer", img: "/items-picture/Trailblazer.png"},
    {name: "Trinity Force", img: "/items-picture/Trinity_Force.png"},
    {name: "Umbral Glaive", img: "/items-picture/Umbral_Glaive.png"},
    {name: "Unending Despair", img: "/items-picture/Unending_Despair.png"},
    {name: "Vigilant Wardstone", img: "/items-picture/Vigilant_Wardstone.png"},
    {name: "Void Staff", img: "/items-picture/Void_Staff.png"},
    {name: "Voltaic Cyclosword", img: "/items-picture/Voltaic_Cyclosword.png"},
    {name: "Warmog's Armor", img: "/items-picture/Warmog_Armor.png"},
    {name: "Wit's End", img: "/items-picture/Wit_End.png"},
    {name: "Youmuu's Ghostblade", img: "/items-picture/Youmuu_Ghostblade.png"},
    {name: "Yun Tal Wildarrows", img: "/items-picture/Yun_Tal_Wildarrows.png"},
    {name: "Zeke's Convergence", img: "/items-picture/Zeke_Convergence.png"},
    {name: "Zhonya's Hourglass", img: "/items-picture/Zhonya_Hourglass.png"},
  ]

  const selectedItem = ref(null)

  function selectItem(item){
    selectedItem.value = item
    menu.value = false
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