const menu = document.getElementById("menu");
const itensCart = document.getElementById("cart-itens");
const subTotal = document.getElementById("subtotal");
const nome = document.getElementById("nome");
const cep = document.getElementById("cep");
const enderecoInput = document.getElementById("rua");
const numeroInput = document.getElementById("numero");
const bairroInput = document.getElementById("bairro");
const valorEntrega = document.getElementById("preco-entrega");
const valorTotal = document.getElementById("total");
const cardCounter = document.getElementById("card-counter");
const cartCounter = document.getElementById("cart-counter");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const nome = parentButton.getAttribute("data-name");
        const preco = parseFloat(parentButton.getAttribute("data-preco"));

        addToCart(nome, preco);
    }
});

function addToCart(nome, preco) {
    const existingItem = cart.find(item => item.nome === nome);

    if (existingItem) {
        existingItem.qtd += 1;
    } else {
        cart.push({
            nome,
            preco,
            qtd: 1
        });
    }

    updateCart();
}

function removeFromCart(nome) {
    cart = cart.filter(item => item.nome !== nome);
    updateCart();
}

function updateCart() {
    itensCart.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {

        const div = document.createElement("div");
        div.innerHTML = `
        
            <p> Nenhum item adicionado </p> 

        `;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("d-flex", "justify-content-between", "flex-column", "mb-2");

        const precoTotal = (item.preco * item.qtd).toFixed(2);

        cartItem.innerHTML = `
            <div class="d-flex items-center justify-content-between">
                <div>
                    <p class="fw-medium m-0">${item.nome}</p>
                    <p class="mb-2">Qtd: ${item.qtd}</p>
                    <p class="fw-medium mb-3">R$ ${precoTotal}</p>
                </div>

                <div>
                    <button class="btn btn-danger btn-sm" data-name="${item.nome}"> Remover </button>
                </div>
            </div>
        `;

        total += item.preco * item.qtd;

        itensCart.appendChild(cartItem);
    });

    subTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cardCounter.innerHTML = cart.length;
    cartCounter.innerHTML = cart.length;

    // Adiciona event listener para os botões "Remover"
    document.querySelectorAll(".btn.btn-danger.btn-sm").forEach(button => {
        button.addEventListener("click", function() {
            const nome = this.getAttribute("data-name");
            removeFromCart(nome);
        });
    });
};

checkoutBtn.addEventListener("click", function() {

    if(cart.length === 0){
        const notyf = new Notyf({

        });
    
        notyf.error({
            message: "Nenhum item no carrinho.",
            duration : 3000,
            dismissible: true,
            position: {
                x: 'center',
                y: 'bottom',
            },
        });
        return;

    }

    if(cep.value === ""){

        cep.classList.add("border");
        cep.classList.add("border-danger");
        return

    };

    if(nome.value === ""){

        nome.classList.add("border")
        nome.classList.add("border-danger")

        const notyf = new Notyf({

        });
    
        notyf.error({
            message: "Digite seu nome",
            duration : 3000,
            dismissible: true,
            position: {
                x: 'center',
                y: 'bottom',
            },
        });
        return;
    }

    if(numeroInput.value === ""){

        numeroInput.classList.add("border")
        numeroInput.classList.add("border-danger")

        const notyf = new Notyf({

        });
    
        notyf.error({
            message: "Digite o número da residência",
            duration : 3000,
            dismissible: true,
            position: {
                x: 'center',
                y: 'bottom',
            },
        });
        return;
    }

    if(numeroInput.value === ""){

        bairroInput.classList.add("border")
        bairroInput.classList.add("border-danger")

        const notyf = new Notyf({

        });
    
        notyf.error({
            message: "Selecione o bairro da sua residência",
            duration : 3000,
            dismissible: true,
            position: {
                x: 'center',
                y: 'bottom',
            },
        });
        return;
    }
    
    const cartItems = cart.map((item) => {
        return (
            `*${item.nome}*\nQuantidade: ${item.qtd}\nValor Unitário: R$ ${item.preco}\nPreço: R$ ${item.preco * item.qtd}\n \n`
        )
    }).join("")

    const msgGeral = `
        ${cartItems}\nSubtotal: ${subTotal.textContent}\nValor Entrega: ${valorEntrega.textContent}\nNome: ${nome.value}\nEndereço: ${enderecoInput.value}, ${numeroInput.value}, bairro ${bairroInput.value}
    
    `;

    const message = encodeURIComponent(msgGeral);
    const phone = "5586988515566";


    window.open(`https://wa.me/${phone}?text=${message}`,"_blank");


});

