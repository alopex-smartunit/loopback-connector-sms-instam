## loopback-connector-sms-instam

[Instam](https://instam.ru/) connector for [LoopBack](http://www.loopback.io)

### Installation

In your LoopBack project:
    
    $ npm install --save loopback-connector-sms-instam

## Using the Connector
To use the connector, define the datasource using the connector in your `datasources.json` file:
    
    "sms": {
        "name": "sms",
        "connector": "loopback-connector-sms-instam",
        "url": "https://service.instam.ru",
        "username": "INSTAM_USERNAME",
        "password": "INSTAM_PASSWORD"
    }
  
Next, attach the created datasource to a model in the `model-config.json` file:

    "SMS": {
        "dataSource": "sms",
        "public": false
    }
    
Now, using the created model, you can send an SMS or make a call using the `send` method of the model:
    
    SMS.send(options, callback);
    
**Note**: `options` is defined by the JSON objects in the next two sections:

### Sending a SMS Payload
    {
        to: 'Target Number',
        message: 'Text Message'
    }

Phone number must be 11 digits with '+' prefix

### Version
0.1.0

License
----

MIT