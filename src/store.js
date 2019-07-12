import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vatApiUrl: "https://vat.erply.com/numbers?vatNumber=",
    countryLookupApi: "http://api.geonames.org/countryInfoJSON?&username=heviir&country="
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    vatApiUrl: state => state.vatApiUrl,
    countryLookupApi: state => state.countryLookupApi
  }
})
