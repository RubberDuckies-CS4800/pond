
<template>
    <v-avatar id="avatar"
        size="90">
            MR
    </v-avatar>
</template>
<script>
export default {
    mounted() {
    //key codes
    var keys = {};
        keys.UP = 38;
        keys.LEFT = 37;
        keys.RIGHT = 39;
        keys.DOWN = 40;

    /// references to avatars's position and element
    var avatar = {
      x: 100,
      y: 100,
      speedMultiplier: 4,
      element: document.getElementById("avatar")
    };

    /// key detection
    document.body.onkeyup = 
    document.body.onkeydown = function(e){
      if (e.preventDefault) { 
        e.preventDefault();
      }
      else {
        e.returnValue = false; 
      }
      var kc = e.keyCode || e.which;
      keys[kc] = e.type == 'keydown';
    };

    /// movement update
    var moveAvatar = function(dx, dy){
      avatar.x += (dx||0) * avatar.speedMultiplier;
      avatar.y += (dy||0) * avatar.speedMultiplier;
      avatar.element.style.left = avatar.x + 'px';
      avatar.element.style.top = avatar.y + 'px';
    };

    /// character control
    var detectAvatarMovement = function(){
      if ( keys[keys.LEFT] ) {
        moveAvatar(-1, 0);
      }
      if ( keys[keys.RIGHT] ) {
        moveAvatar(1, 0);
      }
      if ( keys[keys.UP] ) {
        moveAvatar(0, -1);
      }
      if ( keys[keys.DOWN] ) {
        moveAvatar(0, 1);
      }
    };

    /// update current position on screen
    moveAvatar();

    /// game loop
    setInterval(function(){
      detectAvatarMovement();
    }, 1000/24);

    }
}
</script>
<style scoped>
#avatar {
    position: absolute;
    background: yellow;
}
</style>
