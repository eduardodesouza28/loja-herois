// js/produto.js

/**
 * Representa um produto do e-commerce.
 */
class Produto {
    constructor(id, nome, codigo, preco, link, descricao, imagemUrl) {
        this.id = id;
        this.nome = nome;
        this.codigo = codigo;
        this.preco = preco;
        this.link = link;
        this.descricao = descricao;
        this.imagemUrl = imagemUrl;
    }

    /**
     * Retorna o preço formatado em Reais.
     * @returns {string} Preço formatado.
     */
    getPrecoFormatado() {
        return `R$ ${this.preco.toFixed(2).replace('.', ',')}`;
    }
}

export default Produto;