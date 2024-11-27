# Use the official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["gunicorn", "-k", "asyncio", "-w", "4", "-b", "0.0.0.0:5000", "app:create_app"]
