if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){

    let removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for(let i=0; i< removeCartItemButtons.length; i++){
        // console.log(removeCartItemButtons[0]);
        let button = removeCartItemButtons[i];
        button.addEventListener("click", remove)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(let i=0; i < quantityInputs.length; i++){
        let allInput = quantityInputs[i];
        allInput.addEventListener('change', quantity);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchase);

}

function purchase(event){
    alert("Thank you for purchase");
    let item = document.getElementsByClassName('cart-items')[0];
    while(item.hasChildNodes()){
        item.removeChild(item.firstChild)
    }   
}

function remove(event){
    let buttonClicked =  event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantity(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    let divRow = document.createElement('div');
    divRow.classList.add('cart-row');
    let cartRow = document.getElementsByClassName('cart-items')[0];
    let itemName = document.getElementsByClassName('cart-item-title');

    for(let i=0; i< itemName.length; i++){
        if(itemName[i].innerText === title){
            alert(title + " is alreay in the cart");
            return
        }
    }
 
    let cartContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src=${imageSrc} width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="2">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `;

    divRow.innerHTML = cartContent;
    cartRow.append(divRow);
    divRow.getElementsByClassName('btn-danger')[0].addEventListener('click', remove);
    divRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantity);

}




function updateCartTotal() {
    let cartItemsContainer =  document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemsContainer.getElementsByClassName('cart-row');
    let total = 0
    for(let i=0; i< cartRows.length; i++){
        let cartrow = cartRows[i];
        let priceElement = cartrow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartrow.getElementsByClassName('cart-quantity-input')[0];    
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price*quantity);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText= "$" + total;
}

