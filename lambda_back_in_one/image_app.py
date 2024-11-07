import create_func
import edit_func
from s3 import get_image

def image_create(event, context):
    return create_func.create(event, context)

def image_bgrm(event, context, file_name):    
    return edit_func.edit(event, context, file_name)

def image_edit(event, context, file_name, masked_image):    
    return edit_func.edit(event, context, file_name, masked_image)
    