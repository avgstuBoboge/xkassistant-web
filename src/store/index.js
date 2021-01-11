import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const debug = false
const api = debug ? 'http://10.67.224.122:9090' : 'http://116.62.158.202:9090'
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
            .then(resp => {
                if (resp.data.code === 200) {
                    state.user.username = resp.data.data.username
                    state.user.xkAccount = resp.data.data.xkId
                    state.user.isAdmin = resp.data.data.isAdmin
                    state.user.isUpdated = true
                    state.page.$router.push('/main')
                    this.getCredit()
                } else {
                    if (state.page.$route.path !== '/' && state.page.$route.path !== '/login') {
                        state.page.$message.error(resp.data.msg)
                        state.page.$router.push('/login')
                    }
                    state.user.isUpdated = true
                }
            })
    },
    login(state, data) {
        var params = new FormData();
        params.append('username', data.username)
        params.append('password', data.password)
        state.page.$http.post(api + '/user/login', params)
            .then(data => {
                if (data.data.code === 200) {
                    state.page.$message.success(data.data.msg)
                    state.page.$store.commit('updateUser')
                } else {
                    state.page.$message.error(data.data.msg)
                }
            })
    },
    logout(state) {
        state.page.$http.post(api + '/user/logout')
            .then(data => {
                if (data.data.code === 200) {
                    state.user = {
                        username: '',
                        xkId: '',
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
        var params = new FormData();
        params.append('username', data.username)
        params.append('password', data.password)
        state.page.$http.post(api + '/user/register', params)
            .then(data => {
                if (data.data.code === 200) {
                    state.page.$store.commit('updateUser')
                    state.page.$message.success(data.data.msg)
                    state.page.$router.push('/login')
                } else {
                    state.page.$message.error(data.data.msg)
                }
            })
    },
    getCredit() {
        state.page.$http.post(api + '/finish/fetch')
            .then(resp => {
                if (resp.data.code === 200) {
                    state.page.$message.success(resp.data.msg)

                } else {
                    state.page.$message.error(resp.data.msg)
                }
            })
    }
}

export default new Vuex.Store({
    state,
    mutations
})

