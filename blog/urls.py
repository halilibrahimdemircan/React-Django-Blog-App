from django.urls import include, path
from blog.views import *


urlpatterns = [
    path('', PostList.as_view(), name='post-list'),
    path('<int:id>/', PostDetail.as_view(), name='post-detail'),
    path('<int:id>/comment/', CommentList.as_view(), name='comment-list'),
    path('<int:id>/like/', LikeList.as_view(), name='like-list'),
    path('<int:id>/view/', PostViewList.as_view(), name='post-view-list'),
]
