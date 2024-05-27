import json
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("sensor/topic")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    payload = json.loads(msg.payload.decode())
    if payload["voltage"] < 100:
        result = json.dumps(payload)
        client.publish("eventinfo/topic", result) 

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("mosquitto", 1883, 60)
client.loop_start()