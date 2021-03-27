from rest_framework import routers
from .api import BookmarkViewSet

router = routers.DefaultRouter()
router.register('api/bookmarks', BookmarkViewSet, 'bookmarks')

urlpatterns = router.urls
