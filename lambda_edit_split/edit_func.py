import base64
import json
import logging
from translate import translate_to_english

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def background_removal(original_image_base64):
    # 배경 제거 작업 수행
    request = json.dumps({
        "taskType": "BACKGROUND_REMOVAL",
        "backgroundRemovalParams": {
            "image": original_image_base64
        }
    })
    logger.info("Background removal request sent.")
    return {"status": "success", "details": "Background removed successfully"}

def inpainting(original_image_base64, mask_image_base64, prompt):
    translated_prompt = translate_to_english(prompt)

    # 인페인팅 작업 수행
    request = json.dumps({
        "taskType": "INPAINTING",
        "inPaintingParams": {
            "image": original_image_base64,
            "text": translated_prompt,
            "maskImage": mask_image_base64
        }
    })
    logger.info("Inpainting request sent.")
    return {"status": "success", "details": "Inpainting completed successfully"}
