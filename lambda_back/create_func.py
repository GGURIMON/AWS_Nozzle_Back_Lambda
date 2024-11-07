import json
import boto3
import base64
import random
import os
from translate import translate_to_english

# AWS Translate 클라이언트 생성
translate = boto3.client('translate', region_name="us-east-1")

# 이미지 생성 함수
def generate_image(prompt, seed):
    # 요청 payload 정의
    payload = {
        "text_prompts": [{"text": prompt}],
        "cfg_scale": 12,
        "seed": seed,
        "steps": 80,
    }

    bedrock = boto3.client(service_name="bedrock-runtime", region_name="us-east-1")

    body = json.dumps(payload)

    model_id = "stability.stable-diffusion-xl-v1"

    # 모델 호출
    response = bedrock.invoke_model(
        body=body,
        modelId=model_id,
        accept="application/json",
        contentType="application/json",
    )

    # 응답 처리 및 이미지 디코딩
    response_body = json.loads(response['body'].read())
    artifact = response_body.get("artifacts")[0]
    image_encoded = artifact.get("base64").encode("utf-8")
    image_bytes = base64.b64decode(image_encoded)

    return image_bytes

# Lambda 핸들러 함수
def create(event, context):
    # 번역 요청된 텍스트를 영어로 번역
    prompt_data = translate_to_english(event.get("prompt"))

    # 랜덤 시드 생성
    seed = random.randint(0, 100000)

    try:
        # 이미지 생성
        image_bytes = generate_image(prompt=prompt_data, seed=seed)

        # 이미지를 임시로 저장
        output_dir = "/tmp/output"
        os.makedirs(output_dir, exist_ok=True)
        file_name = f"{output_dir}/generated-{seed}.png"
        with open(file_name, "wb") as f:
            f.write(image_bytes)

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"이미지 생성 중 오류가 발생했습니다: {str(e)}")
        }

    # Base64 인코딩된 이미지 반환
    image_base64 = base64.b64encode(image_bytes).decode('utf-8')

    return {
            "image_base64": image_base64
    }