
//Verifica se o usuario está logado para poder ter acesso a aréa de cadastro
if (localStorage.getItem("loggado") !== "true") {
    alert("Você precisa fazer login para acessar essa página.");
    window.location.href = "login.html";
}
//Guarda os valores passados no form 
document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let sabor = document.getElementById('sabor').value;
    let preco = document.getElementById('preco').value;
    let descricao = document.getElementById('descricao').value;
    
    let sorvetes = JSON.parse(localStorage.getItem('sorvetes')) || [];
    //verifica se o indice da linha já está declarado, se estiver, tera a opção de editar as informações
    //se não estiver, cria uma nova linha com as informações passadas
    const verificaIndex = this.getAttribute("data-index");

    if(verificaIndex !== null) {
        sorvetes[verificaIndex] = {sabor , preco, descricao};
        this.removeAttribute("data-index");
    } else { 
        sorvetes.push({ sabor, preco, descricao });
    }
    
    localStorage.setItem('sorvetes', JSON.stringify(sorvetes));


    this.reset();
    
    atualizarTabela();
});


//cria nova linha e colunas com as informações passadas anteriormente
function atualizarTabela() {
    let sorvetes = JSON.parse(localStorage.getItem('sorvetes')) || [];
    let tbody = document.getElementById('tabelaSorvetes').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    
    sorvetes.forEach((sorvete, index) => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = sorvete.sabor;
        row.insertCell(1).textContent = 'R$ ' + parseFloat(sorvete.preco).toFixed(2);
        row.insertCell(2).textContent = sorvete.descricao;
        let cellActions = row.insertCell(3);
        cellActions.innerHTML = 
        `<button onclick="excluirSorvete(${index})">Excluir</button>
         <button onclick="editarSorvete(${index})">Editar</button>`;
    });
}

//Exibe a tabela no index.html
function exibirTabela() {
    let sorvetes = JSON.parse(localStorage.getItem('sorvetes')) || [];
    let tbody = document.getElementById('saboresSorvetes').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    
    sorvetes.forEach(sorvete  => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = sorvete.sabor;
        row.insertCell(1).textContent = 'R$ ' + parseFloat(sorvete.preco).toFixed(2);
        row.insertCell(2).textContent = sorvete.descricao;
        
    });
}

function excluirSorvete(index) {
    let sorvetes = JSON.parse(localStorage.getItem('sorvetes')) || [];
    sorvetes.splice(index, 1);
    localStorage.setItem('sorvetes', JSON.stringify(sorvetes));
    atualizarTabela();
}

function editarSorvete(index) {
let sorvetes = JSON.parse(localStorage.getItem('sorvetes')) || [];
let sorvete = sorvetes[index];
document.getElementById('sabor').value = sorvete.sabor;
document.getElementById('preco').value = sorvete.preco;
document.getElementById('descricao').value = sorvete.descricao;

document.getElementById('formCadastro').setAttribute('data-index', index)
}

document.addEventListener('DOMContentLoaded', atualizarTabela);
