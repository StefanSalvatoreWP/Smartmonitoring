import { route } from 'ziggy-js'; // Ensure `ziggy-js` is correctly installed

const fetchZiggy = async () => {
    try {
        const response = await fetch('/ziggy');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const ziggyData = await response.json();
        route(ziggyData);
    } catch (error) {
        console.error('Failed to fetch Ziggy configuration:', error);
    }
};

fetchZiggy();


export { route };
