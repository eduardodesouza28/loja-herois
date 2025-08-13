const API_BASE_URL = 'http://localhost:3000'; // Substitua pelo seu endpoint real

class ApiService {
    async fetchProdutos() {
        const response = await fetch(`${API_BASE_URL}/produtos`);
        console.log("Resposta da API:", response);
        return await response.json();
    }

    async addProduto(produto) {
        const response = await fetch(`${API_BASE_URL}/produtos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
        return await response.json();
    }

    async deleteProduto(produtoId) {
        const response = await fetch(`${API_BASE_URL}/produtos/${produtoId}`, {
            method: 'DELETE'
        });
        return await response.json();
    }

}

export const apiService = new ApiService();