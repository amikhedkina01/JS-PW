export const CONFIG = {
    baseURL: 'https://www.saucedemo.com',
    credentials: {
        valid: {
            username: 'standard_user',
            password: 'secret_sauce',
        },
        invalid: {
            username: 'invalid_user',
            password: 'wrong_password',
        }
    },
    selectors: {
        loginPage: {
            usernameField: '#user-name',
            passwordField: '#password',
            loginButton: '#login-button',
            errorMessage: '[data-test="error"]',
        },
        productsPage: {
            pageTitle: '.title',
            productList: '.inventory_list',
            addToCartButtons: '.btn_inventory',
            shoppingCartBadge: '.shopping_cart_badge',
            shoppingCartLink: '.shopping_cart_link',
            menuButton: '#react-burger-menu-btn',
            menuOptions: '.bm-item-list',
        },
        itemPage: {
            addToCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
            removeButton: '[data-test="remove-sauce-labs-backpack"]',
        }
    }
};
