export default {
    name: 'stage',
    baseURL: 'https://www.saucedemo.com/',
    auth: {
        username: 'locked_out_user',
        password: 'secret_sauce',
    },
    featureFlags: {
        // newCheckout: false,
    },
    items: {
        backpack: {
            slug: 'sauce-labs-backpack',
            id: 4,
            title: 'Sauce Labs Backpack',
            descContains: 'carry.allTheThings() with the',
            priceText: '$29.99',
            itemLink: 'item-4-title-link'
        },
    }
};

export const negativeCases = [
    {
        name: 'Invalid username and password',
        username: 'invalid_user',
        password: 'wrong_password',
        expectedErrorKey: 'invalidCredentials',
    },
    {
        name: 'Empty inputs',
        username: '',
        password: '',
        expectedErrorKey: 'emptyUsername',
    },
    {
        name: 'Empty Password',
        username: 'test',
        password: '',
        expectedErrorKey: 'emptyPassword',
    },
    {
        name: 'Empty username',
        username: '',
        password: 'test',
        expectedErrorKey: 'emptyUsername',
    },
    {
        name: 'Locked-Out-User',
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedErrorKey: 'lockedUser'
    }
];

export const expectedErrors = {
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    emptyUsername: 'Epic sadface: Username is required',
    emptyPassword: 'Epic sadface: Password is required',
    lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
};