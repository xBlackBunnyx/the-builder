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

          <!-- League of Legends Logo -->
          <v-col cols="auto" class="d-flex justify-center" offset="2">
            <v-sheet>
              <v-img
                cover
                :width="400"
                src = "../../assets/LoL_Logo_Rendered_LARGE.png"
              ></v-img>
            </v-sheet>
          </v-col>

        </v-row>
      </v-container>
    </div>
  </v-footer>
</template>

<style>
.single-line{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>