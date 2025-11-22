<template>
  <v-container class="d-flex justify-center">
    <v-menu v-model="menu" transition="scale-transition">
      <template v-slot:activator="{ props }">
        <button class="selectorstyle pa-3" v-bind="props" >
          <div class="button-content">
            <img
            v-if="selectedItem"
            :src="selectedItem.img"
            alt="Selected item"
            class="item-image"
            >
            </img>
            <span v-else class="placeholder-text"> Item</span>
          </div>
        </button>
      </template>

        <v-list class="d-flex flex-wrap selectorstyle" style="max-width: 400px;">
          <v-list-item
            v-for="item in items"
            :key="item.name"
            class="ma-1 pa-0"
          >
          <v-tooltip location="top left" class="golden-tooltip" open-delay="100">
            <template #activator="{props}">
              <v-img 
                v-bind="props"
                :src="item.img"
                alt="Item"
                class="item-image"
                :class="{ 'item-selected' : this.isItemSelected(item), 'item-disabled' : !this.isItemEnabled(item)}"
                @click="selectItem(item)"
              />
            </template>
            <div class="tooltip-content">
              <strong class="tooltip-title">{{ item.name }}</strong>
              <ul class="tooltip-stats">
                <li v-for="(value, stats) in item.stats" :key="stats">
                  <strong>{{ stats }}</strong> {{ value }}
                </li>
              </ul>
            </div>
            </v-tooltip>
          </v-list-item>
        </v-list>

    </v-menu>
  </v-container>
</template>

<script>
  // import { emit } from 'process';
  import { ref } from 'vue'
  

  export default{
    data () {
      return {
          //All the items, their images, stats, and whether they're enabled or not
        items: [               
    {name: "Berserker's Greaves", img: "/items-picture/Berserker_Greaves.png", stats: {"Attack Speed": "+25%", "Movement Speed": "+45"}, tag: ["Boots"], enabled:true},
    {name: "Boots of Swiftness", img: "/items-picture/Boots_Swiftness.png", stats: {"Movement Speed": "+60"}, tag: ["Boots"], enabled:false},
    {name: "Ionian Boots of Lucidity", img: "/items-picture/Ionian_Boots_Lucidity.png", stats: {"Ability Haste": "+10", "Movement Speed" : "+45"}, tag: ["Boots"], enabled:true},
    {name: "Mercury's Treads", img: "/items-picture/Mercury_Treads.png", stats: {"Magic Resistance": "+20", "Movement Speed": "+45", "Tenacity": "+30%"}, tag: ["Boots"], enabled:true},
    {name: "Plated Steelcaps", img: "/items-picture/Plated_Steelcaps.png", stats: {"Armor": "+25", "Movement Speed": "+45"}, tag: ["Boots"], enabled:true},
    {name: "Sorcerer's Shoes", img: "/items-picture/Sorcerer_Shoes.png", stats: {"Movement Speed": "+45", "Magic Penetration": "+12"}, tag: ["Boots"], enabled:true},
    {name: "Bloodsong", img: "/items-picture/Bloodsong.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}, tag: ["Support", "Spellblade"], enabled:true},
    {name: "Celestial Opposition", img: "/items-picture/Celestial_Opposition.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}, tag: ["Support"], enabled:true},
    {name: "Dream Maker", img: "/items-picture/Dream_Maker.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}, tag: ["Support"], enabled:true},
    {name: "Solstice Sleigh", img: "/items-picture/Solstice_Sleigh.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}, tag: ["Support"], enabled:true},
    {name: "Zaz'Zak's Realmspike", img: "/items-picture/ZazZak_Realmspike.png", stats: {"Health": "+200", "Health Regeneration": "+75%", "Mana Regeneration": "+75%", "Gold Generation": "+5/10s"}, tag: ["Support"], enabled:true},
    {name: "Abyssal Mask", img: "/items-picture/Abyssal_Mask.png", stats: {"Ability Haste": "+15", "Health": "+300", "Magic Resistance": "+45"}, tag: ["Blight"], enabled:true},
    {name: "Ardent Censer", img: "/items-picture/Ardent_Censer.png", stats: {"Ability Power": "+45", "Mana Regeneration": "+125%", "Movement Speed": "+4%", "Heal & Shield Power": "+10%"}, tag: ["Ardent Censer"], enabled:true},
    {name: "Axiom Arc", img: "/items-picture/Axiom_Arc.png", stats: {"Attack Damage": "+55", "Ability Haste": "+20", "Lethality": "+18"}, tag: ["Axiom Arc"], enabled:true},
    {name: "Banshee's Veil", img: "/items-picture/Banshee_Veil.png", stats: {"Ability Power": "+105", "Magic Resistance": "+40"}, tag: ["Annul"], enabled:true},
    {name: "Black Cleaver", img: "/items-picture/Black_Cleaver.png", stats: {"Attack Damage": "+40", "Ability Haste": "+20", "Health": "+400"}, tag: ["Fatality"], enabled:true},
    {name: "Blackfire Torch", img: "/items-picture/Blackfire_Torch.png", stats: {"Ability Power": "+80", "Ability Haste": "+20", "Mana": "+600"}, tag: ["Blackfire Torch"], enabled:true},
    {name: "Blade of the Ruined King", img: "/items-picture/Blade_Ruined_King.png", stats: {"Attack Damage": "+40", "Attack Speed": "+25%", "Lifesteal": "+10%"}, tag: ["Blade of the Ruined King"], enabled:true},
    {name: "Bloodletter's Curse", img: "/items-picture/Bloodletter_Curse.png", stats: {"Ability Power": "+60", "Ability Haste": "+15", "Health": "+350"}, tag: ["Blight"], enabled:true},
    {name: "Bloodthirster", img: "/items-picture/Bloodthirster.png", stats: {"Attack Damage": "+80", "Lifesteal": "+15%"}, tag: ["Bloodthirster"], enabled:true},
    {name: "Chempunk Chainsword", img: "/items-picture/Chempunk_Chainsword.png", stats: {"Attack Damage": "+45", "Ability Haste": "+15", "Health": "+450"}, tag: ["Chempunk Chainsword"], enabled:true},
    {name: "Cosmic Drive", img: "/items-picture/Cosmic_Drive.png", stats: {"Ability Power": "+70", "Ability Haste": "+25", "Health": "+350", "Movement Speed": "+4%"}, tag: ["Cosmic Drive"], enabled:true},
    {name: "Cryptbloom", img: "/items-picture/Cryptbloom.png", stats: {"Ability Power": "+60", "Ability Haste": "+15", "Magic Penetration": "+30%"}, tag: ["Blight"], enabled:true},
    {name: "Dawncore", img: "/items-picture/Dawncore.png", stats: {"Ability Power": "+45", "Mana Regeneration": "+100%", "Heal & Shield Power": "+16%"}, tag: ["Dawncore"], enabled:true},
    {name: "Dead Man's Plate", img: "/items-picture/Dead_Man_Plate.png", stats: {"Health": "+350", "Armor":"+55", "Movement Speed": "+4%"}, tag: ["Momentum"], enabled:true},
    {name: "Death's Dance", img: "/items-picture/Death_Dance.png", stats: {"Attack Damage": "+60", "Ability Haste": "+15", "Armor": "+50"}, tag: ["Death's Dance"], enabled:true},
    {name: "Echoes of Helia", img: "/items-picture/Echoes_Helia.png", stats: {"Ability Power": "+35", "Ability Haste": "+20", "Health": "+200", "Mana Regeneration": "+125%"}, tag: ["Echoes of Helia"], enabled:true},
    {name: "Eclipse", img: "/items-picture/Eclipse.png", stats: {"Attack Damage": "+60", "Ability Haste": "+15"}, tag: ["Eclipse"], enabled:true},
    {name: "Edge of Night", img: "/items-picture/Edge_Night.png", stats: {"Attack Damage": "+50", "Health": "+250", "Lethality": "+15"}, tag: ["Annul"], enabled:true},
    {name: "Essence Reaver", img: "/items-picture/Essence_Reaver.png", stats: {"Attack Damage": "+60", "Ability Haste": "+15", "Critical Strike Chance": "+25%"}, tag: ["Essence Reaver"], enabled:true},
    {name: "Experimental Hexplate", img: "/items-picture/Experimental_Hexplate.png", stats: {"Attack Damage": "+40", "Attack Speed": "+20%", "Health": "+450"}, tag: ["Experimental Hexplate"], enabled:true},
    {name: "Fimbulwinter", img: "/items-picture/Fimbulwinter.png", stats: {"Ability Haste": "+15", "Health": "+550", "Mana": "+860"}, tag: ["Manaflow"], enabled:true},
    {name: "Force of Nature", img: "/items-picture/Force_Nature.png", stats: {"Health": "+400", "Magic Resistance": "+55", "Movement Speed": "+4%"}, tag: ["Force of Nature"], enabled:true},
    {name: "Frozen Heart", img: "/items-picture/Frozen_Heart.png", stats: {"Ability Haste": "+20", "Mana": "+400", "Armor": "+75"}, tag: ["Frozen Heart"], enabled:true},
    {name: "Guardian Angel", img: "/items-picture/Guardian_Angel.png", stats: {"Attack Damage": "+55", "Armor": "+45"}, tag: ["Guardian Angel"], enabled:true},
    {name: "Guinsoo's Rageblade", img: "/items-picture/Guinsoo_Rageblade.png", stats: {"Ability Power": "+30", "Attack Damage": "+30", "Attack Speed": "+25%"}, tag: ["Guinsoo's Rageblade"], enabled:true},
    {name: "Heartsteel", img: "/items-picture/Heartsteel.png", stats: {"Health": "+900", "Health Regeneration": "+100%"}, tag: ["Heartsteel"], enabled:true},
    {name: "Hextech Rocketbelt", img: "/items-picture/Hextech_Rocketbelt.png", stats: {"Ability Power": "+60", "Ability Haste": "+15", "Health": "+350"}, tag: ["Hextech Rocketbelt"], enabled:true},
    {name: "Hollow Radiance", img: "/items-picture/Hollow_Radiance.png", stats: {"Ability Haste": "+10", "Health": "+400", "Health Regeneration": "+100%", "Magic Resistance": "+40"}, tag: ["Immolate"], enabled:true},
    {name: "Horizon Focus", img: "/items-picture/Horizon_Focus.png", stats: {"Ability Power": "+75", "Ability Haste": "+25"}, tag: ["Horizon Focus"], enabled:true},
    {name: "Hubris", img: "/items-picture/Hubris.png", stats: {"Ability Damage": "+60", "Ability Haste": "+10", "Lethality": "+18"}, tag: ["Hubris"], enabled:true},
    {name: "Hullbreaker", img: "/items-picture/Hullbreaker.png", stats: {"Attack Damage": "+40", "Health": "+500", "Movement Speed": "+4%"}, tag: ["Hullbreaker"], enabled:true},
    {name: "Iceborn Gauntlet", img: "/items-picture/Iceborn_Gauntlet.png", stats: {"Ability Haste": "+15", "Health": "+300", "Armor": "+50"}, tag: ["Spellblade"], enabled:true},
    {name: "Immortal Shieldbow", img: "/items-picture/Immortal_Shieldbow.png", stats: {"Attack Damage": "+55", "Critical Strike Chance": "+25%"}, tag: ["Lifeline"], enabled:true},
    {name: "Imperial Mandate", img: "/items-picture/Imperial_Mandate.png", stats: {"Imperial Mandate": "+60", "Ability Haste": "+20", "Mana Regeneration": "+125%"}, tag: ["Imperial Mandate"], enabled:true},
    {name: "Infinity Edge", img: "/items-picture/Infinity_Edge.png", stats: {"Attack Damage": "+70", "Critical Strike Chance": "+25%", "Critical Strike Damage": "+40%"}, tag: ["Infinity Edge"], enabled:true},
    {name: "Jak'Sho, The Protean", img: "/items-picture/Jak_The_Protean.png", stats: {"Health": "+350", "Armor": "+45", "Magic Resistance": "+45"}, tag: ["Jak'Sho, The Protean"], enabled:true},
    {name: "Kaenic Rookern", img: "/items-picture/Kaenic_Rookern.png", stats: {"Health":"+400", "Health Regeneration":"+100%"}, tag: ["Kaenic Rookern"], enabled:true},
    {name: "Knight's Vow", img: "/items-picture/Knight_Vow.png", stats: {"Ability Haste":"+10", "Health":"+200", "Health Regeneration":"+100%", "Armor":"+40"}, tag: ["Knight's Vow"], enabled:true},
    {name: "Kraken Slayer", img: "/items-picture/Kraken_Slayer.png", stats: {"Attack Damage":"+45", "Attack Speed":"+40%", "Movement Speed":"+4%"}, tag: ["Kraken Slayer"], enabled:true},
    {name: "Liandry's Torment", img: "/items-picture/Liandry_Torment.png", stats: {"Ability Power":"+70", "Health":"+300"}, tag: ["Liandry's Torment"], enabled:true},
    {name: "Lich Bane", img: "/items-picture/Lich_Bane.png", stats: {"Ability Power":"+115", "Ability Haste":"+10", "Movement Speed":"+4%"}, tag: ["Spellblade"], enabled:true},
    {name: "Locket of the Iron Solari", img: "/items-picture/Locket_Solari.png", stats: {"Ability Haste":"+10", "Health":"+200", "Armor":"+25", "Magic Resistance":"+25"}, tag: ["Locket of the Iron Solari"], enabled:true},
    {name: "Lord Dominik's Regards", img: "/items-picture/Lord_Dominik_Regards.png", stats: {"Attack Damage":"+35", "Critical Strike Chance":"+25%", "Armor Penetration":"+35%"}, tag: ["Fatality"], enabled:true},
    {name: "Luden's Companion", img: "/items-picture/Luden_Companion.png", stats: {"Ability Power":"+100", "Ability Haste":"+10", "Mana":"+600"}, tag: ["Luden's Companion"], enabled:true},
    {name: "Malignance", img: "/items-picture/Malignance.png", stats: {"Ability Power":"+85", "Ability Haste":"+15", "Mana":"+600"}, tag: ["Malignance"], enabled:true},
    {name: "Maw of Malmortius", img: "/items-picture/Maw_Malmortius.png", stats: {"Attack Damage":"+60", "Ability Haste":"+15", "Magic Resistance":"+40"}, tag: ["Lifeline"], enabled:true},
    {name: "Mejai's Soulstealer", img: "/items-picture/Mejai_Soulstealer.png", stats: {"Ability Power":"+20", "Health":"+100"}, tag: ["Glory"], enabled:true},
    {name: "Mercurial Scimitar", img: "/items-picture/Mercurial_Scimitar.png", stats: {"Attack Damage":"+40", "Magic Resistance":"+40", "Lifesteal":"+10%"}, tag: ["Quicksilver"], enabled:true},
    {name: "Mikael's Blessing", img: "/items-picture/Mikael_Blessing.png", stats: {"Ability Haste":"+15", "Health":"+250", "Mana Regeneration":"+100%", "Heal & Shield Power":"+12%"}, tag: ["Mikael's Blessing"], enabled:true},
    {name: "Moonstone Renewer", img: "/items-picture/Moonstone_Renewer.png", stats: {"Ability Power":"+25", "Ability Haste":"+20", "Health":"+200", "Mana Regeneration":"+125%"}, tag: ["Moonstone Renewer"], enabled:true},
    {name: "Morellonomicon", img: "/items-picture/Morellonomicon.png", stats: {"Ability Power":"+75", "Ability Haste":"+15", "Health":"+350"}, tag: ["Morellonomicon"], enabled:true},
    {name: "Mortal Reminder", img: "/items-picture/Mortal_Reminder.png", stats: {"Attack Damage":"+35", "Critical Strike Chance":"+25%", "Armor Penetration":"+30%"}, tag: ["Fatality"], enabled:true},
    {name: "Muramana", img: "/items-picture/Muramana.png", stats: {"Attack Damage":"+35", "Ability Haste":"+15", "Mana":"+860"}, tag: ["Manaflow"], enabled:true},
    {name: "Nashor's Tooth", img: "/items-picture/Nashor_Tooth.png", stats: {"Ability Power":"+80", "Ability Haste":"+15", "Attack Speed":"+50%"}, tag: ["Nashor's Tooth"], enabled:true},
    {name: "Navori Flickerblade", img: "/items-picture/Navori_Flickerblade.png", stats: {"Attack Speed":"+40%", "Critical Strike Chance":"+25%", "Movement Speed":"+4%"}, tag: ["Navori Flickerblade"], enabled:true},
    {name: "Opportunity", img: "/items-picture/Opportunity.png", stats: {"Attack Damage":"+55", "Lethality":"+15"}, tag: ["Opportunity"], enabled:true},
    {name: "Overlord's Bloodmail", img: "/items-picture/Overlord_Bloodmail.png", stats: {"Attack Damage":"+30", "Health":"+550"}, tag: ["Overlord's Bloodmail"], enabled:true},
    {name: "Phantom Dancer", img: "/items-picture/Phantom_Dancer.png", stats: {"Attack Speed":"+60%", "Critical Strike Chance":"+25%"}, tag: ["Phantom Dancer"], enabled:true},
    {name: "Profane Hydra", img: "/items-picture/Profane_Hydra.png", stats: {"Attack Damage":"+60", "Ability Haste":"+10", "Lethality":"+18"}, tag: ["Hydra"], enabled:true},
    {name: "Rabadon's Deathcap", img: "/items-picture/Rabadon_Deathcap.png", stats: {"Ability Power":"+130"}, tag: ["Rabadon's Deathcap"], enabled:true},
    {name: "Randuin's Omen", img: "/items-picture/Randuin_Omen.png", stats: {"Health":"+350", "Armor":"+75"}, tag: ["Randuin's Omen"], enabled:true},
    {name: "Rapid Firecannon", img: "/items-picture/Rapid_Firecannon.png", stats: {"Attack Speed":"+35%", "Critical Strike Chance":"+25%", "Movement Speed":"+4%"}, tag: ["Rapid Firecannon"], enabled:true},
    {name: "Ravenous Hydra", img: "/items-picture/Ravenous_Hydra.png", stats: {"Attack Damage":"+65", "Ability Haste":"+15", "Lifesteal":"+12%"}, tag: ["Hydra"], enabled:true},
    {name: "Redemption", img: "/items-picture/Redemption.png", stats: {"Ability Haste":"+15", "Health":"+200", "Mana Regeneration":"+100%", "Heal & Shield Power":"+10%"}, tag: ["Redemption"], enabled:true},
    {name: "Riftmaker", img: "/items-picture/Riftmaker.png", stats: {"Ability Power":"+70", "Ability Haste":"+15", "Health":"+350"}, tag: ["Riftmaker"], enabled:true},
    {name: "Rod of Ages", img: "/items-picture/Rod_Ages.png", stats: {"Ability Power":"+45", "Health":"+350", "Mana":"+400"}, tag: ["Eternity"], enabled:true},
    {name: "Runaan's Hurricane", img: "/items-picture/Runaan_Hurricane.png", stats: {"Attack Speed":"+40%", "Critical Strike Chance":"+25%", "Movement Speed":"+4%"}, tag: ["Runaan's Hurricane", "Ranged"], enabled:true},
    {name: "Rylai's Crystal Scepter", img: "/items-picture/Rylai_Crystal_Scepter.png", stats: {"Ability Power":"+65", "Health":"+400"}, tag: ["Rylai's Crystal Scepter"], enabled:true},
    {name: "Seraph's Embrace", img: "/items-picture/Seraph_Embrace.png", stats: {"Ability Power": "+70", "Ability Haste":"+25", "Mana":"+1000"}, tag: ["Manaflow", "Lifeline"], enabled:true },
    {name: "Serpent's Fang", img: "/items-picture/Serpent_Fang.png", stats: {"Attack Damage":"+55", "Lethality":"15"}, tag: ["Serpent's Fang"], enabled:true},
    {name: "Serylda's Grudge", img: "/items-picture/Serylda_Grudge.png", stats: {"Attack Damage":"+45", "Ability Haste":"+20", "Armor Penetration":"+30%"}, tag: ["Fatality"], enabled:true},
    {name: "Shadowflame", img: "/items-picture/Shadowflame.png", stats: {"Ability Power":"+110", "Magic Penetration":"+15"}, tag: ["Shadowflame"], enabled:true},
    {name: "Shurelya's Battlesong", img: "/items-picture/Shurelya_Battlesong.png", stats: {"Ability Power":"+50", "Ability Haste":"+15", "Mana Regeneration":"+125%", "Movement Speed":"+4%"}, tag: ["Shurelya's Battlesong"], enabled:true},
    {name: "Spear of Shojin", img: "/items-picture/Spear_Shojin.png", stats: {"Attack Damage":"+45", "Health":"+450"}, tag: ["Spear of Shojin"], enabled:true},
    {name: "Spirit Visage", img: "/items-picture/Spirit_Visage.png", stats: {"Ability Haste":"+10", "Health":"+400", "Health Regeneration":"+100%", "Magic Resistance":"+50"}, tag: ["Spirit Visage"], enabled:true},
    {name: "Staff of Flowing Water", img: "/items-picture/Staff_Flowing_Water.png", stats: {"Ability Power":"+35", "Ability Haste":"+15", "Mana Regeneration":"+125%", "Heal & Shield Power":"+10%"}, tag: ["Staff of Flowing Water"], enabled:true},
    {name: "Statikk Shiv", img: "/items-picture/Statikk_Shiv.png", stats: {"Attack Damage":"+45", "Attack Speed":"+30%", "Movement Speed":"+4%"}, tag: ["Statikk Shiv"], enabled:true},
    {name: "Sterak's Gage", img: "/items-picture/Sterak_Gage.png", stats: {"Health":"+400", "Tenacity":"+20%"}, tag: ["Lifeline"], enabled:true},
    {name: "Stormsurge", img: "/items-picture/Stormsurge.png", stats: {"Ability Power":"+90", "Movement Speed":"+4%", "Magic Penetration":"+15"}, tag: ["Stormsurge"], enabled:true},
    {name: "Stridebreaker", img: "/items-picture/Stridebreaker.png", stats: {"Attack Damage":"+40", "Attack Speed":"+25%", "Health":"+450"}, tag: ["Hydra"], enabled:true},
    {name: "Sundered Sky", img: "/items-picture/Sundered_Sky.png", stats: {"Attack Damage":"+40", "Ability Haste":"+10", "Health":"+400"}, tag: ["Sundered Sky"], enabled:true},
    {name: "Sunfire Aegis", img: "/items-picture/Sunfire_Aegis.png", stats: {"Ability Haste":"+10", "Health":"+350", "Armor":"+50"}, tag: ["Immolate"], enabled:true},
    {name: "Terminus", img: "/items-picture/Terminus.png", stats: {"Attack Damage":"+30", "Attack Speed":"+35%"}, tag: ["Fatality", "Blight"], enabled:true},
    {name: "The Collector", img: "/items-picture/The_Collector.png", stats: {"Attack Damage":"+50", "Critical Strike Chance":"+25%", "Lethality":"+10"}, tag: ["The Collector"], enabled:true},
    {name: "Thornmail", img: "/items-picture/Thornmail.png", stats: {"Health":"+150", "Armor":"+75"}, tag: ["Thornmail"], enabled:true},
    {name: "Titanic Hydra", img: "/items-picture/Titanic_Hydra.png", stats: {"Attack Damage":"+40", "Health":"+600"}, tag: ["Hydra"], enabled:true},
    {name: "Trailblazer", img: "/items-picture/Trailblazer.png", stats: {"Health":"+250", "Armor":"+40", "Movement Speed":"+4%"}, tag: ["Momentum"], enabled:true},
    {name: "Trinity Force", img: "/items-picture/Trinity_Force.png", stats: {"Attack Damage":"+36", "Ability Haste":"+15", "Attack Speed":"+30%", "Health":"+333"}, tag: ["Spellblade"], enabled:true},
    {name: "Umbral Glaive", img: "/items-picture/Umbral_Glaive.png", stats: {"Attack Damage":"+50", "Ability Haste":"+10", "Lethality":"+15"}, tag: ["Umbral Glaive"], enabled:true},
    {name: "Unending Despair", img: "/items-picture/Unending_Despair.png", stats: {"Ability Haste":"+10", "Health":"+400", "Armor":"+25", "Magic Resistance":"+25"}, tag: ["Unending Despair"], enabled:true},
    {name: "Vigilant Wardstone", img: "/items-picture/Vigilant_Wardstone.png", stats: {"Ability Haste":"+20", "Health":"+250", "Armor":"+25", "Magic Resistance":"+30"}, tag: ["Sightstone"], enabled:true},
    {name: "Void Staff", img: "/items-picture/Void_Staff.png", stats: {"Ability Power":"+95", "Magic Penetration":"+40%"}, tag: ["Blight"], enabled:true},
    {name: "Voltaic Cyclosword", img: "/items-picture/Voltaic_Cyclosword.png", stats: {"Attack Damage":"+55", "Ability Haste":"+10", "Lethality":"+18"}, tag: ["Voltaic Cyclosword"], enabled:true},
    {name: "Warmog's Armor", img: "/items-picture/Warmog_Armor.png", stats: {"Health":"+1000", "Health Regeneration":"+100%", "Movement Speed":"+4%"}, tag: ["Warmog's Armor"], enabled:true},
    {name: "Wit's End", img: "/items-picture/Wit_End.png", stats: {"Attack Speed":"+50%", "Magic Resistance":"+45", "Tenacity":"+20%"}, tag: ["Wit's End"], enabled:true},
    {name: "Youmuu's Ghostblade", img: "/items-picture/Youmuu_Ghostblade.png", stats: {"Attack Damage":"+55", "Movement Speed":"+4%", "Lethality":"+18"}, tag: ["Youmuu's Ghostblade"], enabled:true},
    {name: "Yun Tal Wildarrows", img: "/items-picture/Yun_Tal_Wildarrows.png", stats: {"Attack Damage":"+55", "Attack Speed":"+35%"}, tag: ["Yun Tal Wildarrows"], enabled:true},
    {name: "Zeke's Convergence", img: "/items-picture/Zeke_Convergence.png", stats: {"Ability Haste":"+10", "Health":"+300", "Armor":"+25", "Magic Resistance":"+25"}, tag: ["Zeke's Convergence"], enabled:true},
    {name: "Zhonya's Hourglass", img: "/items-picture/Zhonya_Hourglass.png", stats: {"Ability Power":"+105", "Armor":"+50"}, tag: ["Stasis"], enabled:true},
          ],
        menu: ref(false),
        selectedItem: ref(null),
        name: "ItemSelectorTest",
        differentiator: 0,
        previousItem: null,
        // emits: ['item-selected'],
      }
    },
    created () {
      //Here we put all the functions that we want to be executed at the loading of the page

    }, 

    mounted() {
      this.emitter.on("disable", (data) => {
        console.log("m: Event received, disabling "  + data.msg + ", unless it's ID " + this.differentiator + ", id is " + data.id);
        if (data.id != this.differentiator) {
          console.log("m: It wasn't my ID, disabling that し");
          this.theDisabler(data.msg);
        }
      });

      this.emitter.on("enable", (data) => {
        console.log("m: Event received, enabling "  + data.msg + ", unless it's ID " + this.differentiator + ", id is " + data.id);
        if (data.id != this.differentiator) {
          console.log("m: It wasn't my ID, enabling that し");
          this.theEnabler(data.msg);
        }
      });

      this.differentiator = Math.random(null);
      console.log("m: differentiator is " + this.differentiator);
    },
    
    methods: {
      isItemEnabled(item) {
      // console.log("Checking item " + item.name);
      for (let i = 0; i < this.items.length; ++i) {
        if (item.name == this.items[i].name) {
          // console.log("Item found, the enabled value is " + items[i].enabled);
          return this.items[i].enabled;
        }
      }
    },

  //Funcion para hacer que algunos objetos no sean seleccionables. Dichos objetos son aquellos que ya tienen la tag seleccionada
    theEnabler(tag) {
        // console.log("tE: LOOKING FOR TAG(S) " + tag);
        // console.log("tE: tag in params: " + JSON.stringify(tag));
        for (let i=0; i < this.items.length; ++i) {
          // console.log("tE: Checking tag " + this.items[i].name + " which has a tag of " + this.items[i].tag);
            for (let j = 0; j < this.items[i].tag.length; ++j) {
              // console.log("tE: tag we're looking at " + JSON.stringify(this.items[i]));
              for (let k = 0; k < tag.length; ++k) {
                if (tag[k] == this.items[i].tag[j]){
                  // console.log("tE: |||| That one fits the tag " + tag[k]);
                  this.items[i].enabled = true;
                }
              }
              
            }
        }
      },

      //Hacer una funcion que haga lo contario a la de arriba aka volver a hacer los objetos seleccionables segun la tag
      theDisabler(tag) {
        // console.log("tD: LOOKING FOR TAG(S) " + tag);
        // console.log("tD: tag in params: " + JSON.stringify(tag));
        for (let i=0; i < this.items.length; ++i) {
          // console.log("tD: Checking tag " + this.items[i].name + " which has a tag of " + this.items[i].tag);
            for (let j = 0; j < this.items[i].tag.length; ++j) {
              // console.log("tD: tag we're looking at " + JSON.stringify(this.items[i]));
              for (let k = 0; k < tag.length; ++k) {
                if (tag[k] == this.items[i].tag[j]){
                  // console.log("tD: |||| That one fits the tag " + tag[k]);
                  this.items[i].enabled = false;
                }
              }
              
            }
        }
      },

      isItemSelected (item) {
        // enable tags
        return this.selectedItem && this.selectedItem.name === item.name
      },

      disableTagsEvent(tags) {
        console.log("dTE: Sending event to disable tags " + tags + ", with ID " + this.differentiator);
        this.emitter.emit("disable", { msg: tags, id: this.differentiator});
      },

      enableTagsEvent(tags) {
        console.log("eTE: Sending event to disable tags " + tags + ", with ID " + this.differentiator);
        this.emitter.emit("enable", { msg: tags, id: this.differentiator});
      },

      

      //Function that select the items
      selectItem(item){
        this.selectedItem = item;
        if (this.previousItem) {
          this.enableTagsEvent(this.previousItem.tag);
        }
        this.disableTagsEvent(item.tag);
        this.previousItem = item;
        this.menu = false
        // emit('item-selected', {
        //   item: itemName,
          // tag: itemTag,
          // enabled: isEnabled
        // })
      },

    }
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
    cursor: pointer;
    min-width: 64px;
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .button-content{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .item-image {
      width: 48px;
      height: 48px;
      object-fit: contain;
      cursor: pointer;
    }

    .placeholder-text {
      display: inline-block;
      min-width: 48px;
      text-align: center;
    }
  
    /* .cursor-pointer {
      cursor: pointer;
    }
 */
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

    .item-disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .item-selected {
      border: 3px solid #653a1b;
      cursor: pointer;
    }
</style>