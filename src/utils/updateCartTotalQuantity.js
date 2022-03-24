export const updateCartTotalQuantity = (response) => {
    const totalQuantity = response.totalQuantity;
    localStorage.setItem('totalQuantity', totalQuantity);
}