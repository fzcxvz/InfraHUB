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

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
    
        if (!place.geometry || !place.geometry.location) {
            console.error("No details available for input: '" + place.name + "'");
            return;
        }
    
        map.setCenter(place.geometry.location);
        map.setZoom(15);
    
        let street = place.address_components?.find(component => component.types.includes("route"))?.long_name || place.name;
        
        // Update both the traffic stats and the dropdowns for other statistics
        updateTrafficStatistics(street);
        updateDropdownWithStreet(street);
    
        // Update the description text with the new street name
        updateDescription(document.getElementById('statsDropdown').value, street);
    
        // Re-apply traffic layer
        trafficLayer.setMap(map);
    });
    
} 

function updateTrafficStatistics(street) {
    streetName = street || "Rotterdam"; // Default to Rotterdam if no street is selected
    const trafficStatsList = document.getElementById('trafficStatsList');
    
    // Create test traffic data
    const trafficData = [
        { icon: '🚦', traffic: 'Moderate', street: streetName },
        { icon: '🚦', traffic: 'Heavy', street: `${streetName} - North` },
        { icon: '🚦', traffic: 'Light', street: `${streetName} - South` }
    ];

    // Clear existing list
    trafficStatsList.innerHTML = '';

    // Populate the list with new traffic data
    trafficData.forEach(stat => {
        const li = document.createElement('li');
        li.textContent = `${stat.icon} ${stat.traffic} - ${stat.street}`;
        trafficStatsList.appendChild(li);
    });
}

function updateDescription(statType, street) {
    const descriptionRect = document.querySelector('.description-rect p');
    const seeMoreLink = '<a href="#" class="see-more">See more... ➡️</a>';
    const monthOfMin = 'January';  // Placeholder data
    const monthOfMax = 'July';     // Placeholder data

    switch (statType) {
        case 'airQuality':
            descriptionRect.innerHTML = `The air quality of ${street} is at its minimum level in ${monthOfMin} and at its highest in ${monthOfMax}. ${seeMoreLink}`;
            break;
        case 'pollen':
            descriptionRect.innerHTML = `The pollen count of ${street} is at its minimum level in ${monthOfMin} and at its highest in ${monthOfMax}. ${seeMoreLink}`;
            break;
        case 'solar':
            descriptionRect.innerHTML = `The solar exposure of ${street} is at its minimum level in ${monthOfMin} and at its highest in ${monthOfMax}. ${seeMoreLink}`;
            break;
        default:
            descriptionRect.innerHTML = 'Manage urban traffic flow with ease, monitor the city map in real-time, and keep everything running smoothly for a better urban experience.';
    }
}

function updateStatistics() {
    const selectedValue = document.getElementById('statsDropdown').value;

    // Remove previous chart (if any)
    if (currentChart) {
        currentChart.destroy();
    }
    updateDescription(selectedValue, streetName);

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

/*
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
}*/


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

// Call updateStatistics initially to load the default chart
document.addEventListener('DOMContentLoaded', function () {
    updateStatistics();  // Load the default selected statistic (Air Quality)
});
