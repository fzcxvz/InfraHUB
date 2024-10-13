let map;
let trafficLayer;
let autocomplete;


// JavaScript for the Air Quality Chart using Chart.js
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('airQualityChart').getContext('2d');
    const airQualityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Oct', 'Oct', 'Oct', 'Oct', 'Oct'],
            datasets: [{
                label: 'Air Quality',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
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
});

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
