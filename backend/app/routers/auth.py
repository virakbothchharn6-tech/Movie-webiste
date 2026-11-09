from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.db.database import get_db
from app.models.user import User
from app.core.security import verify_password, get_password_hash, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# 1. Signup
@router.post("/signup")
def signup(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter((User.email == user_in.email) | (User.username == user_in.username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username ឬ Email នេះមានក្នុងប្រព័ន្ធរួចហើយ")
    
    # បើ user ដំបូងគេបង្អស់ កំណត់ជា Admin
    is_first_user = db.query(User).count() == 0
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        is_admin=is_first_user
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token({"sub": new_user.email, "id": new_user.id, "is_admin": new_user.is_admin})
    return {"access_token": token, "token_type": "bearer", "username": new_user.username, "is_admin": new_user.is_admin}

# 2. Signin
@router.post("/signin")
def signin(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Email ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវឡើយ")
    
    token = create_access_token({"sub": user.email, "id": user.id, "is_admin": user.is_admin})
    return {"access_token": token, "token_type": "bearer", "username": user.username, "is_admin": user.is_admin}

# 3. បញ្ជីអ្នកប្រើប្រាស់សម្រាប់ Admin Dashboard
@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [{"id": u.id, "username": u.username, "email": u.email, "is_admin": u.is_admin} for u in users]