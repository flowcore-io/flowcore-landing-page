// Adding Open Web Inspector to Flowcore Landing Page
// Complete AI helper function
function enableWebInspector(targetSelector = null) {
    // Check if already loaded
    if (typeof OpenWebInspector !== 'undefined') {
        OpenWebInspector.enable();
        if (targetSelector) {
            OpenWebInspector.selectElement(targetSelector);
        }
        return;
    }
    
    // Load library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/open-web-inspector@latest/dist/open-web-inspector.min.js';
    script.onload = () => {
        OpenWebInspector.enable();
        if (targetSelector) {
            setTimeout(() => OpenWebInspector.selectElement(targetSelector), 100);
        }
        console.log('🎯 Open Web Inspector ready! Click any element to inspect.');
    };
    script.onerror = () => {
        console.error('Failed to load Open Web Inspector');
    };
    document.head.appendChild(script);
}

// Enable the inspector immediately
enableWebInspector();
