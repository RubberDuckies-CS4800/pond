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
    <v-card-actions>
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
  <!-- <div id="stars"></div>
  <div id="stars2"></div>
  <div id="stars3"></div> -->
  <!-- <v-container fluid> -->
    <!-- <img class="company_logo" src="https://raw.githubusercontent.com/cs480-projects/cs480-projects.github.io/master/teams-fall2021/rubber-duckies/pond-final.png" alt="Company Logo"> -->
      <!-- <v-row align="auto">

      </v-row>
      <v-row align="auto">
        <v-card></v-card>
      </v-row> -->
<!-- </v-container> -->
</div>
  <!-- <body>

    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
      <div>
          <img src="https://raw.githubusercontent.com/cs480-projects/cs480-projects.github.io/master/teams-fall2021/rubber-duckies/pond-final.png" alt="Company Logo">
      </div>
  </body> -->
</template>

<script>
// @ is an alias to /src

export default {

}
</script>
<style scoped>

.meeting_input {
  display: inline-block;
  width: 40%;
}

.company_logo {
  width: 30%;
}

</style>
