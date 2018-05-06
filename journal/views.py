# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from appointments.models import Appointment
from appointments.serializers import AppointmentSerializer


@api_view(['GET'])
def journal_notes(request):
    appts = AppointmentSerializer(Appointment.objects.all(), many=True).data
    data = appts
    return Response(data=data, status=status.HTTP_200_OK)
