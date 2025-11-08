<template>
    <v-container>
        <v-row class="pa-3 mb-6">
            <v-col>
                  <h1 class="text-secondary">  Daily Build </h1>
                  <h3> Choose the items and runes that best suit this champion!</h3>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="3">
                <div>
                    <v-img 
                    v-if="selectedChampion"
                    :src="selectedChampion" 
                    alt="Daily Champion" 
                    style="max-width: 300px; border-radius: 10px;"
                    class="framed"
                    />
                </div>
            </v-col>
            <v-col>
            <v-row no-gutters class="ma-0 pa-0 ga-0">
                 <v-col>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 0)"></item-selector>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 1)"></item-selector>
                </v-col>
                <v-col>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 2)"></item-selector>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 3)"></item-selector>
                </v-col>
                <v-col>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 4)"></item-selector>
                    <item-selector @item-selected="(slotData) => updateSelectedItems(slotData, 5)"></item-selector>
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
                    :selected-champion="selectedChampion"
                    :selected-items="selectedItems"
                    :selected-runes="selectedRunes"
                ></build-score>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import BuildScore from '../BuildScore.vue';
    export default {
        data () {
            return {
                champions: [
            '/characters-splashart/aatrox.png',
            '/characters-splashart/ahri.png',
            '/characters-splashart/akali.png',
            '/characters-splashart/akshan.png',
            '/characters-splashart/alistar.png',
            '/characters-splashart/amumu.png',
            '/characters-splashart/anivia.png',
            '/characters-splashart/annie.png',
            '/characters-splashart/aphelios.png',
            '/characters-splashart/ashe.png',
            '/characters-splashart/aurelion_sol.png',
            '/characters-splashart/aurora.png',
            '/characters-splashart/azir.png',
            '/characters-splashart/bard.png',
            '/characters-splashart/bel\'veth.png',
            '/characters-splashart/blitzcrank.png',
            "/characters-splashart/brand.png",
            "/characters-splashart/braum.png",
            "/characters-splashart/briar.png",
            "/characters-splashart/caitlyn.png",
            "/characters-splashart/camille.png",
            "/characters-splashart/cassiopeia.png",
            "/characters-splashart/cho'gath.png",
            "/characters-splashart/corki.png",
            "/characters-splashart/darius.png",
            "/characters-splashart/diana.png",
            "/characters-splashart/dr._mundo.png",//_?
            "/characters-splashart/draven.png",
            "/characters-splashart/ekko.png",
            "/characters-splashart/elise.png",
            "/characters-splashart/evelynn.png",
            "/characters-splashart/ezreal.png",
            "/characters-splashart/fiddlesticks.png",
            "/characters-splashart/fiora.png",
            "/characters-splashart/fizz.png",
            "/characters-splashart/galio.png",
            "/characters-splashart/gangplank.png",
            "/characters-splashart/garen.png",
            "/characters-splashart/gnar.png",
            "/characters-splashart/gragas.png",
            "/characters-splashart/graves.png",
            "/characters-splashart/gwen.png",
            "/characters-splashart/hecarim.png",
            "/characters-splashart/heimerdinger.png",
            "/characters-splashart/hwei.png",
            "/characters-splashart/illaoi.png",
            "/characters-splashart/irelia.png",
            "/characters-splashart/ivern.png",
            "/characters-splashart/janna.png",
            "/characters-splashart/jarvan_iv.png",
            "/characters-splashart/jax.png",
            "/characters-splashart/jayce.png",
            "/characters-splashart/jhin.png",
            "/characters-splashart/jinx.png",
            "/characters-splashart/k'sante.png",
            "/characters-splashart/kai'sa.png",
            "/characters-splashart/kalista.png",
            "/characters-splashart/karma.png",
            "/characters-splashart/karthus.png",
            "/characters-splashart/kassadin.png",
            "/characters-splashart/katarina.png",
            "/characters-splashart/kayle.png",
            "/characters-splashart/kayn.png",
            "/characters-splashart/kennen.png",
            "/characters-splashart/kha'zix.png", 
            "/characters-splashart/kindred.png",
            "/characters-splashart/kled.png",
            "/characters-splashart/kog'maw.png",
            "/characters-splashart/leblanc.png",
            "/characters-splashart/lee_sin.png",
            "/characters-splashart/leona.png",
            "/characters-splashart/lillia.png",
            "/characters-splashart/lissandra.png",
            "/characters-splashart/lucian.png",
            "/characters-splashart/lulu.png",
            "/characters-splashart/lux.png",
            "/characters-splashart/malphite.png",
            "/characters-splashart/malzahar.png",
            "/characters-splashart/maokai.png",
            "/characters-splashart/master_yi.png",
            "/characters-splashart/milio.png",
            "/characters-splashart/miss_fortune.png",
            "/characters-splashart/mordekaiser.png",
            "/characters-splashart/morgana.png",
            "/characters-splashart/naafiri.png",
            "/characters-splashart/nami.png",
            "/characters-splashart/nasus.png",
            "/characters-splashart/nautilus.png",
            "/characters-splashart/neeko.png",
            "/characters-splashart/nidalee.png",
            "/characters-splashart/nilah.png",
            "/characters-splashart/nocturne.png",
            "/characters-splashart/nunu_&_willump.png",
            "/characters-splashart/olaf.png",
            "/characters-splashart/orianna.png",
            "/characters-splashart/ornn.png",
            "/characters-splashart/pantheon.png",
            "/characters-splashart/poppy.png",
            "/characters-splashart/pyke.png",
            "/characters-splashart/qiyana.png",
            "/characters-splashart/quinn.png",
            "/characters-splashart/rakan.png",
            "/characters-splashart/rammus.png",
            "/characters-splashart/rek'sai.png",
            "/characters-splashart/rell.png",
            "/characters-splashart/renata_glasc.png",
            "/characters-splashart/renekton.png",
            "/characters-splashart/rengar.png",
            "/characters-splashart/riven.png",
            "/characters-splashart/rumble.png",
            "/characters-splashart/ryze.png",
            "/characters-splashart/samira.png",
            "/characters-splashart/sejuani.png",
            "/characters-splashart/senna.png",
            "/characters-splashart/seraphine.png",
            "/characters-splashart/sett.png",
            "/characters-splashart/shaco.png",
            "/characters-splashart/shen.png",
            "/characters-splashart/shyvana.png",
            "/characters-splashart/singed.png",
            "/characters-splashart/sion.png",
            "/characters-splashart/sivir.png",
            "/characters-splashart/skarner.png",
            "/characters-splashart/smolder.png",
            "/characters-splashart/sona.png",
            "/characters-splashart/soraka.png",
            "/characters-splashart/swain.png",
            "/characters-splashart/sylas.png",
            "/characters-splashart/syndra.png",
            "/characters-splashart/tahm_kench.png",
            "/characters-splashart/taliyah.png",
            "/characters-splashart/talon.png",
            "/characters-splashart/taric.png",
            "/characters-splashart/teemo.png",
            "/characters-splashart/thresh.png",
            "/characters-splashart/tristana.png",
            "/characters-splashart/trundle.png",
            "/characters-splashart/tryndamere.png",
            "/characters-splashart/twisted_fate.png",
            "/characters-splashart/twitch.png",
            "/characters-splashart/udyr.png",
            "/characters-splashart/urgot.png",
            "/characters-splashart/varus.png",
            "/characters-splashart/vayne.png",
            "/characters-splashart/veigar.png",
            "/characters-splashart/vel'koz.png",
            "/characters-splashart/vex.png",
            "/characters-splashart/vi.png",
            "/characters-splashart/viego.png",
            "/characters-splashart/viktor.png",
            "/characters-splashart/vladimir.png",
            "/characters-splashart/volibear.png",
            "/characters-splashart/warwick.png",
            "/characters-splashart/wukong.png",
            "/characters-splashart/xayah.png",
            "/characters-splashart/xerath.png",
            "/characters-splashart/xin_zhao.png",
            "/characters-splashart/yasuo.png",
            "/characters-splashart/yone.png",
            "/characters-splashart/yorick.png",
            "/characters-splashart/yuumi.png",
            "/characters-splashart/zac.png",
            "/characters-splashart/zed.png",
            "/characters-splashart/zeri.png",
            "/characters-splashart/ziggs.png",
            "/characters-splashart/zilean.png",
            "/characters-splashart/zoe.png",
            "/characters-splashart/zyra.png",
            ],
                selectedRunes: ({}),
                selectedItems: (["","","","","",""]),
                selectedChampion: "",
                debugMode: false, 
                usedCount: 0,
                availableCount: 0
            }
        }, 
        created () {
            this.selectedDailyChampion();
            this.updateCounts();
        },
        methods: {
            getUsedChampions() {
            try {
                return JSON.parse(localStorage.getItem('usedChampions') || '[]');
            } catch (error) {
                console.log('Error reading localStorage, initializing empty array');
                return [];
            }
            },
        
            updateCounts() {
            const usedChampions = this.getUsedChampions();
            this.usedCount = usedChampions.length;
            this.availableCount = this.champions.length - this.usedCount;
            },

            selectedDailyChampion(){
                if (!this.debugMode){
                    const oneDay = 24 * 60 * 60 * 1000;
                    const today = Date.now();

                    const storedImage = localStorage.getItem('randomImage');
                    const storedTimestamp =localStorage.getItem('randomImageTimestamp');

                    if (storedImage && storedTimestamp) {
                        const storedTime = parseInt(storedTimestamp, 10);
                        if (today - storedTime < oneDay) {
                            this.selectedChampion = storedImage;
                            this.updateCounts();
                            return;
                        }
                    }
                }
                let usedChampions = this.getUsedChampions();
                console.log('Previously used champions: ', usedChampions);

                const availableChampions = this.champions.filter(champ => !usedChampions.includes(champ));
                console.log('Available champions: ', availableChampions);

                let selectedChamp;

                if (availableChampions.length > 0) {
                    const idx = Math.floor(Math.random() * availableChampions.length);
                    selectedChamp = availableChampions[idx];
                    usedChampions.push(selectedChamp);
                } else {
                    const idx = Math.floor(Math.random() * this.champions.length);
                    selectedChamp = this.champions[idx];
                    usedChampions = [selectedChamp];
                }

                this.selectedChampion = selectedChamp;
                try{
                if (!this.debugMode) {
                    localStorage.setItem('randomImage', selectedChamp);
                    localStorage.setItem('randomImageTimestamp', Date.now().toString());
                }
                
                localStorage.setItem('usedChampions', JSON.stringify(usedChampions));
            } catch (error) {
                console.log('error saving to localStorage: ', error);
            }
                //Debug log
                console.log('=== FINAL STATE ===');
                console.log('Selected champion:', selectedChamp);
                console.log('All used champions:', usedChampions);
                console.log('Remaining available:', this.champions.filter(champ => !usedChampions.includes(champ)));
            },

            updateSelectedItems(slotData, position) {
              selectedItems.value[position] = slotData.item;
            },
        }
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

    .framed{
      border: 3px solid #653a1b;
    }
</style>