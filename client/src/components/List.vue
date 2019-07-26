<template>
  <div class="card col-3 p-2 m-3">
    <h3>Title: {{listProp.title}}</h3>
    <p>Description: {{listProp.description}}</p>

    <!--ADD TASK FORM/BUTTON WITHIN LIST CARD-->
    <form @submit.prevent="addTask">
      <input type="text" placeholder="Add Task" v-model="newTask.title" class="form-control">
      <input type="text" placeholder="Add Description" v-model="newTask.description" class="form-control">
      <button type="submit" class="btn btn-info btn-sm">Add Task</button>
    </form>
    <!--DELETE BUTTON WITHIN LIST CARD-->
    <button class="mt-auto btn btn-danger btn-sm mb-2" @click="deleteList(listProp)"><i
        class="fa fa-trash"></i></button>
  </div>
</template>

<script>
  import Task from '../components/Task.vue'

  export default {
    name: 'List',
    props: ['listProp'], //REVIEW
    mounted() {
      this.$store.dispatch("getTasksByListId", this.listProp._id);
      //getAllTasksByList
    },
    data() {
      return {
        newTask: {
          title: "",
          description: "",
        }
      }
    },
    methods: {
      addTask() {
        // this.task.listId=this.listProp._id 
        // this.task.authorId=this.$store.state.user._id //brought in from boardvue
        this.newTask.authorId = this.$store.state.user._id //REVIEW 
        this.$store.dispatch('addTask', this.task)
        this.task = { title: "", description: "" }
      },

      logout() {
        this.$store.dispatch("logout") //should let logout button work on list page
      },

      deleteList(list) {
        this.$store.dispatch('deleteList', this.listProp);
      },
    },

    computed: {
      //TODO need help with this section
    },
    components: {
      //REVIEW Should I add Task or Tasks? Either of them broke the code. Probably because we don't have info in the Task.vue yet.
    }
  }
</script>

<style scoped>
</style>