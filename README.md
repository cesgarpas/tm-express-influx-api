# Temperature & Humidity express API
Very simple dockerized API to track Temperature and humidity information

## Endpoints

- GET /mesaurement
    Returns the first 10 points containing temperature and humidity information

- POST /mesaurement
    Receives a JSON to store the information in the connected Influx database
    ```json
    {
        "room": "bedroom",
        "temperature": "28",
        "humidity": "88"
    }
    ```