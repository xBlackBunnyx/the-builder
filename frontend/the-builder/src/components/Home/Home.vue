<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col>
                    <h1 class="text-secondary">  The Builder</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <h2>Test your build abilities and create a build for your favourite champion!</h2>
                </v-col>
                <v-col offset="4">
                    <button-daily></button-daily>
                </v-col>
            </v-row>
            <v-row 
            no-gutters>
                <v-col offset="3">
                    <search-bar></search-bar>
                </v-col>
            </v-row>
        </v-container>

        <ContactUs></ContactUs>
 </v-app>
</template>

<script setup>
    import ContactUs from './ContactUs.vue';
    import SearchBar from '../SearchBar.vue';

</script>
