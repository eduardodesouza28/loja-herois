// js/api.js

const API_BASE_URL = 'http://localhost:3000/herois'; // Substitua pelo seu endpoint real

/**
 * Lida com a comunicação com a API do backend.
 */
class ApiService {
    async fetchProdutos() {
        // Exemplo de como faria a requisição real
        const response = await fetch(`${API_BASE_URL}/produtos`);
        console.log("Simulando fetch de produtos do backend");
        return await response.json();

        // Dados simulados para demonstração
        // return [
        //     { id: 1, nome: 'Homem de Ferro', codigo: '001', preco: 159.90, link: 'link-ironman', descricao: 'Action figure do Homem de Ferro.', imagemUrl: 'imagens/imagem1.jpg' },
        //     { id: 2, nome: 'Capitão América', codigo: '002', preco: 129.90, link: 'link-capitao', descricao: 'Escudo e figura do Capitão América.', imagemUrl: 'imagens/imagem2.jpg' },
        // ];
    }

    async addProduto(produto) {
        // const response = await fetch(`${API_BASE_URL}/produtos`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(produto)
        // });
        // return response.json();
        console.log("Simulando adicionar produto:", produto);
        return { success: true, message: 'Produto adicionado com sucesso.' };
    }

    async deleteProduto(produtoId) {
        // const response = await fetch(`${API_BASE_URL}/produtos/${produtoId}`, {
        //     method: 'DELETE'
        // });
        // return response.json();
        console.log("Simulando exclusão do produto:", produtoId);
        return { success: true, message: 'Produto excluído.' };
    }

    // Outros métodos para login, cadastro de clientes, etc.
}

export const apiService = new ApiService();