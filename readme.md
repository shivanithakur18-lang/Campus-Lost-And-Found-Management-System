# Campus Lost and Found Management System

## Introduction

Campus Lost and Found Management System is a web-based application designed to help students report, search and manage lost and found items within a college campus.

The system provides an easy way to report lost belongings, register found items and search existing reports.

The frontend is developed using HTML, CSS and JavaScript. Python Flask is used for the backend and SQLite is used for storing the data.

---

## Objective

The main objective of the project is to provide a simple and user-friendly digital platform for managing lost and found items on campus.

---

## Main Features

1. Report lost items.
2. Report found items.
3. Search items.
4. Filter items by category.
5. Filter items by status.
6. View complete item details.
7. Mark items as returned.
8. Delete reports.
9. Add demo data.
10. Clear reports.
11. Display live statistics.
12. Responsive design.
13. SQLite database storage.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Webpage structure |
| CSS3 | Styling and responsive design |
| JavaScript | Website functionality |
| DOM | Dynamic webpage manipulation |
| Python | Backend programming |
| Flask | Web framework |
| SQLite | Database |
| VS Code | Development |
| Chrome | Testing |

---

## Frontend

The frontend contains HTML, CSS and JavaScript.

HTML creates the webpage structure.

CSS provides the design, layout, colors, cards and responsive interface.

JavaScript handles form submission, searching, filtering, displaying item details and communicating with the Python backend.

---

## Backend

Python Flask is used as the backend.

The backend handles:

- Adding reports
- Retrieving reports
- Updating returned status
- Deleting reports
- Adding demo data
- Clearing reports

---

## Database

SQLite is used to store item information.

The database table contains:

- ID
- Type
- Item Name
- Category
- Date
- Location
- Contact
- Description
- Returned Status

---

## Project Structure

Campus Lost and Found Management System

    app.py
    index.html
    style.css
    script.js
    requirements.txt
    README.md
    database.db

The database.db file is automatically created when the application is started.

---

## How to Run

### Step 1

Open the project folder in VS Code.

### Step 2

Open the terminal.

### Step 3

Install Flask.

    pip install flask

### Step 4

Run the backend.

    python app.py

### Step 5

Open Chrome.

Enter:

    http://127.0.0.1:5000

---

## Working

1. The student opens the website.
2. The student reports a lost or found item.
3. JavaScript sends the information to the Flask backend.
4. Flask receives the request.
5. The information is stored in SQLite.
6. The report appears on the webpage.
7. Users can search and filter reports.
8. Users can view complete item details.
9. An item can be marked as returned.
10. Reports can be deleted when required.

---

## Learning Outcomes

After completing this project, students understand:

- HTML webpage structure
- CSS styling
- Responsive web design
- JavaScript events
- DOM manipulation
- API communication
- Python Flask
- SQLite database
- CRUD operations
- Frontend-backend communication

---

## Conclusion

The Campus Lost and Found Management System provides a simple digital solution for managing lost and found belongings within a campus.

The project demonstrates the integration of frontend technologies with a Python Flask backend and SQLite database.