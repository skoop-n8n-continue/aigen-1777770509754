/**
 * Skoop Hello World Application
 */

async function loadAppData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load app data:', error);
        return null;
    }
}

async function init() {
    const data = await loadAppData();
    if (!data) return;

    // Apply data-driven styles
    const settings = data.sections.app_settings;
    const root = document.documentElement;

    // Set CSS variables - kebab-case matching field keys for live runtime compatibility
    root.style.setProperty('--primary-color', settings.primary_color.value);
    root.style.setProperty('--background-color', settings.background_color.value);
    root.style.setProperty('--text-color', settings.text_color.value);

    // Apply content
    const storefront = data.sections.storefront;
    document.querySelector('.headline').textContent = storefront.headline.value;
    document.querySelector('.message').textContent = storefront.message.value;

    // Reveal the app
    document.getElementById('app-container').classList.add('loaded');
}

// Start the app
init();
