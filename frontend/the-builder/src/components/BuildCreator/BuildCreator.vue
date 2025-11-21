<template>
    <v-container>
        <v-row class="pa-3 mb-6">
            <v-col>
                  <h1 class="text-secondary">  Create your build!  </h1>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="3">
                <div>
                    <v-img
                        v-if="currentChampion"
                        :src="currentChampion.img"
                        :alt="currentChampion.name"
                        width="350"
                        class="framed"
                    ></v-img>
                </div>
                <div v-if="currentChampion" class="text-center mt-3"> {{ currentChampion.name }}</div>
                <div v-else> No champion selected </div>
            </v-col>
            <v-col>
            <v-row no-gutters class="ma-0 pa-0 ga-0">
                 <v-col>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 0)" ref="item0" id="HEY"></item-selector>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 1)" ref="item1"></item-selector>
                </v-col>
                <v-col>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 2)" ref="item2"></item-selector>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 3)" ref="item3"></item-selector>
                </v-col>
                <v-col>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 4)" ref="item4"></item-selector>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 5)" ref="item5"></item-selector>
                </v-col>
                 <v-col cols="9">
                    <rune-selector @runes-selected = "updateSelectedRunes"></rune-selector>
                </v-col>
            </v-row>

            </v-col>
        </v-row>

        <v-row class="ma-15 pa-10">
            <v-col offset="3">
                <button @click="$router.go(-1)" class="buttonsettings"> Return to Home </button>
            </v-col>
            <v-col>
                <build-score
                    :selected-champion="JSON.stringify(currentChampion.name).slice(1, -1)"
                    :selected-items="selectedItems"
                    :selected-runes="selectedRunes"
                ></build-score>
            </v-col>
        </v-row>
    </v-container>
    <div >
      <button @click="theItemEnabler(0, 'Boots')"> Enable that thing </button>
    </div>
</template>

<script setup>
    import {ref, onMounted, watch, computed, useTemplateRef} from "vue";
    import { useRoute } from "vue-router";
    import BuildScore from "../BuildScore.vue";
    import ItemSelector from "../ItemSelector.vue";

    const route = useRoute();

    //All the champions and their images
    const champions = [
        {name: "Aatrox", img: '/characters-splashart/aatrox.png', tag: "melee"},
        {name: "Ahri", img:'/characters-splashart/ahri.png', tag: "ranged"},
        {name: "Akali", img: '/characters-splashart/akali.png', tag: "melee"},
        {name: "Akshan", img: '/characters-splashart/akshan.png', tag: "ranged"},
        {name: "Alistar", img: '/characters-splashart/alistar.png', tag: "melee"},
        {name: "Amumu", img: '/characters-splashart/amumu.png', tag: "melee"},
        {name: "Anivia", img:'/characters-splashart/anivia.png', tag: "ranged"},
        {name: "Annie", img: '/characters-splashart/annie.png', tag: "ranged"},
        {name: "Aphelios", img: '/characters-splashart/aphelios.png', tag: "ranged"},
        {name: "Ashe", img: '/characters-splashart/ashe.png', tag: "ranged"},
        {name: "Aurelion Sol", img:'/characters-splashart/aurelion_sol.png', tag: "ranged"},
        {name: "Aurora", img: '/characters-splashart/aurora.png', tag: "ranged"},
        {name: "Azir", img: '/characters-splashart/azir.png', tag: "ranged"},
        {name: "Bard", img:'/characters-splashart/bard.png', tag: "ranged"},
        {name: "Bel'Veth", img: '/characters-splashart/bel\'veth.png', tag: "melee"},
        {name: "Blitzcrank", img: '/characters-splashart/blitzcrank.png', tag: "melee"},
        {name: "Brand", img:"/characters-splashart/brand.png", tag: "ranged"},
        {name: "Braum", img: "/characters-splashart/braum.png", tag: "melee"},
        {name: "Briar", img: "/characters-splashart/briar.png", tag: "melee"},
        {name: "Caitlyn", img: "/characters-splashart/caitlyn.png", tag: "ranged"},
        {name: "Camille", img: "/characters-splashart/camille.png", tag: "melee"},
        {name: "Cassiopeia", img: "/characters-splashart/cassiopeia.png", tag: "ranged"},
        {name: "Cho'Gath", img:"/characters-splashart/cho'gath.png", tag: "melee"},
        {name: "Corki", img: "/characters-splashart/corki.png", tag: "ranged"},
        {name: "Darius", img:"/characters-splashart/darius.png", tag: "melee"},
        {name: "Diana", img: "/characters-splashart/diana.png", tag: "melee"},
        {name: "Dr. Mundo", img: "/characters-splashart/dr._mundo.png", tag: "melee"},
        {name: "Draven", img:"/characters-splashart/draven.png", tag: "ranged"},
        {name: "Ekko", img:"/characters-splashart/ekko.png", tag: "melee"},
        {name: "Elise", img: "/characters-splashart/elise.png", tag: "ranged"},
        {name: "Evelynn", img: "/characters-splashart/evelynn.png", tag: "melee"},
        {name: "Ezreal", img: "/characters-splashart/ezreal.png", tag: "ranged"},
        {name: "Fiddlesticks", img: "/characters-splashart/fiddlesticks.png", tag: "ranged"},
        {name: "Fiora", img:"/characters-splashart/fiora.png", tag: "melee"},
        {name: "Fizz", img: "/characters-splashart/fizz.png", tag: "melee"},
        {name: "Galio", img: "/characters-splashart/galio.png", tag: "melee"},
        {name: "Gangplank", img: "/characters-splashart/gangplank.png", tag: "melee"},
        {name: "Garen", img: "/characters-splashart/garen.png", tag: "melee"},
        {name: "Gnar", img: "/characters-splashart/gnar.png", tag: "ranged"},
        {name: "Gragas", img: "/characters-splashart/gragas.png", tag: "melee"},
        {name: "Graves", img: "/characters-splashart/graves.png", tag: "ranged"},
        {name: "Gwen", img: "/characters-splashart/gwen.png", tag: "melee"},
        {name: "Hecarim", img: "/characters-splashart/hecarim.png", tag: "melee"},
        {name: "Heimerdinger", img: "/characters-splashart/heimerdinger.png", tag: "ranged"},
        {name: "Hwei", img: "/characters-splashart/hwei.png", tag: "ranged"},
        {name: "Illaoi", img: "/characters-splashart/illaoi.png", tag: "melee"},
        {name: "Irelia", img: "/characters-splashart/irelia.png", tag: "melee"},
        {name: "Ivern", img: "/characters-splashart/ivern.png",  tag: "ranged"},
        {name: "Janna", img: "/characters-splashart/janna.png", tag: "ranged"},
        {name: "Jarvan IV", img: "/characters-splashart/jarvan_iv.png", tag: "melee"},
        {name: "Jax", img: "/characters-splashart/jax.png", tag: "melee"},
        {name: "Jayce", img: "/characters-splashart/jayce.png", tag: "ranged"}, // he's ranged in-game, because he can buy Runaan's
        {name: "Jhin", img: "/characters-splashart/jhin.png", tag: "ranged"},
        {name: "Jinx", img: "/characters-splashart/jinx.png", tag: "ranged"},
        {name: "K'Sante", img: "/characters-splashart/k'sante.png", tag: "melee"},
        {name: "Kai'Sa", img: "/characters-splashart/kai'sa.png", tag: "ranged"},
        {name: "Kalista", img: "/characters-splashart/kalista.png", tag: "ranged"},
        {name: "Karma", img: "/characters-splashart/karma.png", tag: "ranged"},
        {name: "Karthus", img: "/characters-splashart/karthus.png", tag: "ranged"},
        {name: "Kassadin", img: "/characters-splashart/kassadin.png", tag: "melee"},
        {name: "Katarina", img: "/characters-splashart/katarina.png", tag: "melee"},
        {name: "Kayle", img: "/characters-splashart/kayle.png", tag: "ranged"}, // can buy Runaan's post lvl6, so she counts as ranged
        {name: "Kayn", img: "/characters-splashart/kayn.png", tag: "melee"},
        {name: "Kennen", img: "/characters-splashart/kennen.png", tag: "ranged"},
        {name: "Kha'Zix", img: "/characters-splashart/kha'zix.png", tag: "melee"}, 
        {name: "Kindred", img: "/characters-splashart/kindred.png", tag: "ranged"},
        {name: "Kled", img: "/characters-splashart/kled.png", tag: "melee"},
        {name: "Kog'Maw", img: "/characters-splashart/kog'maw.png", tag: "ranged"},
        {name: "LeBlanc", img: "/characters-splashart/leblanc.png", tag: "ranged"},
        {name: "Lee Sin", img: "/characters-splashart/lee_sin.png", tag: "melee"},
        {name: "Leona", img: "/characters-splashart/leona.png", tag: "melee"},
        {name: "Lillia", img: "/characters-splashart/lillia.png", tag: "melee"},
        {name: "Lissandra", img: "/characters-splashart/lissandra.png", tag: "ranged"},
        {name: "Lucian", img: "/characters-splashart/lucian.png", tag: "ranged"},
        {name: "Lulu", img: "/characters-splashart/lulu.png", tag: "ranged"},
        {name: "Lux", img: "/characters-splashart/lux.png", tag: "ranged"},
        {name: "Malphite", img: "/characters-splashart/malphite.png", tag: "melee"},
        {name: "Malzahar", img: "/characters-splashart/malzahar.png", tag: "ranged"},
        {name: "Maokai", img: "/characters-splashart/maokai.png",  tag: "melee"},
        {name: "Master Yi", img: "/characters-splashart/master_yi.png", tag: "melee"},
        {name: "Milio", img: "/characters-splashart/milio.png", tag: "ranged"},
        {name: "Miss Fortune", img: "/characters-splashart/miss_fortune.png", tag: "ranged"},
        {name: "Mordekaiser", img: "/characters-splashart/mordekaiser.png", tag: "melee"},
        {name: "Morgana", img: "/characters-splashart/morgana.png", tag: "ranged"},
        {name: "Naafiri", img: "/characters-splashart/naafiri.png", tag: "melee"},
        {name: "Nami", img: "/characters-splashart/nami.png", tag: "ranged"},
        {name: "Nasus", img: "/characters-splashart/nasus.png", tag: "melee"},
        {name: "Nautilus", img: "/characters-splashart/nautilus.png", tag: "melee"},
        {name: "Neeko", img: "/characters-splashart/neeko.png", tag: "ranged"},
        {name: "Nidalee", img: "/characters-splashart/nidalee.png", tag: "ranged"},
        {name: "Nilah", img: "/characters-splashart/nilah.png", tag: "melee"},
        {name: "Nocturne", img: "/characters-splashart/nocturne.png", tag: "melee"},
        {name: "Nunu & Willump", img: "/characters-splashart/nunu_&_willump.png", tag: "melee"},
        {name: "Olaf", img: "/characters-splashart/olaf.png", tag: "melee"},
        {name: "Orianna", img: "/characters-splashart/orianna.png", tag: "ranged"},
        {name: "Ornn", img: "/characters-splashart/ornn.png", tag: "melee"},
        {name: "Pantheon", img: "/characters-splashart/pantheon.png", tag: "melee"},
        {name: "Poppy", img: "/characters-splashart/poppy.png", tag: "melee"},
        {name: "Pyke", img: "/characters-splashart/pyke.png", tag: "melee"},
        {name: "Qiyana", img: "/characters-splashart/qiyana.png", tag: "melee"},
        {name: "Quinn", img: "/characters-splashart/quinn.png", tag: "ranged"},
        {name: "Rakan", img: "/characters-splashart/rakan.png", tag: "melee"},
        {name: "Rammus", img: "/characters-splashart/rammus.png", tag: "melee"},
        {name: "Rek'Sai", img: "/characters-splashart/rek'sai.png", tag: "melee"},
        {name: "Rell", img: "/characters-splashart/rell.png", tag: "melee"},
        {name: "Renata Glasc", img: "/characters-splashart/renata_glasc.png", tag: "ranged"},
        {name: "Renekton", img: "/characters-splashart/renekton.png", tag: "melee"},
        {name: "Rengar", img: "/characters-splashart/rengar.png", tag: "melee"},
        {name: "Riven", img: "/characters-splashart/riven.png", tag: "melee"},
        {name: "Rumble", img: "/characters-splashart/rumble.png", tag: "melee"},
        {name: "Ryze", img: "/characters-splashart/ryze.png", tag: "ranged"},
        {name: "Samira", img: "/characters-splashart/samira.png", tag: "ranged"},
        {name: "Sejuani", img: "/characters-splashart/sejuani.png", tag: "melee"},
        {name: "Senna", img: "/characters-splashart/senna.png", tag: "ranged"},
        {name: "Seraphine", img: "/characters-splashart/seraphine.png", tag: "ranged"},
        {name: "Sett", img: "/characters-splashart/sett.png", tag: "melee"},
        {name: "Shaco", img: "/characters-splashart/shaco.png", tag: "melee"},
        {name: "Shen", img: "/characters-splashart/shen.png", tag: "melee"},
        {name: "Shyvana", img: "/characters-splashart/shyvana.png", tag: "melee"},
        {name: "Singed", img: "/characters-splashart/singed.png", tag: "melee"},
        {name: "Sion", img: "/characters-splashart/sion.png", tag: "melee"},
        {name: "Sivir", img: "/characters-splashart/sivir.png", tag: "ranged"},
        {name: "Skarner", img: "/characters-splashart/skarner.png", tag: "melee"},
        {name: "Smolder", img: "/characters-splashart/smolder.png", tag: "ranged"},
        {name: "Sona", img: "/characters-splashart/sona.png", tag: "ranged"},
        {name: "Soraka", img: "/characters-splashart/soraka.png", tag: "ranged"},
        {name: "Swain", img: "/characters-splashart/swain.png", tag: "ranged"},
        {name: "Sylas", img: "/characters-splashart/sylas.png", tag: "melee"},
        {name: "Syndra", img: "/characters-splashart/syndra.png", tag: "ranged"},
        {name: "Tahm Kench", img: "/characters-splashart/tahm_kench.png", tag: "melee"},
        {name: "Taliyah", img: "/characters-splashart/taliyah.png", tag: "ranged"},
        {name: "Talon", img: "/characters-splashart/talon.png", tag: "melee"},
        {name: "Taric", img: "/characters-splashart/taric.png", tag: "melee"},
        {name: "Teemo", img: "/characters-splashart/teemo.png", tag: "ranged"},
        {name: "Thresh", img: "/characters-splashart/thresh.png", tag: "ranged"},
        {name: "Tristana", img: "/characters-splashart/tristana.png", tag: "ranged"},
        {name: "Trundle", img: "/characters-splashart/trundle.png", tag: "melee"},
        {name: "Tryndamere", img: "/characters-splashart/tryndamere.png", tag: "melee"},
        {name: "Twisted Fate", img: "/characters-splashart/twisted_fate.png", tag: "ranged"},
        {name: "Twitch", img: "/characters-splashart/twitch.png", tag: "ranged"},
        {name: "Udyr", img: "/characters-splashart/udyr.png", tag: "melee"},
        {name: "Urgot", img: "/characters-splashart/urgot.png", tag: "ranged"},
        {name: "Varus", img: "/characters-splashart/varus.png", tag: "ranged"},
        {name: "Vayne", img: "/characters-splashart/vayne.png", tag: "ranged"},
        {name: "Veigar", img: "/characters-splashart/veigar.png", tag: "ranged"},
        {name: "Vel'Koz", img: "/characters-splashart/vel'koz.png", tag: "ranged"},
        {name: "Vex", img: "/characters-splashart/vex.png", tag: "ranged"},
        {name: "Vi", img: "/characters-splashart/vi.png", tag: "melee"},
        {name: "Viego", img: "/characters-splashart/viego.png", tag: "melee"},
        {name: "Viktor", img: "/characters-splashart/viktor.png", tag: "ranged"},
        {name: "Vladimir", img: "/characters-splashart/vladimir.png", tag: "ranged"},
        {name: "Volibear", img: "/characters-splashart/volibear.png", tag: "melee"},
        {name: "Warwick", img: "/characters-splashart/warwick.png", tag: "melee"},
        {name: "Wukong", img: "/characters-splashart/wukong.png", tag: "melee"},
        {name: "Xayah", img: "/characters-splashart/xayah.png", tag: "ranged"},
        {name: "Xerath", img: "/characters-splashart/xerath.png", tag: "ranged"},
        {name: "Xin Zhao", img: "/characters-splashart/xin_zhao.png", tag: "melee"},
        {name: "Yasuo", img: "/characters-splashart/yasuo.png", tag: "melee"},
        {name: "Yone", img: "/characters-splashart/yone.png", tag: "melee"},
        {name: "Yorick", img: "/characters-splashart/yorick.png", tag: "melee"},
        {name: "Yuumi", img: "/characters-splashart/yuumi.png", tag: "ranged"},
        {name: "Zac", img: "/characters-splashart/zac.png", tag: "melee"},
        {name: "Zed", img: "/characters-splashart/zed.png", tag: "melee"},
        {name: "Zeri", img: "/characters-splashart/zeri.png", tag: "ranged"},
        {name: "Ziggs", img: "/characters-splashart/ziggs.png", tag: "ranged"},
        {name: "Zilean", img: "/characters-splashart/zilean.png", tag: "ranged"},
        {name: "Zoe", img: "/characters-splashart/zoe.png", tag: "ranged"},
        {name: "Zyra", img: "/characters-splashart/zyra.png", tag: "ranged"}
    ]

    const currentChampion = ref(null)
    const selectedItems = ref(["","","","","",""])
    const selectedRunes = ref({
        primary: {
            keystone: null,
            rows: [null, null, null]
        },
        secondary: [null, null]
    })

    const slots = [0,1,2,3,4,5];

    const updateSelectedRunes = (runesData) => {
        selectedRunes.value = {...runesData}
    }

    const updateSelectedItems = (slotData, position) => {
      selectedItems.value[position] = slotData.item;
      theItemEnabler(slotData, slotData.item.tag);
      theItemDisabler(slotData, slotData.item.tag);
    }


    //Funcion que al seleccionar un objeto se comunica se comunica con todos los item selectors
    //para hacer que los objetos que tengan las tags que contiene este objeto no sean seleccionables en el resto 
    // de slots exceptuando el suyo propio
    //En caso de que el objeto haya sido reemplazado por otro, se comunica con todos los items selectors 
    // para hacer que los objetos tengan las tags que contiene este objeto sean seleccionables
    const theItemEnabler = (slot, tag) => {
      let element = useTemplateRef('item0');
      element.sayHiButVariable();
      // element.theEnabler(tag);
    }

    //Funcion que gestiona el reemplazo de los objetos y que depende de las dos funciones anteriores
    //Selecciona item (1º vez) -> bloquea el resto
    // Reemplaza por otro -> permite escoger "todos" aka los disponibles en su slot por tags
    //Te permite cambiar por otro de su mismo tipo y si cambia a un tipo distinto, se desbloquea en el resto de slots
    // Selecciona el item (2º vez) -> vuelve a bloquearlo para todo el mundo
    const theItemDisabler = (slot, tag) => {
      // for (slot in slots) {
      //   if (item.position == slot) {
      //     continue;
      //   } else {
      //     item.disabled(tag)
      //   }
      // }
    }

    const findChampionByName = (name) => {
        if (!name) return null;
        let foundChampion = champions.find(champ =>
            champ.name.toLowerCase() === name.toLowerCase()
        );

        if(!foundChampion) {
            foundChampion = champions.find(champ =>
                champ.name.toLowerCase().includes(name.toLowerCase()) ||
                name.toLowerCase().includes(champ.name.toLowerCase())
            );
        }

        if (!foundChampion) {
            const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            foundChampion = champions.find(champ => 
                champ.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanName
            );
        }
        return foundChampion;
    }

    const updateChampionFromRoute = () => {
        const championNameFromUrl = route.query.championName

        if (championNameFromUrl) {
            const foundChampion = findChampionByName(championNameFromUrl)

            if (foundChampion){
                currentChampion.value = foundChampion
                // console.log('Champion found: ', foundChampion.name)
            } else {
                currentChampion.value = null
                console.log('Champion not found. Available:', champions.map(c => c.name))
            }
            
        } else {
            currentChampion.value = null
            console.log('There is no champion')
        }
    }

    watch(() => route.query, updateChampionFromRoute, {immediate: true})
    onMounted(() => {
        updateChampionFromRoute();
        if (champions.tag == "melee") {
            theItemDisabler(slot, "Ranged");
        }
        if (champions.name == "Cassiopeia") {
            theItemDisabler(slot, "Boots");
        }
    })

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

    .framed{
      border: 3px solid #653a1b;
    }
</style>