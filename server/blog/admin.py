from django.contrib import admin

from .models import Comment, Post, PostView, Like

# Register your models here.
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(PostView)