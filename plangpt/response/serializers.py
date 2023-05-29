from rest_framework import serializers
from .models import Request

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ( 'user', 'input_text', 'output_text', 'created_at', 'updated_at')

    
