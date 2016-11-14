<style src="todomvc-app-css/index.css"></style>
<style>
.file-upload {border:1px solid red; float:right}
</style>

<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">

        <input class="file-upload" id="fileUpload" type="file" multiple @change="addImage"/>
        <div id="dvPreview"></div>
      <h1>todos</h1>

      <input class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input class="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll({ done: !allChecked })">
      <ul class="todo-list">
        <todo v-for="todo in filteredTodos" :todo="todo"></todo>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters">
          <a :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <button class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import Todo from './Todo.vue'


const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  components: { Todo },
  data () {
    return {
      visibility: 'all',
      filters: filters
    }
  },
  created () {
    this.$store.commit('getTodo')
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    addTodo (e) {
      var text = e.target.value
      if (text.trim()) {
        this.$store.commit('addTodo', { text })
      }
      e.target.value = ''
    },
    disp (src) {
        this.$store.commit('displayImage', { src })
    },
    addImage (e) {

        //Get count of selected files
         var input = e.target;
         var countFiles = input.files.length;

         var imgPath = input.value;
         var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();

         var _this = this;

         function dispImg (src) {
            _this.disp(src);
         }

         if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
             if (typeof (FileReader) != "undefined") {

                 //loop for each file selected for uploaded.
                 for (var i = 0; i < countFiles; i++) {

                     var reader = new FileReader();
                     reader.onload = function (e) {
                        var src = e.target.result;
                        dispImg(src);
                     /*
                         $("<img />", {
                             "src": e.target.result,
                                 "class": "thumb-image"
                         }).appendTo(image_holder);
                         */
                     }

                     //image_holder.show();
                     reader.readAsDataURL(input.files[i]);
                 }

             } else {
                 alert("This browser does not support FileReader.");
             }
         } else {
             alert("Pls select only images");
         }
    },
    ...mapMutations([
      'toggleAll',
      'clearCompleted'
    ])
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>
