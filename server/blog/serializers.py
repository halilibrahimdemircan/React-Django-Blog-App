from .models import Post, Comment, Like, PostView
from rest_framework import serializers
from django.utils.timezone import now
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name', 'email')


class CommentSerializer(serializers.ModelSerializer):
    days_since_creation = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    author = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ('id', 'user','author', 'post', 'comment', 'createdDate', 'days_since_creation')
        
    def get_days_since_creation(self, obj):
        return (now() - obj.createdDate).days
    def get_author(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name
    
class LikeSerializer(serializers.ModelSerializer):
    days_since_creation = serializers.SerializerMethodField()
    
    class Meta:
        model = Like
        fields = ('id', 'user', 'post')
    
class PostViewSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'user', 'post')
        model = PostView
        
        
class PostSerializer(serializers.ModelSerializer):
    days_since_creation = serializers.SerializerMethodField()
    createdDate = serializers.DateTimeField(write_only=True , required=False)
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True, write_only=True , required=False)
    like_count = serializers.SerializerMethodField()
    views = PostViewSerializer(many=True, write_only=True, required=False)
    view_count = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    author = serializers.SerializerMethodField()
        
    class Meta:
        model = Post
        fields = ('id', 'user','author', 'title', 'content', 'image', 'createdDate', 'updatedDate', 'days_since_creation', 'category', 'comment_count','like_count','view_count','views','likes','comments')
        
    def get_days_since_creation(self, obj):
        return (now() - obj.createdDate).days   
    
    def get_comment_count(self, obj):
        return obj.comments.count() 
    
    def get_like_count(self, obj):
        return obj.likes.count()
    
    def get_view_count(self, obj):
        return obj.views.count()
    
    def get_author(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name
        