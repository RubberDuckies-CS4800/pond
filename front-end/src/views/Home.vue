<template>
<div>
  <div id="stars"></div>
  <div id="stars2"></div>
  <div id="stars3"></div>
  <img class="company_logo" src="https://raw.githubusercontent.com/cs480-projects/cs480-projects.github.io/master/teams-fall2021/rubber-duckies/pond-final.png" alt="Company Logo">
  <v-container 
    flex 
    align="center"
    justify="center">
    <v-card 
      flex
      class="meeting_input mx-auto px-auto"
      outlined
  >
    <v-text-field
            placeholder="Meeting Code"
            solo
    ></v-text-field>
    <v-card-actions class="submit">
      <v-btn
        outlined
        rounded
        text
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>

  </v-container>
</div>
</template>

<script>
// @ is an alias to /src

export default {

}
</script>
<style scoped>

.submit {
  justify-content: center;
}
.meeting_input {
  display: inline-block;
  width: 15%;
}

.company_logo {
  width: 30%;
}

</style>
