from quart import Quart
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache
from app.config import Config

db = SQLAlchemy()
cache = Cache()

def create_app():
    app = Quart(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    cache.init_app(app)

    # Register blueprints
    with app.app_context():
        from app.api import api_blueprint
        app.register_blueprint(api_blueprint, url_prefix='/api')

        db.create_all()  # Create database tables if they don't exist

    return app
