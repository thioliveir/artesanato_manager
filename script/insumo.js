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
const materialName = document.getElementById("material-name")
const materialImg = document.getElementById("material-img")
const materialList = document.getElementById("material-list")

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
materialImg.onchange = function (event) {
    const file = event.target.files[0] // Obter o primeiro arquivo selecionado

    // Verificar se há arquivo selecionado
    if (file) {
        const reader = new FileReader() // Instanciar um objeto FileReader

        //Quando o arquivo for carregado, salvar a URL da imagem no campo de imagem
        reader.onload = function(e) {
            //Armazena a URL da imagem no campo de imagem
            newMaterial.image = e.target.result
        }

        reader.readAsDataURL(file) // Ler o arquivo como uma URL
    }

}

// Função para carregar os produtos salvos no localStorage
function loadMaterial() {
    const materialData = JSON.parse(localStorage.getItem("materials")) || [];

    // Percorre a lista de produtos e adiciona cada um ao HTML
    materialData.forEach(material => {
        const materialItem = 
        `
                        <li class="material-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Nome do Insumo</strong>
                                <span>${material.name}</span>
                            </div>
                            <div>
                                <strong>Foto do Insumo</strong>
                                <img src="${material.image}" alt="ícone de foto do produto">
                            </div>
                            <div>
                                <strong>Data de Cadastro</strong>
                                <span>${material.createdAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `;
        materialList.innerHTML += materialItem;
    });
}
window.onload = loadMaterial

// Salvar o produto no localStorage
function saveMaterial(newMaterial) {
    try {
        // Recupera os dados existentes no localStorage ou array vazio se não houver nada
        const materialData = JSON.parse(localStorage.getItem("materials")) || [];
        // Adiciona o novo insumos à lista de produtos
        materialData.push(newMaterial)
        // Salva a lista de insumos no localStorage
        localStorage.setItem("materials", JSON.stringify(materialData))

        const materialItem = 
        `
                        <li class="material-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Nome do Insumo</strong>
                                <span>${newMaterial.name}</span>
                            </div>
                            <div>
                                <strong>Foto do Insumo</strong>
                                <img src="${newMaterial.image}" alt="ícone de foto do insumo">
                            </div>
                            <div>
                                <strong>Data de Cadastro</strong>
                                <span>${newMaterial.createdAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `;

        materialList.innerHTML += materialItem

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

    const newMaterial = {
        id: generateId(),
        name: materialName.value,
        image: materialImg.value,
        createdAt: formatDate(new Date())
    }

    saveMaterial(newMaterial)
}