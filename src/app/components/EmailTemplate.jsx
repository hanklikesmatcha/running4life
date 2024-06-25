import React from "react";

export const EmailTemplate = ({ email, comment }) => (
  <div style={styles.container}>
    <h1 style={styles.heading}>Hi ${email}!</h1>
    <p style={styles.comment}>{comment}</p>
  </div>
);

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6"
  },
  heading: {
    fontSize: "24px",
    color: "#4CAF50"
  },
  comment: {
    fontSize: "16px"
  }
};
