import boto3
import logging
from botocore.exceptions import ClientError
import urllib
from s3 import create_presigned_url
import json
import image_app
        
def lambda_handler(event, context):
    action = event['queryStringParameters']['action']
    result = None
    file_name = event['queryStringParameters']['key']
    if action == 'presigned':
        url = create_presigned_url(file_name)

        return {
            'statusCode': 200,
            'body': json.dumps(url, ensure_ascii=False),
            'header': {
                'Content-Type': 'application/json'
            }
        }

    elif action == 'create':
        return image_app.create(event, context)

    elif action == 'bgrm':
        return image_app.bgrm(event, context, file_name)
        

    elif action == 'edit':
        masked_image = event['queryStringParameters']['masked_image']
        return image_app.edit(event, context, file_name, masked_image)

    else:
        # 알 수 없는 요청 처리
        return {
            'statusCode': 400,
            'body': 'Invalid action specified'
        }