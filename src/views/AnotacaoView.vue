<template>
    <div>
      <h1>Encomendas</h1>
      <p>
        <label for="conteudo">Conteúdo</label>
        <input type="text" id="conteudo" v-model="encomenda.conteudo"/>
      </p>
      <p>
        <label for="valorDeclarado">Valor</label>
        <input type="number" step="0.1" id="valorDeclarado" v-model="encomenda.valorDeclarado"/>
      </p>
      <p>
        <label for="dataHoraPrevista">Data/hora prevista</label>
        <input type="datetime-local" id="dataHoraPrevista" v-model="encomenda.dataHoraPrevista"/>
      </p>
      <p>
        <label for="dataHoraEntrega">Data/hora entrega</label>
        <input type="datetime-local" id="dataHoraEntrega" v-model="encomenda.dataHoraEntrega"/>
      </p>
      <button @click="nova">Cadastrar</button>
      <button @click="todas">Atualizar</button>
      <p v-if="erro">{{ erro }}</p>
      <table>
      <thead>
          <td>Rastreio</td>
          <td>Conteúdo</td>
          <td>Valor</td>
          <td>Data/hora prevista</td>
          <td>Data/hora entrega</td>
      </thead>
      <tbody>
          <tr v-for="encomenda in encomendas">
          <td>{{ encomenda.rastreio }}</td>
          <td>{{ encomenda.conteudo }}</td>
          <td>{{ encomenda.valorDeclarado }}</td>
          <td>{{ encomenda.dataHoraPrevista }}</td>
          <td>{{ encomenda.dataHoraEntrega }}</td>
          </tr>
      </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { onMounted } from 'vue';
  
  const encomenda = ref<
    { 
      conteudo: string, 
      valorDeclarado?: number, 
      dataHoraPrevista: Date, 
      dataHoraEntrega?: Date
    }>({ conteudo: '', dataHoraPrevista: new Date()});
  const erro = ref("");
  const encomendas = ref([ {rastreio:1, conteudo: "Pizza", valorDeclarado: null, dataHoraPrevista: new Date(), dataHoraEntrega: null}]);
  
  async function todas() {
    try {
      encomendas.value = (await axios.get('encomenda')).data;
    }
    catch(e) {
      erro.value = (e as Error).message;
    }
  }
  
  async function nova() {
    try {
      await axios.post('encomenda', encomenda.value);
      encomenda.value = { conteudo: '', dataHoraPrevista: new Date()};
      todas(); 
    }
    catch(e) {
      erro.value = (e as Error).message;
    }
  }
  
  onMounted(() => {
    todas();
  });
  
  </script>