import Vuex from 'vuex';
import Vue from 'vue';
import todos from './modules/todos';
import leancloud from './modules/leancloud'
// Load Vuex
Vue.use(Vuex);
Vue.prototype.$leancloud = leancloud
leancloud.init()
// Create store
export default new Vuex.Store({
  modules: {
    todos
  }
});
