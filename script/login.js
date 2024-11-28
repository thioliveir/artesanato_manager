// Função de alternar visibilidade da senha (não alterada)
function togglePassword(id, showIconId, hiddenIconId) {
    const passwordElement = document.getElementById(id);
    const type = passwordElement.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordElement.setAttribute("type", type);

    const showPassword = document.getElementById(showIconId);
    const hiddenPassword = document.getElementById(hiddenIconId);

    if (type === "text") {
        hiddenPassword.style.display = "inline";
        showPassword.style.display = "none";
    } else {
        showPassword.style.display = "inline";
        hiddenPassword.style.display = "none";
    }
}

// Verificar requisitos de senha
function checkPasswordRequirements() {
    updatePasswordStatus('new-password', 'repeat-password');
}

function updatePasswordStatus(passwordFieldId, confirmPasswordFieldId) {
    // Obtém os elementos de senha
    const typedPassword = document.getElementById(passwordFieldId).value;
    const passwordConfirmationField = document.getElementById(confirmPasswordFieldId);

    // Obtém os itens da lista de requisitos
    const passwordRequeriments = document.querySelectorAll(".passwordRequeriments-item");

    // Verifica os requisitos
    const validationResult = verifyPasswordRequirements(typedPassword);

    // Atualiza os itens da lista com base na validação
    updatePasswordRequerimentsItemState(passwordRequeriments[0], validationResult.minLength);
    updatePasswordRequerimentsItemState(passwordRequeriments[1], validationResult.hasDigit);
    updatePasswordRequerimentsItemState(passwordRequeriments[2], validationResult.hasSpecialCharacter);

   
}

// Função para verificar os requisitos da senha
function verifyPasswordRequirements(password) {
    const digit = /\d/g;
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/g;
    const minLength = password.length >= 8;

    const hasDigit = digit.test(password);
    const hasSpecialCharacter = specialCharacter.test(password);
    const isValid = minLength && hasDigit && hasSpecialCharacter;

    return { minLength, hasDigit, hasSpecialCharacter, isValid };
}

// Função para atualizar os estados da lista de requisitos
function updatePasswordRequerimentsItemState(listItem, isClass) {
    const validClass = "verificationClass"
    if (isClass) {
        listItem.classList.add(validClass)
    } else {
        listItem.classList.remove(validClass)
    }
}

// Slide-in entre Login e Register
const loginAcess = document.getElementById("login")
const buttonRegister = document.getElementById("button-register")
const buttonLogin = document.getElementById("button-login")

buttonRegister.addEventListener('click', () => {
    loginAcess.classList.add("active")
    const alertRegister = document.getElementById("user-register")
    const alertInvalid = document.getElementById("user-invalid")
    alertRegister.style.opacity = "0"
    alertInvalid.style.opacity = "0"
});

buttonLogin.addEventListener('click', () => {
    loginAcess.classList.remove("active")
    const differentPassword = document.getElementById("different-password")
    const allInputs = document.getElementById("all-inputs")
    const passwordInvalid = document.getElementById("password-invalid")
    differentPassword.style.opacity = "0"
    allInputs.style.opacity = "0"
    passwordInvalid.style.opacity = "0"
});

// Função para verificar quanto ao cadastro se a senha atende aos requisitos
function isPasswordValid(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password);
}


// Login de usuário (Local Storage)
document.addEventListener("DOMContentLoaded", () => {
    const user = (element) => document.querySelector(element)

    user("#login-form").addEventListener("submit", (e) => {
        e.preventDefault()

        const alertRegister = document.getElementById("user-register")
        const alertInvalid = document.getElementById("user-invalid")

        alertRegister.style.opacity = "0"
        alertInvalid.style.opacity = "0"

        const verification = localStorage.getItem("usuario")
        if(!verification){
            alertRegister.style.opacity = "1"
            return
        }

        const userRegistrated = JSON.parse(verification)
        const { password } = userRegistrated

        const corretPassword = password === user("#login-password").value

        if(!corretPassword){
            alertInvalid.style.opacity = "1"
            return
        }

        if(localStorage.getItem("token") === null) {
            window.location.href = "index.html"
        }


        /*const name = user("#name").value
        const email = user("#email").value
        const password = user("#new-password").value

        if (name && email && password) {
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)

            user("#login-form").reset()
            alert("Usuário cadastrado com sucesso!")
        } else {
            alert("Preencha todos os campos!")
        } */
    });
})

// Registro de usuário (Local Storage)

document.addEventListener("DOMContentLoaded", () => {
    const userSelector = (element) => document.querySelector(element);

    userSelector("#register-form").addEventListener("submit", (e) => {
        e.preventDefault();

        // Captura os valores dos campos
        const name = userSelector("#name").value.trim();
        const position = userSelector("#position").value.trim();
        const email = userSelector("#register-email").value.trim();
        const password = userSelector("#new-password").value.trim();
        const confirmPassword = userSelector("#repeat-password").value.trim();

        // Seleciona as mensagens de erro
        const differentPassword = document.getElementById("different-password");
        const allInputs = document.getElementById("all-inputs");
        const invalidPassword = document.getElementById("password-invalid");

        // Reseta as mensagens de erro
        allInputs.style.opacity = "0";
        invalidPassword.style.opacity = "0";
        differentPassword.style.opacity = "0";

        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!name || !position || !email || !password || !confirmPassword) {
            allInputs.style.opacity = "1";
            return;
        }

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            differentPassword.style.opacity = "1";
            return;
        }

        // Verifica se a senha é válida (utilize a função `isPasswordValid` conforme necessário)
        if (!isPasswordValid(password)) {
            invalidPassword.style.opacity = "1";
            return;
        }

        // Salva o usuário no localStorage
        const userRegistrated = {
            name,
            email,
            position,
            password
        };

        localStorage.setItem("usuario", JSON.stringify(userRegistrated));

        alert("Usuário cadastrado com sucesso!");
        window.location.href = "index.html";
    });
});


/*
document.addEventListener("DOMContentLoaded", () => {
    const userSelector = (element) => document.querySelector(element)

    userSelector("#register-form").addEventListener("submit", (e) => {
        e.preventDefault()

        const name = userSelector("#name").value
        const position = userSelector("#position").value
        const email = userSelector("#login-email").value
        const password = userSelector("#new-password").value
        const confirmPassword = userSelector("#repeat-password").value
        const differentPassword = document.getElementById("different-password")
        const allInputs = document.getElementById("all-inputs")
        const invalidPassword = document.getElementById("password-invalid")

        if(password !== confirmPassword) {
            allInputs.style.opacity = "0"
            invalidPassword.style.opacity = "0"
            differentPassword.style.opacity = "1"
            return
        }

        if (name.trim() === "" || email.trim() === "" || position === "" || password.trim() === "") {
            allInputs.style.opacity = "1"
            invalidPassword.style.opacity = "0"
            differentPassword.style.opacity = "0"
            return
        }

        if (!isPasswordValid(password)) {
            allInputs.style.opacity = "0"
            differentPassword.style.opacity = "0"
            invalidPassword.style.opacity = "1"
            return
        }

        const userRegistrated = {
            name,
            email,
            position,
            password,
            confirmPassword
        };

        const user = JSON.stringify(userRegistrated)
        localStorage.setItem("usuario", user)

        alert("Usuário cadastrado com sucesso!")
        window.location.href = "index.html"



    })
})
    */
