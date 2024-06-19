<template>
    <div>
      <h1>Encomendas</h1>
      <p>
        <label for="nome">Nome</label>
        <input type="text" id="nome" v-model="produto.nome"/>
      </p>
      <p>
        <label for="valor">Valor</label>
        <input type="number" step="0.1" id="valor" v-model="produto.valor"/>
      </p>
      <p>
        <label for="dataHora">Data/hora</label>
        <input type="datetime-local" id="dataHora" v-model="produto.dataHora"/>
      </p>
      <button @click="novo">Cadastrar</button>
      <button @click="todos">Atualizar</button>
      <p v-if="erro">{{ erro }}</p>
      <table>
      <thead>
          <td>Id</td>
          <td>Nome</td>
          <td>Data/hora</td>
          <td>Valor</td>
          <td>Mínimo</td>
          <td>Máximo</td>
      </thead>
      <tbody>
          <tr v-for="produto in produtos">
          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>{{ produto.dataHora }}</td>
          <td>{{ produto.valor }}</td>
          <td>{{ produto.valorMinimo }}</td>
          <td>{{ produto.valorMaximo }}</td>
          </tr>
      </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { onMounted } from 'vue';
  
  const produto = ref<
    { 
      nome: string, 
      valor: number, 
      dataHora: Date, 
      valorMinimo?: number,
      valorMaximo?: number
    }>({ nome: '', dataHora: new Date(), valor: 0});
  const erro = ref("");
  const produtos = ref([ {id:1, nome: "Pizza", valor: 50, dataHora: new Date(), valorMinimo: 25, valorMaximo: 150}]);
  
  async function todos() {
    try {
      produtos.value = (await axios.get('produto')).data;
    }
    catch(e) {
      erro.value = (e as Error).message;
    }
  }
  
  async function novo() {
    try {
      await axios.post('produto', produto.value);
      produto.value = { nome: '', dataHora: new Date(), valor: 0};
      todos(); 
    }
    catch(e) {
      erro.value = (e as Error).message;
    }
  }
  
  onMounted(() => {
    todos();
  });
  
  </script>