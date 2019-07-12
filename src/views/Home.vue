<template>
  <div class="main" @mousemove="parallax($event)">
    <div class="bg-image" :style="translateProp"></div>
    <div class="bg-gradient"></div>
    <Navbar class="w-100" style="position: absolute; top: 0" />
    <div class="container d-flex h-25 form-container">
      <div class="my-auto w-100 p-4 rounded shadow bg-custom">
        <VatForm
          @vatInfoFetched="refreshVatInfo"
          @loading="setLoading"
          @errored="onError"
          @setShowVatInfo="setShowVatInfo"
        />
      </div>
    </div>

    <div class="vat-info container w-100">
      <transition name="slide" mode="out-in">
        <VatInfoDisplay
          v-if="showVatInfo"
          :vatInfo="vatInfo"
          :key="vatInfo.CountryCode"
          ref="vatInfoDisplay"
        />
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VatForm from "@/components/VatForm.vue";
import Navbar from "@/components/Navbar.vue";
import VatInfoDisplay from "@/components/VatInfoDisplay.vue";

export default {
  name: "Home",
  components: {
    VatForm,
    Navbar,
    VatInfoDisplay
  },
  data() {
    return {
      vatInfo: null,
      it: {
        x_angle: 0,
        y_angle: 0
      },
      loading: false,
      errored: false,
      showVatInfo: false
    };
  },
  methods: {
    refreshVatInfo(vatInfo) {
      this.vatInfo = vatInfo;
      this.showVatInfo = true;
    },
    onError() {
      this.errored = true;
    },
    setLoading(value) {
      this.loading = value;
    },
    setShowVatInfo(value) {
      this.showVatInfo = value;
    },
    parallax(event) {
      let screen_x = window.innerWidth / 2;
      let screen_y = window.innerHeight / 2;
      let mouse_x = event.pageX;
      let mouse_y = event.pageY;

      // vector from screen center to mouse position
      let vect = [screen_x - mouse_x, screen_y - mouse_y];
      let vect_len = Math.sqrt(vect[0] * vect[0] + vect[1] * vect[1]) * 3;

      this.it.x_angle = -(vect[0] / vect_len).toFixed(2);
      this.it.y_angle = -(vect[1] / vect_len).toFixed(2);
    },
    notifyCountryDropdown() {}
  },
  computed: {
    skewProp() {
      return {
        transform:
          "skew(" + this.it.x_angle + "deg, " + this.it.y_angle + "deg)"
      };
    },
    translateProp() {
      return {
        transform:
          "translate(" + this.it.x_angle + "px, " + this.it.y_angle + "px)"
      };
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  padding: -10rem;
  position: relative;
  overflow: hidden;
}

.bg-gradient {
  background-color: #d0d3d8;
  background-image: linear-gradient(0deg, #d0d3d8 0%, #dddddc 100%);

  height: 100%;
  width: 100%;
  position: absolute;
}

.bg-image {
  background-image: url("../assets/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  transition: transfrom 250ms;

  height: 30% + 10px;
  width: 100% + 10px;
  margin: -5px -5px;
}

.bg-custom {
  background-color: #dddddc;
  background-image: linear-gradient(0deg, #dddddc 0%, #ece7e3 100%);
}

.form-container {
  width: 100%;
  position: absolute;
  top: 6vh;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.vat-info {
  position: absolute;
  top: 35vh;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.slide-leave-active,
.slide-enter-active {
  transition: 500ms;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-150%, 0);
}
</style>

