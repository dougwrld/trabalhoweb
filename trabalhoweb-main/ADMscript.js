if (localStorage.getItem("loggado") !== "true") {
    alert("Você precisa fazer login para acessar essa página.");
    window.location.href = "login.html";
}
document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let sabor = document.getElementById('sabor').value;
    let preco = document.getElementById('preco').value;
    let descricao = document.getElementById('descricao').value;
    
    let sorvetes = JSON.parse(localStorage.getItem('sorvetes')) || [];
    sorvetes.push({ sabor, preco, descricao });
    
    localStorage.setItem('sorvetes', JSON.stringify(sorvetes));
    atualizarTabela();
});

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
        cellActions.innerHTML = `<button onclick="excluirSorvete(${index})">Excluir</button>`;
    });
}

function excluirSorvete(index) {
    let sorvetes = JSON.parse(localStorage.getItem('sorvetes')) || [];
    sorvetes.splice(index, 1);
    localStorage.setItem('sorvetes', JSON.stringify(sorvetes));
    atualizarTabela();
}

document.addEventListener('DOMContentLoaded', atualizarTabela);
