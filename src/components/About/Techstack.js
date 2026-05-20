import React from "react";
import { Col, Row } from "react-bootstrap";
import Python from "../../Assets/TechIcons/Python.svg";
import Git from "../../Assets/TechIcons/Git.svg";
import SQL from "../../Assets/TechIcons/SQL.svg";
import AWS from "../../Assets/TechIcons/AWS.svg";
import Kafka from "../../Assets/TechIcons/Kafka.svg";
import Databricks from "../../Assets/TechIcons/azure-databricks.svg";
import PowerBI from "../../Assets/TechIcons/power-bi-embedded.svg";
import SQLDatabase from "../../Assets/TechIcons/sql-database.svg";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Databricks} alt="Azure Databricks" className="tech-icon-images" />
        <div className="tech-icons-text">Databricks</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={Python} alt="Python" className="tech-icon-images" />
        <div className="tech-icons-text">Python</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={SQL} alt="SQL" className="tech-icon-images" />
        <div className="tech-icons-text">SQL</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={SQLDatabase} alt="SQL Database" className="tech-icon-images" />
        <div className="tech-icons-text">SQL Database</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={PowerBI} alt="Power BI" className="tech-icon-images" />
        <div className="tech-icons-text">Power BI</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={AWS} alt="AWS" className="tech-icon-images" />
        <div className="tech-icons-text">AWS</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={Kafka} alt="Kafka" className="tech-icon-images" />
        <div className="tech-icons-text">Kafka</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={Git} alt="Git" className="tech-icon-images" />
        <div className="tech-icons-text">Git</div>
      </Col>
    </Row>
  );
}

export default Techstack;