// gerador de cpf já validado

function GenerateCpf(state, boolean){
    Object.defineProperties(this, {
        state: { // representa o 9 numero de acordo com o estado de origem do cpf desejado
            enumerable: true,
            get: function(){
                return state > 9 ? this.generateNumber() : state
            }
        },
        mask: { // confirma se o cpf deve ser formatado ou não
            enumerable: true,
            value: boolean
        }
    })
}

GenerateCpf.prototype.generate = function(){ // responsavel por criar todo o cpf
    const partialCpf = `${this.generateNumber()}${this.generateNumber()}${this.generateNumber()}${this.generateNumber()}${this.generateNumber()}${this.generateNumber()}${this.generateNumber()}${this.generateNumber()}${this.state}`
    // gera os 9 primeiros digitos do cpf

    const firstDigit = this.generateDigit(partialCpf); // recebe o primeiro digito verificado
    const secondDigit = this.generateDigit(partialCpf + firstDigit); // recebe o segundo digito verificado
    const cpfComplete = `${partialCpf}${firstDigit}${secondDigit}`;
    if(this.mask === true){
        return(this.format(String(cpfComplete)))
    } else if(this.mask === false){
       return cpfComplete
    }
}

GenerateCpf.prototype.generateNumber = function(){ // retorna um numero aleatorio de 0 a 9
    return Math.floor(Math.random() * 9)
}
GenerateCpf.prototype.generateDigit = function(partialCpf){ // retorna um digito de acordo com os numeros fornecidos
    const cpfInArray = Array.from(partialCpf); // isola cada numero do cpf

    let regressiveNumber = cpfInArray.length + 1; // numero a ser usado na multiplicação. 10 ou 11
        const someResult = cpfInArray.reduce((ac, val) => {
            ac += (regressiveNumber * Number(val)); // acumulador recebe a soma de ac e da multiplicação realizada
            regressiveNumber--; // subtrai o regressiveNumber em 1
            return ac
        }, 0)
        
        const digit = 11 - (someResult % 11); // calculo utilizado para encontrar o digito
        return digit > 9 ? '0' : String(digit);
}
GenerateCpf.prototype.format = function(cpfComplete){ // formata o cpf caso seja necessario
        return cpfComplete.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

const confirmRadio = document.querySelectorAll('.select-radio-area__radio')
let containMask = true
confirmRadio.forEach((button) => { // seleciona o radio ativo
    button.addEventListener('click', evt => {
        for(i = 0; i < 2; i++){
            confirmRadio[i].classList.remove('radio-checked')
        }
        evt.target.classList.add('radio-checked')
        if(evt.target.classList.contains('yes-radio')){
            containMask = true
        } else{
            containMask = false
           
        }
    })
})

const generateButton = document.querySelector('#generate-btn')
const stateSelected = document.querySelector('#state-area__state')
const generateResult = document.querySelector('#generate-result')

generateButton.addEventListener('click', () => {
    const cpfGenerated = new GenerateCpf(stateSelected.value, containMask)
    
    generateResult.innerHTML = cpfGenerated.generate()
})

const cpfGenerated1 = new GenerateCpf(stateSelected.value, containMask)
    console.log(cpfGenerated1.generate())

