from django.conf import settings

class ClusterMiddleware:
    def process_response(self, request, response):
        if settings.CLUSTER:
            response.set_cookie(settings.ROUTE_NAME, settings.CLUSTERID)
            
        return response