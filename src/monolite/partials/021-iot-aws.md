---
title: AWS IoT
category: IoT
---

Para is integrated with the AWS IoT cloud which means that you can create `Thing` objects through the Para API and have
them sync their state with the AWS cloud. When you create a `Thing` it is also created on the AWS cloud and a
certificate is generated for it which is saved within the `Thing` object. The certificate, private and public keys
and other information about the device are only shown once the `Thing` is created. Here's an example create request:

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
  "deviceMetadata": {
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
state of the device. Para will check with AWS for shadow updates on each read and sync the `Thing` object's
state with the state that is stored in the cloud. If the `Thing` object is updated from the Para API, the AWS IoT
shadow is updated accordingly so the two are in sync again. Finally, deleting the `Thing` object also deletes it from
AWS along with the certificate and policy attached to it.

In order to use the IoT integration feature, Para needs to get your AWS credentials from the config file or from the
instance it is deployed on.

### Getting started with Para and AWS IoT

1. Get an account from AWS and create a user with permissions to call the IoT API
2. Set the `para.aws_access_key` and `para.aws_secret_key` properties in your Para config file
3. Start the Para instance and create a `Thing` object through the API:
```
POST /v1/things
{
	"name": "myDevice",
	"serviceBroker": "AWS"
}
```
4. Take note of the `deviceDetails` field retured by this request as it contains certificates for your device
5. Use the certificates to set up your device and connect it to AWS IoT
6. The `deviceState` field inside the Para `Thing` object is synced with the device shadow on AWS on every `GET` request
7. Update the `deviceState` from the Para API and it will be synced with the device shadow on AWS on every `PATCH` request.

