import mysql.connector
from mysql.connector import Error

try:
    db_config = {
        "host": "localhost",
        "user": "root",
        "password": "your_secure_password",  # Replace with your actual MySQL password
        "database": "eduhub"
    }

    connection = mysql.connector.connect(**db_config)

    if connection.is_connected():
        print("Successfully connected to the database!")
        connection.close()
    else:
        print("Failed to connect to the database.")

except Error as e:
    print(f"Error: {e}")
