import { apiServicePublic } from './api.js';

document.getElementById('form-usuario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = {
        nome: document.getElementById('name').value,
        sobrenome: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('password').value,
        cpf: document.getElementById('cpf').value,
        pagamento: document.getElementById('payment').value,
        telefone: document.getElementById('telephone').value,
        endereco: document.getElementById('adress').value,
    };

    try {
        await apiServicePublic.addUsuario(usuario);
        alert('usuario adicionado com sucesso!');
        e.target.reset();
    } catch (error) {
        alert('Erro ao adicionar usuario.');
        console.error(error);
    }
});