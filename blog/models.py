from django.db import models
from django.contrib.auth.models import User



# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=1000)
    image = models.CharField(max_length=1000)
    createdDate = models.DateTimeField(auto_now_add=True)
    updateDate = models.DateTimeField(auto_now=True)
    POST_CATEGORY_CHOICES = [('General', 'General'), ('Technology', 'Technology'), ('Business', 'Business'), ('Entertainment', 'Entertainment'), ('Health', 'Health'), ('Science', 'Science'), ('Sports', 'Sports')]
    category = models.CharField(choices=POST_CATEGORY_CHOICES, default='General', max_length=20)
    
    def __str__(self):
        return f"{self.user} {self.title} {self.content}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField(max_length=1000)
    createdDate = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user} {self.comment}"
    
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    createdDate = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user} {self.post}"    