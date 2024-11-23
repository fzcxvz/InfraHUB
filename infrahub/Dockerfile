FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the application's port
EXPOSE 5000

# Command to run the app
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
