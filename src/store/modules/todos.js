import axios from 'axios';
import AV from 'leancloud-storage'
import FileSaver from 'file-saver';
const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    var date_now = new Date();
    // eslint-disable-next-line
    //console.log('hh' + date_now);
    const query = new AV.Query('table_return2');
    query.limit(300);
    //query.equalTo('classroom', '403');
    let tempstore = [];
    let count = 0;
    query.find().then((todos) => {
      // 获取需要更新的 todo
      todos.forEach((todo) => {
        var tempdata = todo.attributes;
        tempdata.id = todo.id;
        tempdata.updatedAt = todo.updatedAt;
        tempstore.push(tempdata)
        count+=1;
        // eslint-disable-next-line
        // console.log(DateMinus(tempdata.updatedAt,date_now))
        // console.log(tempdata.returned)
        if(!tempdata.fixed && DateMinus(tempdata.updatedAt,date_now) > 0 && tempdata.returned) {
          //console.log('tempdata.name')
          todo.set('fixed', true);
          //todo.save();
        }
        // console.log(todo.updatedAt)
        // console.log('hh2' + date_now);
        
      });
      AV.Object.saveAll(todos);
      commit('setTodos', tempstore);

      // eslint-disable-next-line
      //console.log(tempstore);
      // setTimeout(function(){ 
      //     commit('setTodos', tempstore);
      //     alert(count);
      // }, 1000);
      
      // 批量更新
      //AV.Object.saveAll(todos);
    });
    // eslint-disable-next-line
    //console.log(response.data);
    
    //commit('setTodos', response.data);
  },
  async addTodo({ commit }, password) {
    // const response = await axios.post(
    //   'https://jsonplaceholder.typicode.com/todos',
    //   { password, completed: false }
    // );

    // commit('newTodo', response.data);
    var date_now = new Date();
    if (password === "yalitest") {
      const query = new AV.Query('table_return2');
      query.limit(300);
      //query.equalTo('classroom', '403');
      let tempstore = [];
      let xinzeng_store = [];
      let str_xinzeng = "";
      let tempobj = {
        true: "男",
        false: "女"
      }
      let count = 0;
      query.find().then((todos) => {
        // 获取需要更新的 todo
        todos.forEach((todo) => {
          var tempdata = todo.attributes;
          tempdata.id = todo.id;
          tempdata.updatedAt = todo.updatedAt;
          tempstore.push(tempdata)
          // eslint-disable-next-line
          // console.log(DateMinus(tempdata.updatedAt,date_now))
          // console.log(tempdata.returned)
          if(!tempdata.fixed && tempdata.returned) {
            //console.log('tempdata.name')
            todo.set('fixed', true);
            xinzeng_store.push(tempdata);
            count += 1;
            str_xinzeng += `${tempdata.name}\t${tempobj[tempdata.sexual]}\t${tempdata.classroom}\n`
            //todo.save();
          }
          // console.log(todo.updatedAt)
          // console.log('hh2' + date_now);
          
        });
        var blob = new Blob([str_xinzeng], {type:"text/plain;charset=utf-8"});
          FileSaver.saveAs(blob, "test.txt");
        alert(count);
        AV.Object.saveAll(todos);
          // eslint-disable-next-line
          //console.log('tt',xinzeng_store);
        commit('setTodos', tempstore);
        
        // 批量更新
        //AV.Object.saveAll(todos);
        // 导出
        // setTimeout(function(){ 
        //   var blob = new Blob([str_xinzeng], {type:"text/plain;charset=utf-8"});
        //   FileSaver.saveAs(blob, "test.txt");
        //   alert(count);
        //   AV.Object.saveAll(todos);
        //   // eslint-disable-next-line
        //   //console.log('tt',xinzeng_store);
        //   commit('setTodos', tempstore);
        // }, 2000);
        
      });
    }
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },
  async filterTodos({ commit }, e) {
    var date_now = new Date();
    // Get selected number
    const classroom = e.target.options[e.target.options.selectedIndex].innerText
    
    // const response = await axios.get(
    //   `https://jsonplaceholder.typicode.com/todos?_classroom=${classroom}`
    // );

    const query = new AV.Query('table_return2');
    query.limit(300);
    //console.log(classroom)
    if (classroom !== 'all') { query.equalTo('classroom', classroom); }
    let count = 0;
    let tempstore = [];
    query.find().then((todos) => {
      // 获取需要更新的 todo
      todos.forEach((todo) => {
       // console.log(todo)
        count+=1;
        var tempdata = todo.attributes;
        tempdata.id = todo.id;
        tempdata.updatedAt = todo.updatedAt;
        tempstore.push(tempdata)
        // eslint-disable-next-line
        // console.log(DateMinus(tempdata.updatedAt,date_now))
        // console.log(tempdata.returned)
        if(!tempdata.fixed && DateMinus(tempdata.updatedAt,date_now) > 3 && tempdata.returned) {
          //console.log('tempdata.name')
          todo.set('fixed', true);
          //todo.save();
        }
        // console.log(todo.updatedAt)
        // console.log('hh2' + date_now);
        
      });
      AV.Object.saveAll(todos);
      // eslint-disable-next-line
     // console.log(tempstore);
      //alert(count);
      commit('setTodos', tempstore);
      // 批量更新
      //AV.Object.saveAll(todos);
    });

    //commit('setTodos', tempstore);
  },
  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      updTodo
    );


    commit('updateTodo', response.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

function DateMinus(sdate,now){//date1:小日期   date2:大日期 
 　　var days = now.getTime() - sdate.getTime(); 
 　　//var day = parseInt(days / (1000 * 60)); // 分钟
    var day = parseInt(days / (1000 * 60 * 60 * 24)); 
 　　return day; 
 }

export default {
  state,
  getters,
  actions,
  mutations
};
