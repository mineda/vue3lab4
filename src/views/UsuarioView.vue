<template>
    <div>
        <h1>{{ nome }}</h1>
        <p><input type="text" :value="nome" @input="mudouNome"/></p>
        <p><input type="text" v-model="nome"/></p>
        <p v-if="nome.length > 10">Nome muito longo!</p>
        <div v-else>Nome ok!</div>
        <TabelaUsuario :usuarios="usuarios"/> 

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabelaUsuario from '@/components/TabelaUsuario.vue';

const nome = ref("Teste");

const usuarios = ref(
    [ 
        {id: 1, nome: "admin"}, 
        {id: 2, nome: "user"} 
    ]);

function mudouNome(event: Event) {
    nome.value = (event.target as HTMLInputElement).value;

}

</script>


