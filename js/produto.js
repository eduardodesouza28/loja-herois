
class Produto {
    constructor(id, nome, codigo, preco, link, descricao, imagemUrl = '') {
        this.id = id;
        this.nome = nome;
        this.codigo = codigo;
        this.preco = preco;
        this.link = link;
        this.descricao = descricao;
        this.imagemUrl = imagemUrl;
    }

    // Exemplo de método para formatar o preço
    getPrecoFormatado() {
        return `R$ ${this.preco.toFixed(2).replace('.', ',')}`;
    }
}
export default Produto;