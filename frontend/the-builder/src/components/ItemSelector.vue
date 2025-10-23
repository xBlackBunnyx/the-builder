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
    {name: "Boots of Swiftness", img: "/items-picture/Boots_Swiftness.png", stats: {"Movement Speed": "+60"}},
    {name: "Ionian Boots of Lucidity", img: "/items-picture/Ionian_Boots_Lucidity.png", stats: {"Ability Haste": "+10", "Movement Speed" : "+45"}},
    {name: "Mercury's Treads", img: "/items-picture/Mercury_Treads.png", stats: {"Magic Resistance": "+20", "Movement Speed": "+45", "Tenacity": "+30%"}},
    {name: "Plated Steelcaps", img: "/items-picture/Plated_Steelcaps.png", stats: {"Armor": "+25", "Movement Speed": "+45"}},
    {name: "Sorcerer's Shoes", img: "/items-picture/Sorcerer_Shoes.png", stats: {"Movement Speed": "+45", "Magic Penetration": "+12"}},
    {name: "Bloodsong", img: "/items-picture/Bloodsong.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}},
    {name: "Celestial Opposition", img: "/items-picture/Celestial_Opposition.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}},
    {name: "Dream Maker", img: "/items-picture/Dream_Maker.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}},
    {name: "Solstice Sleigh", img: "/items-picture/Solstice_Sleigh.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}},
    {name: "Zaz'Zak's Realmspike", img: "/items-picture/ZazZak_Realmspike.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}},
    {name: "Abyssal Mask", img: "/items-picture/Abyssal_Mask.png", stats: {"Ability Haste": "+15", "Health": "+300", "Magic Resistance": "+45"}},
    {name: "Arden Censer", img: "/items-picture/Ardent_Censer.png", stats: {"Ability Power": "+45", "Mana Regeneration": "+125%", "Movement Speed": "+4%", "Heal & Shield Power": "+10%"}},
    {name: "Axiom Arc", img: "/items-picture/Axiom_Arc.png", stats: {"Attack Damage": "+55", "Ability Haste": "+20", "Lethality": "+18"}},
    {name: "Banshee's Veil", img: "/items-picture/Banshee_Veil.png", stats: {"Ability Power": "+105", "Magic Resistance": "+40"}},
    {name: "Black Cleaver", img: "/items-picture/Black_Cleaver.png", stats: {"Attack Damage": "+40", "Ability Haste": "+20", "Health": "+400"}},
    {name: "Blackfire Torch", img: "/items-picture/Blackfire_Torch.png", stats: {"Ability Power": "+80", "Ability Haste": "+20", "Mana": "+600"}},
    {name: "Blade of the Ruined King", img: "/items-picture/Blade_Ruined_King.png", stats: {"Attack Damage": "+40", "Attack Speed": "+25%", "Lifesteal": "+10%"}},
    {name: "Bloodletter's Curse", img: "/items-picture/Bloodletter_Curse.png", stats: {"Ability Power": "+60", "Ability Haste": "+15", "Health": "+350"}},
    {name: "Bloodthirster", img: "/items-picture/Bloodthirster.png", stats: {"Attack Damage": "+80", "Lifesteal": "+15%"}},
    {name: "Chempunk Chainsword", img: "/items-picture/Chempunk_Chainsword.png", stats: {"Attack Damage": "+45", "Ability Haste": "+15", "Health": "+450"}},
    {name: "Cosmic Drive", img: "/items-picture/Cosmic_Drive.png", stats: {"Ability Power": "+70", "Ability Haste": "+25", "Health": "+350", "Movement Speed": "+4%"}},
    {name: "Cryptbloom", img: "/items-picture/Cryptbloom.png", stats: {"Ability Power": "+60", "Ability Haste": "+15", "Magic Penetration": "+30%"}},
    {name: "Dawncore", img: "/items-picture/Dawncore.png", stats: {"Ability Power": "+45", "Mana Regeneration": "+100%", "Heal & Shield Power": "+16%"}},
    {name: "Dead Man's Plate", img: "/items-picture/Dead_Man_Plate.png", stats: {"Health": "+350", "Armor":"+55", "Movement Speed": "+4%"}},
    {name: "Death's Dance", img: "/items-picture/Death_Dance.png", stats: {"Attack Damage": "+60", "Ability Haste": "+15", "Armor": "+50"}},
    {name: "Echoes of Helia", img: "/items-picture/Echoes_Helia.png", stats: {"Ability Power": "+35", "Ability Haste": "+20", "Health": "+200", "Mana Regeneration": "+125%"}},
    {name: "Eclipse", img: "/items-picture/Eclipse.png", stats: {"Attack Damage": "+60", "Ability Haste": "+15"}},
    {name: "Edge of Night", img: "/items-picture/Edge_Night.png", stats: {"Attack Damage": "+50", "Health": "+250", "Lethality": "+15"}},
    {name: "Essence Reaver", img: "/items-picture/Essence_Reaver.png", stats: {"Attack Damage": "+60", "Ability Haste": "+15", "Critical Strike Chance": "+25%"}},
    {name: "Experimental Hexplate", img: "/items-picture/Experimental_Hexplate.png", stats: {"Attack Damage": "+40", "Attack Speed": "+20%", "Health": "+450"}},
    {name: "Fimbulwinter", img: "/items-picture/Fimbulwinter.png", stats: {"Ability Haste": "+15", "Health": "+550", "Mana": "+860"}},
    {name: "Force of Nature", img: "/items-picture/Force_Nature.png", stats: {"Health": "+400", "Magic Resistance": "+55", "Movement Speed": "+4%"}},
    {name: "Frozen Heart", img: "/items-picture/Frozen_Heart.png", stats: {"Ability Haste": "+20", "Mana": "+400", "Armor": "+75"}},
    {name: "Guardian Angel", img: "/items-picture/Guardian_Angel.png", stats: {"Attack Damage": "+55", "Armor": "+45"}},
    {name: "Guinsoo's Rageblade", img: "/items-picture/Guinsoo_Rageblade.png", stats: {"Ability Power": "+30", "Attack Damage": "+30", "Attack Speed": "+25%"}},
    {name: "Heartsteel", img: "/items-picture/Heartsteel.png", stats: {"Health": "+900", "Health Regeneration": "+100%"}},
    {name: "Hextech Rocketbelt", img: "/items-picture/Hextech_Rocketbelt.png", stats: {"Ability Power": "+60", "Ability Haste": "+15", "Health": "+350"}},
    {name: "Hollow Radiance", img: "/items-picture/Hollow_Radiance.png", stats: {"Ability Haste": "+10", "Health": "+400", "Health Regeneration": "+100%", "Magic Resistance": "+40"}},
    {name: "Horizon Focus", img: "/items-picture/Horizon_Focus.png", stats: {"Ability Power": "+75", "Ability Haste": "+25"}},
    {name: "Hubris", img: "/items-picture/Hubris.png", stats: {"Ability Damage": "+60", "Ability Haste": "+10", "Lethality": "+18"}},
    {name: "Hullbreaker", img: "/items-picture/Hullbreaker.png", stats: {"Attack Damage": "+40", "Health": "+500", "Movement Speed": "+4%"}},
    {name: "Iceborn Gauntlet", img: "/items-picture/Iceborn_Gauntlet.png", stats: {"Ability Haste": "+15", "Health": "+300", "Armor": "+50"}},
    {name: "Immortal Shieldbow", img: "/items-picture/Immortal_Shieldbow.png", stats: {"Attack Damage": "+55", "Critical Strike Chance": "+25%"}},
    {name: "Imperial Mandate", img: "/items-picture/Imperial_Mandate.png", stats: {"Imperial Mandate": "+60", "Ability Haste": "+20", "Mana Regeneration": "+125%"}},
    {name: "Infinity Edge", img: "/items-picture/Infinity_Edge.png", stats: {"Attack Damage": "+70", "Critical Strike Chance": "+25%", "Critical Strike Damage": "+40%"}},
    {name: "Jak'Sho, The Protean", img: "/items-picture/Jak_The_Protean.png", stats: {"Health": "+350", "Armor": "+45"}},
    {name: "Kaenic Rookern", img: "/items-picture/Kaenic_Rookern.png", stats: {"Health":"+400", "Health Regeneration":"+100%"}},
    {name: "Knight's Vow", img: "/items-picture/Knight_Vow.png", stats: {"Ability Haste":"+10", "Health":"+200", "Health Regeneration":"+100%", "Armor":"+40"}},
    {name: "Kraken Slayer", img: "/items-picture/Kraken_Slayer.png", stats: {"Attack Damage":"+45", "Attack Speed":"+40%", "Movement Speed":"+4%"}},
    {name: "Liandry's Torment", img: "/items-picture/Liandry_Torment.png", stats: {"Ability Power":"+70", "Health":"+300"}},
    {name: "Lich Bane", img: "/items-picture/Lich_Bane.png", stats: {"Ability Power":"+115", "Ability Haste":"+10", "Movement Speed":"+4%"}},
    {name: "Locket of the Iron Solari", img: "/items-picture/Locket_Solari.png", stats: {"Ability Haste":"+10", "Health":"+200", "Armor":"+25", "Magic Resistance":"+25"}},
    {name: "Lord Dominik's Regards", img: "/items-picture/Lord_Dominik_Regards.png", stats: {"Attack Damage":"+35", "Critical Strike Chance":"+25%", "Armor Penetration":"+35%"}},
    {name: "Luden's Companion", img: "/items-picture/Luden_Companion.png", stats: {"Ability Power":"+100", "Ability Haste":"+10", "Mana":"+600"}},
    {name: "Malignance", img: "/items-picture/Malignance.png", stats: {"Ability Power":"+85", "Ability Haste":"+15", "Mana":"+600"}},
    {name: "Maw of Malmortius", img: "/items-picture/Maw_Malmortius.png", stats: {"Attack Damage":"+60", "Ability Haste":"+15", "Magic Resistance":"+40"}},
    {name: "Mejai's Soulstealer", img: "/items-picture/Mejai_Soulstealer.png", stats: {"Ability Power":"+20", "Health":"+100"}},
    {name: "Mercurial Scimitar", img: "/items-picture/Mercurial_Scimitar.png", stats: {"Attack Damage":"+40", "Magic Resistance":"+40", "Lifesteal":"+10%"}},
    {name: "Mikael's Blessing", img: "/items-picture/Mikael_Blessing.png", stats: {"Ability Haste":"+15", "Health":"+250", "Mana Regeneration":"+100%", "Heal & Shield Power":"+12%"}},
    {name: "Moonstone Renewer", img: "/items-picture/Moonstone_Renewer.png", stats: {"Ability Power":"+25", "Ability Haste":"+20", "Health":"+200", "Mana Regeneration":"+125%"}},
    {name: "Morellonomicon", img: "/items-picture/Morellonomicon.png", stats: {"Ability Power":"+75", "Ability Haste":"+15", "Health":"+350"}},
    {name: "Mortal Reminder", img: "/items-picture/Mortal_Reminder.png", stats: {"Attack Damage":"+35", "Critical Strike Chance":"+25%", "Armor Penetration":"+30%"}},
    {name: "Muramana", img: "/items-picture/Muramana.png", stats: {"Attack Damage":"+35", "Ability Haste":"+15", "Mana":"+860"}},
    {name: "Nashor's Tooth", img: "/items-picture/Nashor_Tooth.png", stats: {"Ability Power":"+80", "Ability Haste":"+15", "Attack Speed":"+50%"}},
    {name: "Navori Flickerblade", img: "/items-picture/Navori_Flickerblade.png", stats: {"Attack Speed":"+40%", "Critical Strike Chance":"+25%", "Movement Speed":"+4%"}},
    {name: "Opportunity", img: "/items-picture/Opportunity.png", stats: {"Attack Damage":"+55", "Lethality":"+15"}},
    {name: "Overlord's Bloodmail", img: "/items-picture/Overlord_Bloodmail.png", stats: {"Attack Damage":"+30", "Health":"+550"}},
    {name: "Phantom Dancer", img: "/items-picture/Phantom_Dancer.png", stats: {"Attack Speed":"+60%", "Critical Strike Chance":"+25%"}},
    {name: "Profane Hydra", img: "/items-picture/Profane_Hydra.png", stats: {"Attack Damage":"+60", "Ability Haste":"+10", "Lethality":"+18"}},
    {name: "Rabadon's Deathcap", img: "/items-picture/Rabadon_Deathcap.png", stats: {"Ability Power":"+130"}},
    {name: "Randuin's Omen", img: "/items-picture/Randuin_Omen.png", stats: {"Health":"+350", "Armor":"+75"}},
    {name: "Rapid Firecannon", img: "/items-picture/Rapid_Firecannon.png", stats: {"Attack Speed":"+35%", "Critical Strike Chance":"+25%", "Movement Speed":"+4%"}},
    {name: "Ravenous Hydra", img: "/items-picture/Ravenous_Hydra.png", stats: {"Attack Damage":"+65", "Ability Haste":"+15", "Lifesteal":"+12%"}},
    {name: "Redemption", img: "/items-picture/Redemption.png", stats: {"Ability Haste":"+15", "Health":"+200", "Mana Regeneration":"+100%", "Heal & Shield Power":"+10%"}},
    {name: "Riftmaker", img: "/items-picture/Riftmaker.png", stats: {"Ability Power":"+70", "Ability Haste":"+15", "Health":"+350"}},
    {name: "Rod of Ages", img: "/items-picture/Rod_Ages.png", stats: {"Ability Power":"+45", "Health":"+350", "Mana":"+400"}},
    {name: "Runaan's Hurricane", img: "/items-picture/Runaan_Hurricane.png", stats: {"Attack Speed":"+40%", "Critical Strike Chance":"+25%", "Movement Speed":"+4%"}},
    {name: "Rylai's Crystal Scepter", img: "/items-picture/Rylai_Crystal_Scepter.png", stats: {"Ability Power":"+65", "Health":"+400"}},
    {name: "Serpent's Fang", img: "/items-picture/Serpent_Fang.png", stat: {"Attack Damage":"+55", "Lethality":"15"}},
    {name: "Serylda's Grudge", img: "/items-picture/Serylda_Grudge.png", stats: {"Attack Damage":"+45", "Ability Haste":"+20", "Armor Penetration":"+30%"}},
    {name: "Shadowflame", img: "/items-picture/Shadowflame.png", stat: {"Ability Power":"+110", "Magic Penetration":"+15"}},
    {name: "Shurelya's Battlesong", img: "/items-picture/Shurelya_Battlesong.png", stat: {"Ability Power":"+50", "Ability Haste":"+15", "Mana Regeneration":"+125%", "Movement Speed":"+4%"}},
    {name: "Spear of Shojin", img: "/items-picture/Spear_Shojin.png", stat: {"Attack Damage":"+45", "Health":"+450"}},
    {name: "Spirit Visage", img: "/items-picture/Spirit_Visage.png", stat: {"Ability Haste":"+10", "Health":"+400", "Health Regeneration":"+100%", "Magic Resistance":"+50"}},
    {name: "Staff of Flowing Water", img: "/items-picture/Staff_Flowing_Water.png", stat: {"Ability Power":"+35", "Ability Haste":"+15", "Mana Regeneration":"+125%", "Heal & Shield Power":"+10%"}},
    {name: "Statikk Shiv", img: "/items-picture/Statikk_Shiv.png", stat: {"Attack Damage":"+45", "Attack Speed":"+30%", "Movement Speed":"+4%"}},
    {name: "Sterak's Gage", img: "/items-picture/Sterak_Gage.png", stat: {"Health":"+400", "Tenacity":"+20%"}},
    {name: "Stormsurge", img: "/items-picture/Stormsurge.png", stat: {"Ability Power":"+90", "Movement Speed":"+4%", "Magic Penetration":"+15"}},
    {name: "Stridebreaker", img: "/items-picture/Stridebreaker.png", stat: {"Attack Damage":"+40", "Attack Speed":"+25%", "Health":"+450"}},
    {name: "Sundered Sky", img: "/items-picture/Sundered_Sky.png", stat: {"Attack Damage":"+40", "Ability Haste":"+10", "Health":"+400"}},
    {name: "Sunfire Aegis", img: "/items-picture/Sunfire_Aegis.png", stat: {"Ability Haste":"+10", "Health":"+350", "Armor":"+50"}},
    {name: "Terminus", img: "/items-picture/Terminus.png", stat: {"Attack Damage":"+30", "Attack Speed":"+35%"}},
    {name: "The Collector", img: "/items-picture/The_Collector.png", stat: {"Attack Damage":"+50", "Critical Strike Chance":"+25%", "Lethality":"+10"}},
    {name: "Thornmail", img: "/items-picture/Thornmail.png", stat: {"Health":"+150", "Armor":"+75"}},
    {name: "Titanic Hydra", img: "/items-picture/Titanic_Hydra.png", stat: {"Attack Damage":"+40", "Health":"+600"}},
    {name: "Trailblazer", img: "/items-picture/Trailblazer.png", stat: {"Health":"+250", "Armor":"+40", "Movement Speed":"+4%"}},
    {name: "Trinity Force", img: "/items-picture/Trinity_Force.png", stat: {"Attack Damage":"+36", "Ability Haste":"+15", "Attack Speed":"+30%", "Health":"+333"}},
    {name: "Umbral Glaive", img: "/items-picture/Umbral_Glaive.png", stat: {"Attack Damage":"+50", "Ability Haste":"+10", "Lethality":"+15"}},
    {name: "Unending Despair", img: "/items-picture/Unending_Despair.png", stat: {"Ability Haste":"+10", "Health":"+400", "Armor":"+25", "Magic Resistance":"+25"}},
    {name: "Vigilant Wardstone", img: "/items-picture/Vigilant_Wardstone.png", stat: {"Ability Haste":"+20", "Health":"+250", "Armor":"+25", "Magic Resistance":"+30"}},
    {name: "Void Staff", img: "/items-picture/Void_Staff.png", stat: {"Ability Power":"+95", "Magic Penetration":"+40%"}},
    {name: "Voltaic Cyclosword", img: "/items-picture/Voltaic_Cyclosword.png", stat: {"Attack Damage":"+55", "Ability Haste":"+10", "Lethality":"+18"}},
    {name: "Warmog's Armor", img: "/items-picture/Warmog_Armor.png", stat: {"Health":"+1000", "Health Regeneration":"+100%", "Movement Speed":"+4%"}},
    {name: "Wit's End", img: "/items-picture/Wit_End.png", stat: {"Attack Speed":"+50%", "Magic Resistance":"+45", "Tenacity":"+20%"}},
    {name: "Youmuu's Ghostblade", img: "/items-picture/Youmuu_Ghostblade.png", stat: {"Attack Damage":"+55", "Movement Speed":"+4%", "Lethality":"+18"}},
    {name: "Yun Tal Wildarrows", img: "/items-picture/Yun_Tal_Wildarrows.png", stat: {"Attack Damage":"+55", "Attack Speed":"+35%"}},
    {name: "Zeke's Convergence", img: "/items-picture/Zeke_Convergence.png", stat: {"Ability Haste":"+10", "Health":"+300", "Armor":"+25", "Magic Resistance":"+25"}},
    {name: "Zhonya's Hourglass", img: "/items-picture/Zhonya_Hourglass.png", stat: {"Ability Power":"+105", "Armor":"+50"}},
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