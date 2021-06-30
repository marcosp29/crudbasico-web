const clientList = document.querySelector('.client-list');
const addClientForm = document.querySelector('.add-client-form');
const clienteNome = document.getElementById('nome');
const clienteDados = document.getElementById('dados-cliente');

let output = '';

const url = 'http://localhost:7070/crudbasico';

const renderClients = (clientes) => {
    clientes.forEach(cliente => {
        output += `
            < div class="col-sm-6" >
                <div class="card">
                    <div class="card-body">
                        <h5 class="cliente-nome">${cliente.nome}</h5>
                        <p class="cliente-cpf">${cliente.cpf}</p>
                        <p class="cliente-endereco">${cliente.endereco}</p>
                        <p class="cliente-telefones">${cliente.contatos}</p>
                        <p class="cliente-email">${cliente.email}</p>
                        <a href="#" class="btn btn-primary">Editar</a>
                        <a href="#" class="btn btn-danger">Excluir</a>
                    </div>
                </div>
        </div>`;
    });
    clientList.innerHTML = output;
};

//GET
fetch(url, {method: 'POST', mode: 'no-cors'})
    .then(res => res.json())
    .then(data => renderClients((data)))


//POST
addClientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cliente: clienteNome.value,
            body: clienteDados.value,
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderClients(dataArr);
        })
    })
})

//consulta CEP
const limparFormulario = (endereco) =>{
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
}


const preencherFormulario = (endereco) =>{
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);