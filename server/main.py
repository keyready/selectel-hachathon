from flask_cors import CORS
from flask import (
    Flask,
    request,
    jsonify,
    abort
)
import requests
from models import (
    db,
    UserModel,
    DonationModel
)

app=Flask(__name__)
app.config['SECRET_KEY']='secret'
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://user:user@db:5432/db'
db.init_app(app)
cors=CORS(app)

@app.route("/api/sign_up/telegram",methods=['POST'])
def sign_up_telegram():
    try:
        if request.method == 'POST':
            user_data=request.json
            if user_data is None:
                abort(400)
            
            user=UserModel.query.filter_by(username=user_data['username']).first()
            if user:
                abort(200)
            
            newUser=UserModel(username=user_data['username'],first_name=user_data['firts_name'],img=user_data['photo_url'])
            db.session.add(newUser)
            db.session.commit()

            abort(202)
    except ValueError:
        abort(500)

@app.route("/api/sign_up/telegram/email",methods=['POST'])
def sign_up_telegram_email():
    try:
        user_data=request.json
        if user_data is None:
            abort(400)

        user=UserModel.query.filter_by(username=user_data['username']).first()
        if user is None:
            abort(400)

        user.email = user_data['email']

        db.session.add(user)
        db.session.commit()

        abort(200)
    except:
        abort(500)

@app.route("/api/sign_up/donor-search",methods=['POST'])
def sign_up_donor_search():
    try:
        if request.method == 'POST':
            user_data=request.json
            if user_data is None:
                abort(400)
            
            resp=requests.post("https://donorsearch.org/api/auth/registration",json=user_data).json()
            if 'user_id' not in resp:
                abort(500)
            
            return jsonify(user_id=resp['user_id'])
    except:
        abort(500)

@app.route("/api/sign_in/donor-search",methods=['POST'])
def sign_in_donor_search():
    try:
        if request.method == 'POST':
            
            user_data=request.json
            if user_data is None:
                abort(400)

            resp=requests.post("https://donorsearch.org/api/auth/login",json=user_data).json()
            if resp['id'] != 0:
                return jsonify(user=resp)
            
            abort(403)
    except ValueError:
        abort(500)
        
if __name__ == '__main__':
    app.run(port=5000)