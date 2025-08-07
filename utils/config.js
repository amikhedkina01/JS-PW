export const CONFIG = {
    baseURL: 'https://www.saucedemo.com/',
    credentials: {
        valid: { username: 'standard_user', password: 'secret_sauce' },
        invalid: { username: 'invalid_user', password: 'secret_sauce' },
        empty: { username: '', password: '' },
    },
    selectors: {
        login: {
            username: '#user-name',
            password: '#password',
            loginButton: '#login-button',
            errorMessage: '[data-test="error"]',
        },
        products: {
            pageTitle: '.title',
            productList: '.inventory_list',
            menuButton: '#react-burger-menu-btn',
        },
        item: {
            addToCartButton: '.btn_inventory',
            cartBadge: '.shopping_cart_badge',
        },
    },
};
