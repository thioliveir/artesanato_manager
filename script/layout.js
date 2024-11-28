// Menu Toggle

const toggle = document.querySelector(".toggle")
const asideMenu = document.getElementById("aside-menu")
const mainContent = document.getElementById("main-content")

toggle.addEventListener("click", () => {
    asideMenu.classList.toggle("active")
    mainContent.classList.toggle("active")
})

/*
// Menus Hovered
const menuItens = document.querySelectorAll("ul .menu_item")

function activeMenuItem() {
    // Remove a classe hovered de todos os itens do menu
    menuItens.forEach((item) => {
        item.classList.remove("hovered")
    });
    this.classList.add("hovered")
}
menuItens.forEach((item) => item.addEventListener("mouseover", activeMenuItem))


// Seleciona todos os itens do menu
const menuItens = document.querySelectorAll("ul .menu_item");

// Função para adicionar a classe hovered ao item que foi clicado
function setActiveMenuItem() {
    // Remove a classe hovered de todos os itens
    menuItens.forEach((item) => {
        item.classList.remove("hovered");
    });
    
    // Adiciona a classe hovered ao item clicado
    this.classList.add("hovered");
}

// Adiciona o evento 'mouseover' para o efeito de hover ao passar o mouse
menuItens.forEach((item) => {
    item.addEventListener("mouseover", function() {
        // Remove a classe 'hovered' de todos os itens antes de adicionar no atual
        menuItens.forEach((item) => {
            item.classList.remove("hovered");
        });
        this.classList.add("hovered");
    });
    
    // Adiciona o evento de click para marcar o item como ativo
    item.addEventListener("click", setActiveMenuItem);
});

// Função para manter o item ativo ao carregar a página (se já estiver clicado)
function setInitialActiveMenuItem() {
    const currentPage = window.location.pathname;
    
    menuItens.forEach((item) => {
        const link = item.querySelector("a"); // Supondo que cada item de menu tenha uma tag <a>
        if (link && currentPage.includes(link.getAttribute("href"))) {
            item.classList.add("hovered"); // Marca o item como ativo
        }
    });
}

// Chama a função para definir o item ativo ao carregar a página
setInitialActiveMenuItem();
*/