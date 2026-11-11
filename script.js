/* =====================================
   THRIFT WITH KASSHI
   SHOPPING SYSTEM — VERSION 3.0
===================================== */

// WHATSAPP NUMBER
const WHATSAPP_NUMBER = "254728359964";

// PRODUCT DATABASE
const products = [
    {
        id: 1,
        name: "AC Milan Retro Jersey",
        category: "jerseys",
        price: 700,
        sizes: "Ask on WhatsApp",
        description: "Classic AC Milan retro football jersey.",
        image: "images/ac-milan-retro-jersey.jpg"
    },
    {
        id: 2,
        name: "Inter Milan Retro Jersey",
        category: "jerseys",
        price: 700,
        sizes: "Ask on WhatsApp",
        description: "Vintage Inter Milan football jersey.",
        image: "images/inter-milan-retro-jersey.jpg"
    },
    {
        id: 3,
        name: "France 98 Retro Jersey",
        category: "jerseys",
        price: 700,
        sizes: "Ask on WhatsApp",
        description: "Classic France 98-inspired retro jersey.",
        image: "images/france-98-retro-jersey.jpg"
    },
    {
        id: 4,
        name: "Manchester United Blue Jersey",
        category: "jerseys",
        price: 700,
        sizes: "Ask on WhatsApp",
        description: "Manchester United blue football jersey.",
        image: "images/manchester-united-blue-retro-jersey.jpg"
    },
    {
        id: 5,
        name: "Dream Graphic Tee",
        category: "tees",
        price: 450,
        sizes: "Ask on WhatsApp",
        description: "Streetwear graphic T-shirt with Dream design.",
        image: "images/graphic-tee-dream.jpg"
    },
    {
        id: 6,
        name: "Star Graphic Tee",
        category: "tees",
        price: 450,
        sizes: "Ask on WhatsApp",
        description: "Graphic streetwear T-shirt with star design.",
        image: "images/graphic-tee-star.jpg"
    },
    {
        id: 7,
        name: "Black Baggy Jeans",
        category: "denim",
        price: 750,
        sizes: "Ask on WhatsApp",
        description: "Relaxed-fit black baggy jeans.",
        image: "images/black-baggy-jeans.jpg"
    },
    {
        id: 8,
        name: "Ripped Baggy Jeans",
        category: "denim",
        price: 750,
        sizes: "Ask on WhatsApp",
        description: "Stylish ripped baggy denim jeans.",
        image: "images/ripped-baggy-jeans.jpg"
    },
    {
        id: 9,
        name: "Plaid Pajama Trousers",
        category: "bottoms",
        price: 250,
        sizes: "Ask on WhatsApp",
        description: "Comfortable plaid pajama trousers.",
        image: "images/plaid-pajama-trousers.jpg"
    },
    {
        id: 10,
        name: "Side-Stripe Track Pants",
        category: "bottoms",
        price: 500,
        sizes: "Ask on WhatsApp",
        description: "Sporty side-stripe track pants.",
        image: "images/side-stripe-track-pants.jpg"
    }
];

// HTML ELEMENTS
const productGrid = document.getElementById("productGrid");
const categoryButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("productSearch");

const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const addToCartBtn = document.getElementById("addToCartBtn");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSize = document.getElementById("modalSize");
const modalOrder = document.getElementById("modalOrder");

let activeCategory = "all";
let selectedProduct = null;

// SHOPPING CART
let cart = [];

const cartToggle = document.getElementById("cartToggle");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

function addToCart(product) {
    const existingItem = cart.find(
        item => item.id === product.id
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    if (!cartItems || !cartCount || !cartTotal) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    cartCount.textContent = totalItems;
    cartTotal.textContent = "KSh " + totalPrice.toLocaleString();

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="cart-empty">Your cart is currently empty.</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h3>${item.name}</h3>
                <p>KSh ${item.price.toLocaleString()}</p>
                <p>Size: Confirm on WhatsApp</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">REMOVE</button>
            </div>
        </div>
    `).join("");
}

function changeQuantity(productId, amount) {
    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// CART OPEN AND CLOSE
if (cartToggle && cartPanel) {
    cartToggle.addEventListener("click", () => {
        cartPanel.classList.add("open");
    });
}

if (closeCart && cartPanel) {
    closeCart.addEventListener("click", () => {
        cartPanel.classList.remove("open");
    });
}

// WHATSAPP CHECKOUT
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const orderDetails = cart.map(item =>
            `${item.name}
Size: Please confirm available size
Quantity: ${item.quantity}
Price: KSh ${(item.price * item.quantity).toLocaleString()}`
        ).join("\n\n");

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        const message = `Hello THRIFT WITH KASSHI!

I would like to place an order:

${orderDetails}

TOTAL: KSh ${total.toLocaleString()}

Please confirm available sizes and delivery details.`;

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    });
}

// DISPLAY PRODUCTS
function displayProducts(category = "all", search = "") {
    if (!productGrid) return;

    const filteredProducts = products.filter(product => {
        const matchesCategory =
            category === "all" || product.category === category;

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="empty-products">
                <h3>NO PRODUCTS FOUND.</h3>
                <p>New pieces are coming soon.</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}"
                     onerror="this.style.opacity='0.3';">

                <span class="product-category">
                    ${product.category}
                </span>
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>

                <p class="product-price">
                    KSh ${product.price.toLocaleString()}
                </p>

                <p class="product-sizes">
                    Sizes: Ask on WhatsApp
                </p>

                <button onclick="viewProduct(${product.id})">
                    VIEW PRODUCT ↗
                </button>
            </div>
        </article>
    `).join("");
}

// OPEN PRODUCT DETAILS
function viewProduct(productId) {
    const product = products.find(item => item.id === productId);

    if (!product || !productModal) return;

    selectedProduct = product;

    modalImage.src = product.image;
    modalImage.alt = product.name;

    modalCategory.textContent = product.category;
    modalName.textContent = product.name;

    modalPrice.textContent =
        "KSh " + product.price.toLocaleString();

    modalDescription.textContent = product.description;

    if (modalSize) {
        modalSize.innerHTML = `
            <option value="Confirm on WhatsApp">
                Ask about available sizes on WhatsApp
            </option>
        `;
        modalSize.value = "Confirm on WhatsApp";
    }

    productModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

// CLOSE PRODUCT DETAILS
function hideProductModal() {
    if (!productModal) return;

    productModal.classList.remove("show");
    document.body.style.overflow = "";
    selectedProduct = null;
}

if (closeModal) {
    closeModal.addEventListener("click", hideProductModal);
}

if (productModal) {
    productModal.addEventListener("click", function(event) {
        if (event.target === productModal) {
            hideProductModal();
        }
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        hideProductModal();
    }
});

// ADD TO CART
if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function() {
        if (!selectedProduct) return;

        addToCart({
            ...selectedProduct,
            size: "Confirm on WhatsApp"
        });

        hideProductModal();

        if (cartPanel) {
            cartPanel.classList.add("open");
        }
    });
}

// DIRECT WHATSAPP PRODUCT ENQUIRY
if (modalOrder) {
    modalOrder.addEventListener("click", function() {
        if (!selectedProduct) return;

        const message =
            `Hello THRIFT WITH KASSHI!\n\n` +
            `I'm interested in: ${selectedProduct.name}\n` +
            `Price: KSh ${selectedProduct.price}\n` +
            `Please confirm available sizes.`;

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    });
}

// CATEGORY FILTERING
categoryButtons.forEach(button => {
    button.addEventListener("click", function() {
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        displayProducts(
            activeCategory,
            searchInput ? searchInput.value : ""
        );
    });
});

// PRODUCT SEARCH
if (searchInput) {
    searchInput.addEventListener("input", function() {
        displayProducts(activeCategory, searchInput.value);
    });
}

// INITIALISE SHOP
displayProducts();
updateCart();