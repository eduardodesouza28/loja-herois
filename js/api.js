const API_BASE_URL = 'http://localhost:3000';

class ApiService {
    constructor(protegida = true) {
        this.token = localStorage.getItem('token') || '';
        if (protegida) {
            this.verificarLogin();
        }
    }

    // -------------------- TOKEN --------------------
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    logout() {
        this.token = '';
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    }

    isLoggedIn() {
        return !!this.token;
    }

    getAuthHeaders(extraHeaders = {}) {
        const headers = { ...extraHeaders };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    // -------------------- PROTEÇÃO AUTOMÁTICA --------------------
    async verificarLogin() {
        if (!this.token) {
            window.location.href = '/login.html';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/perfil`, {
                headers: this.getAuthHeaders()
            });

            if (!response.ok) {
                this.logout();
            }
        } catch (error) {
            console.error('Erro ao verificar login:', error);
            this.logout();
        }
    }

    // -------------------- PRODUTOS --------------------
    async fetchProdutos() {
        const response = await fetch(`${API_BASE_URL}/produtos`, {
            headers: this.getAuthHeaders()
        });
        return await response.json();
    }

    async addProduto(produto) {
        const response = await fetch(`${API_BASE_URL}/produtos`, {
            method: 'POST',
            headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(produto)
        });
        return await response.json();
    }

    async deleteProduto(produtoId) {
        const response = await fetch(`${API_BASE_URL}/produtos/${produtoId}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders()
        });
        return await response.json();
    }

    // -------------------- USUÁRIOS --------------------
    async fetchUsuarios() {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            headers: this.getAuthHeaders()
        });
        return await response.json();
    }

    async addUsuario(usuario) {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });
        return await response.json();
    }

    async deleteUsuario(usuarioId) {
        const response = await fetch(`${API_BASE_URL}/usuarios/${usuarioId}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders()
        });
        return await response.json();
    }

    // -------------------- LOGIN --------------------
    async loginUsuario(credenciais) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciais)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer login.');
        }

        const data = await response.json();

        // Salva token para manter login
        if (data.token) {
            this.setToken(data.token);
        }

        return data;
    }
}

// Instâncias
export const apiService = new ApiService(true);  // páginas protegidas
export const apiServicePublic = new ApiService(false); // páginas públicas
