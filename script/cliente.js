// Menu Toggle

const toggle = document.querySelector(".toggle")
const asideMenu = document.getElementById("aside-menu")
const mainContent = document.getElementById("main-content")

toggle.addEventListener("click", () => {
    asideMenu.classList.toggle("active")
    mainContent.classList.toggle("active")
});

// FORMULARIO DE REGISTRO

// Selecionar os elementos do formulário
const form = document.querySelector("form")
const fullName = document.getElementById("fullname")
const city = document.getElementById("city")
const state = document.getElementById("state")
const neighborhood = document.getElementById("neighborhood")
const clientList = document.getElementById("client-list")

// Função para gerar um ID único
function generateID() {
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
function formartDate(date) {
    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

// Função para carregar os clientes salvos no localStorage
function loadClients() {
    const clientData = JSON.parse(localStorage.getItem('clients')) || [];
    
    // Percorre a lista de clientes e adiciona cada um ao HTML
    clientData.forEach(client => {
        const clientItem = `
            <li class="client-info">
                <img src="Assets/icons/checked.svg" alt="ícone de checked">
                <div>
                    <strong>Nome do Cliente</strong>
                    <span>${client.name}</span>
                </div>
                <div>
                    <strong>Cidade</strong>
                    <span>${client.city}</span>
                </div>
                <div>
                    <strong>Estado</strong>
                    <span>${client.state}</span>
                </div>
                <div>
                    <strong>Bairro</strong>
                    <span>${client.neighborhood}</span>
                </div>
                <div>
                    <strong>Data de Cadastro</strong>
                    <span>${client.createdAt}</span>
                </div>
                <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
            </li>
        `;
        clientList.innerHTML += clientItem;

        
    });
}

// Chama a função de carregar os clientes quando a página carregar
window.onload = loadClients;


// Salvar os dados do formulário no localStorage
function saveClient(newClient) {
    try {

        // Recupera os dados existentes no localStorage ou um array vazio se não houver nada
        let clientData = JSON.parse(localStorage.getItem('clients')) || [];
        
        // Adiciona o novo cliente à lista de clientes
        clientData.push(newClient);
        
        // Salva a lista de clientes de volta no localStorage
        localStorage.setItem('clients', JSON.stringify(clientData));

        const clientItem = 
        `
                        <li class="client-info">
                            <img src="Assets/icons/checked.svg" alt="ícone de checked">
                            <div>
                                <strong>Nome do Cliente</strong>
                                <span>${newClient.name}</span>
                            </div>
                            <div>
                                <strong>Cidade</strong>
                                <span>${newClient.city}</span>
                            </div>
                            <div>
                                <strong>Estado</strong>
                                <span>${newClient.state}</span>
                            </div>
                            <div>
                                <strong>Bairro</strong>
                                <span>${newClient.neighborhood}</span>
                            </div>
                            <div>
                                <strong>Data de Cadastro</strong>
                                <span>${newClient.createdAt}</span>
                            </div>
                            <img class="remove-icon" src="Assets/icons/remove.svg" alt="ícone de remover">
                        </li>
        `
        clientList.innerHTML += clientItem

        // Reseta o formulário após o envio
        form.reset();
        

    } catch (error) {
        alert("Erro ao salvar os dados do cliente")
        console.log(error)
    }
}

// Capturar os dados do formulário
form.onsubmit = function(event) {
    event.preventDefault()

    const newClient = {
        id: generateID(),
        name: fullName.value,
        city: city.value,
        state: state.value,
        neighborhood: neighborhood.value,
        createdAt: formartDate(new Date())
    }

    saveClient(newClient)

    
}

