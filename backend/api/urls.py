from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet, AnnotationViewSet

router = DefaultRouter()
router.register(r'images', ImageViewSet)
router.register(r'annotations', AnnotationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
