from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # add fields later if needed (ex: bio, avatar). Keep simple now.
    # username/email/first_name/last_name/password are available from AbstractUser.
    def __str__(self):
        return self.username
