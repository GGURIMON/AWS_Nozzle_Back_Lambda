def bgrm(event, context, file_name):
    try:
        korean_prompt = event.get("prompt").strip()
        input_image_base64 = download_file(file_name)

        input_image_data = base64.b64decode(input_image_base64)
        request = json.dumps({
                    "taskType": "BACKGROUND_REMOVAL",
                    "backgroundRemovalParams": {
                        "image": base64.b64encode(input_image_data).decode('utf-8')
                    }
                })


        response = client.invoke_model(modelId=model_id, body=request)

        # 응답 데이터 디코딩
        model_response = json.loads(response["body"].read())
        generated_image_base64 = model_response["images"][0]

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
