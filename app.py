from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__)

DATABASE = "database.db"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


# ==========================================
# CREATE DATABASE
# ==========================================

def create_database():

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            location TEXT NOT NULL,
            contact TEXT NOT NULL,
            description TEXT NOT NULL,
            returned INTEGER DEFAULT 0
        )
    """)

    connection.commit()
    connection.close()


# ==========================================
# FRONTEND
# ==========================================

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/style.css")
def style():
    return send_from_directory(BASE_DIR, "style.css")


@app.route("/script.js")
def script():
    return send_from_directory(BASE_DIR, "script.js")


# ==========================================
# GET ALL ITEMS
# ==========================================

@app.route("/api/items", methods=["GET"])
def get_items():

    connection = get_db_connection()

    items = connection.execute("""
        SELECT *
        FROM items
        ORDER BY id DESC
    """).fetchall()

    connection.close()

    return jsonify([dict(item) for item in items])


# ==========================================
# ADD NEW ITEM
# ==========================================

@app.route("/api/items", methods=["POST"])
def add_item():

    data = request.get_json()

    required_fields = [
        "type",
        "name",
        "category",
        "date",
        "location",
        "contact",
        "description"
    ]

    for field in required_fields:

        if not data.get(field):
            return jsonify({
                "error": f"{field} is required"
            }), 400

    connection = get_db_connection()

    cursor = connection.execute("""
        INSERT INTO items
        (
            type,
            name,
            category,
            date,
            location,
            contact,
            description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data["type"],
        data["name"],
        data["category"],
        data["date"],
        data["location"],
        data["contact"],
        data["description"]
    ))

    connection.commit()

    item_id = cursor.lastrowid

    connection.close()

    return jsonify({
        "message": "Item reported successfully",
        "id": item_id
    }), 201


# ==========================================
# MARK ITEM AS RETURNED
# ==========================================

@app.route("/api/items/<int:item_id>/returned", methods=["PUT"])
def mark_returned(item_id):

    connection = get_db_connection()

    cursor = connection.execute("""
        UPDATE items
        SET returned = 1
        WHERE id = ?
    """, (item_id,))

    connection.commit()

    updated = cursor.rowcount

    connection.close()

    if updated == 0:

        return jsonify({
            "error": "Item not found"
        }), 404

    return jsonify({
        "message": "Item marked as returned"
    })


# ==========================================
# DELETE ITEM
# ==========================================

@app.route("/api/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):

    connection = get_db_connection()

    cursor = connection.execute("""
        DELETE FROM items
        WHERE id = ?
    """, (item_id,))

    connection.commit()

    deleted = cursor.rowcount

    connection.close()

    if deleted == 0:

        return jsonify({
            "error": "Item not found"
        }), 404

    return jsonify({
        "message": "Report deleted successfully"
    })


# ==========================================
# ADD DEMO DATA
# ==========================================

@app.route("/api/demo", methods=["POST"])
def add_demo_data():

    demo_items = [

        (
            "lost",
            "Black Wallet",
            "Accessories",
            "2026-10-02",
            "University Library",
            "student@example.com",
            "Black leather wallet with a college ID card.",
            0
        ),

        (
            "found",
            "Blue Water Bottle",
            "Other",
            "2026-10-03",
            "Block C",
            "9876543210",
            "Blue water bottle with a silver cap.",
            0
        ),

        (
            "lost",
            "Python Programming Book",
            "Books",
            "2026-10-01",
            "Computer Lab",
            "student@example.com",
            "Python programming book with name written on the first page.",
            0
        ),

        (
            "found",
            "Wireless Earphones",
            "Electronics",
            "2026-10-04",
            "Canteen",
            "9876543210",
            "White wireless earphones found near the seating area.",
            0
        )

    ]

    connection = get_db_connection()

    connection.executemany("""
        INSERT INTO items
        (
            type,
            name,
            category,
            date,
            location,
            contact,
            description,
            returned
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, demo_items)

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Demo data added successfully"
    })


# ==========================================
# CLEAR ALL DATA
# ==========================================

@app.route("/api/items", methods=["DELETE"])
def clear_all_items():

    connection = get_db_connection()

    connection.execute("DELETE FROM items")

    connection.commit()
    connection.close()

    return jsonify({
        "message": "All reports deleted"
    })


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    create_database()

    print("==========================================")
    print(" Campus Lost & Found Management System")
    print("==========================================")
    print("Server running at:")
    print("http://127.0.0.1:5000")
    print("==========================================")

    app.run(debug=True)