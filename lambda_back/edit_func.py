import base64
import boto3
import json
import logging
from s3 import download_file
from translate import translate_to_english

# AWS 서비스 클라이언트 생성
client = boto3.client("bedrock-runtime", region_name="us-east-1")
translate = boto3.client("translate", region_name="us-east-1")

# 로깅 설정
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# 모델 ID 설정
model_id = "amazon.titan-image-generator-v2:0"


def edit(event, context, file_name, masked_image):
    try:
        # 이벤트에서 프롬프트와 이미지 데이터 받기
        korean_prompt = event.get("prompt").strip()
        input_image_base64 = download_file(file_name)

        logger.info(f"Received event: {event}")

        # 요청된 데이터를 로그로 출력
        logger.info(f"Received prompt: {korean_prompt}")
        logger.info(f"Received input_image_base64: {input_image_base64}")

        if not korean_prompt or not input_image_base64:
            logger.error("Missing prompt or input_image_base64.")
            return {
                "statusCode": 400,
                "body": "prompt and input_image_base64 are required."
            }

        # 프롬프트 번역
        prompt_data = translate_to_english(korean_prompt)
        logger.info(f"Translated prompt: {prompt_data}")

        # 이미지 Base64 디코딩
        input_image_data = base64.b64decode(input_image_base64)
        logger.info(f"Input image size after decoding: {len(input_image_data)} bytes")

        if "배경 제거" in korean_prompt:
            request = json.dumps({
                "taskType": "BACKGROUND_REMOVAL",
                "backgroundRemovalParams": {
                    "image": base64.b64encode(input_image_data).decode('utf-8')
                }
            })
            logger.info("Background removal request prepared.")

        else:
            mask_image_base64 = download_file(masked_image)
            if mask_image_base64:
                logger.info(f"Received mask_image_base64: {mask_image_base64}")
            if not mask_image_base64:
                logger.error("mask_image_base64 is required for INPAINTING task.")
                return {
                    "statusCode": 400,
                    "body": "mask_image_base64 is required for INPAINTING task."
                }

            mask_image_data = base64.b64decode(mask_image_base64)
            logger.info(f"Mask image size after decoding: {len(mask_image_data)} bytes")

            request = json.dumps({
                "taskType": "INPAINTING",
                "inPaintingParams": {
                    "image": base64.b64encode(input_image_data).decode('utf-8'),
                    "text": prompt_data,
                    "maskImage": base64.b64encode(mask_image_data).decode('utf-8')
                },
                "imageGenerationConfig": {
                    "numberOfImages": 1,
                    "height": 512,
                    "width": 512,
                    "cfgScale": 8.0
                }
            })
            logger.info("Inpainting request prepared.")

        # 모델 호출
        logger.info(f"Sending request to Bedrock: {request}")
        response = client.invoke_model(modelId=model_id, body=request)

        # 응답 데이터 디코딩
        model_response = json.loads(response["body"].read())
        generated_image_base64 = model_response["images"][0]
        logger.info("Model response received successfully.")

        # 결과 반환
        return {
            "generated_image_base64": generated_image_base64
        }

    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error: {str(e)}")
        }
