#!/usr/bin/env python3
import os
import json
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv()
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

# State file to track last processed email
STATE_FILE = '/data/.openclaw/workspace/.email_state'

def get_last_email_id():
    try:
        with open(STATE_FILE) as f:
            return json.load(f).get('last_email_id')
    except:
        return None

def save_last_email_id(email_id):
    with open(STATE_FILE, 'w') as f:
        json.dump({'last_email_id': email_id})

def check_new_emails():
    last_id = get_last_email_id()
    
    inboxes = client.inboxes.list()
    inbox_id = inboxes.inboxes[0].inbox_id
    
    # Get messages (newest first)
    result = client.inboxes.messages.list(inbox_id, limit=10)
    
    if not result.messages:
        return None
    
    newest = result.messages[0]
    
    # Skip if already processed
    if last_id == newest.message_id:
        return None
    
    # Save new state
    save_last_email_id(newest.message_id)
    
    # Extract content
    body = newest.extracted_text or newest.text or ""
    subject = newest.subject or "No subject"
    sender = newest.from_address or "Unknown"
    
    return {
        'subject': subject,
        'from': sender,
        'body': body,
        'message_id': newest.message_id
    }

if __name__ == '__main__':
    result = check_new_emails()
    if result:
        print(json.dumps(result, indent=2))
    else:
        print("No new emails")
