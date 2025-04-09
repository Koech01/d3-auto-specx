# Veg-Connect Setup Guide
A data-driven React-Django app that fetches plant data from OpenFarm’s API, allowing users to schedule and share farming tasks in topic-specific communities while accessing plant growth insights and growing tips through features like bar graphs. Additionally, it incorporates a robust real-time chat system utilizing WebSocket technology for instantaneous communication and seamless collaboration among community members.

# Table of Contents
    - Prerequisites.
    - Installation.
    - Environment Setup.
    - Frontend Setup.
    - Running the Application. 
    - License. 

# Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download)
- [d3](https://www.npmjs.com/package/d3)

# Installation
Clone the repository and set up your virtual environment:

1. Clone the repository:
```bash
git clone https://github.com/Koech01/veg-connect.git
virtualenv veg-connect/
cd veg-connect
```

2. Install dependencies:
```bash
npm install
npm i d3
npm i @types/d3
```

# Running the Application.

1. For chat functionality, ensure Redis is running:
```bash
npm run start
```
You can now access the application at `http://127.0.0.1:8000/`.

# License.
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).