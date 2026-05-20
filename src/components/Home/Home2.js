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
              I'm a Senior Data Engineer who's spent 10+ years working in the Azure and Databricks ecosystem-mostly in healthcare and financial services. I get brought in when pipelines are slow, 
              architectures are outdated, or data quality is a mess, and I build things that actually hold up at volume.
              <br />
              <br />
              I’m proficient in
              <i>
                <b className="purple">
                  {" "}
                  SQL, C#, Python, PySpark and Spark SQL{" "}
                </b>
              </i>
              — and I enjoy working across ingestion, transformation, and reporting layers.
              <br />
              <br />
              My key areas of interest include building
              <i>
                <b className="purple">
                  {" "}
                  cloud data lakehouses, real-time streaming pipelines, and metadata-driven frameworks that scale without constant maintenance{" "}
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I love building projects on
              <b className="purple"> Azure Databricks </b> with Delta Lake...{" "}
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
