import React from "react";

const features = [
  {
    title: "Safe and Secure",
    description:
      "Your notes are encrypted and securely stored in our database.",
    icon: "✅",
  },
  {
    title: "Create Notes",
    description: "Easily create and organize your notes in one place.",
    icon: "📝",
  },
  {
    title: "Edit Notes",
    description: "Update and refine your thoughts anytime, instantly.",
    icon: "✏️",
  },
  {
    title: "Password Protected",
    description: "All accounts are protected with secure login systems.",
    icon: "🔐",
  },
  {
    title: "Delete Notes",
    description: "Clean up your workspace by deleting unneeded notes.",
    icon: "❌",
  },
];

const About = () => {
  return (
    <div className="container mt-5 pt-5">
      <div className="row g-4 align-items-stretch">
        {/* Intro Section */}
        <div className="col-12 col-lg-6">
          <div className="card h-100 d-flex justify-content-center align-items-center h-100 p-4 shadow-lg p-4">
            <h2 className="mb-3 text-primary text-center">
              Welcome to NoteHere
            </h2>
            <p className="text-muted">
              NoteHere is your modern solution for simple, secure, and efficient
              note-taking. Whether it's a quick thought or a detailed plan, our
              app gives you the tools to create, edit, and protect your notes
              with ease.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="col-12 col-lg-6">
          <div className="card h-100 shadow-lg p-4">
            <h4 className="mb-4 text-success text-center">Features</h4>
            <div className="row g-3">
              {features.map((item, index) => (
                <div className="col-12" key={index}>
                  <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm">
                    <div className="fs-3 me-3">{item.icon}</div>
                    <div>
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="mb-0 text-muted">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
