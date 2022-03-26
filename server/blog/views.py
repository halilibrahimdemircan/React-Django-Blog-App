from rest_framework import generics, status
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response

from .models import Comment, Like, Post, PostView
from .pagination import CursorPagi, Pagination
from .permissions import IsOwnerOrReadOnly
from .serializers import (CommentSerializer, LikeSerializer, PostSerializer,
                          PostViewSerializer)


# Create your views here.
class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-createdDate')
    serializer_class = PostSerializer
    pagination_class = Pagination
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({
            'status': status.HTTP_200_OK,
            'message': 'Post created!'
        })


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)

    def put(self, request, *args, **kwargs):
        self.update(request, *args, **kwargs)
        return Response({
            'status': status.HTTP_200_OK,
            'message': 'Post updated!'
        })

    def delete(self, request, *args, **kwargs):
        self.destroy(request, *args, **kwargs)
        content = {'message': 'Post deleted!'}
        return Response(content, status=status.HTTP_200_OK)


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        post_id = self.kwargs['id']
        return Comment.objects.filter(post=post_id)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({
            'status': status.HTTP_200_OK,
            'message': 'Comment added successfully!'
        })


class LikeList(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        post_id = self.kwargs['id']
        return Like.objects.filter(post=post_id)


class PostViewList(generics.ListCreateAPIView):
    queryset = PostView.objects.all()
    serializer_class = PostViewSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        post_id = self.kwargs['id']
        return PostView.objects.filter(post=post_id)
