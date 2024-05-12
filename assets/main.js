function fetchBundleId() {
    const appUrl = document.getElementById('appUrl').value;
    const idPattern = /id(\d+)/;
    const match = appUrl.match(idPattern);

    if (match) {
        const appId = match[1];
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Using CORS Anywhere (for development only)
        const lookupUrl = `https://itunes.apple.com/lookup?id=${appId}`;

        fetch(proxyUrl + lookupUrl)
            .then(response => response.json())
            .then(data => {
                if (data.resultCount > 0) {
                    const bundleId = data.results[0].bundleId;
                    document.getElementById('output').textContent = `Bundle ID: ${bundleId}`;
                } else {
                    document.getElementById('output').textContent = 'No results found. Please check the URL and try again.';
                }
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
                document.getElementById('output').textContent = 'Failed to fetch data. Check console for details.';
            });
    } else {
        document.getElementById('output').textContent = 'Invalid URL. Please enter a valid App Store URL.';
    }
}
