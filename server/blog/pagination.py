from rest_framework.pagination import PageNumberPagination, CursorPagination

class Pagination(PageNumberPagination):
    page_size = 6
    
class CursorPagination(CursorPagination):
    page_size = 1
    ordering = '-createdDate'