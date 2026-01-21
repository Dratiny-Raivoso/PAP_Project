// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar base de dados local
    if (!localStorage.getItem('users')) {
        // Criar base de dados inicial com alguns utilizadores de exemplo
        const initialUsers = {
            'admin': { password: 'admin123', email: 'admin@example.com' },
            'teste': { password: 'teste123', email: 'teste@example.com' }
        };
        localStorage.setItem('users', JSON.stringify(initialUsers));
    }
    
    // Se estiver na página de login
    if (document.getElementById('loginForm')) {
        
        let modoRegistro = false; // Controla se estamos em modo de criar conta
        
        // Funcionalidade do botão Criar Conta
        const botao = document.getElementById('meuBotao');
        const elementoParaEsconder = document.getElementById('elementoParaEsconder');
        const campoEmail = document.getElementById('emailField');
        const botaoEntrar = document.querySelector('.login-btn[type="submit"]');

        if (botao) {
            botao.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (!modoRegistro) {
                    // Mudar para modo de criar conta
                    modoRegistro = true;
                    
                    // Esconde o botão "Continuar sem Login"
                    if (elementoParaEsconder) {
                        elementoParaEsconder.style.display = 'none';
                    }
                    
                    // Mostra o campo de email
                    if (campoEmail) {
                        campoEmail.classList.remove('escondido');
                        campoEmail.style.display = 'block';
                    }
                    
                    // Mudar texto do botão
                    botao.textContent = 'Confirmar Registo';
                    botaoEntrar.style.display = 'none'; // Esconder botão Entrar
                    
                } else {
                    // Criar nova conta
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    const email = document.getElementById('email').value;
                    const errorMsg = document.getElementById('errorMsg');
                    
                    // Validações
                    if (!username || !password || !email) {
                        errorMsg.textContent = 'Preencha todos os campos!';
                        errorMsg.style.color = '#e74c3c';
                        return;
                    }
                    
                    if (password.length < 6) {
                        errorMsg.textContent = 'A password deve ter pelo menos 6 caracteres!';
                        errorMsg.style.color = '#e74c3c';
                        return;
                    }
                    
                    // Verificar se o email é válido
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        errorMsg.textContent = 'Email inválido!';
                        errorMsg.style.color = '#e74c3c';
                        return;
                    }
                    
                    // Carregar utilizadores existentes
                    const users = JSON.parse(localStorage.getItem('users'));
                    
                    // Verificar se o utilizador já existe
                    if (users[username]) {
                        errorMsg.textContent = 'Este utilizador já existe!';
                        errorMsg.style.color = '#e74c3c';
                        return;
                    }
                    
                    // Adicionar novo utilizador
                    users[username] = { password: password, email: email };
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    // Mostrar mensagem de sucesso
                    errorMsg.textContent = 'Conta criada com sucesso! Redirecionando...';
                    errorMsg.style.color = '#27ae60';
                    
                    // Redirecionar para a aplicação após 2 segundos
                    setTimeout(() => {
                        window.location.href = 'app.html';
                    }, 2000);
                }
            });
        }
        
        // Login form submit
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('errorMsg');
            
            // Carregar utilizadores da base de dados local
            const users = JSON.parse(localStorage.getItem('users'));
            
            if (users[username] && users[username].password === password) {
                window.location.href = 'app.html';
            } else {
                errorMsg.textContent = 'Utilizador ou password incorretos!';
                errorMsg.style.color = '#e74c3c';
            }
        });
    }
});

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