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
            <td style="background: white;">
                <button onclick="delItem(this);" style="width: 100%;">🗑</button>
            </td>
        </tr>
    `;
    document.getElementById("cartcontent").insertAdjacentHTML("beforeend", newItem);
    document.getElementById("cart-content-container").hidden = false;
    document.getElementById("cart-empty").hidden = true;
    document.getElementById(counterId).textContent = "0";
    calculateTotal();
    button.textContent = "Added!";
    setTimeout(() => {
        button.textContent = "+ Add to Cart";
    }, 5000);
}
function clearCart(validate=true) {
    if (validate) {
        if (!confirm("Are you sure you want to clear cart? This action is undoable.")) {
            return;
        }
    }
    document.getElementById("cartcontent").innerHTML = "";
    document.getElementById("totalprice").textContent = "$0.00";
    document.getElementById("cart-content-container").hidden = true;
    document.getElementById("cart-empty").hidden = false;
}
function delItem(button) {
    if (!confirm("Are you sure you want to delete item? This action is undoable.")) {
        return false;
    }
    button.closest('tr').remove();
    if (document.getElementById("cartcontent").children.length === 0) {
        document.getElementById("cart-content-container").hidden = true;
        document.getElementById("cart-empty").hidden = false;
        document.getElementById("totalprice").textContent = "$0.00";
    } else {
        calculateTotal();
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
        if (!delItem(button)) {
            return;
        }
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
}

function submitForm() {
    if (!document.querySelector("form").checkValidity()) {
        document.getElementById("form-not-filled").hidden = false;
        setTimeout(() => {
            document.getElementById("form-not-filled").hidden = true;
        }, 3000);
        return;
    } else if (!confirm("Do you want to place order?")) {
        return;
    }
    alert("Form Filled!\n" + JSON.stringify(analyseData(), null, 4));
    select('homes', ['checkouts'], true, true);
    clearCart(false);
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