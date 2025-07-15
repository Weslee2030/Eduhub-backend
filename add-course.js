const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const firebaseConfig = require("./firebase-config");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addCourse(courseData) {
  try {
    const docRef = await addDoc(collection(db, "courses"), courseData);
    console.log("Course added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding course: ", e);
  }
}

// Sample Python course
const pythonCourse = {
  id: `python_intro_${Date.now()}`,
  title: "Introduction to Python Programming",
  description: "Master Python basics, from variables to functions, in 6 weeks.",
  instructor: "Jane Smith",
  duration: "6 weeks",
  price: 49.99,
  category: "Programming",
  modules: [
    {
      module_id: "module_1",
      title: "Getting Started with Python",
      content: {
        type: "video",
        url: "https://example.com/python-intro-video1.mp4" // Replace with real URL
      },
      order: 1
    },
    {
      module_id: "module_2",
      title: "Control Structures",
      content: {
        type: "text",
        data: "Learn about if statements, loops, and more."
      },
      order: 2
    }
  ],
  created_at: new Date().toISOString(),
  enrolled_users: []
};

addCourse(pythonCourse);
