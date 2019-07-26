<template>
  
  <div class="boards">
    <div>
      <button class="btn btn-sm btn-outline-danger mb-3" @click="logout">Logout</button>
    </div>
    <b><h2>WELCOME TO YOUR KANBAN BOARDS!!!</h2></b>
    <p></p>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <p></p>

<div class="row justify-content-center">
  <div class="card col-3 p-2 m-3" v-for="board in boards" :key="board._id">
    <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
    <button class="mt-auto btn btn-danger btn-sm mb-2" @click="deleteBoard(board._id)"><i class="fa fa-trash"></i></button>
  </div>
</div>
        
      </div> <!--Ending div of board cards-->
    </template>

<script>

  
  export default {
    name: "boards",
    props: ['boardsProp'],
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.newBoard.authorId = this.$store.state.user._id;
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch('deleteBoard', boardId);
      },
      logout() {
        this.$store.dispatch("logout")
      }
    }
  };
</script>