class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}



function cadastrarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(
        ano,
        mes, 
        dia, 
        tipo, 
        descricao, 
        valor
    )
        gravar(despesa)
}

function gravar(d){
    localStorage.setItem('despesa', JSON.stringify(d))  // Para acessar o local storage do browser, set item permite passar 2 parametros, a identificação do objeto e o dado que queremos armazenar, este dado precisa ser repassado em JSON. Sendo que temos que transformar o objeto literal em uma notação JSON, faremos isso com objeto JSON
}


