var vida = 4; // armazena a quantidade de vidas perdida pelo utilziador
var pontos = 0; // armazena a quantidade de pontos obtido pelo jogador
var guardarElemento = null // guarda o primeiro elemento para posteriormente ser utilizado 
var descricaoImagemUm = null; // alt da imagem para ser comparado no fim
var lockVirar = false; 

function verificarIgualdade(element) {
    if(lockVirar)return;
    if (element.getAttribute("data-matched") === "true" ) {
        return; // Return early if the card is already matched
    }
    if (descricaoImagemUm === null) {
        descricaoImagemUm = element.alt; // Armazena o valor do atributo 'alt' da imagem clicada
        guardarElemento = element
        virarCard(element);
    } else if(guardarElemento === element){
        virarCard(element)
        guardarElemento = null
        descricaoImagemUm = null
    }
    else {
        const descricaoImagemDois = element.alt; // Armazena o valor do atributo 'alt' da segunda imagem clicada
        virarCard(element);
        if (descricaoImagemUm === descricaoImagemDois) {
            element.setAttribute("data-matched", "true");
            guardarElemento.setAttribute("data-matched", "true");
            console.log("Par de imagens igual encontrado!");
            pontos = pontos + 1;
            mostrarVitoria();
        } else {
            console.log("Par de imagens diferente.");
            vida = vida - 1;
            mostrarErros();
            lockVirar = true;
            setTimeout(function(){
            virarCard(guardarElemento)
            virarCard(element)
            lockVirar = false;
            }, 1000);
            }
        descricaoImagemUm = null; // Reseta a variável para que a próxima rodada comece novamente
        }  
}

function virarCard(element) {
    if(element.style.opacity == "1"){
        element.style.opacity = "0"
    }else{
        element.style.opacity = "1"
    }
}

function mostrarErros() {
    document.getElementById('vidaCounter').innerText = vida
    if(vida == 0){
        console.log("teste")
        document.getElementById("pop-up-derrota").style.display = "block"
        document.getElementById("conteudo-completo").style.display = "none"
    }
}

function fecharPopUp(){
    location.reload()
}

function mostrarVitoria() {
    if(pontos == 4){
        console.log("você ganhou")
        document.getElementById("pop-up-vitoria").style.display = "block"
        document.getElementById("conteudo-completo").style.display = "none"
    }
}
