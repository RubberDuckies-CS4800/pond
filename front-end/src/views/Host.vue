<template>
  <div class="host">
      <v-container>
          <h1>Meeting Code: {{ makeid() }} </h1>
      </v-container>
  </div>
</template>
<script>
export default {
    methods: {
         makeid() {
            var meetingCode = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 8; i++ ) {
                meetingCode += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return meetingCode;
        }
    }
}
</script>