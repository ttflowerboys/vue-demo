import * as types from '../mutation-types'

// initial state
const state = {
    user:[
      {"id": 1, "phone": 13007120000,"verify": 123456,"codeVerify": 123123},
      {"id": 2, "phone": 13007121111,"verify": 123456,"codeVerify": 123123},
      {"id": 3, "phone": 13007122222,"verify": 123456,"codeVerify": 123123}
    ],
    seccLogin: 0
}


// actions
const actions = {
  login ({ commit }, user) {
      commit(types.CHECK_USER, user)
  }
}

// mutations
const mutations = {
    [types.CHECK_USER](state,res){
        state.user.forEach(function(v) {
            if(v.phone == res.phone){
              state.seccLogin = 1
            }
        }, this);
    }
}


export default {
  state,
  actions,
  mutations
}


