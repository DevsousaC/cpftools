const checkBtn = document.querySelector('#check-btn')
const validationResult = document.querySelector('#validation-result')

$('#cpf-input').mask('000.000.000-00', {reverse: false}); // mascara para cpf

$(document).ready(function() { // impede que o usuario cole um texto no input

    $("#cpf-input").bind('paste', function(e) {
        e.preventDefault();
    });
});

checkBtn.addEventListener('click', () => {
    const writtenCpf =  document.querySelector('#cpf-input').value// recebe o cpf digitado

    function ValidateCpf(cpf){
        Object.defineProperty(this, 'cleanedCpf', {
            enumerable: true,
            get: function() {
                return cpf.replace(/\D+/g, '');  // retira qualquer caractere que não seja um numero
            }
        });
    }

    ValidateCpf.prototype.validate = function() {
        if(this.sequentialNumbers()) return this.format() + " é invalido"; // se o numero for uma sequencia ele se torna invalido

        const partialCpf = this.cleanedCpf.slice(0, -2); // retira os dois ultimos digitos
        const firstDigit = this.generateDigit(partialCpf); // recebe o primeiro digito verificado
        const secondDigit = this.generateDigit(partialCpf + firstDigit); // recebe o segundo digito verificado
        const cpfComplete = partialCpf + firstDigit + secondDigit;
        if(cpfComplete === this.cleanedCpf){ // caso seja verdadeiro o numero já formatado é considerado verdadeiro
            return this.format() + " é valido"
        } else {
            return this.format() + " é invalido"
        }
    }
    ValidateCpf.prototype.generateDigit = function(partialCpf){
        const cpfInArray = Array.from(partialCpf); // isola cada numero do cpf

        let regressiveNumber = cpfInArray.length + 1; // numero a ser usado na multiplicação.
        const someResult = cpfInArray.reduce((ac, val) => {
            ac += (regressiveNumber * Number(val)); // acumulador recebe a soma de ac e da multiplicação realizada
            regressiveNumber--; // subtrai o regressiveNumber em 1
            return ac
        }, 0)

        const digit = 11 - (someResult % 11); // calculo utilizado para encontrar o digito
        return digit > 9 ? '0' : String(digit);
    }
    ValidateCpf.prototype.sequentialNumbers = function(){
        const sequence = this.cleanedCpf[0].repeat(this.cleanedCpf.length)
        return sequence === this.cleanedCpf
    }
    ValidateCpf.prototype.format = function (){ // formata o cpf
        let cpfToFormated = this.cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // formata o cpf novamente
        return cpfToFormated
    }

    if(writtenCpf.length === 14){ // confere se o cpf tem um valor valido
        const validation = new ValidateCpf(writtenCpf)
        validationResult.innerHTML = validation.validate()
    } else{
        validationResult.innerHTML = 'Um cpf deve ter 11 digitos'
    };
})
