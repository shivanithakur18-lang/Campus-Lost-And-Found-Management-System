# 🎓 Campus Lost and Found Management System

## 📌 About the Project

The **Campus Lost and Found Management System** is a web-based application developed to help students report, search, and manage lost and found items within a college campus. It provides a simple and interactive platform for students to report missing belongings and find items reported by others.

The application uses HTML, CSS, and JavaScript for the frontend, Python Flask for the backend, and SQLite for database management.

## 🎯 Objectives

- To provide a digital platform for reporting lost and found items.
- To make searching for misplaced belongings easier.
- To organize item reports by category and status.
- To store item details in a database.
- To track items that have been returned to their owners.

## ✨ Features

- 🔴 Report lost items
- 🟢 Report found items
- 🔍 Search items by name, location, category, or description
- 📂 Filter items by category
- 📋 Filter by Lost, Found, and Returned status
- 👁️ View complete item details
- ✅ Mark items as returned
- 🗑️ Delete individual reports
- 🧹 Clear all reports
- ✨ Add sample demo data
- 📊 Display statistics for reports, lost items, found items, and returned items
- 🔔 Display success and error notifications
- 📱 Responsive user interface
- 💾 Store records using SQLite

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive design |
| JavaScript | Interactive features and frontend logic |
| Python | Backend programming |
| Flask | Python web framework |
| SQLite | Database management |
| VS Code | Code development |
| GitHub | Project hosting and version control |

## 📁 Project Structure

```text
Campus-Lost-and-Found-Management-System/
│
├── app.py
├── index.html
├── style.css
├── script.js
├── requirements.txt
└── README.md
```

The `database.db` file is automatically created when the application starts, if it does not already exist.

## ⚙️ Installation and Setup

### Prerequisites

- Python 3
- Visual Studio Code
- Google Chrome or another modern web browser

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the HTTPS URL of your GitHub repository.

### Step 2: Open the Project Folder

```bash
cd Campus-Lost-and-Found-Management-System
```

### Step 3: Install Dependencies

```bash
python -m pip install -r requirements.txt
```

### Step 4: Run the Application

```bash
python app.py
```

### Step 5: Open the Website

Open your browser and visit:

```text
http://127.0.0.1:5000
```

**Important:** Run `app.py` to start the Flask server. Do not open `index.html` directly, because the application requires the backend for database operations.

## 🗄️ Database Description

The application uses SQLite to store lost and found item reports.

The `items` table contains the following fields:

- `id` – Unique item report ID
- `type` – Lost or found
- `name` – Item name
- `category` – Item category
- `date` – Date of the incident
- `location` – Location where the item was lost or found
- `contact` – Contact information
- `description` – Additional item details
- `returned` – Indicates whether the item has been returned

A returned status of `0` means the item has not been marked as returned. A status of `1` means it has been returned.

## 🔄 How It Works

1. A student opens the website.
2. The student submits a lost or found item report.
3. JavaScript sends the information to the Flask backend.
4. Flask processes the request and stores the information in SQLite.
5. The website displays the saved report.
6. Students can search, filter, and view item details.
7. A report can be marked as returned or deleted.

## 🧪 Testing

The application can be tested using sample data such as:

| Item Name | Type | Category | Example Location |
|---|---|---|---|
| Black Wallet | Lost | Accessories | University Library |
| Blue Water Bottle | Found | Other | Block C |
| Python Programming Book | Lost | Books | Computer Lab |
| Wireless Earphones | Found | Electronics | Canteen |
| Student ID Card | Found | Documents | Academic Block |

Users can also mark reports as returned to test the status filter and statistics.

## 🎓 Learning Outcomes

This project provides practical experience in:

- Creating web pages using HTML and CSS
- Developing interactive features with JavaScript
- Manipulating webpage elements using the DOM
- Handling form submissions and API requests
- Developing a backend using Python Flask
- Storing and retrieving information using SQLite
- Performing CRUD operations
- Integrating frontend and backend technologies

## 🚀 Future Enhancements

- User registration and authentication
- Admin dashboard
- Item image uploads
- Email notifications
- Advanced search functionality
- Item claim verification
- Online deployment

## 📚 Project Information

**Project Title:** Campus Lost and Found Management System

**Project Type:** Web Programming Mini Project

**Frontend:** HTML, CSS, JavaScript

**Backend:** Python Flask

**Database:** SQLite

**Development Tool:** Visual Studio Code

## 📝 Conclusion

The Campus Lost and Found Management System provides a simple digital solution for managing lost and found belongings within a college campus. It demonstrates the practical integration of frontend technologies, a Python backend, and database operations in a web application.

## 📄 License

This project is developed for educational and academic purposes.
