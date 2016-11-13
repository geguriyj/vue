// export const STORAGE_KEY = 'todos-vuejs'
//
// // for testing
// if (navigator.userAgent.indexOf('PhantomJS') > -1) {
//   window.localStorage.clear()
// }
//
// export const state = {
//   todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
// }

import Vue from 'vue'

export const state = {
  todos: []
}

export const mutations = {

  addTodo (state, { text }) {

    state.todos.push({
      text,
      done: false
    })

  },

  getTodo : function(state){

    var _initData = [{text:"aa1",id:0},{text:"bb1",id:1}];

    _initData.forEach(_initData => {
      Vue.set(state.todos, _initData.id, {text: _initData.text})
    })


    // state.todos.push({
    //   text :'감자',
    //   done: false
    // })
    // state.todos.push({
    //   text :'고구마',
    //   done: false
    // })


    // var Vue = require('vue');
    // var VueResource = require('vue-resource');
    //
    // Vue.use(VueResource);
    // // POST /someUrl
    // Vue.http.get('/list', {formId : "a001"}).then((response) => {
    //
    //   // this.addTodo('addTodo', '감자');
    //   // this.addTodo('addTodo', '고구마');
    //   // this.addTodo('addTodo', '호박');
    //
    // }, (response) => {
    //   // error callback
    // })
  },

  deleteTodo (state, { todo }) {

    state.todos.splice(state.todos.indexOf(todo), 1)

  },

  toggleTodo (state, { todo }) {
    todo.done = !todo.done
  },

  editTodo (state, { todo, value }) {
    todo.text = value
  },

  toggleAll (state, { done }) {
    state.todos.forEach((todo) => {
      todo.done = done
    })
  },

  clearCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.done)
  }
}
