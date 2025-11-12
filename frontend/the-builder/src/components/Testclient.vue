<template>
    <v-container>
           <div>
        <v-btn @click="axiosPost">Post Test</v-btn>
    </div>    
    </v-container>

</template>

<script setup>
    import axios from 'axios';
    
    function axiosPost() {
        console.log("button clicked");
        axios.post('http://localhost:3000/submitMessage', {
        message: "sample message",
        }).then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }
</script>