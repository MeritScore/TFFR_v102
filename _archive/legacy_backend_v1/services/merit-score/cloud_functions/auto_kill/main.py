import base64
import json
import logging
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

def stop_billing(data, context):
    pubsub_data = base64.b64decode(data['data']).decode('utf-8')
    pubsub_json = json.loads(pubsub_data)
    cost_amount = pubsub_json['costAmount']
    budget_amount = pubsub_json['budgetAmount']

    logging.info(f"Cost: {cost_amount}, Budget: {budget_amount}")

    if cost_amount >= 250.0:
        logging.warning("Budget exceeded! Deleting project.")
        credentials = GoogleCredentials.get_application_default()
        service = discovery.build('cloudresourcemanager', 'v1', credentials=credentials)
        project_id = 'decoded-app-483909-a7' # HARDCODED FOR SAFETY
        request = service.projects().delete(projectId=project_id)
        request.execute()
        logging.info("Project deletion initiated.")
