from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def redox_dest(request):
    return Response(data={'challenge': request.query_params['challenge']}, status=status.HTTP_200_OK)
