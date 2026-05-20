import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const pdf = "/Resume_Ruthvik_Vishwanathwar.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(window.innerWidth);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrevPage() {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  }

  function goToNextPage() {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  }

  const pageWidth = width > 786 ? 900 : Math.max(width - 40, 300);

  return (
    <Container fluid className="resume-section">
      <Particle />

      <div style={{ position: "relative", zIndex: 2 }}>
        <Row style={{ justifyContent: "center", marginBottom: "24px" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            rel="noreferrer"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row style={{ justifyContent: "center", marginBottom: "24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              padding: "10px 18px",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(6px)",
              margin: "0 auto",
            }}
          >
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={pageNumber === 1}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: pageNumber === 1 ? "rgba(255,255,255,0.08)" : "#623686",
                color: "white",
                fontWeight: 600,
                opacity: pageNumber === 1 ? 0.5 : 1,
                cursor: pageNumber === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>

            <span
              style={{
                color: "white",
                fontWeight: 700,
                minWidth: "120px",
                textAlign: "center",
                letterSpacing: "0.5px",
              }}
            >
              Page {pageNumber} of {numPages || 1}
            </span>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={numPages === 0 || pageNumber === numPages}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background:
                  numPages === 0 || pageNumber === numPages
                    ? "rgba(255,255,255,0.08)"
                    : "#623686",
                color: "white",
                fontWeight: 600,
                opacity: numPages === 0 || pageNumber === numPages ? 0.5 : 1,
                cursor:
                  numPages === 0 || pageNumber === numPages
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </Row>

        <Row style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div style={{ color: "white" }}>Loading PDF...</div>}
              error={<div style={{ color: "white" }}>Failed to load PDF.</div>}
            >
              <Page
                key={`page-${pageNumber}`}
                pageNumber={pageNumber}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </Row>

        <Row style={{ justifyContent: "center", marginTop: "24px" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            rel="noreferrer"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </div>
    </Container>
  );
}

export default ResumeNew;