# Dockerfile
# Use a slim, stable Python image for a smaller final image size
FROM python:3.11-slim

# Set environment variables
# PYTHONDONTWRITEBYTECODE prevents Python from writing .pyc files (saves space)
ENV PYTHONDONTWRITEBYTECODE 1
# PYTHONUNBUFFERED ensures logs are output immediately (important for Docker)
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements file and install dependencies first
# This improves build speed because dependency layer is cached if requirements don't change
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the project code into the working directory
COPY . /code/

