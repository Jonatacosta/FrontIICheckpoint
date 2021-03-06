//Capturando os campos do formulário
let campoEmailLogin = document.getElementById('inputEmail');
let campoSenhaLogin = document.getElementById('inputPassword');
let botaoSalvar = document.getElementById('botaoSalvar');

let campoEmailLoginNormalizado = campoEmailLogin.value;
let campoSenhaLoginNormalizado = campoSenhaLogin.value;

let emailEValido = false;

//Desabilita o botão ao iniciar a página
 botaoSalvar.setAttribute('disabled', true);
 botaoSalvar.innerText = "Bloqueado";


//Cria o objeto que representa o login do usuário
let loginUsuario = {
    email: "",
    password: ""
};
   

  
  
 
//Executa ao clicar no botão de Acessar
    botaoSalvar.addEventListener('click', function (evento) {

    //Se a validação passar, se for true o retorno da função....
    if (validaTelaDeLogin()) {
        evento.preventDefault();
        //Normalizando - Retirando os espaços em branco
        campoEmailLoginNormalizado = retiraEspacosDeUmValorInformado(campoEmailLogin.value);
        campoSenhaLoginNormalizado = retiraEspacosDeUmValorInformado(campoSenhaLogin.value);
        campoEmailLoginNormalizado = converteValorRecebidoEmMinusculo(campoEmailLoginNormalizado);

        loginUsuario.email = campoEmailLoginNormalizado;
        loginUsuario.password = campoSenhaLoginNormalizado;

        let loginUsuarioJson = JSON.stringify(loginUsuario);
        let urlappbaselogin = "https://ctd-todo-api.herokuapp.com/v1/users/login";
    
        let emailLogin = {
            method: "POST",
            headers : {
                'content-type':'application/json'
            },
            body : loginUsuarioJson
        };
    

    fetch(urlappbaselogin, emailLogin)
    .then(
        resultado => {
            return resultado.json();
        }
    )
    .then(
        resultado => {
            alert("logado com sucesso")
            console.log(resultado);
            
        }
    )
    .catch(
        erro =>{
            
            console.log(erro);
        }
    );

        

    //Se a validação NÃO passar, se for false o retorno da função....
    } else {
        evento.preventDefault();
        alert("Ambas as informações devem ser preenchidas");
    }

});

//Ao clicar e interagir com o campo de "email" no formulário
campoEmailLogin.addEventListener('blur', function () {
    //Capturando o elemento <Small> do html
    let emailValidacao = document.getElementById('emailValidacao');

    if (campoEmailLogin.value != "") {
        //Email tem informação
        emailValidacao.innerText = ""
        campoEmailLogin.style.border = ``
        emailEValido = true;
    } else {
        //Email está vazio
        emailValidacao.innerText = "Campo obrigatório"
        emailValidacao.style.color = "#E01E1E"
        emailValidacao.style.fontSize = "8"
        emailValidacao.style.fontWeight = "bold"
        campoEmailLogin.style.border = `1px solid #E01E1E`
        emailEValido = false;
    }
    validaTelaDeLogin();
});

function validaTelaDeLogin() {
    if (emailEValido) {
        botaoSalvar.removeAttribute('disabled')
        botaoSalvar.innerText = "Acessar"
        return true
    } else {
        botaoSalvar.setAttribute('disabled', true);
        botaoSalvar.innerText = "Bloqueado"
        return false
    }
}












