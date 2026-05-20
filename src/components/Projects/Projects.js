import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={8} style={{ textAlign: "center", paddingTop: "80px", paddingBottom: "80px" }}>
            <h2 style={{ color: "white", fontSize: "2em", marginBottom: "30px" }}>
              Big Things Are Being Built
            </h2>
            <p style={{ color: "rgb(155 126 172)", fontSize: "1.2em", lineHeight: "2" }}>
              Pipelines are running. Lakehouses are being architected.
              <br />
              Real-time streams are flowing into Delta Lake as you read this.
              <br /><br />
              Projects will live here soon — come back and see what gets shipped.
            </p>
            <p style={{ color: "white", marginTop: "40px", fontSize: "0.95em", fontStyle: "italic" }}>
              Azure Databricks · Delta Lake · PySpark · ADF · dbt · Event Hubs ·SSIS · SQL · PowerBI · ADF
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;