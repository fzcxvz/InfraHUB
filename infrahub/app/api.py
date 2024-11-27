from quart import Blueprint, request, jsonify
from app.models import db, User
from app import cache
import aiofiles

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/users', methods=['GET'])
async def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@api_blueprint.route('/cached-users', methods=['GET'])
@cache.cached(timeout=60)  # Cache response for 60 seconds
async def get_cached_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@api_blueprint.route('/users', methods=['POST'])
async def create_user():
    data = await request.json
    if not data or 'username' not in data or 'email' not in data:
        return jsonify({"error": "Invalid data"}), 400

    user = User(username=data['username'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@api_blueprint.route('/upload', methods=['POST'])
async def upload_file():
    file = (await request.files)['file']
    async with aiofiles.open(f'uploads/{file.filename}', mode='wb') as f:
        await f.write(file.read())
    return jsonify({"message": "File uploaded successfully"}), 201

@api_blueprint.route('/download/<filename>', methods=['GET'])
async def download_file(filename):
    async with aiofiles.open(f'uploads/{filename}', mode='rb') as f:
        content = await f.read()
    return jsonify({"content": content.decode()}), 200
