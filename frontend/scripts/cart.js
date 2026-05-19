console.log("Cart page loaded successfully!");

// =============================
// CART DATA
// =============================

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

const cartContainer =
    document.getElementById("cart-items");

const subtotalElement =
    document.getElementById("subtotal");

const taxElement =
    document.getElementById("tax");

const totalElement =
    document.getElementById("total");

// =============================
// RENDER CART
// =============================

function renderCart(){

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add products to continue shopping.
                </p>

                <a
                    href="shop.html"
                    class="continue-shopping-btn"
                >

                    Continue Shopping

                </a>

            </div>
        `;

        subtotalElement.innerText = "₹0";

        taxElement.innerText = "₹0";

        totalElement.innerText = "₹0";

        return;

    }

    let subtotal = 0;

    cart.forEach((item, index) => {

        const price = parseInt(
            item.price.replace(/\D/g, "")
        );

        subtotal += price * item.qty;

        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img
                src="${item.img}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>Price: ₹${price}</p>

                <div class="cart-qty-controls">

                    <button
                        onclick="decreaseQty(${index})"
                    >
                        -
                    </button>

                    <span>
                        ${item.qty}
                    </span>

                    <button
                        onclick="increaseQty(${index})"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${index})"
            >

                Remove

            </button>
        `;

        cartContainer.appendChild(cartItem);

    });

    const tax = subtotal * 0.18;

    const shippingCost =
    parseInt(
        localStorage.getItem("shippingCost") || 0
    );

    const total =
        subtotal + tax + shippingCost;
    
    subtotalElement.innerText =
        `₹${subtotal}`;
    
    taxElement.innerText =
        `₹${tax.toFixed(2)}`;
    
    document.getElementById("checkout-shipping").innerText =
        shippingCost === 0 ? "Free" : `₹${shippingCost}`;
    
    totalElement.innerText =
        `₹${total.toFixed(2)}`;

}

// =============================
// REMOVE ITEM
// =============================
function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    renderCart();
}

// =============================
// QUANTITY CONTROLS
// =============================
function increaseQty(index){
    cart[index].qty++;
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    renderCart();
}

function decreaseQty(index){
    if(cart[index].qty > 1){
        cart[index].qty--;
    }else{
        cart.splice(index, 1);
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    renderCart();
}

// =============================
// CHECKOUT
// =============================
const checkoutBtn =
    document.getElementById(
        "checkout-btn"
    );

checkoutBtn.addEventListener(
    "click",
    () => {

        if(cart.length === 0){

            alert("Cart is empty!");

            return;

        }

        // Optional: Store shipping if needed
        localStorage.setItem("shippingCost", 0);

        window.location.href =
            "checkout.html";

    }
);

renderCart();