// Simple store without zustand - using React context pattern instead
// We'll use a simple global state approach
let listeners = [];
let cartItems = [];
function emitChange() {
    listeners.forEach(l => l());
}
export const cartStore = {
    subscribe(listener) {
        listeners = [...listeners, listener];
        return () => { listeners = listeners.filter(l => l !== listener); };
    },
    getSnapshot() { return cartItems; },
    addToCart(product) {
        const existing = cartItems.find(i => i.product.id === product.id);
        if (existing) {
            cartItems = cartItems.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        else {
            cartItems = [...cartItems, { product, quantity: 1 }];
        }
        emitChange();
    },
    removeFromCart(productId) {
        cartItems = cartItems.filter(i => i.product.id !== productId);
        emitChange();
    },
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            cartStore.removeFromCart(productId);
            return;
        }
        cartItems = cartItems.map(i => i.product.id === productId ? { ...i, quantity } : i);
        emitChange();
    },
    clearCart() {
        cartItems = [];
        emitChange();
    },
    totalItems() { return cartItems.reduce((sum, i) => sum + i.quantity, 0); },
    totalPrice() { return cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0); },
};
