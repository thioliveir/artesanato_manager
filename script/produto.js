// Menu Toggle

const toggle = document.querySelector(".toggle")
const asideMenu = document.getElementById("aside-menu")
const mainContent = document.getElementById("main-content")

toggle.addEventListener("click", () => {
    asideMenu.classList.toggle("active")
    mainContent.classList.toggle("active")
});

// FORMULARIO DE REGISTRO PRODUTO

// Selecionar os elementos do formulário
const form = document.querySelector("form")
const productName = document.getElementById("product-name")
const productImg = document.getElementById("product-img")
const costPrice = document.getElementById("cost-price")
const productList = document.getElementById("product-list")

// Função para gerar um ID único
function generateId() {
    let lastId = localStorage.getItem("lastId")

    if (lastId === null) {
        lastId = 1
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
        year: "numeric",
    })
}

//Capturar o evento de seleção de imagem
productImg.onchange = function (event) {
    const file = event.target.files[0] // Obter o primeiro arquivo selecionado

    // Verificar se há arquivo selecionado
    if (file) {
        const reader = new FileReader() // Instanciar um objeto FileReader

        //Quando o arquivo for carregado, salvar a URL da imagem no campo de imagem
        reader.onload = function(e) {
            //Armazena a URL da imagem no campo de imagem
            newProduct.image = e.target.result
        }

        reader.readAsDataURL(file) // Ler o arquivo como uma URL
    }

}

// Capturar o evento do input de valor para formata-lo
costPrice.oninput = function () {
    let value = costPrice.value.replace(/[^0-9]/g, "")

    // Transformando em centavos
    value = Number(value) / 100

    // Formatando o valor
    costPrice.value = formatCurrencyBRL(value)
}

// Função para formatar o valor do produto em reais
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

// Função para carregar os produtos salvos no localStorage
function loadProducts() {
    const productData = JSON.parse(localStorage.getItem("products")) || [];

    // Percorre a lista de produtos e adiciona cada um ao HTML
    productData.forEach(product => {
        const productItem = 
        `
                        <li class="product-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Nome do Produto</strong>
                                <span>${product.name}</span>
                            </div>
                            <div>
                                <strong>Foto do Produto</strong>
                                <img src="${product.image}" alt="ícone de foto do produto">
                            </div>
                            <div>
                                <strong>Preço custo</strong>
                                <span>R$ ${product.costPrice.replace("R$", "")}</span>
                            </div>
                            <div>
                                <strong>Data de Cadastro</strong>
                                <span>${product.createdAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `;
        productList.innerHTML += productItem;
    });
}
window.onload = loadProducts

// Salvar o produto no localStorage
function saveProduct(newProduct) {
    try {
        // Recupera os dados existentes no localStorage ou array vazio se não houver nada
        const productData = JSON.parse(localStorage.getItem("products")) || [];
        // Adiciona o novo produto à lista de produtos
        productData.push(newProduct)
        // Salva a lista de produtos no localStorage
        localStorage.setItem("products", JSON.stringify(productData))

        const productItem = 
        `
                        <li class="product-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Nome do Produto</strong>
                                <span>${newProduct.name}</span>
                            </div>
                            <div>
                                <strong>Foto do Produto</strong>
                                <img src="${newProduct.image}" alt="ícone de foto do produto">
                            </div>
                            <div>
                                <strong>Preço custo</strong>
                                <span>R$ ${newProduct.costPrice.replace("R$", "")}</span>
                            </div>
                            <div>
                                <strong>Data de Cadastro</strong>
                                <span>${newProduct.createdAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `;

        productList.innerHTML += productItem

        alert("Produto salvo com sucesso")

        //Reseta o formulário após o envio
        form.reset()


    } catch (error) {
        alert("Erro ao salvar o produto")
        console.error(error)
    }
}

// Capturar o evento de submit do formulário
form.onsubmit = function (event) {
    event.preventDefault()

    const newProduct = {
        id: generateId(),
        name: productName.value,
        image: productImg.value,
        costPrice: costPrice.value,
        createdAt: formatDate(new Date())
    }

    saveProduct(newProduct)
}