import json
import time
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("sensor/topic")

def on_message(client, userdata, msg):
    payload = json.loads(msg.payload.decode())
    # print(payload)
    if payload["voltage"] < 240:
        result = json.dumps(payload)
        client.publish("eventinfo/topic", result) 

client = mqtt.Client(protocol=mqtt.MQTTv311)
client.on_connect = on_connect
client.on_message = on_message

client.connect("mosquitto", 1883, 60)
client.loop_start()

while True:
    time.sleep(1)