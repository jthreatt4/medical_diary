import json
import requests
from django.conf import settings
from integrations.services.payloads import new_schedule_payload, available_slots_payload, booked
from appointments.models import Appointment


class RedoxService:
    api_key = settings.REDOX_API_KEY
    secret = settings.REDOX_SECRET
    url = 'https://api.redoxengine.com/endpoint'

    def __init__(self, integration):
        self.headers = {
            'Authorization': 'Bearer {}'.format(integration.access_token),
            'content-type': 'application/json',
        }

    def new_schedule(self, datetime=None):
        res = requests.post(self.url, headers=self.headers, json=new_schedule_payload)
        params = new_schedule_payload
        appt = Appointment.objects.create(
            provider=params['Visit']['AttendingProvider']['ID'],
            address=params['Visit']['AttendingProvider']['Address']['StreetAddress'],
            city=params['Visit']['AttendingProvider']['Address']['City'],
            state=params['Visit']['AttendingProvider']['Address']['State'],
            first_name=params['Visit']['AttendingProvider']['FirstName'],
            last_name=params['Visit']['AttendingProvider']['LastName'],
            reason=params['Visit']['Reason'],
            timestamp=datetime or params['Visit']['VisitDateTime']
        )

    def available_slots(self):
        res = requests.post(self.url, headers=self.headers, json=available_slots_payload)
        import pdb; pdb.set_trace()
        # slots = json.loads(res.content)

    def booked(self):
        res = requests.post(self.url, headers=self.headers, json=booked)
        import pdb; pdb.set_trace()
        # slots = json.loads(res.content)

