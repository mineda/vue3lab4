<script setup lang="ts">
defineProps<{
  usuarios: { id: number, nome: string }[]
}>()
</script>

<template>
    <table>
        <thead>
            <td>Id</td>
            <td>Nome</td>
        </thead>
        <tbody>
            <tr v-for="usuario in usuarios">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nome }}</td>
            </tr>
        </tbody>
    </table>
</template>