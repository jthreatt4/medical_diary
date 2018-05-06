from django.contrib.auth.models import User
from django.test import TestCase

from integrations.models import Integration
from integrations.services.redox import RedoxService


class RedoxTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(username='test', password='asdffdsa', email='test@email.com')
        self.integration = Integration.objects.create(user=user,
                                                      service='redox',
                                                      access_token='09451442-0b7a-4372-bf42-3569b807dffa',
                                                      refresh_token='72ec430e-cd51-45d4-b')

    def test_redox(self):
        service = RedoxService(integration=self.integration)
        service.new_schedule()

    # def test_seed(self):
    #     service = RedoxService(integration=self.integration)
    #     service.new_schedule()
        # create seed integration obj
        # raise Exception
