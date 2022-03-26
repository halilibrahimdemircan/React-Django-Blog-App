from rest_framework.pagination import CursorPagination, PageNumberPagination


class Pagination(PageNumberPagination):
    page_size = 6


class CursorPagi(CursorPagination):
    page_size = 1
    ordering = "createdDate"
