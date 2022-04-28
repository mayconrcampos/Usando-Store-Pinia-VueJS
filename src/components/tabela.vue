<template>
  <div>
      <h1>tabela</h1>

      <table>
          <th>
              <td>Nome</td>
              <td>Idade</td>
              <td>Ações</td>
          </th>
          <tr v-for="(p, key) in tabela" :key="key">
              <td>{{p.nome}}</td>
              <td>{{p.idade}}</td>
                <td>
                    <button @click="$emit('preenche', p.nome, p.idade, key)">Edit</button>
                    <button @click="$emit('deletaitem', key)">Del</button>
                </td>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
    name: "MinhaTabela",
    props: {
        tabela: {
            type: Array
        }
    }
}
</script>

<style>
table {
    width: 100%;
}

table td {
    border: 1px solid black;
}

</style>