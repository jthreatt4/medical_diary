import json
import requests
from django.conf import settings
from integrations.services.payloads import new_schedule_payload, available_slots_payload, booked
from journal.models import Appointment


class RedoxService:
    api_key = settings.REDOX_API_KEY
    secret = settings.REDOX_SECRET
    url = 'https://api.redoxengine.com/endpoint'

    def __init__(self, integration):
        self.headers = {
            'Authorization': 'Bearer {}'.format(integration.access_token),
            'content-type': 'application/json',
        }

    def new_schedule(self):
        res = requests.post(self.url, headers=self.headers, json=new_schedule_payload)
        params = new_schedule_payload
        appt = Appointment.objects.create(
            provider='redox',
            address=params['Visit']['AttendingProvider']['Address']['StreetAddress'],
            city=params['Visit']['AttendingProvider']['Address']['City'],
            state=params['Visit']['AttendingProvider']['Address']['State'],
            first_name=params['Visit']['AttendingProvider']['FirstName'],
            last_name=params['Visit']['AttendingProvider']['LastName'],
        )
        # provider = models.CharField(max_length=255)
        # address = models.CharField(max_length=255, blank=True, null=True)
        # city = models.CharField(max_length=255, blank=True, null=True)
        # state = models.CharField(max_length=255, blank=True, null=True)
        # first_name = models.CharField(max_length=255)
        # last_name = models.CharField(max_length=255)
        # reason = models.CharField(max_length=255, blank=True, null=True)
        # schedule = json.loads(res.content)

    def available_slots(self):
        res = requests.post(self.url, headers=self.headers, json=available_slots_payload)
        import pdb; pdb.set_trace()
        # slots = json.loads(res.content)

    def booked(self):
        res = requests.post(self.url, headers=self.headers, json=booked)
        import pdb; pdb.set_trace()
        # slots = json.loads(res.content)

