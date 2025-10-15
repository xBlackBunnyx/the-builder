<template>
    <!-- We can add here all the Linkedin and GitHub information -->
  <v-footer > 
    <div style="height: 100%; justify-content: right; "
    class="text-secondary">
        <h3 class="single-line">  Contact us!  </h3>
    </div>
  
    <!-- Hay que hacer que este full centrado siempre-->
      <!-- también que el texto del centro no se corte fijando el tamaño y poner los enlaces-->

    <div>
     <v-container class="d-flex justify-center">
      <v-row
        class="flex-nowrap"
        style="max-width: 1200px; width: 100%; flex-wrap: nowrap;"
        align="center"
        no-gutters
        justify="space-between"

      >
        <v-col 
        cols="auto"
        class="d-flex justify-center">
          <v-sheet>
            <v-img
            cover
            :width="200"
              src = "../../assets/bard-behind-no-bg.png"
              >
            </v-img>
          </v-sheet>
        </v-col>

         <v-col 
          cols="4"
         class="d-flex flex-column justify-center align-center text-center">
          <v-sheet color="transparent" elevation="0">
            <v-row class="align-center justify-center" no-gutters>
                <v-col class="d-flex align-center"> 
              <v-icon icon="fa-github" class="text-secondary me-2" size="small"></v-icon>
              <p> The builder </p>
              
                </v-col>
            </v-row>
            <v-row class="align-center justify-center" no-gutters>
                <v-col class="d-flex align-center"> 
              <v-icon icon="fa-linkedin" class="text-secondary me-2" size="small"></v-icon>
              <p> Juan Guillermo Zafra Fernández</p>
                </v-col>
            </v-row>
            <v-row class="align-center justify-center" no-gutters>
                <v-col class="d-flex align-center"> 
              <v-icon icon="fa-linkedin" class="text-secondary me-2" size="small"></v-icon>
              <p> Lorena Martín Dorta</p>
                </v-col>
            </v-row>  

          </v-sheet>
        </v-col>

        <v-col 
        cols="auto"
        class="d-flex justify-center">
          <v-sheet>
            <v-img
            cover
            :width="200"
            src = "../../assets/bard-front-no-bg.png"
            ></v-img>
          </v-sheet>
        </v-col>

         <v-col 
          cols="auto"
         class="d-flex justify-center">
          <v-sheet>
            <v-img
            cover
            :width="300"
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