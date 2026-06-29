var blocoLogin = document.getElementById("bloco-login");
var blocoCadastro = document.getElementById("bloco-cadastro");
var caixaErro = document.getElementById("mensagem-erro");
var caixaSucesso = document.getElementById("mensagem-sucesso");

// Função de redirecionamento — pode ser sobrescrita em testes
globalThis.redirecionar =
  globalThis.redirecionar ||
  function (url) {
    globalThis.location.assign(url);
  };

document
  .getElementById("link-ir-cadastro")
  .addEventListener("click", function (e) {
    e.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";
    blocoLogin.classList.add("escondido");
    blocoCadastro.classList.remove("escondido");
  });

document
  .getElementById("link-ir-login")
  .addEventListener("click", function (e) {
    e.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";
    blocoCadastro.classList.add("escondido");
    blocoLogin.classList.remove("escondido");
  });

document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";

    var email = document.getElementById("cad-email").value.trim();
    var senha = document.getElementById("cad-senha").value;

    var usuarios = JSON.parse(localStorage.getItem("usuarios_projeto")) || [];

    var usuarioExiste = false;
    for (let i = 0; i<usuarios.length && usuarioExiste===false; i++) {
      if (usuarios[i].email === email) {
        usuarioExiste = true;
      }
    }

    if (usuarioExiste) {
      caixaErro.innerText = "Este email ja esta cadastrado!";
      caixaErro.style.display = "block";
      return;
    }

    usuarios.push({ email: email, senha: senha });
    localStorage.setItem("usuarios_projeto", JSON.stringify(usuarios));

    caixaSucesso.innerText = "Cadastro realizado! Faca seu login.";
    caixaSucesso.style.display = "block";

    document.getElementById("cadastroForm").reset();
    blocoCadastro.classList.add("escondido");
    blocoLogin.classList.remove("escondido");
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    caixaErro.style.display = "none";
    caixaSucesso.style.display = "none";

    var emailDigitado = document.getElementById("login-email").value.trim();
    var senhaDigitada = document.getElementById("login-senha").value;

    var usuarios = JSON.parse(localStorage.getItem("usuarios_projeto")) || [];

    if (emailDigitado === "admin@email.com" && senhaDigitada === "123456") {
      globalThis.redirecionar("/?logado=true");
      return;
    }

    var contaValida = null;
    for (const usuario of usuarios) {
      if (
        usuario.email === emailDigitado &&
        usuario.senha === senhaDigitada
      ) {
        contaValida = usuario;
        break;
      }
    }

    if (contaValida) {
      globalThis.redirecionar("/?logado=true");
    } else {
      caixaErro.innerText = "Email ou senha incorretos.";
      caixaErro.style.display = "block";
    }
  });
