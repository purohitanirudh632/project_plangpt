from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .serializer import *
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import AuthenticationFailed



# Create your views here.
class RegistrationView(APIView):
    def post(self,request):
        response = dict()
        serializer = UserAuthSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            response["data"] = serializer.data
            response["status"] = status.HTTP_201_CREATED
            # response["msg"] = "congo user is created"
            return Response(status=status.HTTP_200_OK, data= {"msg" : "user created sucessfully"})
        
        return Response(serializer.errors)
    
    
    def get(self,request):
            users = User.objects.all()
            serializer = UserAuthSerializer(users,many=True)
            return Response(serializer.data)
    
class LoginView(APIView):
 def post(self, request, *args, **kwargs):        
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        user = get_object_or_404(User,email=email)
        if not user:
            raise AuthenticationFailed("user not found")

        if not user.check_password(password):
            raise AuthenticationFailed("incorrect password")

        return Response(status=status.HTTP_200_OK, data= {"msg" : "login successfully"})
