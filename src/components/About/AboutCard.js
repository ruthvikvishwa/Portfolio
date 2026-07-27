import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I'm <span className="purple">Ruthvik Vishwanathwar</span>{" "}
            from <span className="purple">Frisco, Texas, USA</span>.
            <br />
            I currently work as a{" "}
            <span className="purple">Senior Data Engineer</span> at{" "}
            <span className="purple">Sentara Health</span>, where I focus on
            building and modernizing data pipelines on Azure Databricks.
            <br />I hold a Master's degree in{" "}
            <span className="purple">Computer Science</span> from{" "}
            <span className="purple">New York Institute of Technology, Manhattan</span>.
            <br />
            <br />
            Outside of coding, I love engaging in activities that keep me
            creative and inspired:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Billiards 🎱🥢
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling and Exploring New Places 🌍
            </li>
          </ul>
          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}
export default AboutCard;
