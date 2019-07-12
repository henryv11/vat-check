<template>
  <div class="rounded shadow bg-vat-container">
    <div class="px-2 py-2">
      <transition name="fade" mode="out-in">
        <div
          v-if="loading"
          key="loading-header"
          class="d-flex w-100 justify-content-between align-items-center"
          style="height: 2rem"
        >
          <SkeletonBox :maxWidth="40" :minWidth="30" class="h2 m-0" />
          <SkeletonBox :maxWidth="30" :minWidth="20" />
        </div>
        <div
          v-else-if="vatInfo.Valid"
          key="valid-header"
          class="d-flex w-100 justify-content-between align-items-center"
          style="height: 2rem"
        >
          <p class="h2 m-0">
            {{vatInfo.CountryCode}}{{vatInfo.VATNumber}}
            <font-awesome-icon
              icon="check"
              class="text-success"
              v-b-tooltip.hover
              title="This is a valid VAT code"
            />
          </p>
          <p class="m-0">
            <font-awesome-icon icon="clock" class="mr-2" v-b-tooltip.hover title="Request date" />
            {{formatDate(vatInfo.RequestDate)}}
          </p>
        </div>
        <div
          v-else-if="!vatInfo.Valid"
          key="invalid-header"
          class="d-flex w-100 justify-content-between align-items-center"
          style="height: 2rem"
        >
          <p class="h2 m-0">
            {{vatInfo.CountryCode}}{{vatInfo.VATNumber}}
            <font-awesome-icon
              icon="ban"
              class="text-danger"
              v-b-tooltip.hover
              title="This is an invalid VAT code"
            />
          </p>
          <p class="m-0">
            <font-awesome-icon icon="clock" class="mr-2" v-b-tooltip.hover title="Request date" />
            {{formatDate(vatInfo.RequestDate)}}
          </p>
        </div>
      </transition>
    </div>
    <hr />
    <div class="p-2">
      <transition name="fade" mode="out-in">
        <div v-if="loading" key="loading-body" style="min-height: 7rem">
          <SkeletonBox :maxWidth="60" :minWidth="40" class="d-block h3" />
          <SkeletonBox :maxWidth="80" :minWidth="50" class="d-block h3" />
          <SkeletonBox :maxWidth="50" :minWidth="30" class="d-block h3" />
        </div>
        <div v-else-if="vatInfo.Valid" key="valid-body" style="min-height: 7rem">
          <p class="h4">Country: {{countryName}}</p>
          <p class="h4">Address: {{vatInfo.Address}}</p>
          <p class="h4">Name: {{vatInfo.Name}}</p>
        </div>

        <div v-else-if="!vatInfo.Valid" key="invalid-body" style="min-height: 7rem">
          <p class="h4">Country: {{countryName}}</p>
          <div class="d-flex w-100 justify-content-center align-items-center pt-3">
            <p class="h4 text-danger">This is not a valid VAT code!</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import SkeletonBox from "@/components/SkeletonBox.vue";

export default {
  name: "VatInfoDisplay",
  props: {
    vatInfo: {
      type: Object
    }
  },
  components: {
    SkeletonBox
  },
  data() {
    return {
      loading: true,
      countryName: ""
    };
  },
  mounted() {
    this.fetchCountryName();
  },
  methods: {
    fetchCountryName() {
      this.loading = true;
      this.$http({
        method: "get",
        url: this.$store.getters.countryLookupApi + this.vatInfo.CountryCode
      })
        .then(resp => {
          this.loading = false;
          this.countryName = resp.data.geonames[0].countryName;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    formatDate(dateString) {
      let str = dateString.substring(0, dateString.length - 6).split("-");
      let year = Number(str[0]);
      let month = Number(str[1]) - 1;
      let day = Number(str[2]);
      return new Date(year, month, day).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }
};
</script>

<style lang="less" scoped>
hr {
  height: 1px;
  margin: 0;
}
.min-height {
  min-height: 5rem;
}

.bg-vat-container {
  background-color: #dddddc;
  background-image: linear-gradient(0deg, #dddddc 0%, #ece7e3 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
