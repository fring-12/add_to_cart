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

}

function remove(event){
    let buttonClicked =  event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
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

