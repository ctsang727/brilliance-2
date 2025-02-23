from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

db = SQLAlchemy()

def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr

class Track(db.Model):
  __tablename__ = "tracks"
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}
  
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  title = db.Column(db.String(50), nullable=False)
  lyrics = db.Column(db.Text(), nullable=False)
  artist = db.Column(db.String(50), nullable=False)
  album_image = db.Column(db.String())
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

  

  annotations = db.relationship("Annotation", backref="tracks", cascade="all, delete", order_by="Annotation.initialAnnoIndex")
  comments = db.relationship("Comment", backref="tracks", cascade="all, delete", order_by="Comment.created_at")

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'title': self.title,
      'lyrics': self.lyrics,
      'artist': self.artist,
      'album_image': self.album_image,
      'comments': [c.to_dict() for c in self.comments],
      'annotations': [a.anno_to_dict() for a in self.annotations]
    }
    
  def get_comments(self):
    return self.comments
 

  
class Annotation(db.Model):
  __tablename__ = "annotations"
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}
  
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  track_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tracks.id')))
  content = db.Column(db.Text, nullable=False)
  initialAnnoIndex = db.Column(db.Integer)
  finalAnnoIndex = db.Column(db.Integer)
  vote_score = db.Column(db.Integer)
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  

  comments = db.relationship("Comment", backref="annotations", cascade="all, delete")
  votes = db.relationship("Vote", backref="annotations", cascade="all, delete")

  def anno_to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'content': self.content,
      'track_id': self.track_id,
      'vote_score': self.vote_score,
      'initialAnnoIndex': self.initialAnnoIndex,
      'finalAnnoIndex': self.finalAnnoIndex,
      'comments': [c.to_dict() for c in self.comments],
      'votes': [v.to_dict() for v in self.votes]
    }
    

  
class Comment(db.Model):
  __tablename__ = "comments"
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}
  
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  annotation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('annotations.id')))
  track_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tracks.id')))
  content = db.Column(db.Text, nullable=False)
  vote_score = db.Column(db.Integer)
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

  votes = db.relationship("Vote", backref="comments", cascade="all, delete")
  
  def to_dict(self):
    return {
      'id': self.id,
      'created_at': self.created_at,
      'user_id': self.user_id,
      'annotation_id': self.annotation_id,
      'track_id': self.track_id,
      'vote_score': self.vote_score,
      'content': self.content,
      'votes': [v.to_dict() for v in self.votes]
    }
  

class Vote(db.Model):
  __tablename__ = "votes"
  if environment == "production":
        __table_args__ = {'schema': SCHEMA}
  
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  vote = db.Column(db.Boolean)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  annotation_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('annotations.id')))
  comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))
  
  
  def to_dict(self):
    return {
      'id': self.id,
      'vote': self.vote,
      'user_id': self.user_id,
      'annotation_id': self.annotation_id,
      'comment_id': self.comment_id
    }
