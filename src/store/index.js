import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const debug = true
const api = debug ? 'http://127.0.0.1:5000' : 'https://xkb.thebbg.top'
var state = {
    page: null,
    api: api,
    debug: debug,
    user: {
        username: '',
        password: '',
        isAdmin: false
    }
}

var mutations = {}

export default new Vuex.Store({
    state,
    mutations
})

