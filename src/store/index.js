import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const debug = true
const api = debug ? 'http://10.66.2.166:8090' : 'https://xkb.thebbg.top'
var state = {
    page: null,
    api: api,
    debug: debug,
    user: {
        username: '',
        xkAccount: '',
        isAdmin: false,
        isUpdated: false
    }
}

var mutations = {
    savePage(state, page) {
        state.page = page
    },
    updateUser(state) {
        state.page.$http.get(api + '/user/now')
            .then(data => {
                if (data.data.code === 200) {
                    state.user.userid = data.data.data.username
                    state.user.xkAccount = data.data.data.xkAccount
                    state.user.isAdmin = data.data.data.isAdmin
                    state.user.isUpdated = true
                } else {
                    state.page.$message.error(data.data.msg)
                }
            })
    },
    login(state, data) {
        state.page.$http.post(api + '/user/login', {
            username: data.username,
            password: data.password
        })
            .then(data => {
                if (data.data.code === 200) {
                    state.page.$store.commit('updateUser')
                    state.page.$message.success(data.data.msg)
                    state.page.$router.push('/main')
                } else {
                    state.page.$message.error(data.data.msg)
                }
            })
    },
    logout(state) {
        state.page.$http.delete(api + '/user/logout')
            .then(data => {
                if (data.data.code === 200) {
                    state.user = {
                        username: '',
                        xkAccount: '',
                        isAdmin: false,
                        isUpdated: false
                    }
                    state.page.$store.commit('updateUser')
                    state.page.$message.success(data.data.msg)
                } else {
                    state.page.$message.error(data.data.msg)
                }
            })
    },
    register(state, data) {
        state.page.$http.post(api + '/user/register', {
            username: data.username,
            password: data.password
        }).then(data => {
            if (data.data.code === 200) {
                state.page.$store.commit('updateUser')
                state.page.$message.success(data.data.msg)
                state.page.$router.push('/login')
            } else {
                state.page.$message.error(data.data.msg)
            }
        })
    },
}

export default new Vuex.Store({
    state,
    mutations
})

