import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LoggedIn:false,
  },
  getters:{
    loggingIns(state){
      console.log({'state loggedIn':state.loggedIn})
      return state.LoggedIn
  
    }
  },
  mutations: {
    LOGGING(state,data){
      state.LoggedIn = data
    }
  },
  actions: {
    logIn(context,data){
      axios.post('http://localhost:3000/auth/login',data)
      .then((r)=>{
          console.log(r)
          window.alert(r.data.msg)
          context.commit('LOGGING',true)
      })
      .catch((e)=>{
      console.log(e);
      window.alert(e.data);
      context.commit('LOGGING',false)
      
      })
    },
    register(context,data){
      console.log({data:data})
      axios.post('http://localhost:3000/register',data)
      .then((r)=>{
        console.log(r)
      })
      .catch((e)=>{
        console.log(e)
      })
    }
  },
  modules: {
  }
})
