import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Euro,
  ShieldCheck,
  CarFront,
  PhoneCall,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import SfondoCarbonioFull from "../public/SfondoCarbonioFull.jpg";
export default function Servizi() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${SfondoCarbonioFull})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#ffffff",
      }}
    >
      {/* HERO SERVIZI */}
      <section
        style={{
          padding: "90px 20px 70px",
          textAlign: "center",
        }}
      >
        <Container>
          <h1
            className="fw-bold text-uppercase"
            style={{
              fontSize: "clamp(2.3rem, 5vw, 4rem)",
              letterSpacing: "4px",
              marginBottom: "20px",
            }}
          >
            I nostri <span style={{ color: "#00c853" }}> Servizi </span>
          </h1>
          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "#bdbdbd",
              fontSize: "1.05rem",
              lineHeight: "1.8",
            }}
          >
            Non ci limitiamo a vendere automobili. <br /> Ti accompagniamo in
            ogni fase, dalla scelta della vettura all'assistenza dopo
            l'acquisto.
          </p>
        </Container>
      </section>
      {/* SERVIZI */}
      <Container className="py-5">
        <Row className="g-4">
          {/* FINANZIAMENTI */}
          <Col xs={12} md={6}>
            <Card
              className="h-100 border-0"
              style={{
                background: "rgba(10, 10, 10, 0.94)",
                borderRadius: "4px",
                borderTop: "2px solid #00c853",
                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.45)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 200, 83, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 35px rgba(0, 0, 0, 0.45)";
              }}
            >
              <Card.Body className="p-4 p-lg-5">
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 200, 83, 0.08)",
                    border: "1px solid rgba(0, 200, 83, 0.35)",
                    borderRadius: "4px",
                    marginBottom: "25px",
                  }}
                >
                  <Euro size={28} color="#00c853" />
                </div>
                <h3 className="fw-bold text-uppercase mb-3"> Finanziamenti </h3>
                <p style={{ color: "#a8a8a8", lineHeight: "1.8" }}>
                  Soluzioni di finanziamento pensate per rendere l'acquisto
                  della tua prossima vettura semplice e sostenibile.
                </p>
                <div className="mt-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Rate personalizzabili</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Soluzioni su misura</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Assistenza nella pratica</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* GARANZIA */}
          <Col xs={12} md={6}>
            <Card
              className="h-100 border-0"
              style={{
                background: "rgba(10, 10, 10, 0.94)",
                borderRadius: "4px",
                borderTop: "2px solid #00c853",
                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.45)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 200, 83, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 35px rgba(0, 0, 0, 0.45)";
              }}
            >
              <Card.Body className="p-4 p-lg-5">
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 200, 83, 0.08)",
                    border: "1px solid rgba(0, 200, 83, 0.35)",
                    borderRadius: "4px",
                    marginBottom: "25px",
                  }}
                >
                  <ShieldCheck size={28} color="#00c853" />
                </div>
                <h3 className="fw-bold text-uppercase mb-3"> Garanzia </h3>
                <p style={{ color: "#a8a8a8", lineHeight: "1.8" }}>
                  Acquista con maggiore tranquillità grazie alle nostre
                  soluzioni di garanzia dedicate alle vetture disponibili in
                  showroom.
                </p>
                <div className="mt-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Copertura dedicata</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Maggiore sicurezza nell'acquisto</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Assistenza post-vendita</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* NOLEGGIO */}
          <Col xs={12} md={6}>
            <Card
              className="h-100 border-0"
              style={{
                background: "rgba(10, 10, 10, 0.94)",
                borderRadius: "4px",
                borderTop: "2px solid #00c853",
                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.45)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 200, 83, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 35px rgba(0, 0, 0, 0.45)";
              }}
            >
              <Card.Body className="p-4 p-lg-5">
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 200, 83, 0.08)",
                    border: "1px solid rgba(0, 200, 83, 0.35)",
                    borderRadius: "4px",
                    marginBottom: "25px",
                  }}
                >
                  <CarFront size={28} color="#00c853" />
                </div>
                <h3 className="fw-bold text-uppercase mb-3"> Noleggio </h3>
                <p style={{ color: "#a8a8a8", lineHeight: "1.8" }}>
                  Hai bisogno di una vettura senza acquistarla? Scopri le nostre
                  soluzioni di noleggio pensate per offrirti maggiore
                  flessibilità.
                </p>
                <div className="mt-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Soluzioni flessibili</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Vetture selezionate</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Consulenza dedicata</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* SOCCORSO STRADALE */}
          <Col xs={12} md={6}>
            <Card
              className="h-100 border-0"
              style={{
                background: "rgba(10, 10, 10, 0.94)",
                borderRadius: "4px",
                borderTop: "2px solid #00c853",
                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.45)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 200, 83, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 35px rgba(0, 0, 0, 0.45)";
              }}
            >
              <Card.Body className="p-4 p-lg-5">
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 200, 83, 0.08)",
                    border: "1px solid rgba(0, 200, 83, 0.35)",
                    borderRadius: "4px",
                    marginBottom: "25px",
                  }}
                >
                  <PhoneCall size={28} color="#00c853" />
                </div>
                <h3 className="fw-bold text-uppercase mb-3">
                  Soccorso stradale H24
                </h3>
                <p style={{ color: "#a8a8a8", lineHeight: "1.8" }}>
                  In caso di necessità puoi contare su un servizio di assistenza
                  stradale disponibile 24 ore su 24.
                </p>
                <div className="mt-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Assistenza 24 ore su 24</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Intervento rapido</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={17} color="#00c853" />
                    <span>Supporto in caso di emergenza</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* CTA */}
        <div
          className="text-center"
          style={{
            marginTop: "75px",
            padding: "45px 25px",
            borderTop: "1px solid rgba(0, 200, 83, 0.2)",
            borderBottom: "1px solid rgba(0, 200, 83, 0.2)",
            background: "rgba(0, 0, 0, 0.45)",
          }}
        >
          <h2
            className="fw-bold text-uppercase"
            style={{ letterSpacing: "2px" }}
          >
            Hai bisogno di maggiori informazioni?
          </h2>
          <p
            style={{
              color: "#999999",
              marginTop: "15px",
              marginBottom: "28px",
            }}
          >
            Siamo a tua disposizione per aiutarti.
          </p>
          <Link to="/contatti" style={{ textDecoration: "none" }}>
            <Button
              className="fw-semibold text-uppercase px-4 py-2 d-inline-flex align-items-center gap-2"
              style={{
                background: "#000000",
                border: "1px solid #00c853",
                color: "#000",
                borderRadius: "3px",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#00c85394";
                e.currentTarget.style.boxShadow =
                  "0 0 22px rgba(0, 200, 83, 0.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#000000";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Contattaci <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
