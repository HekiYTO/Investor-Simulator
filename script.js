let dollarValue = 0;
let dollarBalance = 0;
let dollarPrevious = null;

let euroValue = 0
let euroBalance = 0
let euroPrevious = null;

let coins = 1000;
let start = 0;
let debug = 1;

let buisness1 = 0
let buisness2 = 0

let okosko = "";

let images = {
    inc: './images/increase.png',
    dec: './images/decrease.png',
    clr: './images/clear.png'
};

let dollarImg = document.getElementById('dollarChangeImg')
let euroImg = document.getElementById('euroChangeImg')


//Part auto and automation//

//Dollar//

function randomD(mins, maxs, max) {
    if (start == 0) {
       dollarValue = Math.floor(Math.random() * (maxs-mins) + mins)
       console.log('firts dollar value was created');
       
    }
        let change = Math.floor(Math.random() * max) + 1;
        let current = dollarValue;
        if (Math.random() >= 0.50) {
            current = current + change
            console.log(`Dollar value changed: ${dollarPrevious} + ${change} = ${current} `)
        } else {
            current = current - change
            console.log(`Dollar value changed: ${dollarPrevious} - ${change} = ${current} `)
        }

        if (current > 50) {
            current = 50
            if (debug == 1) {
                console.log('Reached max dollar value, reducing')
            }
            
        }

        if (current < 25) {
            current = 25
            if (debug == 1) {
                console.log('Reached min dollar value, adjusting')
            }
             
        }

        return dollarValue = current;
    }


function updateD() {
    const newDollar = randomD(25, 50, 5);
    const dollarPreviousElement = document.getElementById('pastValueDollar')

    if (dollarValue > dollarPrevious) {
        dollarImg.style.display = 'inline';
        dollarImg.src = images.inc   
    } else if (dollarValue < dollarPrevious) {
        dollarImg.style.display = 'inline';
        dollarImg.src = images.dec   
    } else {
        dollarImg.src = images.clr
    }

    if (dollarPrevious !== null) {
        dollarPreviousElement.textContent = `Превыдущая цена: ${dollarPrevious}` ;
    } else {
        dollarPreviousElement.textContent = "Превыдущего значения нету";
    }
    document.getElementById('currentValueDollar').textContent = `Текущая цена: ${newDollar}`;
    dollarPrevious = newDollar;

    //icon update//

    

}

//Euro//

function randomE(mins, maxs, max) {
    if (start == 0) {
       euroValue = Math.floor(Math.random() * (maxs-mins) + mins)
       console.log('firts euro value was created');
       
    }
        let change = Math.floor(Math.random() * max) + 1;
        let current = euroValue;
        if (Math.random() >= 0.50) {
            current = current + change
            console.log(`Euro value changed: ${euroPrevious} + ${change} = ${current} `)
        } else {
            current = current - change
            console.log(`Euro value changed: ${euroPrevious} - ${change} = ${current} `)
        }

        if (current > 80) {
            current = 80
            if (debug == 1) {
                console.log('Reached max euro value, reducing')
            }
            
        }

        if (current < 15) {
            current = 15
            if (debug == 1) {
                console.log('Reached min euro value, adjusting')
            }
             
        }

        return euroValue = current;
    }

    function updateE() {
    const newEuro = randomE(15, 80, 10);
    const euroPreviousElement = document.getElementById('pastValueEuro')

    if (euroValue > euroPrevious) {
        euroImg.src = images.inc   
    } else if (euroValue < euroPrevious) {
        euroImg.src = images.dec   
    } else {
        euroImg.src = images.clr
    }

    if (euroPrevious !== null) {
        euroPreviousElement.textContent = `Превыдущая цена: ${euroPrevious}` ;
    } else {
        euroPreviousElement.textContent = "Превыдущего значения нету";
    }
    document.getElementById('currentValueEuro').textContent = `Текущая цена: ${newEuro}`;
    euroPrevious = newEuro;
}


updateD();
updateE();
setInterval(updateD, 2500);
setInterval(updateE, 2500);

start = 1;
if (debug == 1) {
console.log("Start cycle finished");
}


//Part interactive scripts//

//Dollar//

function buyDollar() {
    let dollarInput = document.querySelector('.dollarToBuy')
    let buyValue = 0;
    let quantity = parseInt(dollarInput.value);
    if (isNaN(quantity)) {
        buyValue = dollarValue;
        quantity = 1;
    } else {
        buyValue = quantity * dollarValue;
    }
    console.log(buyValue)
    if (buyValue <= coins) {
        dollarBalance = dollarBalance + quantity;
        coins = coins - buyValue
        if (debug == 1) {
            console.log(`Added ${dollarInput.value} dollars, total: ${dollarBalance}, took -${buyValue} coins`)
        }
    } else {
        console.log('Not enough coins')
    }
    valuesUpdate();
}

function sellDollar() {
    const dollarInput = document.querySelector('.dollarToSell');
    let quantity = parseInt(dollarInput.value, 10);
    if (isNaN(quantity) || quantity <= 0) quantity = 1;

    if (dollarBalance <= 0) {
        console.log('No dollars to sell');
        valuesUpdate();
        return;
    }

    if (quantity > dollarBalance) {
        
        const sellQuantity = dollarBalance;
        const sellValue = sellQuantity * dollarValue;
        coins += sellValue;
        dollarBalance = 0;
        if (debug == 1) {
            console.log(`Requested ${quantity}, but only ${sellQuantity} available. Sold ${sellQuantity}, added ${sellValue} coins`);
        }
    } else {
        const sellValue = quantity * dollarValue;
        coins += sellValue;
        dollarBalance -= quantity;
        if (debug == 1) {
            console.log(`Sold ${quantity} dollars, added ${sellValue} coins, remaining dollars: ${dollarBalance}`);
        }
    }

    valuesUpdate();
}

function allDollar(buy) {
   let quantity = 0
    if (buy) {
        quantity = Math.floor(coins/dollarValue);
        dollarBalance = dollarBalance + quantity
        coins = coins - (dollarValue * quantity)

       
        console.log(quantity)
    } else {
       const sellQuantity = dollarBalance;
        const sellValue = sellQuantity * dollarValue;
        coins += sellValue;
        dollarBalance = 0;
    }
    
    valuesUpdate();
}

//Euro//

function buyEuro() {
    let euroInput = document.querySelector('.euroToBuy')
    let buyValue = 0;
    let quantity = parseInt(euroInput.value);
    if (isNaN(quantity)) {
        buyValue = euroValue;
        quantity = 1;
    } else {
        buyValue = quantity * euroValue;
    }
    console.log(buyValue)
    if (buyValue <= coins) {
        euroBalance = euroBalance + quantity;
        coins = coins - buyValue
        if (debug == 1) {
            console.log(`Added ${euroInput.value} euros, total: ${euroBalance}, took -${buyValue} coins`)
        }
    } else {
        console.log('Not enough coins')
    }
    valuesUpdate();
}

function sellEuro() {
    const euroInput = document.querySelector('.euroToSell');
    let quantity = parseInt(euroInput.value, 10);
    if (isNaN(quantity) || quantity <= 0) quantity = 1;

    if (euroBalance <= 0) {
        console.log('No euros to sell');
        valuesUpdate();
        return;
    }

    if (quantity > euroBalance) {
        
        const sellQuantity = euroBalance;
        const sellValue = sellQuantity * euroValue;
        coins += sellValue;
        euroBalance = 0;
        if (debug == 1) {
            console.log(`Requested ${quantity}, but only ${sellQuantity} available. Sold ${sellQuantity}, added ${sellValue} coins`);
        }
    } else {
        const sellValue = quantity * euroValue;
        coins += sellValue;
        euroBalance -= quantity;
        if (debug == 1) {
            console.log(`Sold ${quantity} euros, added ${sellValue} coins, remaining euros: ${euroBalance}`);
        }
    }

    valuesUpdate();
}

function allEuro(buy) {
    let quantity = 0
    if (buy) {
        quantity = Math.floor(coins/euroValue);
        euroBalance = euroBalance + quantity
        coins = coins - (euroValue * quantity)

       
        console.log(quantity)
    } else {
       const sellQuantity = euroBalance;
        const sellValue = sellQuantity * euroValue;
        coins += sellValue;
        euroBalance = 0;
    }
    
    valuesUpdate();
}

//Buisness//

function shopOpen() {
    let element = document.querySelector('.buyBuisness')
    element.classList.add('is-open')
}

function shopClose() {
    let element = document.querySelector('.buyBuisness')
    element.classList.remove('is-open')
}

function invest1(action) {
    if (action == 'buy') {
        let cost = 300;
        if (coins >= cost) {
            coins = coins - cost
            buisness1 = 1
            buttonBuyBuisness1.innerHTML = 'Продажа камней <br> Куплено <br> 1к/2.5с'
            buttonBuyBuisness1.className = 'unbaviable'
        }
    }
    if (action == 'cycle' && buisness1 == 1) {
        coins = coins + 1;
    }
    valuesUpdate();
}

function invest2(action) {
    if (action == 'buy') {
        let cost = 1500;
        if (coins >= cost) {
            coins = coins - cost
            buisness2 = 1
            buttonBuyBuisness2.innerHTML = 'Лимонадная стойка <br> Куплено <br> 5к/2.5с'
            buttonBuyBuisness2.className = 'unbaviable'
        }
    }
    if (action == 'cycle' && buisness2 == 1) {
        coins = coins + 5;
    }
    valuesUpdate();
}


//Button assign//

//trading//

let buttonBuyDollar = document.querySelector('.buyDollar');
buttonBuyDollar.addEventListener('click', buyDollar);

let buttonSellDollar = document.querySelector('.sellDollar');
buttonSellDollar.addEventListener('click', sellDollar);

let buttonBuyAllDollar = document.querySelector('.buyAllDollar');
buttonBuyAllDollar.addEventListener('click', () => allDollar(true));

let buttonSellAllDollar = document.querySelector('.sellAllDollar');  
buttonSellAllDollar.addEventListener('click', () => allDollar(false));

let buttonBuyEuro = document.querySelector('.buyEuro');
buttonBuyEuro.addEventListener('click', buyEuro);

let buttonSellEuro = document.querySelector('.sellEuro');
buttonSellEuro.addEventListener('click', sellEuro);

let buttonBuyAllEuro = document.querySelector('.buyAllEuro');
buttonBuyAllEuro.addEventListener('click', () => allEuro(true));

let buttonSellAllEuro = document.querySelector('.sellAllEuro');
buttonSellAllEuro.addEventListener('click', () => allEuro(false));

//Buisness//

let buttonShopOpen = document.getElementById('kolomoyShop')
buttonShopOpen.addEventListener('click', shopOpen)

let buttonShopClose = document.getElementById('closeOverlay1')
buttonShopClose.addEventListener('click', shopClose)

let buttonBuyBuisness1 = document.getElementById('buttonBuisness1')
buttonBuyBuisness1.addEventListener('click', () => invest1('buy'))

let buttonBuyBuisness2 = document.getElementById('buttonBuisness2')
buttonBuyBuisness2.addEventListener('click', () => invest2('buy'))


//Update all values//

let dollarBalanceP = document.getElementById('dollarBalance')
let euroBalanceP = document.getElementById('euroBalance')
let coinsBallanceP = document.getElementById('coinsBalance')

function valuesUpdate() {
    dollarBalanceP.innerHTML = `Баланс: ${dollarBalance} долларов`;
    euroBalanceP.innerHTML = `Баланс: ${euroBalance} эвро`;
    coinsBallanceP.innerHTML = `Баланс: ${coins} коинов`
    if (debug == 1) {
        console.log(`Updated values! Coins: ${coins}| Dollars: ${dollarBalance}`)
    }
    
}

valuesUpdate();

//textline generator//

let textline = document.getElementById('okoskoText')

textline.textContent = "Коломойский сбежал из приват банка"

//Buisness cycle//
setInterval(invest1, 2500, 'cycle');
setInterval(invest2, 2500, 'cycle');