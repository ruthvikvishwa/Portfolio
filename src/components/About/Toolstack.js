import React from "react";
import { Col, Row } from "react-bootstrap";
import Git from "../../Assets/TechIcons/Git.svg";
import AWS from "../../Assets/TechIcons/AWS.svg";
import vscode from "../../Assets/TechIcons/vscode.svg";
import AzureDevOps from "../../Assets/TechIcons/azure-devops.svg";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={AzureDevOps} alt="Azure DevOps" className="tech-icon-images" />
        <div className="tech-icons-text">Azure DevOps</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={Git} alt="Git" className="tech-icon-images" />
        <div className="tech-icons-text">Git</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={AWS} alt="AWS" className="tech-icon-images" />
        <div className="tech-icons-text">AWS</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={vscode} alt="VS Code" className="tech-icon-images" />
        <div className="tech-icons-text">VS Code</div>
      </Col>
    </Row>
  );
}

export default Toolstack;