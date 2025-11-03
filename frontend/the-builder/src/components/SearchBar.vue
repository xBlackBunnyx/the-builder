<template>
      <v-container >
        <v-row  align="center">
          <v-col cols="6">
            <v-autocomplete
              class="barsettings"
              :items="champions"
              :disabled="false"
              v-model="selectedChampion"
              @update:search="onSearchUpdate"
              item-title="name"
              item-value="name"
              placeholder="Select your favourite champion"
              return-object
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  :title="item.raw.name"
                ></v-list-item>
              </template>
              <template v-slot:selection="{item}">
                <v-list-item>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="6">
            <button 
            @click="goToBuildCreator" 
            class="buttonsettings" 
            :disabled="!selectedChampion"> 
              Create your build 
            </button>
          </v-col>
        </v-row>
      </v-container>
</template>

<script setup>
  import { ref, watch} from 'vue'
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const srcs = {
    1: '/characters-picture/aatrox.png',
    2: '/characters-picture/ahri.png',
    3: '/characters-picture/akali.png',
    4: '/characters-picture/akshan.png',
    5: '/characters-picture/alistar.png',
    6: '/characters-picture/amumu.png',
    7: '/characters-picture/anivia.png',
    8: '/characters-picture/annie.png',
    9: '/characters-picture/aphelios.png',
    10: '/characters-picture/ashe.png',
    11: '/characters-picture/aurelion_sol.png',
    12: '/characters-picture/aurora.png',
    13: '/characters-picture/azir.png',
    14: '/characters-picture/bard.png',
    15: '/characters-picture/bel\'veth.png',
    16: '/characters-picture/blitzcrank.png',
    17: "/characters-picture/brand.png",
    18: "/characters-picture/braum.png",
    19: "/characters-picture/briar.png",
    20: "/characters-picture/caitlyn.png",
    21: "/characters-picture/camille.png",
    22: "/characters-picture/cassiopeia.png",
    23: "/characters-picture/cho'gath.png",
    24: "/characters-picture/corki.png",
    25: "/characters-picture/darius.png",
    26: "/characters-picture/diana.png",
    27: "/characters-picture/dr._mundo.png",//_?
    28: "/characters-picture/draven.png",
    29: "/characters-picture/ekko.png",
    30: "/characters-picture/elise.png",
    31: "/characters-picture/evelynn.png",
    32: "/characters-picture/ezreal.png",
    33: "/characters-picture/fiddlesticks.png",
    34: "/characters-picture/fiora.png",
    35: "/characters-picture/fizz.png",
    36: "/characters-picture/galio.png",
    37: "/characters-picture/gangplank.png",
    38: "/characters-picture/garen.png",
    39: "/characters-picture/gnar.png",
    40: "/characters-picture/gragas.png",
    41: "/characters-picture/graves.png",
    42: "/characters-picture/gwen.png",
    43: "/characters-picture/hecarim.png",
    44: "/characters-picture/heimerdinger.png",
    45: "/characters-picture/hwei.png",
    46: "/characters-picture/illaoi.png",
    47: "/characters-picture/irelia.png",
    48: "/characters-picture/ivern.png",
    49: "/characters-picture/janna.png",
    50: "/characters-picture/jarvan_iv.png",
    51: "/characters-picture/jax.png",
    52: "/characters-picture/jayce.png",
    53: "/characters-picture/jhin.png",
    54: "/characters-picture/jinx.png",
    55: "/characters-picture/k'sante.png",
    56: "/characters-picture/kai'sa.png",
    57: "/characters-picture/kalista.png",
    58: "/characters-picture/karma.png",
    59: "/characters-picture/karthus.png",
    60: "/characters-picture/kassadin.png",
    61: "/characters-picture/katarina.png",
    62: "/characters-picture/kayle.png",
    63: "/characters-picture/kayn.png",
    64: "/characters-picture/kennen.png",
    65: "/characters-picture/kha'zix.png", 
    66: "/characters-picture/kindred.png",
    67: "/characters-picture/kled.png",
    68: "/characters-picture/kog'maw.png",
    69: "/characters-picture/leblanc.png",
    70: "/characters-picture/lee_sin.png",
    71: "/characters-picture/leona.png",
    72: "/characters-picture/lillia.png",
    73: "/characters-picture/lissandra.png",
    74: "/characters-picture/lucian.png",
    75: "/characters-picture/lulu.png",
    76: "/characters-picture/lux.png",
    77: "/characters-picture/malphite.png",
    78: "/characters-picture/malzahar.png",
    79: "/characters-picture/maokai.png",
    80: "/characters-picture/master_yi.png",
    81: "/characters-picture/milio.png",
    82: "/characters-picture/miss_fortune.png",
    83: "/characters-picture/mordekaiser.png",
    84: "/characters-picture/morgana.png",
    85: "/characters-picture/naafiri.png",
    86: "/characters-picture/nami.png",
    87: "/characters-picture/nasus.png",
    88: "/characters-picture/nautilus.png",
    89: "/characters-picture/neeko.png",
    90: "/characters-picture/nidalee.png",
    91: "/characters-picture/nilah.png",
    92: "/characters-picture/nocturne.png",
    93: "/characters-picture/nunu_&_willump.png",
    94: "/characters-picture/olaf.png",
    95: "/characters-picture/orianna.png",
    96: "/characters-picture/ornn.png",
    97: "/characters-picture/pantheon.png",
    98: "/characters-picture/poppy.png",
    99: "/characters-picture/pyke.png",
    100: "/characters-picture/qiyana.png",
    101: "/characters-picture/quinn.png",
    102: "/characters-picture/rakan.png",
    103: "/characters-picture/rammus.png",
    104: "/characters-picture/rek'sai.png",
    105: "/characters-picture/rell.png",
    106: "/characters-picture/renata_glasc.png",
    107: "/characters-picture/renekton.png",
    108: "/characters-picture/rengar.png",
    109: "/characters-picture/riven.png",
    110: "/characters-picture/rumble.png",
    111: "/characters-picture/ryze.png",
    112: "/characters-picture/samira.png",
    113: "/characters-picture/sejuani.png",
    114: "/characters-picture/senna.png",
    115: "/characters-picture/seraphine.png",
    116: "/characters-picture/sett.png",
    117: "/characters-picture/shaco.png",
    118: "/characters-picture/shen.png",
    119: "/characters-picture/shyvana.png",
    120: "/characters-picture/singed.png",
    121: "/characters-picture/sion.png",
    122: "/characters-picture/sivir.png",
    123: "/characters-picture/skarner.png",
    124: "/characters-picture/smolder.png",
    125: "/characters-picture/sona.png",
    126: "/characters-picture/soraka.png",
    127: "/characters-picture/swain.png",
    128: "/characters-picture/sylas.png",
    129: "/characters-picture/syndra.png",
    130: "/characters-picture/tahm_kench.png",
    131: "/characters-picture/taliyah.png",
    132: "/characters-picture/talon.png",
    133: "/characters-picture/taric.png",
    134: "/characters-picture/teemo.png",
    135: "/characters-picture/thresh.png",
    136: "/characters-picture/tristana.png",
    137: "/characters-picture/trundle.png",
    138: "/characters-picture/tryndamere.png",
    139: "/characters-picture/twisted_fate.png",
    140: "/characters-picture/twitch.png",
    141: "/characters-picture/udyr.png",
    142: "/characters-picture/urgot.png",
    143: "/characters-picture/varus.png",
    144: "/characters-picture/vayne.png",
    145: "/characters-picture/veigar.png",
    146: "/characters-picture/vel'koz.png",
    147: "/characters-picture/vex.png",
    148: "/characters-picture/vi.png",
    149: "/characters-picture/viego.png",
    150: "/characters-picture/viktor.png",
    151: "/characters-picture/vladimir.png",
    152: "/characters-picture/volibear.png",
    153: "/characters-picture/warwick.png",
    154: "/characters-picture/wukong.png",
    155: "/characters-picture/xayah.png",
    156: "/characters-picture/xerath.png",
    157: "/characters-picture/xin_zhao.png",
    158: "/characters-picture/yasuo.png",
    159: "/characters-picture/yone.png",
    160: "/characters-picture/yorick.png",
    161: "/characters-picture/yuumi.png",
    162: "/characters-picture/zac.png",
    163: "/characters-picture/zed.png",
    164: "/characters-picture/zeri.png",
    165: "/characters-picture/ziggs.png",
    166: "/characters-picture/zilean.png",
    167: "/characters-picture/zoe.png",
    168: "/characters-picture/zyra.png",
  }

  const champions = [
    { name: 'Aatrox', avatar: srcs[1] },
    { name: 'Ahri', avatar: srcs[2] },
    { name: 'Akali', avatar: srcs[3] },
    { name: 'Akshan', avatar: srcs[4] },
    { name: 'Alistar', avatar: srcs[5] },
    { name: 'Amumu', avatar: srcs[6] },
    { name: 'Anivia', avatar: srcs[7] },
    { name: 'Annie', avatar: srcs[8] },
    { name: 'Aphelios', avatar: srcs[9] },
    { name: 'Ashe', avatar: srcs[10] },
    { name: 'Aurelion Sol', avatar: srcs[11] },
    { name: 'Aurora', avatar: srcs[12] },
    { name: 'Azir', avatar: srcs[13] },
    { name: 'Bard', avatar: srcs[14] },
    { name: "Bel'Veth", avatar: srcs[15] },
    { name: 'Blitzcrank', avatar: srcs[16] },
    { name: 'Brand', avatar: srcs[17] },
    { name: 'Braum', avatar: srcs[18] },
    { name: 'Briar', avatar: srcs[19] },
    { name: 'Caitlyn', avatar: srcs[20] },
    { name: 'Camille', avatar: srcs[21] },
    { name: 'Cassiopeia', avatar: srcs[22] },
    { name: "Cho'Gath", avatar: srcs[23] },
    { name: 'Corki', avatar: srcs[24] },
    { name: 'Darius', avatar: srcs[25] },
    { name: 'Diana', avatar: srcs[26] },
    { name: 'Dr. Mundo', avatar: srcs[27] },
    { name: 'Draven', avatar: srcs[28] },
    { name: 'Ekko', avatar: srcs[29] },
    { name: 'Elise', avatar: srcs[30] },
    { name: 'Evelynn', avatar: srcs[31] },
    { name: 'Ezreal', avatar: srcs[32] },
    { name: 'Fiddlesticks', avatar: srcs[33] },
    { name: 'Fiora', avatar: srcs[34] },
    { name: 'Fizz', avatar: srcs[35] },
    { name: 'Galio', avatar: srcs[36] },
    { name: 'Gangplank', avatar: srcs[37] },
    { name: 'Garen', avatar: srcs[38] },
    { name: 'Gnar', avatar: srcs[39] },
    { name: 'Gragas', avatar: srcs[40] },
    { name: 'Graves', avatar: srcs[41] },
    { name: 'Gwen', avatar: srcs[42] },
    { name: 'Hecarim', avatar: srcs[43] },
    { name: 'Heimerdinger', avatar: srcs[44] },
    { name: 'Hwei', avatar: srcs[45] },
    { name: 'Illaoi', avatar: srcs[46] },
    { name: 'Irelia', avatar: srcs[47] },
    { name: 'Ivern', avatar: srcs[48] },
    { name: 'Janna', avatar: srcs[49] },
    { name: 'Jarvan IV', avatar: srcs[50] },
    { name: 'Jax', avatar: srcs[51] },
    { name: 'Jayce', avatar: srcs[52] },
    { name: 'Jhin', avatar: srcs[53] },
    { name: 'Jinx', avatar: srcs[54] },
    { name: "K'Sante", avatar: srcs[55] },
    { name: "Kai'Sa", avatar: srcs[56] },
    { name: 'Kalista', avatar: srcs[57] },
    { name: 'Karma', avatar: srcs[58] },
    { name: 'Karthus', avatar: srcs[59] },
    { name: 'Kassadin', avatar: srcs[60] },
    { name: 'Katarina', avatar: srcs[61] },
    { name: 'Kayle', avatar: srcs[62] },
    { name: 'Kayn', avatar: srcs[63] },
    { name: 'Kennen', avatar: srcs[64] },
    { name: "Kha'Zix", avatar: srcs[65] },
    { name: 'Kindred', avatar: srcs[66] },
    { name: 'Kled', avatar: srcs[67] },
    { name: "Kog'Maw", avatar: srcs[68] },
    { name: 'LeBlanc', avatar: srcs[69] },
    { name: 'Lee Sin', avatar: srcs[70] },
    { name: 'Leona', avatar: srcs[71] },
    { name: 'Lillia', avatar: srcs[72] },
    { name: 'Lissandra', avatar: srcs[73] },
    { name: 'Lucian', avatar: srcs[74] },
    { name: 'Lulu', avatar: srcs[75] },
    { name: 'Lux', avatar: srcs[76] },
    { name: 'Malphite', avatar: srcs[77] },
    { name: 'Malzahar', avatar: srcs[78] },
    { name: 'Maokai', avatar: srcs[79] },
    { name: 'Master Yi', avatar: srcs[80] },
    { name: 'Milio', avatar: srcs[81] },
    { name: 'Miss Fortune', avatar: srcs[82] },
    { name: 'Mordekaiser', avatar: srcs[83] },
    { name: 'Morgana', avatar: srcs[84] },
    { name: 'Naafiri', avatar: srcs[85] },
    { name: 'Nami', avatar: srcs[86] },
    { name: 'Nasus', avatar: srcs[87] },
    { name: 'Nautilus', avatar: srcs[88] },
    { name: 'Neeko', avatar: srcs[89] },
    { name: 'Nidalee', avatar: srcs[90] },
    { name: 'Nilah', avatar: srcs[91] },
    { name: 'Nocturne', avatar: srcs[92] },
    { name: 'Nunu & Willump', avatar: srcs[93] },
    { name: 'Olaf', avatar: srcs[94] },
    { name: 'Orianna', avatar: srcs[95] },
    { name: 'Ornn', avatar: srcs[96] },
    { name: 'Pantheon', avatar: srcs[97] },
    { name: 'Poppy', avatar: srcs[98] },
    { name: 'Pyke', avatar: srcs[99] },
    { name: 'Qiyana', avatar: srcs[100] },
    { name: 'Quinn', avatar: srcs[101] },
    { name: 'Rakan', avatar: srcs[102] },
    { name: 'Rammus', avatar: srcs[103] },
    { name: "Rek'Sai", avatar: srcs[104] },
    { name: 'Rell', avatar: srcs[105] },
    { name: 'Renata Glasc', avatar: srcs[106] },
    { name: 'Renekton', avatar: srcs[107] },
    { name: 'Rengar', avatar: srcs[108] },
    { name: 'Riven', avatar: srcs[109] },
    { name: 'Rumble', avatar: srcs[110] },
    { name: 'Ryze', avatar: srcs[111] },
    { name: 'Samira', avatar: srcs[112] },
    { name: 'Sejuani', avatar: srcs[113] },
    { name: 'Senna', avatar: srcs[114] },
    { name: 'Seraphine', avatar: srcs[115] },
    { name: 'Sett', avatar: srcs[116] },
    { name: 'Shaco', avatar: srcs[117] },
    { name: 'Shen', avatar: srcs[118] },
    { name: 'Shyvana', avatar: srcs[119] },
    { name: 'Singed', avatar: srcs[120] },
    { name: 'Sion', avatar: srcs[121] },
    { name: 'Sivir', avatar: srcs[122] },
    { name: 'Skarner', avatar: srcs[123] },
    { name: 'Smolder', avatar: srcs[124] },
    { name: 'Sona', avatar: srcs[125] },
    { name: 'Soraka', avatar: srcs[126] },
    { name: 'Swain', avatar: srcs[127] },
    { name: 'Sylas', avatar: srcs[128] },
    { name: 'Syndra', avatar: srcs[129] },
    { name: 'Tahm Kench', avatar: srcs[130] },
    { name: 'Taliyah', avatar: srcs[131] },
    { name: 'Talon', avatar: srcs[132] },
    { name: 'Taric', avatar: srcs[133] },
    { name: 'Teemo', avatar: srcs[134] },
    { name: 'Thresh', avatar: srcs[135] },
    { name: 'Tristana', avatar: srcs[136] },
    { name: 'Trundle', avatar: srcs[137] },
    { name: 'Tryndamere', avatar: srcs[138] },
    { name: 'Twisted Fate', avatar: srcs[139] },
    { name: 'Twitch', avatar: srcs[140] },
    { name: 'Udyr', avatar: srcs[141] },
    { name: 'Urgot', avatar: srcs[142] },
    { name: 'Varus', avatar: srcs[143] },
    { name: 'Vayne', avatar: srcs[144] },
    { name: 'Veigar', avatar: srcs[145] },
    { name: "Vel'Koz", avatar: srcs[146] },
    { name: 'Vex', avatar: srcs[147] },
    { name: 'Vi', avatar: srcs[148] },
    { name: 'Viego', avatar: srcs[149] },
    { name: 'Viktor', avatar: srcs[150] },
    { name: 'Vladimir', avatar: srcs[151] },
    { name: 'Volibear', avatar: srcs[152] },
    { name: 'Warwick', avatar: srcs[153] },
    { name: 'Wukong', avatar: srcs[154] },
    { name: 'Xayah', avatar: srcs[155] },
    { name: 'Xerath', avatar: srcs[156] },
    { name: 'Xin Zhao', avatar: srcs[157] },
    { name: 'Yasuo', avatar: srcs[158] },
    { name: 'Yone', avatar: srcs[159] },
    { name: 'Yorick', avatar: srcs[160] },
    { name: 'Yuumi', avatar: srcs[161] },
    { name: 'Zac', avatar: srcs[162] },
    { name: 'Zed', avatar: srcs[163] },
    { name: 'Zeri', avatar: srcs[164] },
    { name: 'Ziggs', avatar: srcs[165] },
    { name: 'Zilean', avatar: srcs[166] },
    { name: 'Zoe', avatar: srcs[167] },
    { name: 'Zyra', avatar: srcs[168] },
  ]

  const selectedChampion = ref(null)
  const search = ref(' ')
  const isUpdating = ref(false)

  const onSearchUpdate = (searchValue) => {
    console.log('Search updated: ', searchValue)
  }

    const goToBuildCreator = () => {
      console.log('===== Button activated, function summoned =======')
      console.log('The champion we chose to sacrifice is: ', selectedChampion.value?.name)

      if (!selectedChampion.value){
        console.error("No champion selected")
        return
      }
      const championName = selectedChampion.value.name
      console.log("Let's see if we can travel together: ", championName)

      try {
        router.push({
          name: "BuildCreator",
          query:{ championName: championName}
        }) 
        console.log("We are leaving roger, let's fucking go")
      } catch (error) {
        console.error("The world is an awful place because of the error: ", error)
      }
    }

  watch(search, (newValue) => {
    if (!newValue || newValue.trim() === ' ') {
      console.log('Seach cleared, but keeping selection: ', selectedChampion.value?.name)
    }
  })

  let timeout = -1
  watch(isUpdating, val => {
    clearTimeout(timeout)
    if (val) {
      timeout = setTimeout(() => (isUpdating.value = false), 3000)
    }
  })
</script>

<style>
  .barsettings{
    font-size: 20px;
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
    padding:  20px 30px;
    }

  .buttonsettings{
    font-size: 20px;
    color: black;
    font-family: "BeaufortforLOLRegular", sans-serif;
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
    padding:  20px 32px;
    width: 200px;
    height: 100px;
    }

  .buttonsettings:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>