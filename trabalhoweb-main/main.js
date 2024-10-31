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

document.addEventListener('DOMContentLoaded', function() {
    exibirTabela();
});