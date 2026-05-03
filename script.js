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

    // Handle time visibility
    const timeEl = document.querySelector('.time');
    if (settings.show_time.value) {
        timeEl.style.display = 'block';
        updateTime();
        setInterval(updateTime, 1000);
    } else {
        timeEl.style.display = 'none';
    }

    // Reveal the app
    document.getElementById('app-container').classList.add('loaded');
}

function updateTime() {
    const timeEl = document.querySelector('.time');
    if (!timeEl) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    timeEl.textContent = timeString;
}

// Start the app
init();
