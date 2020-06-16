import json
import yaml


with open('assets/voices.yaml') as configFile:
    data = configFile.read()
    confObj = yaml.load(data, Loader=yaml.FullLoader)
    with open('assets/voices.json', 'w') as target:
        json.dump(confObj, target, indent=2)
