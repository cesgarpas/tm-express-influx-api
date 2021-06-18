const express = require('express');
const app = express()
app.use(express.json());

const Influx = require('influx')
const port = process.env.PORT || 12000

// Influx connection
const influx = new Influx.InfluxDB({
    host: process.env.INFLUX_HOST || 'localhost',
    port: process.env.INFLUX_PORT || '8086',
    database: 'temperature_db',
    schema: [
        {
            measurement: 'room_temperature',
            fields: {
                room: Influx.FieldType.STRING,
                temperature: Influx.FieldType.INTEGER,
                humidity: Influx.FieldType.INTEGER
            },
            tags: [
                'host'
            ]
        }
    ]
})

// Routes
app.get('/', (req, res) => {
    res.send("Working server!")
})

app.get('/measurement', (req, res) => {
    influx.query(`
    select * from room_temperature
    order by time desc
    limit 10
  `).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).send(err.stack)
    })
})

app.post('/measurement', (req, res) => {
    influx.writePoints([
        {
            measurement: 'room_temperature',
            fields: req.body,
        }
    ]).then(() => {
        res.status(201).send("Created")
    }).catch(err => {
        res.status(400).send("Bad Request")
    })
})



// Influx initialization and server listen
influx.getDatabaseNames().then(names => {
    if (!names.includes('temperature_db')) {
        return influx.createDatabase('temperature_db');
    }
}).then(() => {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    })
}).catch(err => {
    statusMessage = "Error creating Influx database!";
    console.error(statusMessage);
})