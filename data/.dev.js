export default {
    name: 'dev',
    baseURL: 'https://www.saucedemo.com/',
    auth: {
        username: 'standard_user',
        password: 'secret_sauce',
    },
    featureFlags: {
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
        bikeLight: {
            slug: 'sauce-labs-bike-light',
            id: 0,
            title: 'Sauce Labs Bike Light',
            descContains: `A red light isn't the desired state in testing but it sure helps when riding your bike at night.`,
            priceText: '$9.99',
            itemLink: 'item-0-title-link'
        },
        boltTShirt: {
            slug: 'sauce-labs-bolt-t-shirt',
            id: 1,
            title: 'Sauce Labs Bolt T-Shirt',
            descContains: `Get your testing superhero on with the Sauce Labs bolt T-shirt.`,
            priceText: '$15.99',
            itemLink: 'item_1_title_link'
        },
        fleeceJacket: {
            slug: 'sauce-labs-fleece-jacket',
            id: 5,
            title: 'Sauce Labs Fleece Jacket',
            descContains: `It's not every day that you come across a midweight quarter-zip fleece jacket`,
            priceText: '$49.99',
            itemLink: 'item_5_title_link'
        }

    },
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

// додати росподіл по тестам
// додати айтем нейм
// 

