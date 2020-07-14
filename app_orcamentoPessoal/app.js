class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}


class Bd {
    constructor(){
        let id = localStorage.getItem('id')

        if (id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id') 
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d)) 

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){

        // array de despesas
        let despesas = Array()

        let id = localStorage.getItem("id")  
        // recuperar todas as despesas cadastradas em LocalStorage  
        for (let i = 1; i <= id; i++){

            // recuperar a despensa
            let despesa = JSON.parse(localStorage.getItem(i))
            if (despesa === null){
                continue
            } 

            despesas.push(despesa)
        }
        return despesas
    }
}

let bd = new Bd()

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
        if (despesa.validarDados()){
        bd.gravar(despesa)
        // dialog de sucesso
        document.getElementById('titulo').innerHTML = ('Registro inserido com sucesso')
        document.getElementById('conteudo-modal').innerHTML = ('Despesa foi cadastrada com sucesso!')
        document.getElementById('botao-modal').innerHTML = ('OK')
        document.getElementById('botao-modal').className = ('btn btn-success')
        document.getElementById('divTitulo').className = ('modal-header text-success')
        $('#modalRegistroDespesa').modal('show')
        document.getElementById("ano").value = ("")
        document.getElementById("mes").value = ("")
        document.getElementById("dia").value = ("")
        document.getElementById("tipo").value = ("")
        document.getElementById("descricao").value = ("")
        document.getElementById("valor").value = ("")

        } else {
        // dialog de erro
        document.getElementById('titulo').innerHTML = ('Erro na Gravação')
        document.getElementById('conteudo-modal').innerHTML = ('Existem campos obrigatórios que não foram preenchidos')
        document.getElementById('botao-modal').innerHTML = ('Voltar e corrigir')
        document.getElementById('botao-modal').className = ('btn btn-danger')
        document.getElementById('divTitulo').className = ('modal-header text-danger')
        $('#modalRegistroDespesa').modal('show')

        }
}

function carregaListaDespesas(){

    let despesas = Array()
    
    despesas = bd.recuperarTodosRegistros()
    console.log(despesas)
    // selecionando elemento tbody da tabela
    let listaDespesas = document.getElementById("listaDespesas")

    /*
    <tr>
        0 = <td>15/08/2020</td>
        1 = <td>Alimentação</td>
        <td>Compras do Mês</td>
        <td>444.75</td>
    </tr>
    */

    //percorrer o array despesas, listando cada despesa de forma dinamica
    despesas.forEach(function(d){
        
        console.log(d)
        //criando a linha (tr)
        let linha = listaDespesas.insertRow() 

        //criando as colunas (td)
        linha.insertCell(0).innerHTML = (`${d.dia}/${d.mes}/${d.ano}`)

        switch(d.tipo){
            case "1":
            d.tipo = "Alimentação"
            break
            case "2":
            d.tipo = "Educação"
            break
            case "3":
            d.tipo = "Lazer"
            break
            case "4":
            d.tipo = "Saúde"
            break 
            case "5":
            d.tipo = "Transporte"
            break
        }

        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })

}