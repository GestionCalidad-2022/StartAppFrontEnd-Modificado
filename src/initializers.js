import fb from "firebase";

const config = {
  apiKey: "AIzaSyBVkBZ6TKoobHmk4vcIWmPVehlOcLzP2QY",
  authDomain: "startamericastogether.firebaseapp.com",
  projectId: "startamericastogether",
  storageBucket: "startamericastogether.appspot.com",
  messagingSenderId: "706351017993",
  appId: "1:706351017993:web:22db22b78e2441a65948d8"
};
fb.initializeApp(config);

export default fb;
