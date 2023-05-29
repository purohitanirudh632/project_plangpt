import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
import datetime
import openai

class RequestDetail(APIView):
    
    def get(self, request, request_id):
        try:
            request = Request.objects.get(id=request_id)
            serializer = RequestSerializer(request)
            return Response(serializer.data)
        except Request.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        input_data = request.data.get('input_text')
        request.data["output_text"] = get_plan_response(input_data)
        request.data["user"] = User.objects.all().first().id
        request.data["updated_at"] = datetime.datetime.now()
        print(request.data["updated_at"])
        serializer = RequestSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data = serializer.data, status=status.HTTP_201_CREATED)
        return Response(data = serializer.errors, status = status.HTTP_403_FORBIDDEN)

def get_plan_response(input_data):
    model_engine = "text-davinci-003"
    print(input_data)
    prompt = input_data

    response = openai.Completion.create(
       engine=model_engine,
       prompt=prompt,
       max_tokens =500
    )
    response_data = response["choices"][0]["text"]
    # type(response_data)
    return response_data
