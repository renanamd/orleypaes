// Lista de bairros e preços de entrega
const bairros = {
    "Acarape": 8,
    "Aeroporto": 8,
    "Água Mineral": 8,
    "Aldebaran": 6,
    "Alphaville": 8,
    "Bairro de Fátima": 6,
    "Bairro dos Noivos": 6,
    "Bairro Mirante": 6,
    "Bela Vista": 10,
    "Buenos Aires": 6,
    "Cabral": 6,
    "Campestre": 6,
    "Centro": 7,
    "Cidade Jardim": 6,
    "Cristo Rei": 8,
    "Distrito Industrial": 10,
    "Embrapa": 8,
    "Fátima": 6,
    "Frei Serafim": 6,
    "Gurupi": 8,
    "Horto": 6,
    "Ilhotas": 6,
    "Ininga": 6,
    "Itararé": 10,
    "Jóquei": 6,
    "Marquês": 7,
    "Memorare": 10,
    "Monte Castelo": 7,
    "Mocambinho": 10,
    "Morada do Sol": 6,
    "Morada Nova": 10,
    "Morros": 6,
    "Morro do Uruguai": 6,
    "N Senhora das Graças": 8,
    "Noivos": 6,
    "Nova Teresina": 8,
    "Parque Piauí": 8,
    "Parque Universitário": 6,
    "Pedra Mole": 6,
    "Piçarra": 8,
    "Pirajá": 8,
    "Poty Velho": 8,
    "Primavera": 6,
    "Promorar": 10,
    "Recanto das Palmeiras": 6,
    "Redenção": 8,
    "Renascença": 10,
    "Saci": 10,
    "Santa Isabel": 6,
    "Santa Lia": 6,
    "Santa Maria": 10,
    "Santo Antônio": 10,
    "São Cristóvão": 6,
    "São João": 6,
    "São Pedro": 8,
    "Socopo": 6,
    "Tabuleta": 10,
    "Tancredo Neves": 8,
    "Terras Alphaville": 8,
    "Timon (demais bairros)": 20,
    "Novo Tempo (Timon)": 20,
    "Timon Central": 15,
    "Três Andares": 8,
    "Vale do Gavião": 8,
    "Vale Quem Tem": 6,
    "Verde Lar": 8,
    "Vermelha": 8,
    "Vila Operária": 8,
    "Zoobotânico": 6,
};

async function buscarEndereco(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
            alert("CEP não encontrado!");
            return;
        }
        document.getElementById('rua').value = data.logradouro;
        
    } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
    }
}

// Event listener para o campo CEP
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');

    if (cep.length === 8) {
        buscarEndereco(cep);
    } else {

        const notyf = new Notyf({

        });
    
        notyf.error({
            message: "Digite um CEP válido",
            duration : 3000,
            dismissible: true,
            position: {
                x: 'center',
                y: 'bottom',
            },
        });
    }
});

// Função para inicializar o select com os bairros
function initBairroSelect() {
    const bairroSelect = document.getElementById('bairro');

    for (const bairro in bairros) {
        const option = document.createElement('option');
        option.value = bairro;
        option.text = bairro;
        bairroSelect.appendChild(option);
    }

    bairroSelect.addEventListener('change', updateDeliveryPrice);
}

// Função para atualizar o preço de entrega baseado no bairro selecionado
function updateDeliveryPrice() {
    const bairroSelect = document.getElementById('bairro');
    const precoEntrega = document.getElementById('preco-entrega');

    const bairroSelecionado = bairroSelect.value;
    const preco = bairros[bairroSelecionado];

    precoEntrega.textContent = `R$ ${preco.toFixed(2)}`;
}

// Inicializar o select ao carregar a página
window.onload = initBairroSelect;
