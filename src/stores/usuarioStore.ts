import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const usuarioStore = defineStore('usuario', () => {
  
  const token = ref("")
  const erro = ref("")
  
  async function login(nome: string, senha: string) {
    try {
        token.value = (await axios.post('login', 
            { 
                nome: nome, 
                senha: senha 
            }
        )).data.token;
        erro.value = "";
    }
    catch(exception) {
        erro.value = (exception as Error).message;
    }

}

  return { token, erro, login }
})
