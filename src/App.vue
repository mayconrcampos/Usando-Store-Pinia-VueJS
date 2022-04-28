<template>
  <div>
    <h1>Utilizando o Store Pinia</h1>

    <p>{{usuario.nome}}</p> 

    <input type="text" v-model="usuario.nome">

    <p>{{usuario.idade}}</p>
    <input type="text" v-model="usuario.idade"><br>

    <button @click="add()">{{ edita ? "Editar" : "Adicionar" }}</button>
    <button @click="esvaziarLista()">Esvaziar Lista</button>
    <button @click="limparUsuario()">Limpar Casas</button>
    {{edita}}

    <div id="tabela">
      <minha-tabela @preenche="preenche" @deletaitem="deletaItem()" :tabela="listaUsuarios" />
    </div>

    <h2 @click="incrementa()">Conta {{conta}}</h2>
    <h2 @click="decrementa()">Decrementa</h2>

    <p>Contador: {{conta}}</p>

    <h3>Triplo: {{triplo}}</h3>


    <button @click="zera()">Zerar</button>

   

  </div>
</template>

<script>
import { useUsuarioStore } from "./store/usuarioStore.js" // store de usuarios
import { storeToRefs, mapActions } from "pinia" // reatividade
import MinhaTabela from "./components/tabela.vue"

export default {
  name: 'App',
  components: {
    MinhaTabela
  },
  setup() {
    // Usamos a storeToRefs para que seja reativa
    // Mapeamos cada variavel da store
    const {usuario, listaUsuarios, conta, triplo, contador} = storeToRefs(useUsuarioStore())

    // Mapeamento das Actions
    const { incrementa, 
            decrementa, 
            addListaUsuarios, 
            deletaItem,
            esvaziarLista,
            editaPessoaLista,
            limparUsuario
            } = mapActions(useUsuarioStore, 
                            [ "incrementa", 
                              "addListaUsuarios", 
                              "decrementa", 
                              "deletaItem",
                              "esvaziarLista",
                              "editaPessoaLista",
                              "limparUsuario"                   
                          ])

    return {
      // Retornamos cada state, actions e getters para que sejam visíveis e acessíveis na aplicação. 

      // States de useUsuarioStore
      usuario,
      listaUsuarios,
      conta,
      triplo,
      contador,
      // Actions de useUsuarioStore, chamamos elas na view ou em methods executando como funções
      incrementa,
      addListaUsuarios,
      decrementa,
      deletaItem,
      esvaziarLista,
      editaPessoaLista,
      limparUsuario
    }
  },
  data() {
    return {
      edita: false,
      indice: ""
    }
  },
  computed: {
    // Pra não precisar usar computed, podemos definir getters dentro da store
    // que praticamente faz a mesma coisa que faria aqui
  },
  methods: {
    preenche(nome, idade, key){
      this.usuario.nome = nome
      this.usuario.idade = idade
      this.indice = key
      this.edita = true
    },
    zera(){
      this.conta = 0
    },
    add(){
      if(this.edita){
        this.editaPessoaLista(this.indice, {
          "nome": this.usuario.nome,
          "idade": this.usuario.idade
        })

        this.edita = false
      }else{
        this.addListaUsuarios({
          "nome": this.usuario.nome,
          "idade": this.usuario.idade
        })
      }
      

      this.usuario.nome = ""
      this.usuario.idade = ""
    },

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
#tabela {
  text-align: center;
  width: 150px;
  margin: auto;
}
</style>
