from ..entities.image import Image

class ImageAdaptor:  
    def convertImage(self, image1):
        raise NotImplementedError
    
class ImageAdaptorImpl(ImageAdaptor):
    def convertImage(self, image1):
        image = Image()
        
        image.setId(image1.id)
        image.setName(image1.name)
        image.setDescription(image1.description)
        image.setArchitecture(image1.architecture)
        image.setPlatform(image1.platform)
        image.setState(image1.state)
        image.setType(image1.type)
        
        return image
        