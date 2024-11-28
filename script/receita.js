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
const incomeList = document.getElementById("income-list")
const form = document.querySelector("form")
const clientSelect = document.getElementById("clientSelect")
const productSelect = document.getElementById("productSelect")


// Função para carregar os clientes salvos no localStorage e aparecer no select
function loadClientsIntoSelect() {
    // Recupera os dados do localStorage
    const clientData = JSON.parse(localStorage.getItem("clients")) || [];

    // Limpa as opções existentes
    clientSelect.innerHTML = '<option value="" disabled selected>Escolha um Cliente</option>';

    // Cria as novas opções com base nos clientes salvos
    clientData.forEach(client => {
        const option = document.createElement("option");
        option.value = client.name
        option.textContent = client.name

        clientSelect.appendChild(option);
    });
}

// Função para capturar o evento do input de valor e formata-lo para moeda
price.oninput = function() {
    let value = price.value.replace(/[^0-9]/g, "")

    value = Number(value) / 100

    price.value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

// Função para carregar os produtos salvos no localStorage e aparecer no select
function loadProductsIntoSelect() {
    // Recupera os dados do localStorage
    const productData = JSON.parse(localStorage.getItem("products")) || [];

    // Limpa as opções existentes
    productSelect.innerHTML = '<option value="" disabled selected>Escolha um Produto</option>';

    // Cria as novas opções com base nos produtos salvos
    productData.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name; // Valor da opção será o id do produto
        option.textContent = product.name; // Texto visível será o nome do produto

        // Adiciona a opção ao select
        productSelect.appendChild(option);
    });
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

// Função para carregar as receitas que ja foram salvas localStorage
function loadIncome() {
    // Recupera os dados do localStorage
    const incomeData = JSON.parse(localStorage.getItem("incomes")) || [];

    // Percorre a lista de receitas e adiciona cada uma ao HTML
    incomeData.forEach(income => {
        const incomeItem = 
        `
                        <li class="income-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Produto</strong>
                                <span>${income.product}</span>
                            </div>
                            <div>
                                <strong>Quantidade</strong>
                                <span>${income.quantity} unidades</span>
                            </div>
                            <div>
                                <strong>Preço unitário</strong>
                                <span>R$ ${income.price.replace("R$", "")}</span>
                            </div>
                            <div>
                                <strong>Cliente</strong>
                                <span>${income.client}</span>
                            </div>
                            <div>
                                <strong>Data do Registro</strong>
                                <span>${income.createAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `
        incomeList.innerHTML += incomeItem
    })
}

// Função para salvar a receita no localStorage
function saveIncome(newIncome) {
    try {
        // Recupera os dados existentes no localStorage ou array vazio se não houver nada
        const incomeData = JSON.parse(localStorage.getItem("incomes")) || []

        // Adiciona a receita registrada à lista de receitas
        incomeData.push(newIncome)

        // Salva a lista de receitas no localStorage
        localStorage.setItem("incomes", JSON.stringify(incomeData))

        const incomeItem = 
        `
                        <li class="income-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Produto</strong>
                                <span>${newIncome.product}</span>
                            </div>
                            <div>
                                <strong>Quantidade</strong>
                                <span>${newIncome.quantity} unidades</span>
                            </div>
                            <div>
                                <strong>Preço unitário</strong>
                                <span>R$ ${newIncome.price.replace("R$", "")}</span>
                            </div>
                            <div>
                                <strong>Cliente</strong>
                                <span>${newIncome.client}</span>
                            </div>
                            <div>
                                <strong>Data do Registro</strong>
                                <span>${newIncome.createAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `

        incomeList.innerHTML += incomeItem

        alert("Receita salva com sucesso!")

        form.reset()

    } catch (error) {
        alert("Erro ao salvar a receita")
        console.error(error)
    }
}

// Capturar o evento de submit do formulário
form.onsubmit = function(event) {
    event.preventDefault();

    const newIncome = {
        id: generateId(),
        product: productSelect.value,
        quantity: quantity.value,
        price: price.value,
        client: clientSelect.value,
        createAt: formatDate(new Date())
    }
    saveIncome(newIncome)
}

// Chama a função para carregar os produtos no select assim que a página carregar
window.onload = function() {
    loadProductsIntoSelect();
    loadClientsIntoSelect();
    loadIncome();
};



// Verifica quais objetos estão salvos no localStorage
/*
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // pega a chave
    const value = localStorage.getItem(key); // pega o valor correspondente à chave
    console.log(key, value); // mostra no console
}
*/
