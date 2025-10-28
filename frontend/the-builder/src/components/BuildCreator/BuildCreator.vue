<template>
    <v-container>
        <v-row class="pa-3 mb-6">
            <v-col>
                  <h1 class="text-secondary">  Create your build!  </h1>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="3">
                <v-img
                    width="350"
                ></v-img>
            </v-col>
            <v-col>
            <v-row no-gutters class="ma-0 pa-0 ga-0">
                 <v-col>
                    <item-selector></item-selector>
                    <item-selector></item-selector>
                </v-col>
                <v-col>
                    <item-selector></item-selector>
                    <item-selector></item-selector>
                </v-col>
                <v-col>
                    <item-selector></item-selector>
                    <item-selector></item-selector>
                </v-col>
                 <v-col cols="9">
                    <rune-selector></rune-selector>
                </v-col>
            </v-row>

            </v-col>
        </v-row>


        <v-row class="ma-15 pa-10">
            <v-col offset="3">
                <button @click="$router.go(-1)" class="buttonsettings"> Return to Home </button>
            </v-col>
            <v-col>
                <build-score></build-score>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import {ref, defineProps} from "vue";

const champions = {
    1: '/characters-splashart/aatrox.png',
    2: '/characters-splashart/ahri.png',
    3: '/characters-splashart/akali.png',
    4: '/characters-splashart/akshan.png',
    5: '/characters-splashart/alistar.png',
    6: '/characters-splashart/amumu.png',
    7: '/characters-splashart/anivia.png',
    8: '/characters-splashart/annie.png',
    9: '/characters-splashart/aphelios.png',
    10: '/characters-splashart/ashe.png',
    11: '/characters-splashart/aurelion_sol.png',
    12: '/characters-splashart/aurora.png',
    13: '/characters-splashart/azir.png',
    14: '/characters-splashart/bard.png',
    15: '/characters-splashart/bel\'veth.png',
    16: '/characters-splashart/blitzcrank.png',
    17: "/characters-splashart/brand.png",
    18: "/characters-splashart/braum.png",
    19: "/characters-splashart/briar.png",
    20: "/characters-splashart/caitlyn.png",
    21: "/characters-splashart/camille.png",
    22: "/characters-splashart/cassiopeia.png",
    23: "/characters-splashart/cho'gath.png",
    24: "/characters-splashart/corki.png",
    25: "/characters-splashart/darius.png",
    26: "/characters-splashart/diana.png",
    27: "/characters-splashart/dr._mundo.png",//_?
    28: "/characters-splashart/draven.png",
    29: "/characters-splashart/ekko.png",
    30: "/characters-splashart/elise.png",
    31: "/characters-splashart/evelynn.png",
    32: "/characters-splashart/ezreal.png",
    33: "/characters-splashart/fiddlesticks.png",
    34: "/characters-splashart/fiora.png",
    35: "/characters-splashart/fizz.png",
    36: "/characters-splashart/galio.png",
    37: "/characters-splashart/gangplank.png",
    38: "/characters-splashart/garen.png",
    39: "/characters-splashart/gnar.png",
    40: "/characters-splashart/gragas.png",
    41: "/characters-splashart/graves.png",
    42: "/characters-splashart/gwen.png",
    43: "/characters-splashart/hecarim.png",
    44: "/characters-splashart/heimerdinger.png",
    45: "/characters-splashart/hwei.png",
    46: "/characters-splashart/illaoi.png",
    47: "/characters-splashart/irelia.png",
    48: "/characters-splashart/ivern.png",
    49: "/characters-splashart/janna.png",
    50: "/characters-splashart/jarvan_iv.png",
    51: "/characters-splashart/jax.png",
    52: "/characters-splashart/jayce.png",
    53: "/characters-splashart/jhin.png",
    54: "/characters-splashart/jinx.png",
    55: "/characters-splashart/k'sante.png",
    56: "/characters-splashart/kai'sa.png",
    57: "/characters-splashart/kalista.png",
    58: "/characters-splashart/karma.png",
    59: "/characters-splashart/karthus.png",
    60: "/characters-splashart/kassadin.png",
    61: "/characters-splashart/katarina.png",
    62: "/characters-splashart/kayle.png",
    63: "/characters-splashart/kayn.png",
    64: "/characters-splashart/kennen.png",
    65: "/characters-splashart/kha'zix.png", 
    66: "/characters-splashart/kindred.png",
    67: "/characters-splashart/kled.png",
    68: "/characters-splashart/kog'maw.png",
    69: "/characters-splashart/leblanc.png",
    70: "/characters-splashart/lee_sin.png",
    71: "/characters-splashart/leona.png",
    72: "/characters-splashart/lillia.png",
    73: "/characters-splashart/lissandra.png",
    74: "/characters-splashart/lucian.png",
    75: "/characters-splashart/lulu.png",
    76: "/characters-splashart/lux.png",
    77: "/characters-splashart/malphite.png",
    78: "/characters-splashart/malzahar.png",
    79: "/characters-splashart/maokai.png",
    80: "/characters-splashart/master_yi.png",
    81: "/characters-splashart/milio.png",
    82: "/characters-splashart/miss_fortune.png",
    83: "/characters-splashart/mordekaiser.png",
    84: "/characters-splashart/morgana.png",
    85: "/characters-splashart/naafiri.png",
    86: "/characters-splashart/nami.png",
    87: "/characters-splashart/nasus.png",
    88: "/characters-splashart/nautilus.png",
    89: "/characters-splashart/neeko.png",
    90: "/characters-splashart/nidalee.png",
    91: "/characters-splashart/nilah.png",
    92: "/characters-splashart/nocturne.png",
    93: "/characters-splashart/nunu_&_willump.png",
    94: "/characters-splashart/olaf.png",
    95: "/characters-splashart/orianna.png",
    96: "/characters-splashart/ornn.png",
    97: "/characters-splashart/pantheon.png",
    98: "/characters-splashart/poppy.png",
    99: "/characters-splashart/pyke.png",
    100: "/characters-splashart/qiyana.png",
    101: "/characters-splashart/quinn.png",
    102: "/characters-splashart/rakan.png",
    103: "/characters-splashart/rammus.png",
    104: "/characters-splashart/rek'sai.png",
    105: "/characters-splashart/rell.png",
    106: "/characters-splashart/renata_glasc.png",
    107: "/characters-splashart/renekton.png",
    108: "/characters-splashart/rengar.png",
    109: "/characters-splashart/riven.png",
    110: "/characters-splashart/rumble.png",
    111: "/characters-splashart/ryze.png",
    112: "/characters-splashart/samira.png",
    113: "/characters-splashart/sejuani.png",
    114: "/characters-splashart/senna.png",
    115: "/characters-splashart/seraphine.png",
    116: "/characters-splashart/sett.png",
    117: "/characters-splashart/shaco.png",
    118: "/characters-splashart/shen.png",
    119: "/characters-splashart/shyvana.png",
    120: "/characters-splashart/singed.png",
    121: "/characters-splashart/sion.png",
    122: "/characters-splashart/sivir.png",
    123: "/characters-splashart/skarner.png",
    124: "/characters-splashart/smolder.png",
    125: "/characters-splashart/sona.png",
    126: "/characters-splashart/soraka.png",
    127: "/characters-splashart/swain.png",
    128: "/characters-splashart/sylas.png",
    129: "/characters-splashart/syndra.png",
    130: "/characters-splashart/tahm_kench.png",
    131: "/characters-splashart/taliyah.png",
    132: "/characters-splashart/talon.png",
    133: "/characters-splashart/taric.png",
    134: "/characters-splashart/teemo.png",
    135: "/characters-splashart/thresh.png",
    136: "/characters-splashart/tristana.png",
    137: "/characters-splashart/trundle.png",
    138: "/characters-splashart/tryndamere.png",
    139: "/characters-splashart/twisted_fate.png",
    140: "/characters-splashart/twitch.png",
    141: "/characters-splashart/udyr.png",
    142: "/characters-splashart/urgot.png",
    143: "/characters-splashart/varus.png",
    144: "/characters-splashart/vayne.png",
    145: "/characters-splashart/veigar.png",
    146: "/characters-splashart/vel'koz.png",
    147: "/characters-splashart/vex.png",
    148: "/characters-splashart/vi.png",
    149: "/characters-splashart/viego.png",
    150: "/characters-splashart/viktor.png",
    151: "/characters-splashart/vladimir.png",
    152: "/characters-splashart/volibear.png",
    153: "/characters-splashart/warwick.png",
    154: "/characters-splashart/wukong.png",
    155: "/characters-splashart/xayah.png",
    156: "/characters-splashart/xerath.png",
    157: "/characters-splashart/xin_zhao.png",
    158: "/characters-splashart/yasuo.png",
    159: "/characters-splashart/yone.png",
    160: "/characters-splashart/yorick.png",
    161: "/characters-splashart/yuumi.png",
    162: "/characters-splashart/zac.png",
    163: "/characters-splashart/zed.png",
    164: "/characters-splashart/zeri.png",
    165: "/characters-splashart/ziggs.png",
    166: "/characters-splashart/zilean.png",
    167: "/characters-splashart/zoe.png",
    168: "/characters-splashart/zyra.png",
  }


</script>

<style>
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
      }
</style>