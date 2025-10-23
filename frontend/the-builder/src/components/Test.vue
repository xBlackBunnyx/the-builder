<template>
  <button @click="onClick">Send message</button>
</template>


<script>

function onClick()
{
  this.$root.$emit("message", "Hi!");
}

</script>