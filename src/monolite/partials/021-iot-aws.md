---
title: AWS IoT
category: IoT
---

Para is integrated with the AWS IoT cloud which means that you can create `Thing` objects through the Para API.
When you create a `Thing` it is also created on the AWS cloud and a certificate is generated for it which is saved
within the `Thing` object. The certificate, private and public keys and other information about the device are only
shown once the `Thing` is created. Here's an example create request:

```
POST /v1/things
{
	"name": "MyThing",
	"serviceBroker": "AWS"
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
  "serviceBroker": "AWS",
  "deviceState": {},
  "deviceDetails": {
    "thingId": "664870213421895680",
    "thingName": "MyThing",
    "thingARN": "arn:aws:iot:eu-west-1:123456789:thing/MyThing",
    "clientId": "MyThing",
    "clientCertId": "1abee5f25a5e1b1c66b66dd462dda32000621b429f6eb1ddb179ec3b",
    "clientCertARN": "arn:aws:iot:eu-west-1:123456789:cert/1abee5f25a5e1b1c66b66dd462dda32000621b429f6eb1ddb179ec3b",
    "clientCert": "-----BEGIN CERTIFICATE-----\n ... \n-----END CERTIFICATE-----\n",
    "privateKey": "-----BEGIN RSA PRIVATE KEY-----\n ... \n-----END RSA PRIVATE KEY-----\n",
    "publicKey": "-----BEGIN PUBLIC KEY-----\n ... \n-----END PUBLIC KEY-----\n",
    "region": "eu-west-1",
    "port": 8883,
    "host": "b2chw4axefhujt.iot.eu-west-1.amazonaws.com"
  }
}
```
Note that the field `deviceDetails` is only showed once and the device's metadata is hidden on read.
Now you can connect your device to the AWS cloud using the generated certificates and start sending messages with the
with the state of the device. Para will check with AWS for shadow updates on each read and sync the `Thing` object's
state with the state that is stored in the cloud. If the `Thing` object is updated from the Para API, the AWS IoT
shadow is updated accordingly so the two are in sync again. Finally, deleting the `Thing` object also deletes it from
AWS along with the certificate and policy attached to it.

In order to use the IoT integration feature, Para needs to get your AWS credentials from the config file or from the
instance it is deployed on.