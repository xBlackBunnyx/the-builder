//Code to calculate the score of the build

//include (librerias necesarias)
const fs = require('fs');
const uc = require("../mongo-connection");
//Lectura de documento html

// Aqui va el señor que escucha (aka el listener)

//conexion con el señor mongo
const { MongoClient, ServerApiVersion } = require('mongodb');
let uri = uc.uriConnection();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
    version: ServerApiVersion.v1,
   strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //Here is where we have to put all the functions related to getting something from the database
  await client.connect();
    const db = client.db("Builder");
   // Send a ping to confirm a successful connection
   await client.db("admin").command({ ping: 1 });
   
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
    let data = PlayerBuildImporter();
    // console.log("raw data from the importer is " + ArrayToString(data));
    let championName = data[0];
    // console.log("Champion name extracted is " + championName);
    let itemsName = data.slice(1,7);
    // console.log("items name are" + itemsName);
    let runesName = data.slice(7);
    // console.log("runes name are" + runesName);
    let champ = await findChamps(client, championName);
    // console.log(champ);
    let items = await findItem(client, itemsName);
    // console.log(items);
    let runes = await findRunes(client, runesName);
    // console.log(runes);
    // console.log("Checking if something appears inside the function ScoreGiver");
    // ScoreCalculator(ScoreGiver(champ, items, runes), ScoreGiver(champ, items, runes));
    CombinedBuildScore(StringsToBuild(data), ScoreCalculator(ScoreGiver(champ, items, runes), ScoreGiver(champ, items, runes)));
    // await SavePlayerBuilds(client, CombinedBuildScore(StringsToBuild(data), ScoreCalculator(ScoreGiver(champ, items, runes), ScoreGiver(champ, items, runes))));

 } finally {
    // Ensures that the client will close when you finish/error
   await client.close();
  }
}
run().catch(console.dir);

//Function to return a specific champion 
async function findChamps(client, nameOfChampion) {
  let championCharacteristics = await client.db("builder").collection("Characters").findOne({champion:nameOfChampion});
  // console.log("championCharacteristics is " + championCharacteristics);
  if (championCharacteristics){
    // console.log(`Found a listing in the collection with the name '${nameOfChampion}'`);
    // console.log(championCharacteristics);
    return championCharacteristics;
  } else {
    console.log(`No listing found with the name '${nameOfChampion}'`);
  }
}

//Function to return the items
async function findItem(client, namesOfItems) {
  if (typeof namesOfItems === "string") namesOfItems = [namesOfItems];
  let cursor = await client.db("builder").collection("Items").find({item:{$in:namesOfItems}});
  const results = await cursor.toArray();
  // let results = [];
  // for await (let doc of cursor){
  //   results.push(doc);
  // }
  // let itemResults = await cursor.toArray();
  if (results.length > 0){
    return results;

  } else {
    console.log(`No listing found with the name '${[namesOfItems]}'`);
    return [];
  }
}

//Function to return the runes
async function findRunes(client, namesOfRunes) {
   if (typeof namesOfRunes === "string") namesOfRunes = [namesOfRunes];
  let cursor = await client.db("builder").collection("Runes").find({rune:{$in:namesOfRunes}});
  const results = await cursor.toArray();
  // for await (let doc of cursor){
  //   results.push(doc);
  // }
  if (results.length > 0){
    return results;
  } else {
    console.log(`No listing found with the name '${[namesOfRunes]}'`);
    return [];
  }
}

//Funcion que combina la build codificada con la puntuación
function CombinedBuildScore(codedBuild, finalScore){
  let buildCodified = codedBuild;
  console.log("The codified build is " + buildCodified);
  let buildScore = finalScore * 100;
  console.log("The build score is " + buildScore);
  let completeBuild = {build: buildCodified, score: buildScore};
  // console.log("The final result is " + completeBuild);
  return completeBuild;
}

//Funcion para que se suban los resultados a mongo
async function SavePlayerBuilds(client, newPlayerBuild) {
  let scoreBuild = await client.db("builder").collection("PlayerBuilds").insertOne(newPlayerBuild);
  console.log(`New listing created with the following id: ${scoreBuild.insertedId}`);
}

//Aquí va la build que ha hecho el jugador y se recoge de la página web
function PlayerBuildImporter(){
  // let result = fs.readFile('build-test.txt', (err, data) => {
  //   if (err) throw err;
  //   let array = data.toString().split(",");
  //   for(i in array){
  //     console.log(array[i]);
  //   }
  // });
  let result = fs.readFileSync('./build-test.txt', {encoding: 'utf8', flag: 'r'}).split(";").map(s => s.trim()).filter(Boolean);
  return result;
}

// Function that search by the id of the champion, item and rune (HAY QUE HACERLO GENERAL PARA QUE FUNCIONE CON TODOS)
function BinarySearchID(itemID, list) {
  if (list.length == 0) {
    return -1;
  }
  let pivot = Math.floor(list.length / 2);
  if (list[pivot]._id == itemID) {
    return pivot;
  } else if (list[pivot]._id > itemID) {
    return BinarySearchID(itemID, list.slice(pivot + 1, list.length));
  } else {
    return BinarySearchID(itemID, list.slice(0, pivot));
  }
}

// Function that search by the name of the champion, items and runes (HAY QUE  HACERLO GENERAL PARA QUE FUNCIONE PARA TODAS LAS COSAS)
function BinarySearchName(itemName, list) {
  if (list.length == 0) {
    return -1;
  }
  let pivot = Math.floor(list.length / 2);
  if (list[pivot].item == itemName) {
    return pivot;
  } else if (list[pivot].item > itemName) { // this might blow up because it's a string comparison
    return BinarySearchName(itemName, list.slice(pivot + 1, list.length));
  } else {
    return BinarySearchName(itemName, list.slice(0, pivot));
  }
}

//Aqui va la funcion que traduce de codigo de barras a texto
function BuildToStrings(build) { 
  result = [];
  // Code extraction
  // At the database we have the following amounts per category: champions: 169, items: 111, runes: 61, at the time of writing this (01-09-2025)
  // Codes follow the following method:
  // 1st position: Champion ID (3 digits)
  // 3nd to 21th position: Item IDs (6 items, 3 digits each)
  // 22th to 34th position: Rune IDs (6 runes, 2 digits each)
  // Total length: 34 digits, starting of course on position 0
  // Champion could be within the first 10, and because numerically you can't save 001, you'd have to pad the zeroes to the left to see which champ it is
  // Therefore the build length is within those values
  if (build.length != 33) {
    console.log("Build length is incorrect, something went wrong. Length is " + build.length);
    return "";
  }

  // Champ section
  // Get rid of the pad
  let nonZeroSpot = -1;
  for (let i = 0; i < 3; ++i)
  {
    if (build[i] != '0') {
      nonZeroSpot = i;
      break; 
    }
  }
  if (nonZeroSpot == -1) {
    console.log("Champion part of the build was wrong");
    return;
  }
  let champIndex = build.slice(nonZeroSpot, 3);
  // console.log("B2S: Non Zero Spot is  " + nonZeroSpot);
  result.push(championsList[champIndex].champion);

  // Item part
  for (let i = 3; i < 21; i += 3) {
      let nonZeroSpot = -1;
    for (let j = i; j < i+3; ++j)
    {
      // console.log("Checking value " + build[j] + " at index " + j);
      if (build[j] != '0') {
        // console.log("That one wasn't a zero, saving the index as nonZeroSpot");
        nonZeroSpot = j;
        break; 
      }
    }
    if (nonZeroSpot == -1) {
      console.log("Item part of the build was wrong at index " + j);
      return;
    }
    let itemIndex = Number(build.slice(nonZeroSpot, i+3));
    // console.log("B2S: itemIndex is  |" + itemIndex + "|");
    let itemName = itemList[itemIndex].item;
    result.push(itemName);
  }
  
  // Rune part
  for (let i = 21; i < build.length-1; i+=2)
  {
    for (let j = i; j < i+2; ++j)
    {
      // console.log("Checking value " + build[j] + " at index " + j);
      if (build[j] != '0') {
        // console.log("That one wasn't a zero, saving the index as nonZeroSpot");
        nonZeroSpot = j;
        break; 
      }
    }
    if (nonZeroSpot == -1) {
      console.log("Rune part of the build was wrong at index " + j);
      return;
    }
    let runeIndex = Number(build.slice(nonZeroSpot, i+2));
    // console.log("B2S: itemIndex is  |" + runeIndex + "|");
    result.push(runesList[runeIndex].rune);
  }

  return result;
}

let champList = ["Aphelios", "Ashe", "Caitlyn", "Draven", "Ezreal", "Jhin", "Jinx", "Kai'Sa", "Kalista", "Karthus", "Kog'Maw", "Lucian", "Miss Fortune", "Nilah", "Samira", "Senna", "Seraphine", "Sivir", "Smolder", "Tristana", "Twisted Fate", "Twitch", "Varus", "Vayne", "Xayah", "Yasuo", "Zeri", "Ziggs", "Alistar", "Amumu", "Anivia", "Annie", "Bard", "Blitzcrank", "Brand", "Braum", "Camille", "Fiddlesticks", "Galio", "Heimerdinger", "Ivern", "Janna", "Karma", "Leona", "Lulu", "Lux", "Malphite", "Maokai", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Pyke", "Rakan", "Rell", "Renata Glasc", "Shaco", "Shen", "Sona", "Soraka", "Swain", "Tahm Kench", "Taric", "Teemo", "Thresh", "Veigar", "Vel'Koz", "Xerath", "Yuumi", "Zac", "Zilean", "Zyra", "Ahri", "Akali", "Aurelion Sol", "Aurora", "Azir", "Cassiopeia", "Corki", "Diana", "Ekko", "Fizz", "Gragas", "Hwei", "Irelia", "Jayce", "Kassadin", "Katarina", "LeBlanc", "Lissandra", "Naafiri", "Orianna", "Qiyana", "Rumble", "Ryze", "Sylas", "Syndra", "Taliyah", "Talon", "Vex", "Viktor", "Vladimir", "Yone", "Zed", "Zoe", "Bel'Veth", "Briar", "Elise", "Evelynn", "Graves", "Hecarim", "Ivern", "Jarvan IV", "Jax", "Kayn", "Kha'Zix", "Kindred", "Lee Sin", "Lillia", "Master Yi", "Nidalee", "Nocturne", "Nunu & Willump", "Poppy", "Rammus", "Rek'Sai", "Rengar", "Sejuani", "Shyvana", "Skarner", "Trundle", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "Wukong", "Xin Zhao", "Aatrox", "Cho'Gath", "Darius", "Dr. Mundo", "Fiora", "Gangplank", "Garen", "Gnar", "Gwen", "Illaoi", "K'Sante", "Kayle", "Kennen", "Kled", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Quinn", "Renekton", "Riven", "Sett", "Singed", "Sion", "Tryndamere", "Urgot", "Yorick", "Malzahar", "Akshan"];
let itemList = ["Berserker's Greaves", 'Boots of Swiftness', 'Ionian Boots of Lucidity', "Mercury's Treads", 'Plated Steelcaps',  "Sorcerer's Shoes",  'Abyssal Mask',  "Bloodletter's Curse",  'Cryptbloom', 'Abyssal Mask', 'Terminus', 'Void Staff',  'Black Cleaver', "Lord Dominik's Regards", 'Mortal Reminder', "Serylda's Grudge",  "Banshee's Veil", 'Edge of Night', "Dead Man's Plate", 'Trailblazer', 'Hollow Radiance',  'Sunfire Aegis', 'Iceborn Gauntlet', 'Lich Bane', 'Trinity Force', 'Immortal Shieldbow', 'Maw of Malmortius', "Sterak's Gage",  "Seraph's Embrace", 'Muramana', 'Fimbulwinter', 'Profane Hydra', 'Ravenous Hydra',  'Titanic Hydra',  'Stridebreaker', 'Celestial Opposition', 'Bloodsong', 'Dream Maker', 'Solstice Sleigh', "Zaz'Zak's Realmspike", 'Ardent Censer', 'Axiom Arc', 'Blackfire Torch', 'Blade of the Ruined King', 'Bloodthirster', 'Chempunk Chainsword',  'Cosmic Drive', 'Dawncore', "Death's Dance", 'Echoes of Helia',  'Eclipse', 'Essence Reaver', 'Experimental Hexplate', 'Force of Nature', 'Frozen Heart', 'Guardian Angel', "Guinsoo's Rageblade", 'Heartsteel', 'Hextech Rocketbelt', 'Horizon Focus', 'Hubris', 'Hullbreaker', 'Imperial Mandate', 'Infinity Edge', "Jak'Sho, The Protean", 'Kaenic Rookern', "Knight's Vow", 'Kraken Slayer', "Liandry's Torment", 'Locket of the Iron Solari', "Luden's Companion", 'Malignance', "Mejai's Soulstealer", 'Mercurial Scimitar', "Mikael's Blessing", 'Moonstone Renewer', 'Morellonomicon', "Nashor's Tooth", 'Navori Flickerblade', 'Opportunity', "Overlord's Bloodmail", 'Phantom Dancer', "Rabadon's Deathcap", "Randuin's Omen", 'Rapid Firecannon', 'Redemption', 'Riftmaker', 'Rod of Ages', "Runaan's Hurricane", "Rylai's Crystal Scepter", "Serpent's Fang", 'Shadowflame', "Shurelya's Battlesong", 'Spear of Shojin', 'Spirit Visage', 'Staff of Flowing Water', 'Statikk Shiv', 'Stormsurge', 'Sundered Sky', 'The Collector', 'Thornmail', 'Umbral Glaive', 'Unending Despair', 'Vigilant Wardstone', 'Voltaic Cyclosword', "Warmog's Armor", "Wit's End", "Youmuu's Ghostblade", 'Yun Tal Wildarrows', "Zeke's Convergence", "Zhonya's Hourglass" ];
let runeList = [ 'Press the Attack', 'Lethal Tempo', 'Fleet Footwork', 'Conqueror', 'Absorb Life', 'Triumph', 'Presence of Mind', 'Alacrity', 'Haste', 'Bloodline', 'Coup de Grace', 'Cut Down', 'Last Stand', 'Electrocute', 'Dark Harvest', 'Hail of Blades', 'Cheap Shot', 'Taste of Blood', 'Sudden Impact', 'Sixth Sense', 'Grisly Mementos', 'Deep Ward', 'Treasure Hunter', 'Relentless Hunter', 'Ultimate Hunter', 'Summon Aery', 'Arcane Comet', 'Phase Rush', 'Axiom Arcanist', 'Manaflow Band', 'Nimbus Cloak', 'Transcendence', 'Celerity', 'Absolute Focus', 'Scorch', 'Waterwalking', 'Gathering Storm', 'Grasp of the Undying', 'Aftershock', 'Guardian', 'Demolish', 'Font of Life', 'Shield Bash', 'Conditioning', 'Second Wind', 'Bone Plating', 'Overgrowth', 'Revitalize', 'Unflinching', 'Glacial Augment', 'Unsealed Spellbook', 'First Strike', 'Hextech Flashtraption', 'Magical Footwear', 'Cash Back', 'Triple Tonic', 'Time Warp Tonic', 'Biscuit Delivery', 'Cosmic Insight', 'Approach Velocity', 'Jack of All Trades'];

// Function that convert the strings into code
function StringsToBuild(strings) { // STRINGS IS THE BUILD IN TEXT, THE WHOLE THING (data variable)
  console.log("Champion name is " + strings[0]);
  const champIdx = champList.findIndex(c => c === strings[0]);
  console.log("The champion is " + champIdx);
  if (champIdx === -1) {
    // console.log("S2B: Champion not found: " + strings[0]);
    return "999";
  }
  let result = String(champIdx).padStart(3, "0");
  // console.log("The result has the champion code " + result);
  // console.log("S2B: Champion " + strings[0] + " -> index " + champIdx + " -> padded " + result);

  // items
  for (let i = 1; i < 7; i++) {
    const buildItem = strings[i];
    const j = itemList.findIndex(it => it === buildItem);
    if (j === -1) {
      console.log("S2B: Item not found: " + itemName);
      result += "999";
    } else {
      let padded = String(j).padStart(3, "0");
      console.log("S2B: Found item " + buildItem + " at position " + j);
      // console.log("S2B: Addition before padding is " + j);
      // console.log("S2B: Addition after padding is " + padded);
      result += padded;
      // console.log("S2B: Result after adding item is " + result);
    }
  } 
  // console.log("S2B: After items result is " + result);
  
  for (let i = 7; i < 13; i++) {
    const buildRune = strings[i];
    const j = runeList.findIndex(ru => ru === buildRune);
    if (j === -1) {
      console.log("S2B: Rune not found: " + buildRune);
      result += "999";
    } else {
      let padded = String(j).padStart(2, "0");
      console.log("S2B: Found rune " + buildRune + " at position " + j);
      // console.log("S2B: Addition before padding is " + j);
      // console.log("S2B: Addition after padding is " + padded);
      result += padded;
      // console.log("S2B: Result after adding item is " + result);
    }
  } 
  return result;
}

/**
 * 
 * SI PUEDE SER MÁS DE UNA COSA NO ES UN ARRAY SINO UN STRING CON LAS COSAS SEPARADAS POR ', ' (ESPACIO INCLUIDO)
 * 
 * CHAMPIONS ----------------------------
 * _id : NUMBER (HEXA)
 * champion: STRING (ES EL NOMBRE)
 * position: STRING (posiciones divididas por ', ')
 * damage_type: STRING (PHYS/MAGIC/MIX)
 * role: STRING (roles divididos por ', ')
 * resource: STRING (mana, energía...)
 * 
 * ITEMS -----------------------------------
 * _id: NUMBER (HEXA)
 * item: STRING (nombre)
 * limitations: STRING (si tienes un objeto de esta lista no puedes tener este objeto/o un tipo de objeto)
 * common_role: STRING
 * stats_given: STRING
 * ability_type: STRING (para que rol es la habilidad del item)
 * 
 * RUNES -----------------------------------
 * _id: NUMBER (HEXA)
 * rune: STRING (nombre)
 * path: STRING (inspiration, domination...)
 * slot: STRING (en qué fila va)
 * benefits: STRING
 * common_role: STRING
 * 
 */

// Funcion que añade los puntos a la build
function ScoreGiver(champ, items, runes) {
  //No son arrays, son objetos
  let championName = champ;
  let runeSection = runes;
  let itemSection = items;

  //Here we are going to store the final result of the scores
  let runeScore = 0;
  let itemScore = 0;

  const roleRuneRelationship = {
    Resolve:["TANK", "Bruiser", "Support"],
    Precision:["TANK", "Bruiser", "DPS", "Assassin"],
    Domination:["Bruiser", "MAGE", "Assassin"],
    Sorcery:["DPS", "MAGE", "Support"],
    Inspiration:["TANK", "Bruiser", "MAGE", "DPS", "Assassin", "Support"]
  };

  const roleItemStatRelationship = {
    TANK:["Health", "Magic Resistance", "Health regen.", "Tenacity", "Ability haste", "Movement speed"],
    Bruiser:["Health", "Attack damage", "Lifesteal", "Tenacity", "Ability haste", "Movement speed"],
    DPS:["Attack damage", "Attack speed", "Critical strike chance", "Armor pen.", "Lifesteal", "Ability haste", "Movement speed"],
    MAGE:["Ability power", "Mana", "Magic pen.", "Mana regen.", "Ability haste", "Movement speed"],
    Assassin:["Lethality", "Attack damage", "Critical strike chance", "Ability haste", "Movement speed"],
    Support:["Heal & shield power", "Health", "Magic Resistance", "Armor", "Tenacity", "Health regen.", "Mana", "Mana regen.", "Attack damage", "Ability power", "Armor pen.", "Magic pen.", "Attack speed", "Ability haste", "Movement speed"]
  };

  //Incredible long ass loop for the runes
  let champRoles;
  for (let i = 0; i < runeSection.length; ++i)
  {
    let currentRuneScore = 0;
    let runePath = runeSection[i].path; // this can be many paths separated by ', ' (AGAIN)
    let dividedPaths = runePath.split(", "); // return everything that is not ', ' in an array
    // console.log("SG: dividedPaths length is " + dividedPaths.length);
    for (let j = 0; j < dividedPaths.length; ++j)
    {
      let roles = roleRuneRelationship[dividedPaths[j]];
      // console.log("SG: roles length is " + roles.length);
      for (let k = 0; k < roles.length; ++k)
      {
        champRoles = champ.role.split(", ");
        // console.log("SG: champRoles length is " +  champRoles.length) ;
        for (let l = 0; l < champRoles.length; ++l)
        {
          if (champRoles[l] == roles[k])
          {
            // console.log("5-------SG: Within rune iteration " + runeSection[i].rune + ", within rune path " + dividedPaths[j] + ", the rune role " + roles[k] + " is the same as champion role " + champRoles[l]);
            currentRuneScore += 5;
            break;
            
          } if (l == champRoles.length -1) 
          {
            // console.log("1-------SG: Within rune iteration " + runeSection[i].rune + ", within rune path " + dividedPaths[j] + ", the rune role " + roles[k] + " is NOT the same as champion role " + champRoles[l]);
            currentRuneScore += 1;
          }
        }
      }
      // console.log("==================================");
    }
    let commonRoles = runeSection[i].common_role.split(", ");
    for (let j = 0; j < commonRoles.length; ++j)
    {
        let champRoles = champ.role.split(", ");
        for (let k = 0; k < champRoles.length; ++k)
        {
          if (champRoles[k] == commonRoles[j])
          {
            // console.log("10-------SG: Within rune iteration " + runeSection[i].rune + ", the common roles " + commonRoles[j] + " is in champ role " + champRoles[k]);
            currentRuneScore += 10;
            break;
          } if ( k == champRoles.length - 1) 
          {
            // console.log("1-------SG: Within rune iteration " + runeSection[i].rune + ", the common roles " + commonRoles[j] + " is NOT in champ role " + champRoles[k]);
            currentRuneScore += 1;
          }
        }
    }
    // console.log("---------------------------------------------");
    runeScore += currentRuneScore;
  }
  console.log("RuneSection score is " + runeScore);

//Yet another long ass loop for the fucking items
for(let i = 0; i < itemSection.length; ++i){
  let currentItemScore = 0;
  let commonRoles = itemSection[i].common_role.split(", ");
  for(let j = 0; j < commonRoles.length; ++j){
    let champRoles = champ.role.split(", ");
    for(let k = 0; k < champRoles.length; ++k){
      if(champRoles[k] == commonRoles[j]){
        // console.log("10pts----- Within the item iteration " + itemSection[i].item + " the common roles " + commonRoles[j] + " is in the champ role " + champRoles[k]);
        currentItemScore += 10;
        break;
      } 
      if (k == champRoles.length -1){
        // console.log("1pt----- Within the item iteration " + itemSection[i].item + " the common roles " + commonRoles[j] + " is NOT in the champ role " + champRoles[k]);
        currentItemScore += 1;
      }
    }
  }
  // console.log("==================================");
  let abilityType = itemSection[i].ability_type.split(", ");
  for(let j = 0; j < abilityType.length; ++j){
    let champRoles = champ.role.split(", ");
    for(let k = 0; k < champRoles.length; ++k){
      if (champRoles[k] == abilityType[j]){
        // console.log("5 pts----- Within the item iteration " + itemSection[i].item + " the ability type " + abilityType[j] + " is in the champ role " + champRoles[k]);
        currentItemScore += 5;
        break;
      } 
      if ( k == champRoles.length -1){
        // console.log("1pt----- Within the item iteration " + itemSection[i].item + " the ability type " + abilityType[j] + " is NOT in the champ role " + champRoles[k]);
        currentItemScore += 1;
      }
    }
  }
  // console.log("-------------------------------------");
  let itemLimitation = itemSection[i].limitations;
  if(itemLimitation == "Boots"){
    // console.log("The item has the limitation " + itemLimitation);
    currentItemScore += 20;      
  }
  // console.log("==================================");
  // console.log("Here starts the problematic loop");
  // console.log("Inside common_roles are the roles: " + commonRoles);
  for (let j = 0; j < commonRoles.length; j++){
    // console.log("We entered the hell loop");
    let champRoles = champ.role.split(", ");
    // console.log("The champion role is " + champRoles);
    for (let k = 0; k < champRoles.length; k++){
      if(champRoles[k] == commonRoles[j]){
        let stats = roleItemStatRelationship[champRoles[k]];
        // console.log("The stats are " + stats);
        // for( let l = 0; l < itemSection.length; l++){
          let item = itemSection[i];
          // console.log("The item is " + item.item);
          let itemStats = item.stats_given.split(", ");
          // console.log("The stats of the item are " + itemStats);
          let addedExtra = false;
          let someStatMatched = false;
          for(let m = 0; m < stats.length; m++){
            // if(stats[m] == itemStats[l]){
            // }
            if (itemStats.includes(stats[m])){
              // console.log("5 pts--------- The common role of the object is " + commonRoles[j] + " , the champion role is " + champRoles[k] + " the relationship stats are " + ArrayToString(stats) + " are equal to the item stats " + itemStats);
              currentItemScore +=5;
              someStatMatched = true;
              if (itemStats.length < 3 && !addedExtra) {
                currentItemScore += 15;
                // console.log("15 pts-------- Item has mental issues so we give it extra");
                addedExtra = true;
              } else {
                // console.log("Item " + item.item + " itemStats length is " + itemStats.length + " and addedExtra is " + addedExtra + ", so it in full cognitive function"); 
              }
            }
            if(m == stats.length -1 && !someStatMatched){
              // console.log("1 pts--------- The common role of the object is " + commonRoles[j] + " , the champion role is " + champRoles[k] + " the relationship stats are " + ArrayToString(stats) + " are NOT equal to the item stats " + itemStats);
              currentItemScore +=1;
            }
          }
        // }
      } 
    }
  }
  itemScore += currentItemScore;
  console.log("The final item score is " + itemScore);
}

  return [itemScore, runeScore]; //👍
}

//Aqui va todo el codigo para calcular las puntuaciones
function ScoreCalculator(referenceBuild, playerBuild)
{
  //Weight of the Items
  const itemWeight = 0.75;
  //Weight of the runes
  const runeWeight = 0.25;

  //Minimum build score
  const minimumItemsScore = 30;
  const minimumRunesScore = 30;

  //Reference build score
  let referenceRunesScore = referenceBuild[1];
  let referenceItemsScore = referenceBuild[0];
  //Player build score
  let playerRunesScore = playerBuild[1];
  let playerItemsScore = playerBuild[0];


  //Calculate the minimum value possible
  const minimumScore = 1 + (itemWeight * minimumItemsScore) + (runeWeight * minimumRunesScore); 
  //Calculate the reference total value
  let referenceScore = 1 + (itemWeight * referenceItemsScore) + (runeWeight * referenceRunesScore);
  //Calculate the player total value
  let playerScore = 1 + (itemWeight * playerItemsScore) + (runeWeight * playerRunesScore);
  //Calculate the normalized result
  let normalizedResult = (playerScore - minimumScore) / (referenceScore - minimumScore);

  // console.log("the normalizedResult is " + normalizedResult * 100);
  return normalizedResult;
    //Llamada para que devuelva el resultado a la página web (KIWI MALE SABE, KIWI MALE ES MUY LISTO)
}

// Helper function to debug arrays
function ArrayToString(array)
{
  if (typeof array != "object")
  {
    console.log("Param is not a damn array, it's a " + typeof array);
    return "";
  }
  if (array.length == 0){
    console.log("A2S: Array size is 0");
    return "";
  }
  let result = "[ ";
  for (let i = 0; i < array.length; ++i) {
    result += String(array[i]) + " |";
  }
  result = result.substring(0, result.length - 1);
  return result.concat(']');
}

//Aqui se devuelve de alguna forma el resultado final de la build a la pagina web de nuevo (kiwi male sabe)
function main()
{
  // let build = ["Vayne", "Berserker's Greaves", "Blade of The Ruined King", "Guinsoo's Rageblade", "Terminus", "Experimental Hexplate", "Wit's End", "Lethal Tempo", "Triumph", "Alacrity", "Coup de Grace", "Conditionig", "Overgrowth"];
  // let code = StringsToBuild(PlayerBuildImporter());
  // // ScoreCalculator(ScoreGiver(champ, items, runes), ScoreGiver(champ, items, runes));
  // ScoreGiver()
  // run(); //👍
  // console.log("Build code is: " + code);
  // let buildAgain = BuildToStrings(code);
  // console.log("Build in strings is: " + ArrayToString(buildAgain));
}
// run();