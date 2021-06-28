const clientList = document.querySelector('.client-list');
const addClientForm = document.querySelector('.add-client-form');
let output = '';

const url = '';

const renderClients = (clientes)
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
    clientList.innerHTML = output;
});

//GET
fetch(url)
    .then(res => res.json())
    .then(data => renderClients((data)))

//POST
addClientForm.addEventListener('submit', () => {
    console.log('Form submited!!');
})