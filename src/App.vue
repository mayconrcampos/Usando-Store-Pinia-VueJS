<template>
  <div>
    <h1>Utilizando o Store Pinia</h1>

    <p>{{usuario.nome}}</p> 

    <input type="text" v-model="usuario.nome">

    <p>{{usuario.idade}}</p>
    <input type="text" v-model="usuario.idade"><br>

    <button @click="add()">Add pessoa</button>
    <button @click="esvaziar()">Esvaziar Lista</button>

    <ul v-for="(pessoa, key) in listaUsuarios" :key="key">
      <li>Nome: {{ pessoa.nome }} Idade: {{ pessoa.idade }}</li>
    </ul>

    <h2 @click="incrementa()">Conta {{conta}}</h2>
    <p>Contador: {{conta}}</p>

    <h3>Triplo: {{triplo}}</h3>

    <button @click="zera()">Zerar</button>

  </div>
</template>

<script>
import { useUsuarioStore } from "./store/usuarioStore.js" // store de usuarios
import { storeToRefs, mapActions } from "pinia" // reatividade

export default {
  name: 'App',
  components: {
  }
  ,
  setup() {
    // Usamos a storeToRefs para que seja reativa
    // Mapeamos cada variavel da store
    const {usuario, listaUsuarios, conta, triplo, contador} = storeToRefs(useUsuarioStore())
    const { incrementa, addListaUsuarios } = mapActions(useUsuarioStore, ["incrementa", "addListaUsuarios"])
    return {
      // Retornamos cada variavel para que sejam visíveis e acessíveis na aplicação. 
      usuario,
      listaUsuarios,
      conta,
      triplo,
      contador,
      incrementa,
      addListaUsuarios
    }
  },
  computed: {
    // Pra não precisar usar computed, podemos definir getters dentro da store
    // que praticamente faz a mesma coisa que faria aqui
  },
  methods: {
    zera(){
      this.conta = 0
      this.useUsuarioStore.$reset()
    },
    add(){
      this.addListaUsuarios({
        "nome": this.usuario.nome,
        "idade": this.usuario.idade
      })

      this.usuario.nome = ""
      this.usuario.idade = ""
    },
    esvaziar(){
      this.listaUsuarios = []
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2 {
  cursor:pointer;
}
ul li {
  list-style: none;
}
</style>
