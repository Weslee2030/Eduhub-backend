const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addProgrammingTopics() {
  try {
    const topics = [
      {
        title: "Introduction to JavaScript",
        content: "Learn the basics of JavaScript, including syntax and variables.",
        difficulty: "Beginner",
        quiz: {
          question: "What is the output of `console.log(typeof 'hello')`?",
          options: ["number", "string", "boolean"],
          answer: "string"
        },
        isPaid: false,
        order: 1,
        createdAt: admin.firestore.Timestamp.fromDate(new Date("2025-07-02T12:23:44.000+03:00"))
      },
      {
        title: "Variables and Data Types",
        content: "Learn the basics of variables, including integers, strings, and booleans in Python.",
        difficulty: "Beginner",
        quiz: {
          question: "What is the output of `x = 5; print(type(x))`?",
          options: ["int", "str", "float"],
          answer: "int"
        },
        isPaid: false,
        order: 2,
        createdAt: admin.firestore.Timestamp.now()
      },
      {
        title: "Conditional Statements",
        content: "Understand if-else statements and logical operators in Python.",
        difficulty: "Beginner",
        quiz: {
          question: "What does `if x > 10:` check?",
          options: ["Equality", "Greater than", "Less than"],
          answer: "Greater than"
        },
        isPaid: false,
        order: 3,
        createdAt: admin.firestore.Timestamp.now()
      },
      {
        title: "Functions and Scope",
        content: "Explore defining functions, parameters, and global vs. local scope in Python.",
        difficulty: "Intermediate",
        quiz: {
          question: "What is the scope of a variable inside a function?",
          options: ["Global", "Local", "Both"],
          answer: "Local"
        },
        isPaid: true,
        order: 4,
        createdAt: admin.firestore.Timestamp.now()
      }
    ];

    for (const topic of topics) {
      const docRef = await db.collection('courses/computer-programming/topics').add(topic);
      console.log(`Topic added with ID: ${docRef.id} - ${topic.title}`);
    }
    console.log("All topics added successfully!");
  } catch (e) {
    console.error("Error adding topics: ", e);
  }
}

addProgrammingTopics();
