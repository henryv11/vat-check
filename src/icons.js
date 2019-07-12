import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faSearch, faQuestion, faClock, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck, faSearch, faQuestion, faClock, faBan )

Vue.component('font-awesome-icon', FontAwesomeIcon)
