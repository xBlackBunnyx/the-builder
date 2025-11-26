<template>
  <v-footer > 
    <div style="height: 100%; justify-content: right; " class="text-secondary">
        <h3 class="single-line">  Contact us!  </h3>
    </div>
    <div>
     <v-container class="d-flex justify-center">
        <v-row
          class="flex-nowrap"
          style="max-width: 1200px; width: 100%; flex-wrap: nowrap;"
          align="center"
          no-gutters
          justify="space-between"
        >

        <!-- Bard behind image -->
            <v-col 
            cols="auto"
            class="d-flex justify-center"
            offset="2">
              <v-sheet>
                  <v-img
                  cover
                  :width="250"
                    src = "../../assets/bard-behind-no-bg.png"
                  >
                </v-img>
              </v-sheet>
           </v-col>

           <!-- Linkedin & Github information -->
          <v-col cols="4" class="d-flex flex-column justify-center align-center text-center">
            <v-sheet color="transparent" elevation="0">
              <v-row class="align-center justify-center" no-gutters>
                  <v-col class="d-flex align-center"> 
                    <v-icon icon="fa-github" class="text-secondary me-2" size="small"></v-icon>
                    <a href="https://github.com/xBlackBunnyx/the-builder"> The builder</a>
                  </v-col>
              </v-row>
              <v-row class="align-center justify-center" no-gutters>
                  <v-col class="d-flex align-center"> 
                    <v-icon icon="fa-linkedin" class="text-secondary me-2" size="small"></v-icon>
                    <a href="https://www.linkedin.com/in/guillermozafrafernandez"> Juan Guillermo Zafra Fernández</a>
                  </v-col>
              </v-row>
              <v-row class="align-center justify-center" no-gutters>
                  <v-col class="d-flex align-center"> 
                    <v-icon icon="fa-linkedin" class="text-secondary me-2" size="small"></v-icon>
                    <a href="https://www.linkedin.com/in/lorenamartindorta"> Lorena Martín Dorta</a>
                  </v-col>
              </v-row>  
            </v-sheet>
          </v-col>

          <!-- Bard front image -->
          <v-col cols="auto" class="d-flex justify-center">
            <v-sheet>
              <v-img
              cover
              :width="250"
              src = "../../assets/bard-front-no-bg.png"
              ></v-img>
            </v-sheet>
          </v-col>

          <!-- Info Img -->
          <v-col cols="auto" class="d-flex justify-center" offset="2">
            <v-sheet>
              <div @click="dialog = true">
                <v-img
                  cover
                  :width="150"
                  src = "../../assets/Enemy_Missing_ping.png"
                ></v-img>
                <v-dialog v-model="dialog" width="auto">
                  <v-card
                  class="txtbg"
                  max-width="600"
                  title="Relevant Information"
                  >
                  <v-card-text>
                    <p>The Builder is a fan project created under Riot Games' Legal Jibber Jabber policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.</p>
                    <br>
                    <p>All the builds created by the player are going to be stored in order to use the score to train a machine learning model to predict an optimal build for the selected champion.</p>
                    <br>
                    <p>The Builder does not save any other user information or data.</p>
                  </v-card-text>
                    <template v-slot:actions>
                      <v-btn
                        class="ms-auto"
                        text="Okay"
                        @click="dialog = false"
                      ></v-btn>
                    </template>
                  </v-card>
                </v-dialog>
              </div>
            </v-sheet>
          </v-col>

        </v-row>
      </v-container>
    </div>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(false)

</script>

<style>
.single-line{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.txtbg{
      font-size: 16px;
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
      padding:  20px 32px;
      }
</style>