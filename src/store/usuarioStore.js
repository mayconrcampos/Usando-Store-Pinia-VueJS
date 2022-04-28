import { defineStore } from "pinia"

export const useUsuarioStore = defineStore("usuario", {

    // state
    state: () => {
        return {
            usuario: {
                nome: "Maycon",
                idade: 39
            },
            listaUsuarios: [
                {"nome": "maycon", "idade": 39},
                {"nome": "Ariana", "idade": 36},
                {"nome": "Otávio", "idade": 11},
                {"nome": "Benjamin", "idade": 10},
                {"nome": "Terezinha", "idade": 63},
                {"nome": "Izair", "idade": 73},
                {"nome": "Benhur", "idade": 33},
                {"nome": "Rapha", "idade": 42},
            ],
            conta: 0
        }
    },
    // actions

    actions: {
        incrementa(){
            this.conta++
        },
        addListaUsuarios(obj){
            this.listaUsuarios.push(obj)
        }
    },

    // Getters - podemos implementar os getters assim como fazemos com as computeds dentro de App
    getters: {
        triplo: (state) => {
            return state.conta * 3
        },
        contador: (state) => {
            return state.conta
        }
    }
})