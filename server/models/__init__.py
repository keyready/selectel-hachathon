from flask_sqlalchemy import SQLAlchemy

db=SQLAlchemy()

class UserModel(db.Model):
    __tablename__='users'

    id=db.Column(db.Integer(),primary_key=True)
    username=db.Column(db.String(),nullable=True,unique=True)
    email=db.Column(db.String(),nullable=True)
    first_name=db.Column(db.String(),nullable=True)
    img=db.Column(db.String())
    password=db.Column(db.String())

    def __init__(self,username,first_name,img):
        self.username = username
        self.first_name = first_name
        self.img = img
    
class DonationModel(db.Model):
    __tablename__='donations'

    id=db.Column(db.Integer(),primary_key=True)
    donationDate=db.Column(db.Date)
    donationDocument=db.Column(db.String())
    donationType=db.Column(db.String(),nullable=False)
    selectedCity=db.Column(db.String(),nullable=False)
    selectedStation=db.Column(db.String(),nullable=False)

    def __init__(self,donationDate,donationDocument,donationType,selectedStation):
        self.donationDate=donationDate
        self.donationDocument=donationDocument
        self.donationType=donationType
        self.selectedStation=selectedStation
