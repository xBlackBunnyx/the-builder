<template>
    <!-- We can add here all the Linkedin and GitHub information -->
  <v-footer> 
    <div style="height: 100%; justify-content: right; "
    class="text-secondary">
        <h3 class="single-line">  Contact us!  </h3>
    </div>
  
    <!-- Hay que hacer que este full centrado siempre-->
      <!-- también que el texto del centro no se corte fijando el tamaño y poner los enlaces-->

    <div>
     <v-container class="pt-15">
      <v-row
        align="center"
      >
        <v-col>
          <v-sheet>
            <v-img
            :width="200"
              src = "../../assets/bard-behind-no-bg.png"
              >
            </v-img>
          </v-sheet>
        </v-col>

         <v-col>
          <v-sheet class="single-line">
            <v-text-field variant="plain">
              <v-icon icon="fa-github" class="text-secondary" size="small"></v-icon>
              <p class=""> The builder </p>
            </v-text-field>
            <v-text-field variant="plain">
              <v-icon icon="fa-linkedin" class="text-secondary" size="small"></v-icon>
              <p> Juan Guillermo Zafra Fernández</p>
            </v-text-field>
            <v-text-field variant="plain">
              <v-icon icon="fa-linkedin" class="text-secondary" size="small"></v-icon>
              <p> Lorena Martín Dorta</p>
            </v-text-field>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet>
            <v-img
            :width="200"
            src = "../../assets/bard-front-no-bg.png"
            ></v-img>
          </v-sheet>
        </v-col>

         <v-col>
          <v-sheet>
            <v-img
            :width="200"
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