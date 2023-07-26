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
            pontos = pontos + 1;
            element.setAttribute("data-matched", "true");
            guardarElemento.setAttribute("data-matched", "true");
            console.log("Par de imagens igual encontrado!");
        } else {
            console.log("Par de imagens diferente.");
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
