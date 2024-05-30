<template>
    <div>
        <h1>{{ nome }}</h1>
        <p><input type="text" :value="nome" @input="mudouNome" /></p>
        <p><input type="text" v-model="nome" /></p>
        <p v-if="nome.length > 10">Nome muito longo!</p>
        <div v-else>Nome ok!</div>
        <p><input type="password" v-model="senha" /></p>
        <button @click="buscarUsuarios">Atualizar</button>
        <button @click="cadastroUsuario">Cadastrar</button>
        <p v-if="erro">{{ erro }}</p>
        <TabelaUsuario :usuarios="usuarios" />

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabelaUsuario from '@/components/TabelaUsuario.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { usuarioStore } from '../stores/usuarioStore'

const nome = ref("Teste");
const senha = ref("123456");
const erro = ref("");

const usuarios = ref(
    [
        { id: 1, nome: "admin" },
        { id: 2, nome: "user" }
    ]);

async function buscarUsuarios() {
    usuarios.value = (await axios.get('usuario')).data;
}

async function cadastroUsuario() {
    try {
        usuarios.value.push((await axios.post('usuario',
            {
                nome: nome.value,
                senha: senha.value
            }
        )).data);
        erro.value = "";
    }
    catch (exception) {
        erro.value = (exception as Error).message;
    }

}

function mudouNome(event: Event) {
    nome.value = (event.target as HTMLInputElement).value;

}

onMounted(() => {
    buscarUsuarios();
});

</script>


