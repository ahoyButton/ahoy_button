import json
import yaml

confObj = None
originObj = None
with open('assets/voices.yaml') as configFile, open('assets/voices.json') as originFile:
    data = configFile.read()
    confObj = yaml.load(data, Loader=yaml.FullLoader)
    oldData = originFile.read()
    originObj = json.loads(oldData)


def findGroup(iterable, target):
    for group in iterable:
        if group['group_name']['lang']['zh_CN'] == target['group_name']['lang']['zh_CN']:
            return group
    return None


def addNewItemTag(oldData, newData):
    for group in newData:
        oldGroup = findGroup(oldData, group)
        if not oldGroup:
            group['isNew'] = True
            for button in group['buttons']:
                button['isNew'] = True
        else:
            for button in group['buttons']:
                if button in oldGroup['buttons']:
                    continue
                else:
                    button['isNew'] = True
addNewItemTag(originObj, confObj)


with open('assets/voices.json', 'w') as target:
    json.dump(confObj, target)
