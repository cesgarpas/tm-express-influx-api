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

## Build

You can build for x86 or ARMv7:
- For x86:

    `docker image build -t username/tm-express-influx-api:x86`
    
- For ARMv7:

    `docker image build -f Dockerfile-armv7 -t username/tm-express-influx-api:armv7`