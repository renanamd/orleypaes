function toastAddCart(){

    const notyf = new Notyf({

    });

    notyf.success({
        message: "Produto adicionado ao carrinho.",
        duration : 3000,
        dismissible: true,
        position: {
            x: 'center',
            y: 'top',
        },
    });

};

