<template>
  <v-container class="pa-4 text-center">

    <!-- Primary runes -->
    <v-row class="justify-center mb-2">
      <v-col cols="auto">
        <button class="selector-style ma-2" @click="showPrimaryDialog = true">
            <v-img
              v-if="selectedPrimaryBranch"
              :src="selectedPrimaryBranch.img"
              width="64"
              height="64"
            ></v-img>
            {{ selectedPrimaryBranch ? selectedPrimaryBranch.name : "Primary runes" }}
        </button>
      </v-col>

      <v-col v-if="selectedPrimaryBranch?.name" cols="4" class="text-center">
        <v-row class="justify-center">
          <v-col
            v-for="keystone in selectedPrimaryBranch.keystones"
            :key="keystone.name"
            cols="auto"
          >
            <v-tooltip
              class="golden-tooltip rune-row"
              :text="keystone.stat"
              location="top left"
              open-delay="100"
            >
              <template #activator="{props}">
                <div
                  v-bind="props"
                  class="rune"
                  :class="{selected: selectedRunes.primary.keystone === keystone.name}"
                  @click.stop="selectRune('primary', 'keystone', keystone.name)"
                >
                  <v-img
                    :src="keystone.img"
                    :alt="keystone.name"
                    width="64"
                    height="64"
                    cover
                  ></v-img>
                </div>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row
            v-for="(row, rowIndex) in selectedPrimaryBranch.rows"
            :key="rowIndex"
            class="justify-center"
        >
          <v-col 
            v-for="rowrune in row"
            :key="rowrune.name"
            cols="auto"
          >
              <v-tooltip
                class="rune-row golden-tooltip"
                :text="rowrune.stat"
                location="top left"
                open-delay="100"
              >
              <template #activator="{props}">
                <div
                  v-bind="props"
                  class="rune"
                  :class="{ selected: selectedRunes.primary.rows[rowIndex] === rowrune.name}"
                  @click.stop="selectRune('primary', 'row', rowrune.name, rowIndex)"
                >
                  <v-img
                      :src="rowrune.img"
                      :alt="rowrune.name"
                      width="40"
                      height="40"
                      cover
                    ></v-img>
                </div>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>

    <!-- Secondary runes -->
      <v-col cols="auto">
        <button class="selector-style ma-2" @click="showSecondaryDialog = true">
          <v-img
            v-if="selectedSecondaryBranch"
            :src="selectedSecondaryBranch.img"
            width="64"
            height="64"
          ></v-img>
          {{ selectedSecondaryBranch ? selectedSecondaryBranch.name : "Secondary runes" }}
        </button>
      </v-col>

      <v-col v-if="selectedSecondaryBranch" cols="3" class="text-center">
        <v-row 
          v-for="(row, rowIndex) in selectedSecondaryBranch.rows"
          :key="`secondary-row-${rowIndex}`"
          class="justify-center mb-2"
        >
          <v-col
            v-for="rowrune in row"
            :key="rowrune.name"
            cols="auto"
          >
            <v-tooltip
              class="golden-tooltip rune-row"
              :text="rowrune.stat"
              location="top left"
              open-delay="100"
            >
              <template #activator="{props}">
                <div
                  v-bind="props"
                  class="rune"
                  :class="{ selected : selectedRunes.secondary.some(selectedRune =>
                      selectedRune.name === rowrune.name
                      ), 'rune-disabled': selectedRunes.secondary.length >=2 &&
                      !selectedRunes.secondary.some(selectedRune => selectedRune.name ===rowrune.name) &&
                      !selectedRunes.secondary.some(selectedRune => selectedRune.rowIndex === rowIndex)}"
                  @click.stop="selectSecondaryRune(rowrune, rowIndex)"
                >
                  <v-img
                    :src="rowrune.img"
                    :alt="rowrune.name"
                    width="40"
                    height="40"
                    cover
                  ></v-img>
                </div>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Dialogs for the primary and secondary runes -->
    <v-dialog v-model="showPrimaryDialog" max-width="500">
      <v-card>
        <v-card-title> Select Primary Path </v-card-title>
        <v-card-text>
          <v-row justify="center">
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

    <v-dialog v-model="showSecondaryDialog" max-width="500">
      <v-card>
        <v-card-title> Select Secondary Path </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col
              v-for="branch in availableSecondaryBranches"
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

  import { ref, computed, watch} from 'vue'

  const showPrimaryDialog = ref(false);
  const showSecondaryDialog = ref(false);

  //All the information about the runes like the image, stats and such
  const runeBranches = [
  {
    name: "Precision", img: "./runes-picture/Precision.png", stat: "Become a legend",
    keystones: [
      {name: "Press the Attack", img: "./runes-picture/Press_Attack.png", stat: "On three successive Basic Attacks against enemy champion, deal damage and deal increased game against them subsequently"},
      {name: "Lethal Tempo", img: "./runes-picture/Lethal_Tempo.png", stat: "On successive Basic Attacks against enemy champion, gain Attack Speed and a stack per attack. Upon gaining six stacks, deal extra damage on Basic Attack"},
      {name: "Fleet Footwork", img: "./runes-picture/Fleet_Footwork.png", stat: "Generate stacks when moving and performing Basic Attacks. At max stacks, deal extra damage with your next Basic Attack, heal and gain Movement Speed"},
      {name: "Conqueror", img: "./runes-picture/Conqueror.png", stat: "Dealing damage against enemy champions grants stacks that give Attack Damage or Ability Power. At 12 stacks, heal when dealing damage to enemy champions"},
    ],
    rows: [
      [
      {name: "Absorb Life", img: "./runes-picture/Absorb_Life.png", stat: "Heal upon killing an enemy"},
      {name: "Triumph", img: "./runes-picture/Triumph.png", stat: "Scoring a takedown against a enemy champion grants healing and gold after a short delay"},
      {name: "Presence of Mind", img: "./runes-picture/Presence_Mind.png", stat: "Scoring a takedown against a enemy champion restores mana or energy. Damaging an enemy champion grants a lesser amount of the resource"},
    ],
    [
      {name: "Alacrity", img: "./runes-picture/Alacrity.png", stat: "Gain Attack Speed per enemy kill, amount depending on the type of enemy"},
      {name: "Haste", img: "./runes-picture/Haste.png", stat: "Gain Ability Haste per enemy kill, amount depending on the type of enemy"},
      {name: "Bloodline", img: "./runes-picture/Bloodline.png", stat: "Gain life steal per enemy kill, amount depending on the type of enemy"},
      ],
      [
      {name: "Coup de Grace", img: "./runes-picture/Coup_Grace.png", stat: "Deal increased damage against champions with low health"},
      {name: "Cut Down", img: "./runes-picture/Cut_Down.png", stat: "Deal increased damage against champions with high health"},
      {name: "Last Stand", img: "./runes-picture/Last_Stand.png", stat: "Deal increased damage depending when you are low health"},
      ],
    ],
  },
  {
    name: "Domination", img: "./runes-picture/Domination.png", stat: "Hunt and eliminate prey",
    keystones: [
      {name: "Electrocute", img: "./runes-picture/Electrocute.png", stat: "Affecting a champion generates a stack on the champion per source. Stacks reset after three seconds. Applying three stacks deals damage to the champion"},
      {name: "Dark Harvest", img: "./runes-picture/Dark_Harvest.png", stat: "Dealing damage to an enemy champion below half health grants a stack. Damage increases with stacks"},
      {name: "Hail of Blades", img: "./runes-picture/Hail_Blades.png", stat: "Your first three Basic Attacks against an enemy champion have increased attack speed"},
    ],
    rows: [
      [
      {name: "Cheap Shot", img: "./runes-picture/Cheap_Shot.png", stat: "Performing a Basic Attack or Ability Damage on an impaired enemy champion deals extra damage. Impaired champions are those affected with Crowd Control effects."},
      {name: "Taste of Blood", img: "./runes-picture/Taste_Blood.png", stat: "Damaging an enemy champion heals you"},
      {name: "Sudden Impact", img: "./runes-picture/Sudden_Impact.png", stat: "Damaging an enemy champion after a dash, a blink or exiting from stealth deals extra true damage"},
      ],
      [
      {name: "Sixth Sense", img: "./runes-picture/Sixth_Sense.png", stat: "Upon moving near an un-tracked enemy ward, it becomes tracked with a ward timer. At level eleven, it also reveals the ward"},
      {name: "Grisly Mementos", img: "./runes-picture/Grisly_Mementos.png", stat: "Champion takedowns grant stacks, up to eighteen. Each stack grants trinket haste"},
      {name: "Deep Ward", img: "./runes-picture/Deep_Ward.png", stat: "Wards placed within the enemy jungle last for longer. At level nine, wards placed in the river also last for longer"},
      ],
      [
      {name: "Treasure Hunter", img: "./runes-picture/Treasure_Hunter.png", stat: "Earn extra gold the first time you score a takedown on each separate enemy champion"},
      {name: "Relentless Hunter", img: "./runes-picture/Relentless_Hunter.png", stat: "Earn stacks whenever scoring an enemy champion takedown, up to five. Stacks grant bonus movement speed while out of combat"},
      {name: "Ultimate Hunter", img: "./runes-picture/Ultimate_Hunter.png", stat: "Earn ultimate haste per separate enemy champion takedown"},
      ],
    ],
  },
  {
    name: "Sorcery", img: "./runes-picture/Sorcery.png", stat: "Unleash destruction",
    keystones: [
      {name: "Summon Aery", img: "./runes-picture/Summon_Aery.png", stat: "Damaging Basic Attacks, Abilities and Item Effects deal extra damage. Healing, shielding and buffing an ally grants them a shield"},
      {name: "Arcane Comet", img: "./runes-picture/Arcane_Comet.png", stat: "Dealing Ability Damage hurls a projectile at the enemy champion's position that deals magic damage"},
      {name: "Phase Rush", img: "./runes-picture/Phase_Rush.png", stat: "Basic Attacks and Abilities generate a stack per source on target. Applying three stacks grants bonus movement speed and slow resist"},
    ],
    rows: [
      [
      {name: "Axiom Arcanist", img: "./runes-picture/Axiom_Arcanist.png", stat: "Your ultimate deals increased damage, healing and shielding. Scoring an enemy champion takedown reduces your ultimate's current cooldown"},
      {name: "Manaflow Band", img: "./runes-picture/Manaflow_Band.png", stat: "Affecting an enemy champion with an ability increases your maximum mana. Upon reaching a cap of bonus maximum mana, restores missing mana every five seconds instead"},
      {name: "Nimbus Cloak", img: "./runes-picture/Nimbus_Cloak.png", stat: "Using a summoner spell grants ghosting and decaying bonus movement speed"},
      ],
      [
      {name: "Transcendence", img: "./runes-picture/Transcendence.png", stat: "Gain ability haste at certain level milestones. At level eleven, scoring an enemy champion takedown reduces the current cooldown if your basic abilities"},
      {name: "Celerity", img: "./runes-picture/Celerity.png", stat: "All movement speed bonuses increase in effectiveness. You gain bonus movement speed"},
      {name: "Absolute Focus", img: "./runes-picture/Absolute_Focus.png", stat: "Gain bonus Attack Damage or Ability Power while at high health"},
      ],
      [
      {name: "Scorch", img: "./runes-picture/Scorch.png", stat: "Dealing ability damage to an enemy champion deals them bonus damage"},
      {name: "Waterwalking", img: "./runes-picture/Waterwalking.png", stat: "While in the river, you gain bonus movement speed and Attack Damage or Ability Power"},
      {name: "Gathering Storm", img: "./runes-picture/Gathering_Storm.png", stat: "Gain increasing bonus Attack Damage or Ability power every ten minutes"},
      ],
    ],
  },
  {
    name: "Resolve", img: "./runes-picture/Resolve.png", stat: "Live forever",
    keystones: [
      {name: "Grasp of the Undying", img: "./runes-picture/Grasp_Undying.png", stat: "Entering and staying in combat with an enemy champion for four makes your next Basic Attack against an enemy champion deal bonus damage and heal you"},
      {name: "Aftershock", img: "./runes-picture/Aftershock.png", stat: "Immobilizing an enemy champion grants bonus armor and magic resistance. After a short while, release a shockwave that deals damage"},
      {name: "Guardian", img: "./runes-picture/Guardian.png", stat: "When you're nearby an ally or affect your ally with a targetted effect and either or you are about to die or receive non-negligible damage, both of you gain a shield"},
    ],
    rows: [
      [
      {name: "Demolish", img: "./runes-picture/Demolish.png", stat: "If you stay near a turret for three seconds, your next Basic Attack against it deals extra damage"},
      {name: "Font of Life", img: "./runes-picture/Font_Life.png", stat: "Slowing or immobilizing an enemy champion heals you and the nearest and most wounded allied champion"},
      {name: "Shield Bash", img: "./runes-picture/Shield_Bash.png", stat: "Whenever you gain a shield, your next Basic Attack against en enemy champion deals extra damage"},
      ],
      [
      {name: "Conditioning", img: "./runes-picture/Conditioning.png", stat: "After twelve minutes, gain bonus Armor and Magic Resistance. Your total Armor and Magic resistance are increased"},
      {name: "Second Wind", img: "./runes-picture/Second_Wind.png", stat: "After taking damage from an enemy champion, regenerate health"},
      {name: "Bone Plating", img: "./runes-picture/Bone_Plating.png", stat: "After taking damage from an enemy champion, reduce damage from the next three damage instances from an enemy champion for a while"},
      ],
      [
      {name: "Overgrowth", img: "./runes-picture/Overgrowth.png", stat: "Gain health for every eight monsters or enemy minions that die near you. Gain extra health upon triggering this fifteen times"},
      {name: "Revitalize", img: "./runes-picture/Revitalize.png", stat: "Grants extra Heal & Shield Power. Healing and shielding from you to an ally with low Health are more effective. Healing and shield from an ally to you are more effective when you're low Health"},
      {name: "Unflinching", img: "./runes-picture/Unflinching.png", stat: "While affected with Crowd Control from an enemy champion, gain bonus Armor and Magic Resistance"},
      ],
    ],
  },
  {
    name: "Inspiration", img: "./runes-picture/Inspiration.png", stat: "Outwit mere mortals",
    keystones: [
      {name: "Glacial Augment", img: "./runes-picture/Glacial_Augment.png", stat: "Immobilizing an enemy champion will cause three glacial rays to emanate from them to you and nearby enemy champions. The rays leave a path that slows enemies and makes them deal less damage"},
      {name: "Unsealed Spellbook", img: "./runes-picture/Unsealed_Spellbook.png", stat: "While not channeling Teleport and being out-of-combat for five seconds, you can swap one of your summoner spells for another"},
      {name: "First Strike", img: "./runes-picture/First_Strike.png", stat: "If you deal damage or apply a Crowd Control on an enemy champion before you are struck by an enemy champion, you deal extra damage and gain gold"},
    ],
    rows: [
      [
      {name: "Hextech Flashtraption", img: "./runes-picture/Hextech_Flashtraption.png", stat: "When Flash is in cooldown, it is replaced with Hexflash. Hexflash sets your Movement Speed to zero while being cast and grants bonus Movement Speed upon being cast. Upon being cast, you blink to the target location"},
      {name: "Magical Footwear", img: "./runes-picture/Magical_Footwear.png", stat: "You can't purchase boots until you gain Slightly Magical Boots for free, which happens after twelve minutes at the latest. They grant additional movement speed"},
      {name: "Cash Back", img: "./runes-picture/Cash_Back.png", stat: "Upon purchasing a legendary item, you are refunded six percent of its total gold cost"},
      ],
      [
      {name: "Triple Tonic", img: "./runes-picture/Triple_Tonic.png", stat: "Gain a different elexir at level three, six and nine. They grant damage, Attack Damage or Ability Power and a skill point, respectively, upon being consumed"},
      {name: "Time Warp Tonic", img: "./runes-picture/Time_Warp_Tonic.png", stat: "Heal bonus Health when you consume a potion"},
      {name: "Biscuit Delivery", img: "./runes-picture/Biscuit_Delivery.png", stat: "Receive a biscuit at minute two, four and six. They increase your maximum health upon consumption or being sold. They heal and restore mana"},
      ],
      [
      {name: "Approach Velocity", img: "./runes-picture/Approach_Velocity.png", stat: "Gain bonus Movement Speed while facing enemy champions that are immobilized, grounded or slowed"},
      {name: "Cosmic Insight", img: "./runes-picture/Cosmic_Insight.png", stat: "Gain summoner spell haste and item haste"},
      {name: "Jack of All Trades", img: "./runes-picture/Jack_All_Trades.png", stat: "Gain a charge per unique stat type currently gained from items. Each charge grants Ability Haste, at five and ten charges, gain Attack Damage or Ability Power"},
      ],
    ],
  },
  ]

  const selectedPrimaryBranch = ref(null);
  const selectedSecondaryBranch = ref(null);

  const selectedRunes = ref({
    primary: {keystone: null, rows: [null, null, null]}, 
    secondary:[],
  });

  const emit = defineEmits(['runes-selected'])

  const availableSecondaryBranches = computed(() => {
    if (!selectedPrimaryBranch.value) {
      return runeBranches;
    }
    return runeBranches.filter(branch => branch.name !== selectedPrimaryBranch.value.name);
  })

  function selectBranch(type, branch) {
    if (type === 'primary') {
      if (selectedSecondaryBranch.value?.name === branch.name) {
        selectedSecondaryBranch.value = selectedPrimaryBranch.value;

        selectedRunes.value.primary = {keystone: null, rows: [null, null, null]};
        selectedRunes.value.secondary = [];
      }
      selectedPrimaryBranch.value = branch;
      showPrimaryDialog.value = false;
    } else {
      if (selectedPrimaryBranch.value?.name === branch.name) {
        return;
      }
      selectedSecondaryBranch.value = branch;
      showSecondaryDialog.value = false;
    }
  }

  function selectRune(type, section, runeName, rowIndex){
    if (type === 'primary') {
      if (section === 'keystone') { 
        selectedRunes.value.primary.keystone = runeName;

      } else if (section === 'row') {
        selectedRunes.value.primary.rows[rowIndex] = runeName;

    } else {
      const newRows = [...selectedRunes.value.primary.rows];
      newRows[rowIndex] = runeName;
      selectedRunes.value.primary.rows = newRows;
      }
    }
  }

  function selectSecondaryRune(rune, rowIndex) {
    const currentSelection = selectedRunes.value.secondary;
    const existingIndex = currentSelection.findIndex(selectedRune => 
      selectedRune.name === rune.name); 

    if (existingIndex !== -1) {
      selectedRunes.value.secondary.splice(existingIndex, 1);
    } else {
      const existingRowIndex = currentSelection.findIndex(selectedRune =>
        selectedRune.rowIndex === rowIndex
      );
      
      if (existingRowIndex !== -1) {
        selectedRunes.value.secondary.splice(existingRowIndex, 1, {
        name: rune.name,
        img: rune.img,
        stat: rune.stat,
        rowIndex: rowIndex
      },
    );

      } else if (currentSelection.length < 2) {
        selectedRunes.value.secondary.push({
        name: rune.name,
        img: rune.img,
        stat: rune.stat,
        rowIndex: rowIndex
      });
      }
    }
  }

  watch(selectedRunes, (newRunes) => {
    emit('runes-selected', newRunes)
  }, {deep: true})

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

    .rune{
      border-radius: 8px;
      cursor: pointer;
      display: inline-block;
    }

    .rune-disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .rune-row{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin: 6px 0;
      flex-wrap: wrap;
    }

    .selected{
      border: 3px solid #653a1b;
    }

  .golden-tooltip :deep(.v-overlay__content) {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(222, 200, 128, 1) 8%,
      rgba(222, 197, 118, 1) 35%,
      rgba(191, 145, 59, 1) 75%,
      rgba(142, 96, 42, 1) 94%
    ); 
    color: #1a1a1a !important; 
    border-radius: 6px;
    padding: 8px 10px;
    max-width: 200px;
    font-family: "BeaufortforLOLRegular", sans-serif;
    box-shadow: 0 0 10px rgba(191, 145, 59, 0.6);
  }

  .golden-tooltip :deep(.v-overlay__content) strong {
    color: #1a1a1a !important;
  }

</style>