class Utils {
    constructor() {
        this.cardNumber = this.generateCardNumber();
        this.cvc = this.generateCVC();
        this.expirationDate = this.generateExpirationDate();
    }

    generateCardNumber() {
        const cardNumber = [];
        
        // Gerar os primeiros 15 dígitos aleatórios
        for (let i = 0; i < 15; i++) {
            cardNumber.push(Math.floor(Math.random() * 10));
        }

        // Calcular o dígito verificador usando o algoritmo de Luhn
        const luhnChecksum = this.calculateLuhnCheck(cardNumber);
        cardNumber.push(luhnChecksum);

        return cardNumber.join('');
    }

    calculateLuhnCheck(numbers) {
        const checksum = numbers.reverse().reduce((acc, num, idx) => {
            if (idx % 2 === 1) { // Duplicar a cada segundo dígito
                num *= 2;
                if (num > 9) num -= 9; // Subtrair 9 se o número for maior que 9
            }
            return acc + num;
        }, 0);

        return (10 - (checksum % 10)) % 10; // Retorna o dígito verificador
    }

    generateCVC() {
        // Gerar um código de segurança aleatório (3 dígitos)
        return Math.floor(100 + Math.random() * 900).toString(); // Gera um número entre 100 e 999
    }

    generateExpirationDate() {
        const month = Math.floor(Math.random() * 12) + 1; // Mês aleatório de 1 a 12
        const year = new Date().getFullYear() + Math.floor(Math.random() * 5); // Ano atual ou nos próximos 5 anos
        return {
            month: month < 10 ? `0${month}` : month, // Formata para dois dígitos
            year: year.toString().slice(-2) // Apenas os últimos dois dígitos do ano
        };
    }

    getCardDetails() {
        return {
            cardNumber: this.cardNumber,
            cvc: this.cvc,
            month: this.expirationDate.month,
            year: this.expirationDate.year
        };
    }
}

// Exportar a classe para uso em outros arquivos
module.exports = Utils;
