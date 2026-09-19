function values(id, add, n="10") {
    const number = document.getElementById(id);
    if (number.textContent === "0" && !add || number.textContent === n && add) {
        return;
    }
    let newNumber;
    if (add) {
        newNumber = parseInt(number.textContent) + 1;
    } else if (!add) {
        newNumber = parseInt(number.textContent) - 1;
    }
    number.textContent = newNumber;
}
function select(newId, prevIds, menu=true, override=false) {
    if (document.getElementById("checkout").hidden === false && !override) {
        return;
    }
    for (const prevId of prevIds) {
        document.getElementById(prevId).classList.remove("select");
        document.getElementById(prevId.slice(0, -1)).hidden = true;
    }
    if (menu) {
        document.getElementById(newId).classList.add("select");
    }
    document.getElementById(newId.slice(0, -1)).hidden = false;
}
function addCart(counterId, item, price, button) {
    const numberOfItems = parseInt(document.getElementById(counterId).textContent);
    if (numberOfItems === 0) {
        return;
    }
    const newItem = `
        <tr>
            <td class="product">${item}</td>
            <td>
                <div class="value">
                    <button class="controlo" onclick="valuesCart(this, true${item === "Happily Evil Potionmakers" ? ", '5'" : ""});">▲</button>
                    <div class="countero">${numberOfItems}</div>
                    <button class="controlo" onclick="valuesCart(this, false);">▼</button>
                </div>
            </td>
            <td class="uPrice">$${price}</td>
            <td class="prices">$${(price * numberOfItems).toFixed(2)}</td>
            <td style="background: var(--white); position: relative;">
                <button onclick="this.nextElementSibling.hidden = false; event.stopPropagation();" style="width: 100%;">🗑</button>
                <div class="confirm" hidden>
                    <span>Are you sure?</span>
                    <button onclick="delItem(this, true);">Yes</button>
                    <span>|</span>
                    <button onclick="delItem(this, false);">No</button>
                </div>
            </td>
        </tr>
    `;
    document.getElementById("cartcontent").insertAdjacentHTML("beforeend", newItem);
    document.getElementById("cart-content-container").hidden = false;
    document.getElementById("cart-empty").hidden = true;
    document.getElementById(counterId).textContent = "0";
    calculateTotal();
    storeCart();
    button.textContent = "Added!";
    setTimeout(() => {
        button.textContent = "+ Add to Cart";
    }, 5000);
}
function autoAddCart(numberOfItems, item, price) {
    const newItem = `
        <tr>
            <td class="product">${item}</td>
            <td>
                <div class="value">
                    <button class="controlo" onclick="valuesCart(this, true${item === "Happily Evil Potionmakers" ? ", '5'" : ""});">▲</button>
                    <div class="countero">${numberOfItems}</div>
                    <button class="controlo" onclick="valuesCart(this, false);">▼</button>
                </div>
            </td>
            <td class="uPrice">$${price}</td>
            <td class="prices">$${(price * numberOfItems).toFixed(2)}</td>
            <td style="background: var(--white); position: relative;">
                <button onclick="this.nextElementSibling.hidden = false; event.stopPropagation();" style="width: 100%;">🗑</button>
                <div class="confirm" hidden>
                    <span>Are you sure?</span>
                    <button onclick="delItem(this, true);">Yes</button>
                    <span>|</span>
                    <button onclick="delItem(this, false);">No</button>
                </div>
            </td>
        </tr>
    `;
    document.getElementById("cartcontent").insertAdjacentHTML("beforeend", newItem);
    document.getElementById("cart-content-container").hidden = false;
    document.getElementById("cart-empty").hidden = true;
}
function clearCart(sure) {
    document.getElementById("confirmClear").hidden = true;
    if (!sure) {
        return;
    }
    document.getElementById("cartcontent").innerHTML = "";
    document.getElementById("totalprice").textContent = "$0.00";
    document.getElementById("cart-content-container").hidden = true;
    document.getElementById("cart-empty").hidden = false;
    localStorage.removeItem("cart");
}
function delItem(button, sure) {
    button.parentElement.hidden = true;
    if (!sure) {
        return;
    }
    button.closest("tr").remove();
    if (document.getElementById("cartcontent").children.length === 0) {
        document.getElementById("cart-content-container").hidden = true;
        document.getElementById("cart-empty").hidden = false;
        document.getElementById("totalprice").textContent = "$0.00";
        localStorage.removeItem("cart");
    } else {
        calculateTotal();
        storeCart();
    }
}
function calculateTotal() {
    const elements = document.querySelectorAll(".prices");
    const textArray = Array.from(elements, element => parseFloat(element.textContent.slice(1)));
    document.getElementById("totalprice").textContent = "$" + textArray.reduce((a, b) => a + b, 0).toFixed(2);
}
function check() {
    if (parseFloat(document.getElementById("totalprice").textContent.slice(1)) > 50) {
        document.getElementById("error").hidden = false;
        setTimeout(() => {
            document.getElementById("error").hidden = true;
        }, 3000);
    } else {
        select('checkouts', ['carts'], false);
    }
}
function valuesCart(button, add, n="10") {
    const number = button.parentElement.querySelector(".countero");
    if (number.textContent === n && add) {
        return;
    } else if (number.textContent === "1" && !add) {
        button.closest("tr").querySelector(".confirm").hidden = false;
        return;
    }
    let newNumber;
    if (add) {
        newNumber = parseInt(number.textContent) + 1;
    } else if (!add) {
        newNumber = parseInt(number.textContent) - 1;
    }
    number.textContent = newNumber;
    const unitPrice = parseFloat(button.closest("tr").querySelector(".uPrice").textContent.slice(1));
    button.closest("tr").querySelector(".prices").textContent = "$" + ((unitPrice * newNumber).toFixed(2));
    calculateTotal();
    storeCart();
}

function submitFormA() {
    event.preventDefault();
    const errorMessage = document.getElementById("form-not-filled");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const age = document.getElementById("age");
    const date = document.getElementById("ddate");
    const requiredInputs = document.querySelectorAll("input[required]");
    if (name.validity.tooLong) {
        errorMessage.textContent = "❗ Name is too long!";
        errorMessage.hidden = false;
        name.focus();
    } else if (email.validity.typeMismatch) {
        errorMessage.textContent = "❗ Incorrect email format!";
        errorMessage.hidden = false;
        email.focus();
    } else if (age.validity.badInput) {
        errorMessage.textContent = "❗ Age has to be a number!";
        errorMessage.hidden = false;
        age.focus();
    } else if (age.validity.rangeUnderflow) {
        errorMessage.textContent = "❗ Age has to be above 0!";
        errorMessage.hidden = false;
        age.focus();
    } else if (age.validity.stepMismatch) {
        errorMessage.textContent = "❗ Age should be a whole number!";
        errorMessage.hidden = false;
        age.focus();
    } else if (date.validity.rangeUnderflow) {
        errorMessage.textContent = "❗ Date should be today and beyond!";
        errorMessage.hidden = false;
        date.focus();
    }
    for (const input of requiredInputs) {
        if (input.validity.valueMissing) {
            errorMessage.textContent = "❗ Please fill out all required fields.";
            errorMessage.hidden = false;
            break;
        }
    }
    if (!document.querySelector("form").checkValidity()) {
        setTimeout(() => {
            errorMessage.textContent = "";
            errorMessage.hidden = true;
        }, 3000);
        return;
    }
    document.getElementById('confirmOrder').hidden = false;
    event.stopPropagation();
}
function submitFormB() {
    alert("Form Filled!\n" + JSON.stringify(analyseData(), null, 4));
    select('homes', ['checkouts'], true, true);
    clearCart(true);
    document.querySelector("form").reset();
    document.getElementById("order-successful").style.display = "block";
    setTimeout(() => {
        if (document.getElementById("order-successful").style.display === "block") {
            deleteParent(document.getElementById("order-successful"), false);
        }
    }, 5000);
}
// Functions and stuff for submitForm() below
function analyseData() {
    const tRows = document.querySelector("tbody").querySelectorAll("tr");
    let cart = {};
    for (const tRow of tRows) {
        const item = tRow.querySelector(".product").textContent;
        const quantity = parseInt(tRow.querySelector(".countero").textContent);
        cart[item] = (cart[item] || 0) + quantity;
    }
    const total = parseFloat(
        document.getElementById("totalprice").textContent.slice(1)
    );
    const form = document.querySelector("form");
    const formResults = Object.fromEntries(new FormData(form));
    return {
        "Cart": cart,
        "Total": total,
        "Form Results": formResults
    };
}
function deleteParent(button, useParent=true) {
    let parent;
    if (useParent) {
        parent = button.parentElement;
    } else {
        parent = button;
    }
    parent.style.opacity = "0";
    setTimeout(() => {
        parent.style.display = "none";
        parent.style.opacity = "100%";
    }, 600);
}

// Minimum Current Date input[type="date"]
const today = new Date();
document.querySelector('input[type="date"]').setAttribute('min', `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);

// Date CSS toggle empty & full
const dateInput = document.querySelector('input[type="date"]');
dateInput.addEventListener("change", () => {
    dateInput.classList.toggle("has-date", dateInput.value !== "");
});

// localStorage store and get cart
function storeCart() {
    const cartItems = document.querySelector("tbody").querySelectorAll("tr");
    let cart = [];
    cartItems.forEach(cartItem => {
        let addToCart = [];
        addToCart.push(cartItem.querySelector(".product").textContent); // Item
        addToCart.push(cartItem.querySelector(".countero").textContent); // Quantity
        addToCart.push(parseFloat(cartItem.querySelector(".uPrice").textContent.slice(1))); // Unit Price
        cart.push(addToCart);
    });
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
}
// get cart
if (localStorage.getItem("cart") !== null) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    for (const item of cart) {
        autoAddCart(item[1], item[0], item[2]);
    }
    calculateTotal();
    document.getElementById("cart-saved").style.display = "block";
    setTimeout(() => {
        if (document.getElementById("cart-saved").style.display === "block") {
            deleteParent(document.getElementById("cart-saved"), false);
        }
    }, 5000);
}

document.addEventListener("click", (event) => {
    if (
        event.target.closest(".confirm") ||
        event.target.closest("#confirmClear") ||
        event.target.closest("#confirmOrder")
    ) {
        return;
    }
    document.querySelectorAll(".confirm").forEach(element => {
        element.hidden = true;
    });
    document.getElementById("confirmClear").hidden = true;
    document.getElementById("confirmOrder").hidden = true;
});
