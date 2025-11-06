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
                <div v-if="currentChampion"> {{ currentChampion.name }}</div>
                <div v-else> No champion selected </div>
            </v-col>
            <v-col>
            <v-row no-gutters class="ma-0 pa-0 ga-0">
                 <v-col>
                    <item-selector @item-selected="updateSelectedItems"></item-selector>
                    <item-selector @item-selected="updateSelectedItems"></item-selector>
                </v-col>
                <v-col>
                    <item-selector @item-selected="updateSelectedItems"></item-selector>
                    <item-selector @item-selected="updateSelectedItems"></item-selector>
                </v-col>
                <v-col>
                    <item-selector @item-selected="updateSelectedItems"></item-selector>
                    <item-selector @item-selected="updateSelectedItems"></item-selector>
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
                <build-score
                    :selected-champion="currentChampion"
                    :selected-items="selectedItems"
                    :selected-runes="selectedRunes"
                ></build-score>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import {ref, onMounted, watch, computed} from "vue";
    import { useRoute } from "vue-router";
    import BuildScore from "../BuildScore.vue";

    const route = useRoute();

    const champions = [
        {name: "Aatrox", img: '/characters-splashart/aatrox.png'},
        {name: "Ahri", img:'/characters-splashart/ahri.png'},
        {name: "Akali", img: '/characters-splashart/akali.png'},
        {name: "Akshan", img: '/characters-splashart/akshan.png'},
        {name: "Alistar", img: '/characters-splashart/alistar.png'},
        {name: "Amumu", img: '/characters-splashart/amumu.png'},
        {name: "Anivia", img:'/characters-splashart/anivia.png'},
        {name: "Annie", img: '/characters-splashart/annie.png'},
        {name: "Aphelios", img: '/characters-splashart/aphelios.png'},
        {name: "Ashe", img: '/characters-splashart/ashe.png'},
        {name: "Aurelion Sol", img:'/characters-splashart/aurelion_sol.png'},
        {name: "Aurora", img: '/characters-splashart/aurora.png'},
        {name: "Azir", img: '/characters-splashart/azir.png'},
        {name: "Bard", img:'/characters-splashart/bard.png'},
        {name: "Bel'Veth", img: '/characters-splashart/bel\'veth.png'},
        {name: "Blitzcrank", img: '/characters-splashart/blitzcrank.png'},
        {name: "Brand", img:"/characters-splashart/brand.png"},
        {name: "Braum", img: "/characters-splashart/braum.png"},
        {name: "Briar", img: "/characters-splashart/briar.png"},
        {name: "Caitlyn", img: "/characters-splashart/caitlyn.png"},
        {name: "Camille", img: "/characters-splashart/camille.png"},
        {name: "Cassiopeia", img: "/characters-splashart/cassiopeia.png"},
        {name: "Cho'Gath", img:"/characters-splashart/cho'gath.png"},
        {name: "Corki", img: "/characters-splashart/corki.png"},
        {name: "Darius", img:"/characters-splashart/darius.png"},
        {name: "Diana", img: "/characters-splashart/diana.png"},
        {name: "Dr. Mundo", img: "/characters-splashart/dr._mundo.png"},
        {name: "Draven", img:"/characters-splashart/draven.png"},
        {name: "Ekko", img:"/characters-splashart/ekko.png"},
        {name: "Elise", img: "/characters-splashart/elise.png"},
        {name: "Evelynn", img: "/characters-splashart/evelynn.png"},
        {name: "Ezreal", img: "/characters-splashart/ezreal.png"},
        {name: "Fiddlesticks", img: "/characters-splashart/fiddlesticks.png"},
        {name: "Fiora", img:"/characters-splashart/fiora.png"},
        {name: "Fizz", img: "/characters-splashart/fizz.png"},
        {name: "Galio", img: "/characters-splashart/galio.png"},
        {name: "Gangplank", img: "/characters-splashart/gangplank.png"},
        {name: "Garen", img: "/characters-splashart/garen.png"},
        {name: "Gnar", img: "/characters-splashart/gnar.png"},
        {name: "Gragas", img: "/characters-splashart/gragas.png"},
        {name: "Graves", img: "/characters-splashart/graves.png"},
        {name: "Gwen", img: "/characters-splashart/gwen.png"},
        {name: "Hecarim", img: "/characters-splashart/hecarim.png"},
        {name: "Heimerdinger", img: "/characters-splashart/heimerdinger.png"},
        {name: "Hwei", img: "/characters-splashart/hwei.png"},
        {name: "Illaoi", img: "/characters-splashart/illaoi.png"},
        {name: "Irelia", img: "/characters-splashart/irelia.png"},
        {name: "Ivern", img: "/characters-splashart/ivern.png"},
        {name: "Janna", img: "/characters-splashart/janna.png"},
        {name: "Jarvan IV", img: "/characters-splashart/jarvan_iv.png"},
        {name: "Jax", img: "/characters-splashart/jax.png"},
        {name: "Jayce", img: "/characters-splashart/jayce.png"},
        {name: "Jhin", img: "/characters-splashart/jhin.png"},
        {name: "Jinx", img: "/characters-splashart/jinx.png"},
        {name: "K'Sante", img: "/characters-splashart/k'sante.png"},
        {name: "Kai'Sa", img: "/characters-splashart/kai'sa.png"},
        {name: "Kalista", img: "/characters-splashart/kalista.png"},
        {name: "Karma", img: "/characters-splashart/karma.png"},
        {name: "Karthus", img: "/characters-splashart/karthus.png"},
        {name: "Kassadin", img: "/characters-splashart/kassadin.png"},
        {name: "Katarina", img: "/characters-splashart/katarina.png"},
        {name: "Kayle", img: "/characters-splashart/kayle.png"},
        {name: "Kayn", img: "/characters-splashart/kayn.png"},
        {name: "Kennen", img: "/characters-splashart/kennen.png"},
        {name: "Kha'Zix", img: "/characters-splashart/kha'zix.png"}, 
        {name: "Kindred", img: "/characters-splashart/kindred.png"},
        {name: "Kled", img: "/characters-splashart/kled.png"},
        {name: "Kog'Maw", img: "/characters-splashart/kog'maw.png"},
        {name: "LeBlanc", img: "/characters-splashart/leblanc.png"},
        {name: "Lee Sin", img: "/characters-splashart/lee_sin.png"},
        {name: "Leona", img: "/characters-splashart/leona.png"},
        {name: "Lillia", img: "/characters-splashart/lillia.png"},
        {name: "Lissandra", img: "/characters-splashart/lissandra.png"},
        {name: "Lucian", img: "/characters-splashart/lucian.png"},
        {name: "Lulu", img: "/characters-splashart/lulu.png"},
        {name: "Lux", img: "/characters-splashart/lux.png"},
        {name: "Malphite", img: "/characters-splashart/malphite.png"},
        {name: "Malzahar", img: "/characters-splashart/malzahar.png"},
        {name: "Maokai", img: "/characters-splashart/maokai.png"},
        {name: "Master Yi", img: "/characters-splashart/master_yi.png"},
        {name: "Milio", img: "/characters-splashart/milio.png"},
        {name: "Miss Fortune", img: "/characters-splashart/miss_fortune.png"},
        {name: "Mordekaiser", img: "/characters-splashart/mordekaiser.png"},
        {name: "Morgana", img: "/characters-splashart/morgana.png"},
        {name: "Naafiri", img: "/characters-splashart/naafiri.png"},
        {name: "Nami", img: "/characters-splashart/nami.png"},
        {name: "Nasus", img: "/characters-splashart/nasus.png"},
        {name: "Nautilus", img: "/characters-splashart/nautilus.png"},
        {name: "Neeko", img: "/characters-splashart/neeko.png"},
        {name: "Nidalee", img: "/characters-splashart/nidalee.png"},
        {name: "Nilah", img: "/characters-splashart/nilah.png"},
        {name: "Nocturne", img: "/characters-splashart/nocturne.png"},
        {name: "Nunu & Willump", img: "/characters-splashart/nunu_&_willump.png"},
        {name: "Olaf", img: "/characters-splashart/olaf.png"},
        {name: "Orianna", img: "/characters-splashart/orianna.png"},
        {name: "Ornn", img: "/characters-splashart/ornn.png"},
        {name: "Pantheon", img: "/characters-splashart/pantheon.png"},
        {name: "Poppy", img: "/characters-splashart/poppy.png"},
        {name: "Pyke", img: "/characters-splashart/pyke.png"},
        {name: "Qiyana", img: "/characters-splashart/qiyana.png"},
        {name: "Quinn", img: "/characters-splashart/quinn.png"},
        {name: "Rakan", img: "/characters-splashart/rakan.png"},
        {name: "Rammus", img: "/characters-splashart/rammus.png"},
        {name: "Rek'Sai", img: "/characters-splashart/rek'sai.png"},
        {name: "Rell", img: "/characters-splashart/rell.png"},
        {name: "Renata Glasc", img: "/characters-splashart/renata_glasc.png"},
        {name: "Renekton", img: "/characters-splashart/renekton.png"},
        {name: "Rengar", img: "/characters-splashart/rengar.png"},
        {name: "Riven", img: "/characters-splashart/riven.png"},
        {name: "Rumble", img: "/characters-splashart/rumble.png"},
        {name: "Ryze", img: "/characters-splashart/ryze.png"},
        {name: "Samira", img: "/characters-splashart/samira.png"},
        {name: "Sejuani", img: "/characters-splashart/sejuani.png"},
        {name: "Senna", img: "/characters-splashart/senna.png"},
        {name: "Seraphine", img: "/characters-splashart/seraphine.png"},
        {name: "Sett", img: "/characters-splashart/sett.png"},
        {name: "Shaco", img: "/characters-splashart/shaco.png"},
        {name: "Shen", img: "/characters-splashart/shen.png"},
        {name: "Shyvana", img: "/characters-splashart/shyvana.png"},
        {name: "Singed", img: "/characters-splashart/singed.png"},
        {name: "Sion", img: "/characters-splashart/sion.png"},
        {name: "Sivir", img: "/characters-splashart/sivir.png"},
        {name: "Skarner", img: "/characters-splashart/skarner.png"},
        {name: "Smolder", img: "/characters-splashart/smolder.png"},
        {name: "Sona", img: "/characters-splashart/sona.png"},
        {name: "Soraka", img: "/characters-splashart/soraka.png"},
        {name: "Swain", img: "/characters-splashart/swain.png"},
        {name: "Sylas", img: "/characters-splashart/sylas.png"},
        {name: "Syndra", img: "/characters-splashart/syndra.png"},
        {name: "Tahm Kench", img: "/characters-splashart/tahm_kench.png"},
        {name: "Taliyah", img: "/characters-splashart/taliyah.png"},
        {name: "Talon", img: "/characters-splashart/talon.png"},
        {name: "Taric", img: "/characters-splashart/taric.png"},
        {name: "Teemo", img: "/characters-splashart/teemo.png"},
        {name: "Thresh", img: "/characters-splashart/thresh.png"},
        {name: "Tristana", img: "/characters-splashart/tristana.png"},
        {name: "Trundle", img: "/characters-splashart/trundle.png"},
        {name: "Tryndamere", img: "/characters-splashart/tryndamere.png"},
        {name: "Twisted Fate", img: "/characters-splashart/twisted_fate.png"},
        {name: "Twitch", img: "/characters-splashart/twitch.png"},
        {name: "Udyr", img: "/characters-splashart/udyr.png"},
        {name: "Urgot", img: "/characters-splashart/urgot.png"},
        {name: "Varus", img: "/characters-splashart/varus.png"},
        {name: "Vayne", img: "/characters-splashart/vayne.png"},
        {name: "Veigar", img: "/characters-splashart/veigar.png"},
        {name: "Vel'Koz", img: "/characters-splashart/vel'koz.png"},
        {name: "Vex", img: "/characters-splashart/vex.png"},
        {name: "Vi", img: "/characters-splashart/vi.png"},
        {name: "Viego", img: "/characters-splashart/viego.png"},
        {name: "Viktor", img: "/characters-splashart/viktor.png"},
        {name: "Vladimir", img: "/characters-splashart/vladimir.png"},
        {name: "Volibear", img: "/characters-splashart/volibear.png"},
        {name: "Warwick", img: "/characters-splashart/warwick.png"},
        {name: "Wukong", img: "/characters-splashart/wukong.png"},
        {name: "Xayah", img: "/characters-splashart/xayah.png"},
        {name: "Xerath", img: "/characters-splashart/xerath.png"},
        {name: "Xin Zhao", img: "/characters-splashart/xin_zhao.png"},
        {name: "Yasuo", img: "/characters-splashart/yasuo.png"},
        {name: "Yone", img: "/characters-splashart/yone.png"},
        {name: "Yorick", img: "/characters-splashart/yorick.png"},
        {name: "Yuumi", img: "/characters-splashart/yuumi.png"},
        {name: "Zac", img: "/characters-splashart/zac.png"},
        {name: "Zed", img: "/characters-splashart/zed.png"},
        {name: "Zeri", img: "/characters-splashart/zeri.png"},
        {name: "Ziggs", img: "/characters-splashart/ziggs.png"},
        {name: "Zilean", img: "/characters-splashart/zilean.png"},
        {name: "Zoe", img: "/characters-splashart/zoe.png"},
        {name: "Zyra", img: "/characters-splashart/zyra.png"  }
    ]

    const currentChampion = ref(null)
    const selectedRunes = ref({})
    const selectedItems = ref(Array(6).fill(null))

    const updateSelectedItems = (slotData) => {
        const newItems = [...selectedItems.value]
        newItems[slotData.slotNumber -1] = slotData.item.name
        selectedItems.value = newItems
    }

    const allItemsSelected = computed(() => {
        return selectedItems.value.every(item => item !== null)
    })

    const findChampionByName = (name) => {
        if (!name) return null;
        console.log('Looking for champion: ', name)

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
                console.log('Champion found: ', foundChampion.name)
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
        console.log('BuildCreator is working fine')
        updateChampionFromRoute();
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