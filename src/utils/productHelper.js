
const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});


export const getRemovedQuantity = (item) => {
    return Math.max(0, item.quantity - 1);
}

export const formatPrice = (price) => {
    return currencyFormatter.format(price);
};