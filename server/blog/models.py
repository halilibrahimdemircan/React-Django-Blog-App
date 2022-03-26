from unicodedata import category

from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField(max_length=1000)
    image = models.CharField(max_length=1000)
    createdDate = models.DateTimeField(auto_now_add=True)
    updatedDate = models.DateTimeField(auto_now=True)
    POST_CATEGORY_CHOICES = [
        ('General', 'General'),
        ('Technology', 'Technology'),
        ('Business', 'Business'),
        ('Entertainment', 'Entertainment'),
        ('Health', 'Health'),
        ('Science', 'Science'),
        ('Sports', 'Sports')
    ]
    category = models.CharField(
        max_length=20, choices=POST_CATEGORY_CHOICES, default='General')

    def __str__(self):
        return f"{self.user} {self.title} {self.content}"


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    createdDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} {self.content}"


class Like(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createdDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} {self.post}"


class PostView(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='views')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createdDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} {self.post}"
