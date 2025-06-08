from django.db import models
from django_tenants.models import DomainMixin, TenantMixin


class Tenant(models.Model, TenantMixin):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class Domain(models.Model, DomainMixin):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    domain = models.CharField(max_length=255, unique=True)


