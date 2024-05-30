const fs = require('fs');
const csv = require('csv-parser');
const mqtt = require('mqtt');

const results = [];

const client  = mqtt.connect('mqtt://mosquitto')

client.on('connect', function () {
  console.log('connected to MQTT broker');

  fs.createReadStream('household_power_consumption.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.forEach((row, index) => {
        setTimeout(() => {
          const date = row['Date'].split('/').reverse().join('');
          const time = row['Time'].replace(/:/g, '');
          const timestamp = parseInt(date + time, 10);

          const powerConsumption = {
            globalActivePower: parseFloat(row['Global_active_power']),
            globalReactivePower: parseFloat(row['Global_reactive_power']),
            voltage: parseFloat(row['Voltage']),
            globalIntensity: parseFloat(row['Global_intensity']),
            timestamp: timestamp,
          };

          client.publish('sensor/topic', JSON.stringify(powerConsumption));
          console.log(`Row ${index} sent successfully`);
        }, index * 100);
      });
    });
});