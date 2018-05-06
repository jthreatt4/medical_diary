from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from integrations.models import Integration
from integrations.services.redox import RedoxService
from appointments.models import Appointment
from appointments.serializers import AppointmentSerializer


@api_view(['GET'])
def appointments(request):
    appts = Appointment.objects.all()
    appointments = AppointmentSerializer(appts, many=True).data
    return Response(data={'appointments': appointments}, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_appointment(request):
    integration = Integration.objects.first()
    RedoxService(integration).new_schedule()
    return Response(data={}, status=status.HTTP_200_OK)
