from rest_framework import serializers
from .models import Image, Annotation


class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    annotations = AnnotationSerializer(many=True, read_only=True)
    class Meta:
        model = Image
        fields = ['id', 'file', 'uploaded_at', 'annotations']
