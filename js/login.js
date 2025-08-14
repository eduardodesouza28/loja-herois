import { apiService } from './api.js';

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const credenciais = {
        email: document.getElementById('email').value.trim(),
        senha: document.getElementById('password').value.trim(),
    };

    try {
        const resposta = await apiService.loginUsuario(credenciais);

        if (resposta.success && resposta.token) {
            alert('Login realizado com sucesso!');
            // Redireciona para página protegida
            window.location.href = '/index.html';
        }
    } catch (error) {
        alert(error.message || 'Erro ao fazer login.');
        console.error('Erro no login:', error);
    }
});
