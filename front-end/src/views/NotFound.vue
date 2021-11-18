<template>
  <div class="wrapper">
    <div class="content">
      <div class="text">
        <h1 id="main-text">404 error page not found</h1>
        <h4 id="sub-text">
          Looks like this page cannot be found. Maybe it was moved.
        </h4>
      </div>
      <div class="back-btn">
        <v-btn id="back-btn">BACK TO HOME</v-btn>
      </div>
    </div>
    <div class="graphics">
      <img
        id="duck"
        :src="require('@/assets/redesign-assets/404-error-page/404-duck-better.svg')"
      />
      <img
        id="question-marks"
        :src="
          require('@/assets/redesign-assets/404-error-page/question-marks.svg')
        "
      />
      <img
        id="water"
        :src="require('@/assets/redesign-assets/404-error-page/water.svg')"
      />
    </div>
    <!--
        <center>
      <h1>Not Found!</h1>
      <p>
        <a href="/">Go home?</a>
      </p>
    </center>
    -->
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
/* Content */
#main-text {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  width: 1392px;
  height: 420px;
  left: 309px;
  top: 490px;
}
#sub-text {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  width: 1349px;
  height: 260px;
  left: 309px;
  top: 940px;
}
#back-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  width: 1008px;
  height: 242px;
  left: 309px;
  top: 1427px;
}

/* Graphics */
#duck {
  position: absolute;
  width: 700.15px;
  height: 1031.89px;
  left: 2681.47px;
  top: 1682.72px;
}
#question-marks {
  position: absolute;
  width: 528.87px;
  height: 499.77px;
  left: 2027px;
  top: 580px;
}
#water {
  position: absolute;
  width: 5044.01px;
  height: 4783.57px;
  left: 465.99px;
  top: -1185.28px;
}

/*center {
  margin: 15vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}*/
</style>