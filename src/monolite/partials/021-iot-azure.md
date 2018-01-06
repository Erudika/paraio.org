---
title: Azure IoT
category: IoT
---

Para is integrated with the Microsoft's Azure IoT Hub which means that you can create `Thing` objects through the Para
API and have them sync their state with the Azure cloud. When you create a `Thing` it is also created as a device on
the Azure cloud and primary/secondary keys are generated for it which are saved within the `Thing` object. These keys
and other information about the device are only shown once the `Thing` is created. Here's an example create request:

```
POST /v1/things
{
	"name": "MyThing",
	"serviceBroker": "Azure"
}
```

The response would be something like this:


```
{
  "id": "664870213421895680",
  "timestamp": 1468601996535,
  "type": "thing",
  "appid": "myapp",
  "name": "MyThing"
  "serviceBroker": "Azure",
  "deviceState": {},
  "deviceDetails": {
    "thingId": "664870213421895680",
    "thingName": "MyThing",
    "primaryKey": "1abee5f25a5e1b1c66b66dd462dda",
    "secondaryKey": "32000621b429f6eb1ddb179ec3b",
    "status": "enabled",
    "lastActivity": "{timestamp}",
    "connectionState": "disconnected",
    "connectionString": "HostName=abc.def.com;DeviceId=664870213421895680;SharedAccessKey=1abee5f25a5e1b1c66b66dd462dda",
  }
}
```

Note that the field `deviceDetails` is only showed once and the device's metadata is hidden on read.
Now you can connect your device to the Azure cloud using the generated primary/secondary keys and start sending messages
with the state of the device. Para will automatically check with Azure for device messages and sync the `Thing` object's
state with the state that is stored in the cloud. If the `Thing` object is updated from the Para API, the Azure IoT
device is updated accordingly so the two are in sync again. Finally, deleting the `Thing` object also deletes it from
the Azure IoT Hub.

In order to use the IoT integration feature, Para needs to get your AWS credentials from the config file or from the
instance it is deployed on. Also you have to enable IoT features in Para with `para.iot_enabled = true`.

### Getting started with Para and Azure IoT

1. Get an account from Azure and create an IoT hub
2. Set the `para.azure.iot_hostname`, `para.azure.iot_access_key`, `para.azure.iot_eventhub_name` and
`para.azure.iot_eventhub_endpoint` properties in your Para config file (these can be found in your IoT console)
3. Start the Para instance and create a `Thing` object through the API:
```
POST /v1/things
{
	"name": "myDevice",
	"serviceBroker": "Azure"
}
```
4. Take note of the `deviceDetails` field retured by this request as it contains primary/secondary keys for your device
5. Use the primary/secondary keys to set up your device and connect it to Azure IoT Hub
6. The `deviceState` field inside the Para `Thing` object is synced with the device on Azure automatically in the background
7. Update the `deviceState` from the Para API and it will be synced with the device shadow on Azure on every `PATCH` request.