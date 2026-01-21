// DB
require("./db");

// Se estiver na página de login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('errorMsg');
        
        if (users[username] && users[username] === password) {
            window.location.href = 'app.html';
        } else {
            errorMsg.textContent = 'Utilizador ou password incorretos!';
        }
    });
}

function skipLogin() {
    window.location.href = 'app.html';
}

// JavaScript para a Aplicação Principal

function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(e) {
    const menu = document.getElementById('dropdownMenu');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (menu && !menu.contains(e.target) && e.target !== menuBtn) {
        menu.classList.remove('show');
    }
});

function showTab(tabNumber) {
    const menu = document.getElementById('dropdownMenu');
    const tabs = document.querySelectorAll('.tab');
    const headerTabs = document.querySelectorAll('.header-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    // Remover classe active de todos
    tabs.forEach(tab => tab.classList.remove('active'));
    headerTabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Adicionar classe active aos selecionados
    if (tabs[tabNumber - 1]) tabs[tabNumber - 1].classList.add('active');
    if (headerTabs[tabNumber - 1]) headerTabs[tabNumber - 1].classList.add('active');
    
    const selectedContent = document.getElementById('tab' + tabNumber);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Fechar o menu após selecionar
    if (menu) {
        menu.classList.remove('show');
    }
}

function logout() {
    window.location.href = 'index.html';
}