from django.urls import path

from blog.views import (CommentList, LikeList, PostDetail, PostList,
                        PostViewList)

urlpatterns = [
    path('', PostList.as_view(), name='post-list'),
    path('<int:id>/', PostDetail.as_view(), name='post-detail'),
    path('<int:id>/comment/', CommentList.as_view()),
    path('<int:id>/like/', LikeList.as_view()),
    path('<int:id>/view/', PostViewList.as_view()),
]
