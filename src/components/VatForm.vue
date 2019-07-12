<template>
  <div class>
    <b-input-group id="input-group-vat" class="shadow-sm bg-input rounded">
      <b-input-group-prepend>
        <b-button
          @click="countryDropDown = !countryDropDown"
          v-b-tooltip.hover
          title="Country"
          variant="link text-white"
          style="width: 3rem; text-decoration: none"
          class="country-button border-0 hover-scale"
        >{{selectedCountry}}</b-button>
        <transition name="fade">
          <div v-if="countryDropDown" class="rounded shadow-sm country-dropdown">
            <b-list-group flush>
              <b-list-group-item
                v-for="country in countryOptions"
                :key="country.value"
                button
                :class="selectedCountry == country.value ? 'dropdown-active' : ''"
                @click="selectedCountry = country.value; countryDropDown = false"
              >{{country.text}}</b-list-group-item>
            </b-list-group>
          </div>
        </transition>
      </b-input-group-prepend>
      <b-form-input
        class="border-0"
        id="input-vat"
        placeholder="Please enter a VAT identification number to look up…"
        style="height: 3rem;"
        v-model="vatInput"
      ></b-form-input>
      <b-input-group-append>
        <b-button
          :disabled="loading"
          variant="link text-white"
          class="search-button hover-scale border-0"
          size="md"
          style="width: 3rem"
          @click="fetchVatInfo"
        >
          <font-awesome-icon v-if="!loading" icon="search"></font-awesome-icon>
          <b-spinner v-else small></b-spinner>
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "VatForm",
  props: {},
  data() {
    return {
      countryOptions: [
        { value: "AT", text: "Austria" },
        { value: "BE", text: "Belgium" },
        { value: "BG", text: "Bulgaria" },
        { value: "HR", text: "Croatia" },
        { value: "CY", text: "Cyprus" },
        { value: "CZ", text: "Czech Republic" },
        { value: "DK", text: "Denmark" },
        { value: "EE", text: "Estonia" },
        { value: "FI", text: "Finland" },
        { value: "FR", text: "France" },
        { value: "DE", text: "Germany" },
        { value: "GR", text: "Greece" },
        { value: "HU", text: "Hungary" },
        { value: "IE", text: "Ireland" },
        { value: "IT", text: "Italy" },
        { value: "LV", text: "Latvia" },
        { value: "LT", text: "Lithuania" },
        { value: "LU", text: "Luxembourg" },
        { value: "MT", text: "Malta" },
        { value: "NL", text: "Netherlands" },
        { value: "PT", text: "Portugal" },
        { value: "RO", text: "Romania" },
        { value: "SK", text: "Slovakia" },
        { value: "SI", text: "Slovenia" },
        { value: "ES", text: "Spain" },
        { value: "SE", text: "Sweden" },
        { value: "GB", text: "United Kingdom and Isle of Man" }
      ],
      selectedCountry: "EE",
      vatInput: "",
      loading: false,
      countryDropDown: false,
      validInput: false
    };
  },
  methods: {
    fetchVatInfo() {
      if (
        this.vatInput.length >= 7 &&
        this.vatInput.length <= 12 &&
        this.isAlphaNumeric(this.vatInput)
      ) {
        this.loading = true;
        this.$http({
          method: "get",
          url:
            this.$store.getters.vatApiUrl + this.selectedCountry + this.vatInput
        })
          .then(resp => {
            this.$emit("vatInfoFetched", resp.data);
            this.loading = false;
          })
          .catch(err => {
            this.$emit("errored", true);
            this.loading = false;
          });
      } else {
        this.makeToast();
      }
    },
    makeToast() {
      this.$bvToast.toast(
        "VAT identification number must be between 7 and 12 charactes in length, and can consist of only numbers and alphabetic characters.",
        {
          title: "Invalid input",
          variant: "danger",
          toaster: "b-toaster-top-center",
          autoHideDelay: 2000,
          appendToast: false
        }
      );
    },
    isAlphaNumeric(str) {
      return str.match(/^[a-z0-9]+$/i) !== null;
    }
  }
};
</script>

<style lang="less" scoped>
.dropdown-active {
  background-color: #96a1a7;
  background-image: linear-gradient(90deg, #96a1a7 0%, #6e7b82 100%);

  color: white;
}

.country-button {
  background-color: #96a1a7;
  background-image: linear-gradient(90deg, #96a1a7 0%, #6e7b82 100%);
}

.hover-scale:hover {
  transform: scale(1.01);
}

.hover-scale {
  transition: transform 250ms;
}

.search-button {
  background-color: #3b3337;
  background-image: linear-gradient(90deg, #3b3337 0%, #2b1e21 100%);
}

.country-dropdown {
  height: 20rem;
  width: 15rem;
  top: 3.01rem;
  position: absolute;
  overflow-y: auto;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 350ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

