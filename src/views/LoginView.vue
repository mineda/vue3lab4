<template>
    <div>
        <h1>{{ nome }}</h1>
        <p><input type="text" v-model="nome"/></p>
        <p><input type="password" v-model="senha"/></p>
        <button @click="login">Login</button>
        <p v-if="store.erro">{{ store.erro }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usuarioStore } from '../stores/usuarioStore'

const nome = ref("Teste");
const senha = ref("123456");
const store = usuarioStore();

async function login() {
    store.login(nome.value, senha.value);
}

</script>


