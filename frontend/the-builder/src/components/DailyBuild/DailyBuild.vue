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
                <div v-if = "selectedChampion" class="text-center mt-3"> {{  this.theExtractorChampionName(selectedChampion)}}</div>
            </v-col>
            <v-col>
            <v-row no-gutters class="ma-0 pa-0 ga-0">
                 <v-col>
                    <item-selector-test @item-selected="(slotData) => updateSelectedItems(slotData)" />
                   <item-selector-test @item-selected="(slotData) => updateSelectedItems(slotData)" />
                </v-col>
                <v-col>
                   <item-selector-test @item-selected="(slotData) => updateSelectedItems(slotData)" />
                    <item-selector-test @item-selected="(slotData) => updateSelectedItems(slotData)" />
                </v-col>
                <v-col>
                    <item-selector-test @item-selected="(slotData) => updateSelectedItems(slotData)" />
                    <item-selector-test @item-selected="(slotData) => updateSelectedItems(slotData)" />
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
                    :selected-champion = "this.theExtractorChampionName(selectedChampion)"
                    :selected-items="selectedItems"
                    :selected-runes="selectedRunes"
                ></build-score>
            </v-col>
        </v-row>
        <div>
                <button @click="theComparator">Debugging</button>
        </div>
    </v-container>
</template>

<script>
    import BuildScore from '../BuildScore.vue';
    import {ref} from "vue";
    import ItemSelectorTest from '../ItemSelectorTest.vue';

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
                chamPosition: [
                    {name: "Aatrox", tag: "melee"},
                    {name: "Ahri", tag: "ranged"},
                    {name: "Akali", tag: "melee"},
                    {name: "Akshan", tag: "ranged"},
                    {name: "Alistar", tag: "melee"},
                    {name: "Amumu", tag: "melee"},
                    {name: "Anivia", tag: "ranged"},
                    {name: "Annie", tag: "ranged"},
                    {name: "Aphelios", tag: "ranged"},
                    {name: "Ashe", tag: "ranged"},
                    {name: "Aurelion Sol", tag: "ranged"},
                    {name: "Aurora", tag: "ranged"},
                    {name: "Azir", tag: "ranged"},
                    {name: "Bard", tag: "ranged"},
                    {name: "Bel'Veth", tag: "melee"},
                    {name: "Blitzcrank", tag: "melee"},
                    {name: "Brand", tag: "ranged"},
                    {name: "Braum", tag: "melee"},
                    {name: "Briar", tag: "melee"},
                    {name: "Caitlyn", tag: "ranged"},
                    {name: "Camille", tag: "melee"},
                    {name: "Cassiopeia", tag: "ranged"},
                    {name: "Cho'Gath", tag: "melee"},
                    {name: "Corki", tag: "ranged"},
                    {name: "Darius", tag: "melee"},
                    {name: "Diana", tag: "melee"},
                    {name: "Dr. Mundo", tag: "melee"},
                    {name: "Draven", tag: "ranged"},
                    {name: "Ekko", tag: "melee"},
                    {name: "Elise", tag: "ranged"},
                    {name: "Evelynn", tag: "melee"},
                    {name: "Ezreal", tag: "ranged"},
                    {name: "Fiddlesticks", tag: "ranged"},
                    {name: "Fiora", tag: "melee"},
                    {name: "Fizz", tag: "melee"},
                    {name: "Galio", tag: "melee"},
                    {name: "Gangplank", tag: "melee"},
                    {name: "Garen", tag: "melee"},
                    {name: "Gnar", tag: "ranged"},
                    {name: "Gragas", tag: "melee"},
                    {name: "Graves", tag: "ranged"},
                    {name: "Gwen", tag: "melee"},
                    {name: "Hecarim", tag: "melee"},
                    {name: "Heimerdinger", tag: "ranged"},
                    {name: "Hwei", tag: "ranged"},
                    {name: "Illaoi", tag: "melee"},
                    {name: "Irelia", tag: "melee"},
                    {name: "Ivern", tag: "ranged"},
                    {name: "Janna", tag: "ranged"},
                    {name: "Jarvan IV", tag: "melee"},
                    {name: "Jax", tag: "melee"},
                    {name: "Jayce", tag: "ranged"},
                    {name: "Jhin", tag: "ranged"},
                    {name: "Jinx", tag: "ranged"},
                    {name: "K'Sante", tag: "melee"},
                    {name: "Kai'Sa", tag: "ranged"},
                    {name: "Kalista", tag: "ranged"},
                    {name: "Karma", tag: "ranged"},
                    {name: "Karthus", tag: "ranged"},
                    {name: "Kassadin", tag: "melee"},
                    {name: "Katarina", tag: "melee"},
                    {name: "Kayle", tag: "ranged"},
                    {name: "Kayn", tag: "melee"},
                    {name: "Kennen", tag: "ranged"},
                    {name: "Kha'Zix", tag: "melee"}, 
                    {name: "Kindred", tag: "ranged"},
                    {name: "Kled", tag: "melee"},
                    {name: "Kog'Maw", tag: "ranged"},
                    {name: "LeBlanc", tag: "ranged"},
                    {name: "Lee Sin", tag: "melee"},
                    {name: "Leona", tag: "melee"},
                    {name: "Lillia", tag: "melee"},
                    {name: "Lissandra", tag: "ranged"},
                    {name: "Lucian", tag: "ranged"},
                    {name: "Lulu", tag: "ranged"},
                    {name: "Lux", tag: "ranged"},
                    {name: "Malphite", tag: "melee"},
                    {name: "Malzahar", tag: "ranged"},
                    {name: "Maokai", tag: "melee"},
                    {name: "Master Yi", tag: "melee"},
                    {name: "Milio", tag: "ranged"},
                    {name: "Miss Fortune", tag: "ranged"},
                    {name: "Mordekaiser", tag: "melee"},
                    {name: "Morgana", tag: "ranged"},
                    {name: "Naafiri", tag: "melee"},
                    {name: "Nami", tag: "ranged"},
                    {name: "Nasus", tag: "melee"},
                    {name: "Nautilus", tag: "melee"},
                    {name: "Neeko", tag: "ranged"},
                    {name: "Nidalee", tag: "ranged"},
                    {name: "Nilah", tag: "melee"},
                    {name: "Nocturne", tag: "melee"},
                    {name: "Nunu & Willump", tag: "melee"},
                    {name: "Olaf", tag: "melee"},
                    {name: "Orianna", tag: "ranged"},
                    {name: "Ornn", tag: "melee"},
                    {name: "Pantheon", tag: "melee"},
                    {name: "Poppy", tag: "melee"},
                    {name: "Pyke", tag: "melee"},
                    {name: "Qiyana", tag: "melee"},
                    {name: "Quinn", tag: "ranged"},
                    {name: "Rakan", tag: "melee"},
                    {name: "Rammus", tag: "melee"},
                    {name: "Rek'Sai", tag: "melee"},
                    {name: "Rell", tag: "melee"},
                    {name: "Renata Glasc", tag: "ranged"},
                    {name: "Renekton", tag: "melee"},
                    {name: "Rengar", tag: "melee"},
                    {name: "Riven", tag: "melee"},
                    {name: "Rumble", tag: "melee"},
                    {name: "Ryze", tag: "ranged"},
                    {name: "Samira", tag: "ranged"},
                    {name: "Sejuani", tag: "melee"},
                    {name: "Senna", tag: "ranged"},
                    {name: "Seraphine", tag: "ranged"},
                    {name: "Sett", tag: "melee"},
                    {name: "Shaco", tag: "melee"},
                    {name: "Shen", tag: "melee"},
                    {name: "Shyvana", tag: "melee"},
                    {name: "Singed", tag: "melee"},
                    {name: "Sion", tag: "melee"},
                    {name: "Sivir", tag: "ranged"},
                    {name: "Skarner", tag: "melee"},
                    {name: "Smolder", tag: "ranged"},
                    {name: "Sona", tag: "ranged"},
                    {name: "Soraka", tag: "ranged"},
                    {name: "Swain", tag: "ranged"},
                    {name: "Sylas", tag: "melee"},
                    {name: "Syndra", tag: "ranged"},
                    {name: "Tahm Kench", tag: "melee"},
                    {name: "Taliyah", tag: "ranged"},
                    {name: "Talon", tag: "melee"},
                    {name: "Taric", tag: "melee"},
                    {name: "Teemo", tag: "ranged"},
                    {name: "Thresh", tag: "ranged"},
                    {name: "Tristana", tag: "ranged"},
                    {name: "Trundle", tag: "melee"},
                    {name: "Tryndamere", tag: "melee"},
                    {name: "Twisted Fate", tag: "ranged"},
                    {name: "Twitch", tag: "ranged"},
                    {name: "Udyr", tag: "melee"},
                    {name: "Urgot", tag: "ranged"},
                    {name: "Varus", tag: "ranged"},
                    {name: "Vayne", tag: "ranged"},
                    {name: "Veigar", tag: "ranged"},
                    {name: "Vel'Koz", tag: "ranged"},
                    {name: "Vex", tag: "ranged"},
                    {name: "Vi", tag: "melee"},
                    {name: "Viego", tag: "melee"},
                    {name: "Viktor", tag: "ranged"},
                    {name: "Vladimir", tag: "ranged"},
                    {name: "Volibear", tag: "melee"},
                    {name: "Warwick", tag: "melee"},
                    {name: "Wukong", tag: "melee"},
                    {name: "Xayah", tag: "ranged"},
                    {name: "Xerath", tag: "ranged"},
                    {name: "Xin Zhao", tag: "melee"},
                    {name: "Yasuo", tag: "melee"},
                    {name: "Yone", tag: "melee"},
                    {name: "Yorick", tag: "melee"},
                    {name: "Yuumi", tag: "ranged"},
                    {name: "Zac", tag: "melee"},
                    {name: "Zed", tag: "melee"},
                    {name: "Zeri", tag: "ranged"},
                    {name: "Ziggs", tag: "ranged"},
                    {name: "Zilean", tag: "ranged"},
                    {name: "Zoe", tag: "ranged"},
                    {name: "Zyra", tag: "ranged"}
                ],
                selectedRunes: ref({
                    primary: {
                        keystone: null,
                        rows: [null, null, null]
                    },
                    secondary: []
                }),
                selectedItems: ref(["","","","","",""]),
                selectedChampion: ref(""),
                debugMode: false, 
                usedCount: 0,
                availableCount: 0
            }
        }, 
        created () {
            this.selectedDailyChampion();
            this.updateCounts();
            this.theExtractorChampionName(this.selectedChampion);
        },

        mounted() {

            // this.theExceptions();
            this.theComparator();

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
            },

            updateSelectedItems(slotData, position) {
              this.selectedItems[position] = slotData.item;
            //    console.log('Updated items array: ', this.selectedItems);
            },

            updateSelectedRunes(runesData) {
                this.selectedRunes = {...runesData}
            },

            theExtractorChampionName(routeString) {
                let champName = routeString.substring(22, routeString.length -4);
                let no_ChampName = champName.replace(/(_)/, " ");
                return this.theCapitalizer(no_ChampName);
            },

            theCapitalizer(theString) {
                // The orginal Name is also TheOName but if you spell it faster enough it turns out Dio (It's me! Dio!)
                let DioName = theString; 
                theString = String(theString).charAt(0).toUpperCase() + String(theString).slice(1);
                let spaceIndex = theString.search(" ");

                if (spaceIndex != -1) {
                    theString = this.theCharReplacer(theString, String.fromCharCode((theString[spaceIndex + 1] ).charCodeAt(0)-32), 
                        spaceIndex + 1);
                    spaceIndex = theString.search(" ");
                }

                let singleQuoteIndex = theString.search('\'');  //'
                if ( singleQuoteIndex != -1) {
                    theString = this.theCharReplacer(theString, String.fromCharCode((theString[singleQuoteIndex + 1] ).charCodeAt(0)-32), 
                        singleQuoteIndex + 1)
                }

                if (DioName === "jarvan iv") {
                    theString = this.theCharReplacer(theString, "V",  theString.length - 1);
                }

                if (DioName === "nunu &_willump") {
                    theString = this.theCharReplacer(theString, "&",  5);
                    theString = theString.replace(/(_)/, " ");
                    theString = theString.replace("w", "W");
                }
                return theString;
            },

            theCharReplacer(origString, replaceChar, index) {
                let firstPart = origString.substr(0, index);
                let lastPart = origString.substr(index + 1);
                let newString =
                    firstPart + replaceChar + lastPart;
                return newString;
            },

            theComparator(){
                let champName = this.theExtractorChampionName(this.selectedChampion);
                for(let i=0; i < this.chamPosition.length; ++i) {
                    for (let j = 0; j < this.chamPosition[i].name.length; ++j){
                        if (champName == this.chamPosition[i].name){
                            this.emitter.emit("disabling", {role: this.chamPosition[i].tag, name: this.chamPosition[i].name});
                        }
                    }
                }
            },
                
<<<<<<< Updated upstream
            theExceptions() {
                if (champions.tag == "melee") {
                    theItemDisabler(slot, "Ranged");
                }
                if (champions.name == "Cassiopeia") {
                    theItemDisabler(slot, "Boots");
                }
            }
=======
>>>>>>> Stashed changes
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