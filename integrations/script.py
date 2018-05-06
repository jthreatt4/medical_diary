from django.contrib.auth.models import User

from integrations.models import Integration


def create_integration():
    user = User.objects.create(username='test user 1', email='test@email.com', password='asdffdsa')
    Integration.objects.create(access_token='09451442-0b7a-4372-bf42-3569b807dffa', user=user)
