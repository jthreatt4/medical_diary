from rest_framework.serializers import ModelSerializer

from journal.models import Appointment


class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
