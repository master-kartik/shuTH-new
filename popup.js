document.getElementById('toggle').addEventListener('change', function() {
    chrome.storage.local.set({ isEnabled: this.checked });
});

// Initialize the toggle state
chrome.storage.local.get('isEnabled', (data) => {
    document.getElementById('toggle').checked = data.isEnabled !== false;
});