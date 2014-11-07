class CloudProvider:
    def __init__(self):
        pass
    def launchInstance(self):
        raise NotImplementedError
    def startInstance(self, instanceId):
        raise NotImplementedError
    def stopInstance(self, instanceId):
        raise NotImplementedError
    def rebootInstance(self, instanceId):
        raise NotImplementedError
    def terminateInstance(self, instanceId):
        raise NotImplementedError
    def snapshotInstance(self, instanceId):
        raise NotImplementedError
    def connect(self, cloudAccount):
        raise NotImplementedError
    def getSecurityGroups(self):
        raise NotImplementedError
    def getImages(self):
        raise NotImplementedError
    def getCapability(self):
        raise NotImplementedError
    def getInstance(self, instanceId):
        raise NotImplementedError
    def getInstances(self):
        raise NotImplementedError
    def close(self):
        raise NotImplementedError
    