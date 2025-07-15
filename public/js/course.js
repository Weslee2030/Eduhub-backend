const courseData = {
  "computer-science": {
    title: "Computer Science",
    description: "Explore algorithms, systems, and modern computing concepts.",
    topics: [
      "Introduction to Programming",
      "Data Structures",
      "Algorithms",
      "Databases",
      "Networking"
    ]
  },
  "business-management": {
    title: "Business Management",
    description: "Develop skills in leadership, innovation, and business strategy.",
    topics: [
      "Marketing Basics",
      "Leadership Styles",
      "Strategic Planning",
      "Operations Management"
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const course = params.get("course");

if (course && courseData[course]) {
  document.getElementById("course-title").innerText = courseData[course].title;
  document.getElementById("course-description").innerText = courseData[course].description;

  const topicsList = document.getElementById("course-topics");
  courseData[course].topics.forEach(topic => {
    const li = document.createElement("li");
    li.innerText = topic;
    topicsList.appendChild(li);
  });
} else {
  document.getElementById("course-title").innerText = "Course not found";
  document.getElementById("course-description").innerText = "Sorry, we couldn't find that course.";
}
