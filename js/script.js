// Função para alternar entre tabs com animação
function switchTab(tab) {
    const loginTab = document.getElementById('tab-login');
    const cadastroTab = document.getElementById('tab-cadastro');
    const loginForm = document.getElementById('form-login');
    const cadastroForm = document.getElementById('form-cadastro');

    if (tab === 'login') {
        loginTab.classList.add('tab-active');
        cadastroTab.classList.remove('tab-active');
        
        // Animações de transição
        cadastroForm.style.opacity = '0';
        cadastroForm.style.transform = 'translateX(30px)';
        setTimeout(() => {
            cadastroForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            loginForm.style.opacity = '0';
            loginForm.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                loginForm.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                loginForm.style.opacity = '1';
                loginForm.style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    } else {
        cadastroTab.classList.add('tab-active');
        loginTab.classList.remove('tab-active');
        
        // Animações de transição
        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            loginForm.classList.add('hidden');
            cadastroForm.classList.remove('hidden');
            cadastroForm.style.opacity = '0';
            cadastroForm.style.transform = 'translateX(30px)';
            setTimeout(() => {
                cadastroForm.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                cadastroForm.style.opacity = '1';
                cadastroForm.style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    }
}

// Função para alternar visibilidade da senha
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(inputId === 'login-password' ? 'login-eye' : 'cadastro-eye');
    
    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
        `;
    } else {
        input.type = 'password';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        `;
    }
}

// Função para verificar força da senha
function checkPasswordStrength(password) {
    const strengthDiv = document.getElementById('password-strength');
    const strength1 = document.getElementById('strength-1');
    const strength2 = document.getElementById('strength-2');
    const strength3 = document.getElementById('strength-3');
    const strength4 = document.getElementById('strength-4');
    const strengthText = document.getElementById('strength-text');
    
    if (password.length === 0) {
        strengthDiv.classList.add('hidden');
        return;
    }
    
    strengthDiv.classList.remove('hidden');
    
    let strength = 0;
    let text = '';
    let color = '';
    
    // Verificar comprimento
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    
    // Verificar maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    
    // Verificar números
    if (/\d/.test(password)) strength++;
    
    // Verificar caracteres especiais
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    // Resetar cores
    [strength1, strength2, strength3, strength4].forEach(bar => {
        bar.className = 'h-1 flex-1 rounded bg-gray-200';
    });
    
    // Aplicar cores baseado na força
    if (strength <= 1) {
        strength1.className += ' password-strength-weak';
        text = 'Senha fraca';
        color = 'text-red-500';
    } else if (strength === 2) {
        strength1.className += ' password-strength-fair';
        strength2.className += ' password-strength-fair';
        text = 'Senha razoável';
        color = 'text-yellow-500';
    } else if (strength === 3) {
        strength1.className += ' password-strength-good';
        strength2.className += ' password-strength-good';
        strength3.className += ' password-strength-good';
        text = 'Senha boa';
        color = 'text-blue-500';
    } else {
        strength1.className += ' password-strength-strong';
        strength2.className += ' password-strength-strong';
        strength3.className += ' password-strength-strong';
        strength4.className += ' password-strength-strong';
        text = 'Senha forte';
        color = 'text-green-500';
    }
    
    strengthText.textContent = text;
    strengthText.className = `text-xs mt-1 ${color} font-semibold`;
}

// Função para verificar se as senhas coincidem
function checkPasswordMatch() {
    const password = document.getElementById('cadastro-password').value;
    const confirmPassword = document.getElementById('cadastro-confirm-password').value;
    const matchIcon = document.getElementById('password-match-icon');
    const confirmInput = document.getElementById('cadastro-confirm-password');
    
    if (confirmPassword.length === 0) {
        matchIcon.classList.add('hidden');
        confirmInput.classList.remove('border-green-500');
        confirmInput.classList.remove('border-red-500');
        return;
    }
    
    if (password === confirmPassword) {
        matchIcon.classList.remove('hidden');
        confirmInput.classList.add('border-green-500');
        confirmInput.classList.remove('border-red-500');
    } else {
        matchIcon.classList.add('hidden');
        confirmInput.classList.remove('border-green-500');
        confirmInput.classList.add('border-red-500');
    }
}

// Função para validar email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Função para mostrar erro com animação
function showError(formType, message) {
    const errorDiv = document.getElementById(`${formType}-error`);
    const errorText = document.getElementById(`${formType}-error-text`);
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
    errorDiv.classList.add('animate-shake');
    
    // Scroll suave para o erro
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    setTimeout(() => {
        errorDiv.classList.remove('animate-shake');
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 5000);
    }, 500);
}

// Função para mostrar sucesso
function showSuccess() {
    const successDiv = document.getElementById('cadastro-success');
    successDiv.classList.remove('hidden');
    successDiv.classList.add('animate-bounce-in');
}

// Função para mostrar/ocultar loading
function setLoading(formType, isLoading) {
    const loadingDiv = document.getElementById(`${formType}-loading`);
    const submitBtn = document.getElementById(`${formType}-submit-btn`);
    
    if (isLoading) {
        loadingDiv.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        loadingDiv.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Função para salvar usuário no localStorage
function saveUser(email, password, nome) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = {
        email: email,
        password: password,
        nome: nome,
        createdAt: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para verificar credenciais
function verifyCredentials(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email && user.password === password);
}

// Função para salvar sessão
function saveSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
}

// Função para redirecionar ao dashboard
function redirectToDashboard() {
    const dashboardPath = './my-vue-dashboard/index.html';
    window.location.href = dashboardPath;
}

// Handler do formulário de login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    // Validações
    if (!isValidEmail(email)) {
        showError('login', 'Por favor, insira um email válido.');
        return;
    }

    if (password.length < 6) {
        showError('login', 'A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    // Mostrar loading
    setLoading('login', true);

    // Simular delay de requisição (remover em produção)
    setTimeout(() => {
        // Verificar credenciais
        const user = verifyCredentials(email, password);
        
        setLoading('login', false);
        
        if (user) {
            saveSession(user);
            
            // Animação de sucesso
            const submitBtn = document.getElementById('login-submit-btn');
            submitBtn.classList.add('btn-success');
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Sucesso!
            `;
            
            setTimeout(() => {
                redirectToDashboard();
            }, 1000);
        } else {
            showError('login', 'Email ou senha incorretos. Verifique suas credenciais.');
        }
    }, 800);
}

// Handler do formulário de cadastro
function handleCadastro(event) {
    event.preventDefault();
    
    const nome = document.getElementById('cadastro-nome').value.trim();
    const email = document.getElementById('cadastro-email').value.trim();
    const password = document.getElementById('cadastro-password').value;
    const confirmPassword = document.getElementById('cadastro-confirm-password').value;

    // Validações
    if (nome.length < 3) {
        showError('cadastro', 'O nome deve ter pelo menos 3 caracteres.');
        return;
    }

    if (!isValidEmail(email)) {
        showError('cadastro', 'Por favor, insira um email válido.');
        return;
    }

    if (password.length < 6) {
        showError('cadastro', 'A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    if (password !== confirmPassword) {
        showError('cadastro', 'As senhas não coincidem.');
        return;
    }

    // Verificar se o email já existe
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(user => user.email === email)) {
        showError('cadastro', 'Este email já está cadastrado. Faça login ou use outro email.');
        return;
    }

    // Mostrar loading
    setLoading('cadastro', true);

    // Simular delay de requisição (remover em produção)
    setTimeout(() => {
        // Salvar usuário
        saveUser(email, password, nome);
        
        // Salvar sessão
        const newUser = { email, nome };
        saveSession(newUser);
        
        setLoading('cadastro', false);
        showSuccess();
        
        // Animação de sucesso no botão
        const submitBtn = document.getElementById('cadastro-submit-btn');
        submitBtn.classList.add('btn-success');
        submitBtn.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Conta Criada!
        `;
        
        // Limpar formulário
        document.getElementById('cadastroForm').reset();
        document.getElementById('password-strength').classList.add('hidden');
        document.getElementById('password-match-icon').classList.add('hidden');
        
        setTimeout(() => {
            redirectToDashboard();
        }, 1500);
    }, 800);
}

// Verificar se já está logado ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // Opcional: redirecionar automaticamente se já estiver logado
        // redirectToDashboard();
    }
    
    // Adicionar animações de entrada aos elementos
    const forms = document.querySelectorAll('#form-login, #form-cadastro');
    forms.forEach((form, index) => {
        form.style.opacity = '0';
        setTimeout(() => {
            form.style.transition = 'opacity 0.6s ease-out';
            form.style.opacity = '1';
        }, index * 100);
    });
});
