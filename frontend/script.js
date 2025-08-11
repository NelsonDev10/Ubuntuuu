// script.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const loginButton = document.querySelector('.vintage-button');
    
    // Efectos de foco en los inputs
    const inputs = document.querySelectorAll('.vintage-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Validación del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Limpiar mensajes de error previos
        clearErrors();
        
        // Validaciones
        let isValid = true;
        
        if (username === '') {
            showError(usernameInput, 'El usuario es requerido');
            isValid = false;
        } else if (username.length < 3) {
            showError(usernameInput, 'El usuario debe tener al menos 3 caracteres');
            isValid = false;
        }
        
        if (password === '') {
            showError(passwordInput, 'La contraseña es requerida');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }
        
        if (isValid) {
            // Simular proceso de login
            performLogin(username, password, rememberCheckbox.checked);
        }
    });
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        
        // Crear elemento de error si no existe
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#D32F2F';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-10px)';
        errorElement.style.transition = 'all 0.3s ease';
        
        // Animar la aparición del error
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
        
        // Añadir clase de error al input
        input.style.borderBottomColor = '#D32F2F';
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        inputs.forEach(input => {
            input.style.borderBottomColor = '#CD853F';
        });
    }
    
    function performLogin(username, password, remember) {
        // Cambiar estado del botón a cargando
        loginButton.disabled = true;
        loginButton.innerHTML = '<span class="button-text">Iniciando Sesión...</span><div class="button-shine"></div>';
        
        // Simular delay de login
        setTimeout(() => {
            // Aquí normalmente harías la petición al servidor
            console.log('Login attempt:', {
                username: username,
                password: password,
                remember: remember
            });
            
            // Simular login exitoso
            showSuccessMessage();
            
            // Resetear botón después del éxito
            setTimeout(() => {
                loginButton.disabled = false;
                loginButton.innerHTML = '<span class="button-text">Iniciar Sesión</span><div class="button-shine"></div>';
            }, 2000);
            
        }, 1500);
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = '✓ ¡Login exitoso! Redirigiendo...';
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(145deg, #4CAF50, #45a049);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 6px 15px rgba(76, 175, 80, 0.3);
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        // Animar entrada
        setTimeout(() => {
            successDiv.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            successDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 3000);
    }
    
    // Efectos adicionales
    const ornaments = document.querySelectorAll('.ornament');
    ornaments.forEach((ornament, index) => {
        ornament.style.animationDelay = `${index * 0.1}s`;
        ornament.style.animation = 'fadeInUp 0.8s ease-out forwards';
    });
    
    // Efecto de partículas sutiles (opcional)
    createFloatingParticles();
    
    function createFloatingParticles() {
        const particleCount = 15;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(139, 69, 19, 0.1);
                border-radius: 50%;
                pointer-events: none;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
        }
        
        // Añadir keyframes para la animación de flotación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.1;
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                    opacity: 0.3;
                }
            }
        `;
        document.head.appendChild(style);
    }
});