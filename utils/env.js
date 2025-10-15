import 'dotenv/config'; // npm i dotenv

const testEnv = (process.env.TEST_ENV || 'dev').toLowerCase();

const loaders = {
    dev: () => import('../data/.dev.js'), // передававти файл
    stage: () => import('../data/.stage.js'),
    prod: () => import('../data/.prod.js'),
};

if (!loaders[testEnv]) {
    throw new Error(`Unknown TEST_ENV="${testEnv}". Use one of: dev | stage | prod`);
}

const { default: envConfig, negativeCases, expectedErrors } = await loaders[testEnv]();

export { testEnv, envConfig, negativeCases, expectedErrors };


export async function loadEnvData() {
    const envName = (process.env.ENV_NAME || 'dev').toLowerCase();
    const mod = await import(new URL(`../data/.${envName}.js`, import.meta.url));
    if ('negativeCases' in mod || 'expectedErrors' in mod) {
        return {
            negativeCases: mod.negativeCases ?? [],
            expectedErrors: mod.expectedErrors ?? {},
        };
    }
    const def = mod.default ?? {};
    return {
        negativeCases: def.negativeCases ?? [],
        expectedErrors: def.expectedErrors ?? {},
    };
}