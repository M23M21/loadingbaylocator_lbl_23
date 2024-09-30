
# Loading Bay Locator

Loading Bay Locator is a mobile application designed to help logistics professionals and delivery drivers find precise loading bay locations, ensuring efficiency in last-mile deliveries. The app offers a user-friendly interface that integrates What3Words geolocation for pinpoint accuracy, Firebase for backend services, and a streamlined profile and search system for saving and accessing loading bay information.

## Features

- **User Registration and Authentication**: Secure signup, login, and password reset functionality using Firebase Authentication.
- **Profile Management**: Users can view and edit their personal information such as name and email.
- **Search Loading Bays**: Find loading bays by searching for a warehouse/shop name or a town/postcode.
- **Save Favorite Loading Bays**: Users can bookmark and easily retrieve their most-used loading bays.
- **What3Words Geolocation Integration**: Provides precise location data by converting What3Words addresses into coordinates.
- **Firebase Integration**: Utilizes Firebase Authentication, Firestore Database, and Cloud Storage for user and data management.

## Tech Stack

- **Frontend**: React Native, Expo
- **Backend**: Firebase (Firestore, Authentication, Cloud Storage)
- **APIs**: What3Words API
- **Styling**: GlobalStyles for consistent UI elements
- **State Management**: React Context API

## Prerequisites

- **Node.js** and **npm** installed
- **Firebase account** for backend services (Authentication, Firestore)
- **Expo CLI** for running and testing the mobile app
- **What3Words API key** for geolocation functionality
- **Visual Studio Code** or any preferred code editor

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/loading-bay-locator.git
   cd loading-bay-locator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Expo CLI:**

   ```bash
   npm install -g expo-cli
   ```

4. **Set up Firebase:**

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication with Email/Password and set up a Firestore Database.
   - Obtain your Firebase configuration details (API key, project ID, etc.) and update the `firebase.js` file in the `services` directory with your Firebase config.

5. **Set up What3Words API:**

   - Register for a What3Words API key from the [What3Words Developer Portal](https://developer.what3words.com/).
   - Update the `what3words.js` file in the `services` directory with your What3Words API key.

6. **Run the application:**

   ```bash
   npm start
   ```
   npx expo start -c

   The Expo development server will start. You can scan the QR code with the Expo Go app on your mobile device or use the Android/iOS emulator.

## Firebase Configuration

Update the `firebase.js` file in the `services` directory with your Firebase project details:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Usage

1. **Register a User:**
   - Navigate to the Sign-Up page.
   - Enter your email, password, and full name to create an account.

2. **Login:**
   - Use your email and password on the Login page to access the app.

3. **Search Loading Bays:**
   - Enter the warehouse/shop name or a town/postcode to search for a loading bay.
   - Results will be displayed on the screen with loading bay information such as directions, restrictions, and What3Words location.

4. **Save Loading Bays:**
   - You can save frequently used loading bays for quick access later.
   - Saved loading bays can be accessed from the Saved tab.

5. **Profile Management:**
   - On the Profile page, you can view and edit your profile information.
   - Make changes to your name or email and save them.

6. **Help and FAQ:**
   - On the Help page, you can find answers to frequently asked questions and contact support if needed.

## Project Scripts

- `npm start`: Starts the Expo development server.
- `npm run android`: Runs the app on an Android emulator.
- `npm run ios`: Runs the app on an iOS simulator.
- `npm run web`: Runs the app in a web browser.
- `npm run build`: Builds the project for web deployment.
- `npm run reset-project`: Resets the project by moving the app folder and creating a fresh one.

## Expo Configuration

The `app.json` file contains the Expo configuration settings. Ensure the project name, slug, and SDK version are correctly set up.

```json
{
  "expo": {
    "name": "loading-bay-locator",
    "slug": "loading-bay-locator",
    "version": "1.0.0",
    "sdkVersion": "51.0.0",
    "platforms": ["ios", "android", "web"],
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"]
  }
}
```

## Contributing

Contributions are welcome! Please follow these steps for submitting pull requests:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
