## Hotel Booking Application
This project is a hotel booking web application built with React, Firebase, and Material-UI. The application allows users to view room details, make reservations, and store their favorite rooms. User authentication and data storage are managed through Firebase, ensuring that each user's reservations and favorite rooms are stored securely.

### Features

- User Authentication: Sign up and log in functionality with Firebase Authentication.
- Room Reservation: Users can select rooms, view details, and make reservations.
- Favorites: Users can save rooms to their favorites, accessible on their profile.
- Responsive Design: The app is styled using Material-UI for a modern and responsive user interface.
- Reservation Details Popup: Users can view a summary of their reservation before booking.
- Technologies Used
- Frontend: React, Material-UI
- Backend: Firebase (Firestore, Authentication)
- State Management: React Hooks
- Icons: Material-UI Icons
- Setup Instructions

### Prerequisites
Before running the application, make sure you have the following installed on your machine:

### Node.js and npm
````
Firebase project with Firestore and Authentication enabled
Installation
Clone this repository:
````
### bash
````
Copy code
git clone https://github.com/princemashumu/HOTEL-APPLICATION.git
cd hotel-booking-app
Install dependencies:
````

### bash
```
Copy code
npm install
Create a Firebase project:
```
### Go to Firebase Console.

- Create a new project.
- Enable Firestore and Authentication.
- Set up Firebase in your app:

### Create a file named firebaseConfig.js in the src/firebase directory:

### Copy code
```
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { db, auth };
Replace the placeholders (YOUR_API_KEY, etc.) with your Firebase project configuration.
```
### Run the application:
### bash
```
Copy code
npm start
```

## Usage

- 1. Authentication
- New users can sign up, and existing users can log in using their email and password.
- Firebase Authentication handles user management.
- 2. Room Reservation
- Once logged in, users can browse through the available rooms.
- Users can reserve a room by clicking on "Reserve Now," which opens a dialog showing the reservation details.
- To complete the reservation, click on "Book Now."
- 3. Favorites
- Logged-in users can save rooms to their favorites by clicking the "Save Room" button.
- Rooms saved to favorites are stored under the user's document in Firestore.

### Project Structure
### bash
```
Copy code
src/
│
├── components/           # Reusable components (e.g., buttons, dialogs)
├── pages/                # Main pages (HomePage, RoomDetails, etc.)
├── firebase/             # Firebase configuration and initialization
├── App.js                # Main app component
├── index.js              # Entry point
└── ...                   # Other files and assets

```
### Error Handling
1. Firebase Firestore Error
If you encounter this error:

### javascript
Copy code
Error saving room: TypeError: db.collection is not a function
Make sure you have correctly initialized Firebase and imported Firestore in your firebaseConfig.js.

### Contributing
If you would like to contribute, please fork the repository and submit a pull request with your changes. For major changes, open an issue first to discuss what you would like to modify.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Contact
For any questions or support, please open an issue on GitHub or contact the project maintainer at [princemashumu@yahoo.com].
