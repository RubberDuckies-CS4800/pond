<template>
  <div class="graphics">
    <div class="waves">
      <img
        id="waves-top"
        :src="require('@/assets/redesign-assets/home-page/waves-top.svg')"
      />
      <img
        id="waves-bottom"
        :src="require('@/assets/redesign-assets/home-page/waves-bottom.svg')"
      />
    </div>
    <div class="fish">
      <img
        id="fish-1"
        :src="require('@/assets/redesign-assets/home-page/fish-1.svg')"
      />
      <img
        id="fish-2"
        :src="require('@/assets/redesign-assets/home-page/fish-2.svg')"
      />
      <img
        id="fish-3"
        :src="require('@/assets/redesign-assets/home-page/fish-3.svg')"
      />
      <img
        id="fish-4"
        :src="require('@/assets/redesign-assets/home-page/fish-4.svg')"
      />
      <img
        id="fish-5"
        :src="require('@/assets/redesign-assets/home-page/fish-5.svg')"
      />
    </div>
    <div class="ducks">
      <div class="ducks-top-right">
        <img
          id="normal-duck"
          :src="require('@/assets/redesign-assets/home-page/duck-2.svg')"
        />
      </div>
      <div class="ducks-bottom-left">
        <img
          id="mama-duck"
          :src="require('@/assets/redesign-assets/home-page/duck-2.svg')"
        />
        <img
          id="baby-duck-1"
          :src="require('@/assets/redesign-assets/home-page/duck-2.svg')"
        />
        <img
          id="baby-duck-2"
          :src="require('@/assets/redesign-assets/home-page/duck-2.svg')"
        />
      </div>
    </div>
    <div class="frog">
      <img
        id="frog"
        :src="require('@/assets/redesign-assets/home-page/frog.svg')"
      />
    </div>
    <div class="lilypads">
      <div class="lilypads-top-left">
        <img
          id="pad-tl-big"
          :src="require('@/assets/redesign-assets/home-page/pad-tl-big.svg')"
        />
        <img
          id="pad-tl-small"
          :src="require('@/assets/redesign-assets/home-page/pad-tl-small.svg')"
        />
      </div>
      <div class="lilypads-bottom-right">
        <img
          id="pad-br-big"
          :src="require('@/assets/redesign-assets/home-page/pad-br-big.svg')"
        />
        <img
          id="pad-br-medium"
          :src="require('@/assets/redesign-assets/home-page/pad-br-medium.svg')"
        />
        <img
          id="pad-br-small"
          :src="require('@/assets/redesign-assets/home-page/pad-br-small.svg')"
        />
      </div>
    </div>
    <div class="flowers">
      <img
        id="flower-br"
        :src="require('@/assets/redesign-assets/home-page/flower.svg')"
      />
      <img
        id="flower-tl"
        :src="require('@/assets/redesign-assets/home-page/flower-2.svg')"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Waves */
#waves-top {
  position: absolute;
  width: 3840px;
  height: 290px;
  left: 0px;
  top: 0px;

  transform: rotate(0deg);
}
#waves-bottom {
  position: absolute;
  width: 3840px;
  height: 478px;
  left: 0px;
  top: 1687px;

  transform: rotate(0deg);
}

/* Fish */
#fish-1 {
  position: absolute;
  width: 251.84px;
  height: 292.98px;
  left: 284px;
  top: 1022px;

  transform: rotate(0deg);
}
#fish-2 {
  position: absolute;
  width: 142.86px;
  height: 319.32px;
  left: 2542px;
  top: 271px;

  transform: rotate(0deg);
}
#fish-3 {
  position: absolute;
  width: 157.92px;
  height: 357.31px;
  left: 942px;
  top: 582px;

  transform: rotate(0deg);
}
#fish-4 {
  position: absolute;
  width: 308.65px;
  height: 214.91px;
  left: 3408px;
  top: 198px;

  transform: rotate(0deg);
}
#fish-5 {
  position: absolute;
  width: 309.06px;
  height: 302.56px;
  left: 2499.4px;
  top: 1574.89px;

  transform: rotate(90deg);
}

/* Ducks */
/* Ducks Top Right */
#normal-duck {
  position: absolute;
  width: 336.47px;
  height: 495.9px;
  left: 3014px;
  top: 503.21px;

  transform: rotate(-42.25deg);
}

/* Ducks Bottom Left */
#mama-duck {
  position: absolute;
  width: 416.39px;
  height: 613.68px;
  left: 1053.31px;
  top: 960px;

  transform: rotate(43.74deg);
}
#baby-duck-1 {
  position: absolute;
  width: 161.27px;
  height: 237.68px;
  left: 569.12px;
  top: 1488px;

  transform: rotate(37.93deg);
}
#baby-duck-2 {
  position: absolute;
  width: 161.27px;
  height: 237.68px;
  left: 427.72px;
  top: 1794px;

  transform: rotate(49.49deg);
}

/* Frog */
#frog {
  position: absolute;
  width: 322.62px;
  height: 440.35px;
  left: 3397px;
  top: 1727.4px;

  transform: rotate(-60deg);
}

/* Lilypads */
/* Lilypads Top Left */
#pad-tl-big {
  position: absolute;
  width: 638.27px;
  height: 664.08px;
  left: 490.58px;
  top: 1009.07px;

  transform: rotate(-135.8deg);
}
#pad-tl-small {
  position: absolute;
  width: 407.19px;
  height: 437.68px;
  left: 1043.91px;
  top: 484.22px;

  transform: rotate(177.36deg);
}

/* Lilypads Bottom Right */
#pad-br-big {
  position: absolute;
  width: 1119.9px;
  height: 1119.21px;
  left: 4206.03px;
  top: 1396.24px;

  transform: rotate(101.3deg);
}
#pad-br-medium {
  position: absolute;
  width: 565.21px;
  height: 564.86px;
  left: 2567.91px;
  top: 1594.82px;

  transform: rotate(0deg);
}
#pad-br-small {
  position: absolute;
  width: 398.25px;
  height: 400.42px;
  left: 3060.13px;
  top: 1386.22px;

  transform: rotate(-80.02deg);
}

/* Flowers */
#flower-br {
  position: absolute;
  width: 471px;
  height: 471px;
  left: 2744px;
  top: 1371px;

  transform: rotate(0deg);
}

#flower-tl {
  position: absolute;
  width: 355px;
  height: 374px;
  left: 457px;
  top: 151px;

  transform: rotate(0deg);
}
</style>