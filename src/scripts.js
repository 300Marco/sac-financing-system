const valueFinance = document.querySelector('#value-finance');
const valueYear = document.querySelector('#value-year');
const valuesFees = document.querySelector('#value-fees');

const calcMonths = document.querySelector('#calc-months');
const calcFees = document.querySelector('#calc-fees');
const calcAccumulated = document.querySelector('#calc-accumulated');

const tbody = document.querySelector('tbody');

document.addEventListener('click', (e) => {
    el = e.target;

    if(el.classList.contains('button')) getValues();
    if(el.classList.contains('button-clear')) btnClear();

    e.preventDefault();
});

function getValues() {
    tbody.innerHTML = '';
    
    let convertFees = Number(valuesFees.value.replace(',','.'));

    calcMonths.value = Number(valueYear.value * 12); // Prazo(meses)
    calcFees.value = (Math.pow( (1 + convertFees), (1 / 12) ) - 1).toFixed(15); // juros ao mês

    // Valor do financiamento
    let fees = 0;
    let valueTotal = Number(valueFinance.value);
    let amortization = Number(valueFinance.value / calcMonths.value);

    // Totais
    let accumulatedFees = 0;
    let accumulatedAmortization = 0;
    let totalPaid = 0;
    
    for(let i = 1; i <= calcMonths.value; i++) {
        fees = Number(valueTotal * calcFees.value);
        valueTotal -= amortization; // Tabela total
        
        // Cria tabela - Linhas
        let tr = tbody.insertRow();

        // Cria colonas - células da tabela
        let tdInstallment = tr.insertCell();
        let tdAmortization = tr.insertCell();
        let tdFees = tr.insertCell();
        let tdTotal = tr.insertCell();

        // Insere dados na tabela
        tdFees.innerHTML = fees.toFixed(2);
        tdAmortization.innerHTML = amortization.toFixed(2);
        tdInstallment.innerHTML = i;
        tdTotal.innerHTML = 'R$ ' + (amortization + fees).toLocaleString('pt-br', { maximumFractionDigits: 2 });

        // Totais
        accumulatedFees += fees;
        accumulatedAmortization += amortization;
        totalPaid += (amortization + fees);
    }

    // Enviando dados totais para os campos respectivos
    calcAccumulated.value = accumulatedFees.toFixed(2);
    document.querySelector('tfoot tr').children[1].innerHTML = 'R$ ' + accumulatedAmortization.toLocaleString('pt-br', { maximumFractionDigits: 2 });
    document.querySelector('tfoot tr').children[3].innerHTML = 'R$ ' + totalPaid.toLocaleString('pt-br', { maximumFractionDigits: 2 });
}

// Função para limpar campos
// Exibe erro no console do navegador, pois os dados estão em constantes, assim prefiro manter.
function btnClear() {
    valueFinance.value = '';
    valueYear.value = '';
    valuesFees.value = '';
    calcMonths = '';
    calcFees = '';
    calcAccumulated = '';
}