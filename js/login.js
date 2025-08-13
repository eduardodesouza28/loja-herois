// Seu arquivo principal (ex: main.js)

import { apiService } from './api.js';

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const credenciais = {
        email: document.getElementById('email').value,
        senha: document.getElementById('password').value,
    };

    try {
        // Chamando a nova função de login
        const respostaLogin = await apiService.loginUsuario(credenciais);
        
        // Se o login for bem-sucedido, a execução continua aqui
        alert('Login realizado com sucesso!');
        console.log('Dados do usuário autenticado:', respostaLogin);
        
        // Exemplo: Salvar o token de autenticação e redirecionar
        // localStorage.setItem('token', respostaLogin.token);
        // window.location.href = '/dashboard.html';

    } catch (error) {
        // Se a API retornar um erro (ex: credenciais inválidas)
        alert(error.message);
        console.error(error);
    }
});