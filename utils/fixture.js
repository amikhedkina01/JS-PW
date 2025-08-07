
import { POManager } from '../pages/POManager';

export const poManagerFixture = async ({ page }) => {
    const poManager = new POManager(page);
    return poManager;
};
