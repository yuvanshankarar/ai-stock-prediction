from fastapi import APIRouter

router = APIRouter()


users = []


@router.post("/signup")
def signup(data: dict):

    username = data.get("username")
    password = data.get("password")

    for user in users:

        if user["username"] == username:

            return {

                "success": False,
                "message": "User already exists"
            }

    users.append({

        "username": username,
        "password": password
    })

    return {

        "success": True,
        "message": "Signup successful"
    }


@router.post("/login")
def login(data: dict):

    username = data.get("username")
    password = data.get("password")

    for user in users:

        if (
            user["username"] == username
            and
            user["password"] == password
        ):

            return {

                "token": "fake-jwt-token"
            }

    return {

        "success": False,
        "message": "Invalid credentials"
    }