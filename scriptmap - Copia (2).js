let map;
let trafficLayer;
let autocomplete;
let currentChart;
let chartData;
let streetName = "Rotterdam"


function initMap() {
    // Create the map centered in a location of your choice
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 51.9225, lng: 4.47917 }, // Default to Rotterdam
        zoom: 13,
        mapTypeControl: false,
    });

    // Initialize the traffic layer
    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map); // Show the traffic layer by default

    // Create the search box and link it to the UI element.
    const input = document.getElementById('pac-input');
    autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the autocomplete results to the map viewport.
    autocomplete.bindTo('bounds', map);

    // Listen for the event when a user selects a place from the search box.
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        // If the place doesn't have geometry, display an error.
        if (!place.geometry || !place.geometry.location) {
            console.error("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then zoom the map to that location.
        map.setCenter(place.geometry.location);
        map.setZoom(15); // Zoom in on the searched location

        // Re-apply traffic layer (in case the user wants to see the traffic here)
        trafficLayer.setMap(map);
    });
} 





// Load the Google Maps API and initialize the map

function updateStatistics() {
    const selectedValue = document.getElementById('statsDropdown').value;

    // Remove previous chart (if any)
    if (currentChart) {
        currentChart.destroy();
    }

    switch (selectedValue) {
        case 'airQuality':
            fetchAirQualityData(streetName);
            break;
        case 'pollen':
            fetchPollenData(streetName);
            break;
        case 'solar':
            fetchSolarData(streetName);
            break;
        default:
            break;
    }
}


function updateDropdownWithStreet(street) {
    streetName = street || "Rotterdam"; // Default to Rotterdam if no street is selected
    const dropdown = document.getElementById('statsDropdown');
    
    // Update each option's text with the new street name
    dropdown.options[0].text = `🌿 Air Quality - ${streetName}`;
    dropdown.options[1].text = `🌸 Pollen - ${streetName}`;
    dropdown.options[2].text = `🌞 Solar - ${streetName}`;

    // Trigger an update to render new statistics
    updateStatistics();
}


// fetch data with google API
/*
function fetchAirQualityData() {
    // Call the Air Quality API
    // Example: Replace with actual API call
    fetch('AIzaSyARtjtftVR_wd00FtOhhfTpr9OHkjHpi9Y')
        .then(response => response.json())
        .then(data => {
            chartData = data;  // Assuming the data format matches the chart
            renderChart('Air Quality', chartData);
        })
        .catch(error => console.error('Error fetching air quality data:', error));
}

function fetchPollenData() {
    // Call the Pollen API
    // Example: Replace with actual API call
    fetch('AIzaSyARtjtftVR_wd00FtOhhfTpr9OHkjHpi9Y')
        .then(response => response.json())
        .then(data => {
            chartData = data;  // Assuming the data format matches the chart
            renderChart('Pollen Count', chartData);
        })
        .catch(error => console.error('Error fetching pollen data:', error));
}

function fetchSolarData() {
    // Call the Solar API
    // Example: Replace with actual API call
    fetch('AIzaSyARtjtftVR_wd00FtOhhfTpr9OHkjHpi9Y')
        .then(response => response.json())
        .then(data => {
            chartData = data;  // Assuming the data format matches the chart
            renderChart('Solar Exposure', chartData);
        })
        .catch(error => console.error('Error fetching solar data:', error));
}
*/


function fetchAirQualityData(street) {
    // Test data for air quality
    const testData = [10, 15, 20, 25, 30];  // Example data
    renderChart(`Air Quality - ${street}`, testData);
}

function fetchPollenData(street) {
    // Test data for pollen count
    const testData = [5, 10, 15, 20, 25];  // Example data
    renderChart(`Pollen Count - ${street}`, testData);
}

function fetchSolarData(street) {
    // Test data for solar exposure
    const testData = [300, 350, 400, 450, 500];  // Example data
    renderChart(`Solar Exposure - ${street}`, testData);
}

function renderChart(label, data) {
    const ctx = document.getElementById('statisticsChart').getContext('2d');
    currentChart = new Chart(ctx, {
        type: 'bar',  // You can change chart type as needed
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],  // Example labels
            datasets: [{
                label: label,
                data: data,  // Use the fetched data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Add logic to dynamically change the dropdown based on searched street
autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();

    // If the place doesn't have geometry, return
    if (!place.geometry || !place.geometry.location) {
        console.error("No details available for input: '" + place.name + "'");
        return;
    }

    // Set the new center of the map to the searched location
    map.setCenter(place.geometry.location);
    map.setZoom(15); // Zoom into the selected location

    // Extract the street name from the place's address components (if available)
    let street = place.address_components?.find(component => component.types.includes("route"))?.long_name || place.name;

    // Update the dropdown with the new street name
    updateDropdownWithStreet(street);

    // Re-apply traffic layer
    trafficLayer.setMap(map);
});


// Call updateStatistics initially to load the default chart
document.addEventListener('DOMContentLoaded', function () {
    updateStatistics();  // Load the default selected statistic (Air Quality)
});


// mock data
/*
function fetchAirQualityData() {
    // Mock data for testing purposes
    const mockData = [12, 19, 3, 5, 2];  // Sample data
    renderChart('Air Quality', mockData);
}

function fetchPollenData() {
    const mockData = [7, 15, 8, 12, 6];
    renderChart('Pollen Count', mockData);
}

function fetchSolarData() {
    const mockData = [20, 25, 18, 22, 19];
    renderChart('Solar Exposure', mockData);
}
*/