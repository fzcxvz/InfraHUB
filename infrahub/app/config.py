import os

class Config:
    # MySQL database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", 
        "mysql+pymysql://username:password@ec2-instance-endpoint/dbname"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")
    
    # Redis caching configuration
    CACHE_TYPE = "RedisCache"
    CACHE_REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    CACHE_REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
