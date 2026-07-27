import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a Senior Data Engineer with 11 years of experience designing and delivering data solutions across the Azure and Databricks ecosystem, with deep domain expertise in healthcare and financial services.
              I am a <b className="purple">Databricks Certified Data Engineer Associate</b>, and I'm typically brought in to modernize pipelines that have outgrown their original design, resolve chronic
              data quality issues, and re-architect systems for scale and reliability.
              <br />
              <br />
              I'm proficient in
              <i>
                <b className="purple">
                  {" "}
                  SQL, C#, Python, PySpark and Spark SQL{" "}
                </b>
              </i>
              , and I work comfortably across the full data lifecycle — from ingestion and transformation to the reporting and analytics layers that business teams depend on.
              <br />
              <br />
              My key areas of interest include building
              <i>
                <b className="purple">
                  {" "}
                  cloud data lakehouses, real-time streaming pipelines, and metadata-driven frameworks that scale without constant maintenance.{" "}
                </b>
              </i>
              These are the kinds of systems I find most rewarding: ones that are built to last well beyond the initial rollout.
              <br />
              <br />
              Whenever possible, I love building projects on
              <b className="purple"> Azure Databricks </b> with Delta Lake, where I can put the latest lakehouse architecture patterns into practice.{" "}
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
