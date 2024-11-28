// Menu Toggle

const toggle = document.querySelector(".toggle")
const asideMenu = document.getElementById("aside-menu")
const mainContent = document.getElementById("main-content")

toggle.addEventListener("click", () => {
    asideMenu.classList.toggle("active")
    mainContent.classList.toggle("active")
});
// Selecão de elementos do formulário
const price = document.getElementById("price")
const expenseList = document.getElementById("expense-list")
const form = document.querySelector("form")
const materialSelect = document.getElementById("materialSelect")
const expenseQuantity = document.querySelector(".expense-quantity")
const expenseAmount = document.querySelector(".expense-amount")

// Função para carregar os insumos salvos no localStorage e aparecer no select
function loadMaterialsIntoSelect() {
    // Recupera os dados do localStorage
    const materialData = JSON.parse(localStorage.getItem("materials")) || [];

    // Limpa as opções existentes
    materialSelect.innerHTML = '<option value="" disabled selected>Escolha um Insumo</option>';

    // Cria as novas opções com base nos produtos salvos
    materialData.forEach(material => {
        const option = document.createElement("option");
        option.value = material.name; // Valor da opção será o nome do insumo
        option.textContent = material.name; // Texto visível será o nome do insumo

        // Adiciona a opção ao select
        materialSelect.appendChild(option);
    });
}

// Função para converter valor em moeda
function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

// Função para capturar o evento do input de valor e formata-lo para moeda
price.oninput = function() {
    let value = price.value.replace(/[^0-9]/g, "")

    value = Number(value) / 100

    price.value = formatCurrency(value)
}

// Função para gerar um id único
function generateId() {
    let lastId = localStorage.getItem("lastId")

    if (lastId === null) {
        lastId = 0
    } else {
        lastId = Number(lastId) + 1
    }

    localStorage.setItem("lastId", lastId)

    return lastId
}

// Função para formatar a data
function formatDate(date) {
    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

// Capturar o evento de submit do formulário
form.onsubmit = function(event) {
    event.preventDefault();

    const newExpense = {
        id: generateId(),
        material: materialSelect.value,
        quantity: quantity.value,
        price: price.value,
        createAt: formatDate(new Date())
    }
    saveExpense(newExpense)
}

// Função para carregar as despesas que ja foram salvas localStorage
function loadExpense() {
    // Recupera os dados do localStorage
    const expenseData = JSON.parse(localStorage.getItem("expensess")) || [];

    // Percorre a lista de receitas e adiciona cada uma ao HTML
    expenseData.forEach(expense => {
        const expenseItem = 
        `
                        <li class="expense-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Produto</strong>
                                <span>${expense.material}</span>
                            </div>
                            <div>
                                <strong>Quantidade</strong>
                                <span>${expense.quantity} unidades</span>
                            </div>
                            <div>
                                <strong>Preço unitário</strong>
                                <span>R$ ${expense.price.replace("R$", "")}</span>
                            </div>
                            <div>
                                <strong>Data do Registro</strong>
                                <span>${expense.createAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `
        expenseList.innerHTML += expenseItem

        
    })
}

// Função para salvar a receita no localStorage
function saveExpense(newExpense) {
    try {
        // Recupera os dados existentes no localStorage ou array vazio se não houver nada
        const expenseData = JSON.parse(localStorage.getItem("expensess")) || []

        // Adiciona a receita registrada à lista de receitas
        expenseData.push(newExpense)

        // Salva a lista de receitas no localStorage
        localStorage.setItem("expensess", JSON.stringify(expenseData))

        const expenseItem = 
        `
                        <li class="expense-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Produto</strong>
                                <span>${newExpense.material}</span>
                            </div>
                            <div>
                                <strong>Quantidade</strong>
                                <span>${newExpense.quantity} unidades</span>
                            </div>
                            <div>
                                <strong>Preço unitário</strong>
                                <span>R$ ${newExpense.price.replace("R$", "")}</span>
                            </div>
                            <div>
                                <strong>Data do Registro</strong>
                                <span>${newExpense.createAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `

        expenseList.innerHTML += expenseItem

        alert("Despesa salva com sucesso!")

        updateTotal()

        form.reset()

    } catch (error) {
        alert("Erro ao salvar a despesa")
        console.error(error)
    }
}

// Atualiza os totais da receita
function updateTotal() {
    try {
        // Recupera todos os itens da lista
        const items = expenseList.children
        
        // Atualiza a quantidade da lista
        expenseQuantity.textContent = 
        `
            ${items.length} ${items.length > 1 ? "despesas cadastradas" : "despesa cadastrada"}
        `

        // Criar variavel para incrementar o total
        let total = 0
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-info div:nth-child(4) span")

            // Remove caracteres não numéricos e converte para número
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            // Converter o valor para float
            value = parseFloat(value)

            //Verificar se é um número válido
            if (isNaN(value)) {
                alert("O valor não é um número")
            }

            // Incrementa o total
            total += Number(value)

        }
        // Atualiza o total
        

        expenseAmount.textContent = formatCurrency(total)





    } catch (error) {
        alert("Erro ao atualizar o total")
        console.error(error)
    }
}

// Chama a função para carregar os produtos no select assim que a página carregar
window.onload = function() {
    loadMaterialsIntoSelect();
    loadExpense();
    updateTotal();
};