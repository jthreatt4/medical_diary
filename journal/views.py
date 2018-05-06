# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from appointments.models import Appointment
from appointments.serializers import AppointmentSerializer
from journal.models import Entry
from journal.serializers import EntrySerializer


@api_view(['GET'])
def journal_notes(request):
    appts = AppointmentSerializer(Appointment.objects.all(), many=True).data
    entries = EntrySerializer(Entry.objects.all(), many=True).data
    data = appts + entries
    return Response(data=data, status=status.HTTP_200_OK)


class CreateEntry(CreateAPIView):
    serializer_class = EntrySerializer