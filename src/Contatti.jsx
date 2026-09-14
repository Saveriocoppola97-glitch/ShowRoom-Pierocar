import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Car,
  ShieldCheck,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import LogoCogna from "../public/LogoCogna.png";
import SfondoCarbonioFull from "../public/SfondoCarbonioFull.jpg";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    vettura: "",
    messaggio: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSent(true);

    setFormData({
      nome: "",
      email: "",
      telefono: "",
      vettura: "",
      messaggio: "",
    });
  };

  return (
    <div
      className="bg-dark text-light min-vh-100 "
      style={{
        backgroundImage: `url(${SfondoCarbonioFull})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* HERO CONTATTI*/}
      <section
        className="position-relative overflow-hidden border-bottom border-secondary"
        style={{
          minHeight: "430px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Overlay scuro */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Effetto luminoso laterale */}
        <div
          className="position-absolute"
          style={{
            width: "500px",
            height: "500px",
            right: "-180px",
            top: "-100px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 200, 83, 0.23) 0%, rgba(0,200,83,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="position-absolute"
          style={{
            width: "500px",
            height: "500px",
            left: "-180px",
            top: "-100px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 200, 83, 0.23) 0%, rgba(0,200,83,0) 70%)",
            pointerEvents: "none",
          }}
        />

        <Container className="position-relative py-5">
          <Row>
            <Col className="text-center" lg={12} xl={12}>
              <div className="mb-3"></div>

              <h1
                className="fw-bold text-uppercase display-4 mb-3"
                style={{
                  lineHeight: "1.05",
                  color: "#ffffff",
                }}
              >
                Parliamo della tua prossima vettura.
              </h1>

              <p
                className="text-light fs-5 mb-4"
                style={{
                  lineHeight: "1.7",
                }}
              >
                Hai trovato l'auto che stavi cercando? Vuoi maggiori
                informazioni su una vettura presente nella nostra vetrina?
                Contatta PieroCar Showroom e saremo felici di aiutarti.
              </p>

              {/* ICONE SOCIAL */}
              <div className="d-flex align-items-center gap-3 mb-4">
                {" "}
                <span
                  className="text-uppercase fw-semibold"
                  style={{
                    color: "#00c853",
                    letterSpacing: "1px",
                    fontSize: "0.85rem",
                  }}
                >
                  Seguici
                </span>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/matte_f22/"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #00c853",
                    borderRadius: "50%",
                    color: "#00c853",
                    backgroundColor: "rgba(0, 200, 83, 0.05)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.48)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.08)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(0, 200, 83, 0.35)";
                    e.currentTarget.style.borderColor = "#00c853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.05)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <FaInstagram size={20} />{" "}
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/?locale=it_IT"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #00c853",
                    borderRadius: "50%",
                    color: "#00c853",
                    backgroundColor: "rgba(0, 200, 83, 0.05)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.48)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.08)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(0, 200, 83, 0.35)";
                    e.currentTarget.style.borderColor = "#00c853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.05)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <FaFacebookF size={18} />
                </a>
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@kennedy_f20"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #00c853",
                    borderRadius: "50%",
                    color: "#00c853",
                    backgroundColor: "rgba(0, 200, 83, 0.05)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.48)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.08)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(0, 200, 83, 0.35)";
                    e.currentTarget.style.borderColor = "#00c853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.05)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <FaTiktok size={19} />
                </a>
                {/* YouTube */}
                {/* WhatsApp */}
                <a
                  href="https://wa.me/+393403543806"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #00c853",
                    borderRadius: "50%",
                    color: "#00c853",
                    backgroundColor: "rgba(0, 200, 83, 0.05)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.48)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.08)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(0, 200, 83, 0.35)";
                    e.currentTarget.style.borderColor = "#00c853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.05)";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>

              <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-4">
                {" "}
                {/* CONTATTACI */}{" "}
                <a
                  href="#modulo-contatto"
                  className="btn px-4 py-3 fw-semibold text-uppercase d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #00c853",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.46)";
                    e.currentTarget.style.borderColor = "#00c853";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform =
                      "translateY(-3px) scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 0 14px rgba(0, 200, 83, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#00c853";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {" "}
                  Contattaci <ArrowRight size={19} />{" "}
                </a>{" "}
                {/* CHIAMACI */}{" "}
                <a
                  href="tel:+ +393403543806"
                  className="btn px-4 py-3 fw-semibold text-uppercase d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #00c853",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.46)";
                    e.currentTarget.style.borderColor = "#00c853";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform =
                      "translateY(-3px) scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 0 14px rgba(0, 200, 83, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#00c853";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {" "}
                  <Phone size={18} /> Chiamaci{" "}
                </a>{" "}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* INFORMAZIONI CONTATTO */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {/* TELEFONO */}
            <Col md={6} lg={3}>
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.12)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    <Phone size={23} style={{ color: "#00c853" }} />
                  </div>

                  <small
                    className="text-uppercase fw-bold"
                    style={{
                      color: "#00c853",
                      letterSpacing: "2px",
                    }}
                  >
                    Telefono
                  </small>

                  <h5 className="fw-bold mt-2 mb-2">+39 3403543806</h5>

                  <p className="text-secondary small mb-0">
                    Parla direttamente con il nostro team.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* EMAIL */}
            <Col md={6} lg={3}>
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.12)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    <Mail size={23} style={{ color: "#00c853" }} />
                  </div>

                  <small
                    className="text-uppercase fw-bold"
                    style={{
                      color: "#00c853",
                      letterSpacing: "2px",
                    }}
                  >
                    Email
                  </small>

                  <h5
                    className="fw-bold mt-2 mb-2"
                    style={{
                      wordBreak: "break-word",
                      cursor: "pointer",
                      transition: "all 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(2)";
                      e.currentTarget.style.backgroundColor = "red";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {" "}
                    pierocar25@libero.it{" "}
                  </h5>

                  <p className="text-secondary small mb-0">
                    Risponderemo alla tua richiesta nel più breve tempo
                    possibile.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* SEDE */}
            <Col md={6} lg={3}>
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.12)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    <MapPin size={23} style={{ color: "#00c853" }} />
                  </div>

                  <small
                    className="text-uppercase fw-bold"
                    style={{
                      color: "#00c853",
                      letterSpacing: "2px",
                    }}
                  >
                    Showroom
                  </small>

                  <h5 className="fw-bold mt-2 mb-2">PieroCar Showroom</h5>

                  <p className="text-secondary small mb-0">
                    Via Val Demone 65/A | 91026 Mazara del Vallo(TP).
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* ORARI */}
            <Col md={6} lg={3}>
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.12)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    <Clock size={23} style={{ color: "#00c853" }} />
                  </div>

                  <small
                    className="text-uppercase fw-bold"
                    style={{
                      color: "#00c853",
                      letterSpacing: "2px",
                    }}
                  >
                    Orari
                  </small>

                  <h5 className="fw-bold mt-2 mb-2">Lun — Sab</h5>

                  <p className="text-secondary small mb-0">09:00 — 20:00</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========================================= */}
      {/* SEZIONE CONTATTO + MODULO                 */}
      {/* ========================================= */}
      <section id="modulo-contatto" className="py-5">
        <Container>
          <Row className="g-5 align-items-start">
            {/* TESTO LATERALE */}
            <Col lg={5}>
              <div className="pe-lg-4">
                <span
                  className="text-uppercase fw-bold small"
                  style={{
                    color: "#00c853",
                    letterSpacing: "3px",
                  }}
                >
                  Richiedi informazioni
                </span>

                <h2 className="fw-bold text-uppercase display-6 mt-2 mb-4">
                  La tua prossima
                  <br />
                  <span style={{ color: "#00c853" }}>esperienza.</span>
                </h2>

                <p
                  className="text-light"
                  style={{
                    lineHeight: "1.8",
                    opacity: "0.78",
                  }}
                >
                  Compila il modulo e raccontaci cosa stai cercando. Possiamo
                  fornirti maggiori informazioni sulle vetture presenti nella
                  nostra vetrina e aiutarti a individuare la soluzione più
                  adatta alle tue esigenze.
                </p>

                <div className="mt-4">
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <CheckCircle
                      size={22}
                      className="flex-shrink-0 mt-1"
                      style={{ color: "#00c853" }}
                    />

                    <div>
                      <h6 className="fw-bold text-uppercase mb-1">
                        Informazioni dettagliate
                      </h6>

                      <p className="text-secondary small mb-0">
                        Ricevi tutte le informazioni disponibili sulla vettura
                        di tuo interesse.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <CheckCircle
                      size={22}
                      className="flex-shrink-0 mt-1"
                      style={{ color: "#00c853" }}
                    />

                    <div>
                      <h6 className="fw-bold text-uppercase mb-1">
                        Assistenza personalizzata
                      </h6>

                      <p className="text-secondary small mb-0">
                        Il nostro team è a disposizione per rispondere alle tue
                        domande.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <CheckCircle
                      size={22}
                      className="flex-shrink-0 mt-1"
                      style={{ color: "#00c853" }}
                    />

                    <div>
                      <h6 className="fw-bold text-uppercase mb-1">
                        Massima attenzione
                      </h6>

                      <p className="text-secondary small mb-0">
                        Ogni richiesta viene valutata con attenzione e
                        professionalità.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* MODULO */}
            <Col lg={7}>
              <Card
                className="bg-black border-secondary shadow-lg contact-form-card"
                style={{
                  borderRadius: "2,5em",
                }}
              >
                <Card.Body className="p-4 p-md-5 ">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "rgba(0,200,83,0.12)",
                        border: "1px solid rgba(0,200,83,0.35)",
                      }}
                    >
                      <Send size={21} style={{ color: "#00c853" }} />
                    </div>

                    <div>
                      <h4 className="fw-bold text-uppercase mb-0">
                        Contattaci
                      </h4>
                      <small className="text-secondary">
                        Compila tutti i campi richiesti
                      </small>
                    </div>
                  </div>
                  {sent && (
                    <Alert
                      variant="success"
                      className="bg-dark border-success text-light mb-4"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle size={20} />
                        <span>
                          Richiesta inviata correttamente. Ti ricontatteremo al
                          più presto.
                        </span>
                      </div>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      {/* NOME */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="text-secondary small text-uppercase fw-semibold">
                            Nome e Cognome
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nome"
                            required
                            placeholder="Inserisci nome e cognome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="bg-dark text-light border-secondary py-2"
                          />
                        </Form.Group>
                      </Col>
                      {/* EMAIL */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="text-secondary small text-uppercase fw-semibold">
                            Email
                          </Form.Label>

                          <Form.Control
                            type="email"
                            name="email"
                            required
                            placeholder="nome@email.it"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-dark text-light border-secondary py-2"
                          />
                        </Form.Group>
                      </Col>

                      {/* TELEFONO */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="text-secondary small text-uppercase fw-semibold">
                            Telefono
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="telefono"
                            placeholder="+39 ..."
                            value={formData.telefono}
                            onChange={handleChange}
                            className="bg-dark text-light border-secondary py-2"
                          />
                        </Form.Group>
                      </Col>

                      {/* VETTURA */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="text-secondary small text-uppercase fw-semibold">
                            Vettura di interesse
                          </Form.Label>

                          <Form.Control
                            type="text"
                            name="vettura"
                            placeholder="Es. BMW M3 Competition"
                            value={formData.vettura}
                            onChange={handleChange}
                            className="bg-dark text-light border-secondary py-2"
                          />
                        </Form.Group>
                      </Col>

                      {/* MESSAGGIO */}
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="text-secondary small text-uppercase fw-semibold">
                            Messaggio
                          </Form.Label>

                          <Form.Control
                            as="textarea"
                            rows={6}
                            name="messaggio"
                            required
                            placeholder="Scrivi qui la tua richiesta..."
                            value={formData.messaggio}
                            onChange={handleChange}
                            className="bg-dark text-light border-secondary"
                          />
                        </Form.Group>
                      </Col>

                      {/* PRIVACY */}
                      <Col xs={12}>
                        <div className="d-flex align-items-start gap-2 mt-2">
                          <ShieldCheck
                            size={18}
                            className="flex-shrink-0 mt-1"
                            style={{ color: "#00c853" }}
                          />

                          <small className="text-secondary">
                            Utilizzeremo i dati inseriti esclusivamente per
                            rispondere alla tua richiesta di informazioni.
                          </small>
                        </div>
                      </Col>

                      {/* BOTTONE */}
                      <Col xs={12}>
                        <Button
                          type="submit"
                          variant="warning"
                          className="w-100 py-3 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2 mt-2"
                          style={{
                            backgroundColor: "#00c853",
                            borderColor: "#00c853",
                            color: "#000",
                          }}
                        >
                          Invia richiesta
                          <Send size={18} />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5 border-top border-secondary">
        {" "}
        <Container className="py-lg-4">
          {" "}
          <div className="text-center mb-5">
            {" "}
            <span
              className="text-uppercase fw-bold small"
              style={{ color: "#00c853", letterSpacing: "3px" }}
            >
              {" "}
              Il nostro approccio{" "}
            </span>{" "}
            <h2 className="fw-bold text-uppercase display-6 mt-2 mb-3">
              {" "}
              Perché scegliere{" "}
              <span style={{ color: "#00c853" }}> PieroCar </span>{" "}
            </h2>{" "}
            <p
              className="text-light mx-auto"
              style={{ maxWidth: "700px", lineHeight: "1.8" }}
            >
              {" "}
              Passione per le automobili, attenzione ai dettagli e un'esperienza
              pensata per chi cerca qualcosa di più di una semplice
              vettura.{" "}
            </p>{" "}
          </div>{" "}
          <Row className="g-4">
            {" "}
            {/* CARD 1 */}{" "}
            <Col md={6} lg={3}>
              {" "}
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{ borderRadius: "4px" }}
              >
                {" "}
                <Card.Body className="p-4 text-center">
                  {" "}
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.10)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    {" "}
                    <Car size={28} style={{ color: "#00c853" }} />{" "}
                  </div>{" "}
                  <h5 className="fw-bold text-uppercase mb-3">
                    {" "}
                    Vetture selezionate{" "}
                  </h5>{" "}
                  <p className="text-secondary small mb-0">
                    {" "}
                    Una selezione di automobili scelta con attenzione, pensata
                    per appassionati e clienti alla ricerca di qualcosa di
                    speciale.{" "}
                  </p>{" "}
                </Card.Body>{" "}
              </Card>{" "}
            </Col>{" "}
            {/* CARD 2 */}{" "}
            <Col md={6} lg={3}>
              {" "}
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{ borderRadius: "4px" }}
              >
                {" "}
                <Card.Body className="p-4 text-center">
                  {" "}
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.10)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    {" "}
                    <Award size={28} style={{ color: "#00c853" }} />{" "}
                  </div>{" "}
                  <h5 className="fw-bold text-uppercase mb-3"> Qualità </h5>{" "}
                  <p className="text-secondary small mb-0">
                    {" "}
                    Prestiamo particolare attenzione alle caratteristiche, alle
                    condizioni e alla presentazione di ogni vettura presente
                    nella nostra vetrina.{" "}
                  </p>{" "}
                </Card.Body>{" "}
              </Card>{" "}
            </Col>{" "}
            {/* CARD 3 */}{" "}
            <Col md={6} lg={3}>
              {" "}
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{ borderRadius: "4px" }}
              >
                {" "}
                <Card.Body className="p-4 text-center">
                  {" "}
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.10)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    {" "}
                    <Users size={28} style={{ color: "#00c853" }} />{" "}
                  </div>{" "}
                  <h5 className="fw-bold text-uppercase mb-3">
                    {" "}
                    Servizio personale{" "}
                  </h5>{" "}
                  <p className="text-secondary small mb-0">
                    {" "}
                    Ogni cliente viene seguito in modo diretto, con
                    disponibilità e attenzione durante ogni fase della
                    richiesta.{" "}
                  </p>{" "}
                </Card.Body>{" "}
              </Card>{" "}
            </Col>{" "}
            {/* CARD 4 */}{" "}
            <Col md={6} lg={3}>
              {" "}
              <Card
                className="h-100 bg-black border-secondary text-light"
                style={{ borderRadius: "4px" }}
              >
                {" "}
                <Card.Body className="p-4 text-center">
                  {" "}
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,200,83,0.10)",
                      border: "1px solid rgba(0,200,83,0.35)",
                    }}
                  >
                    {" "}
                    <ShieldCheck size={28} style={{ color: "#00c853" }} />{" "}
                  </div>{" "}
                  <h5 className="fw-bold text-uppercase mb-3">
                    {" "}
                    Affidabilità{" "}
                  </h5>{" "}
                  <p className="text-secondary small mb-0">
                    {" "}
                    Informazioni chiare e un rapporto trasparente sono alla base
                    del nostro modo di presentarci ai clienti.{" "}
                  </p>{" "}
                </Card.Body>{" "}
              </Card>{" "}
            </Col>{" "}
          </Row>{" "}
        </Container>{" "}
      </section>{" "}
      {/* ========================================= */}
      {/* NUMERI / PRESENTAZIONE */}{" "}
      {/* ========================================= */}
      <section
        className="py-5 border-top border-secondary"
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      >
        {" "}
        <Container>
          {" "}
          <Row className="align-items-center g-5">
            {" "}
            <Col lg={6}>
              {" "}
              <span
                className="text-uppercase fw-bold small"
                style={{ color: "#00c853", letterSpacing: "3px" }}
              >
                {" "}
                PieroCar Showroom{" "}
              </span>{" "}
              <h2 className="fw-bold text-uppercase display-6 mt-2 mb-4">
                {" "}
                Una vetrina. <br />{" "}
                <span style={{ color: "#00c853" }}> Una passione. </span>{" "}
              </h2>{" "}
              <p
                className="text-light"
                style={{ lineHeight: "1.9", opacity: "0.78" }}
              >
                {" "}
                PieroCar nasce dalla passione per il mondo dell'automobile e
                dalla volontà di creare uno spazio digitale dedicato a vetture
                capaci di distinguersi.{" "}
              </p>{" "}
              <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                {" "}
                Esplora la nostra vetrina, scopri i dettagli delle vetture e
                contattaci per ricevere maggiori informazioni sul modello che ha
                attirato la tua attenzione.{" "}
              </p>{" "}
              <div className="mt-4">
                {" "}
                <Link
                  to="/"
                  className="btn px-4 py-3 fw-semibold text-uppercase d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #00c853",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 200, 83, 0.46)";
                    e.currentTarget.style.borderColor = "#00c853";
                    e.currentTarget.style.color = "#00c853";
                    e.currentTarget.style.transform =
                      "translateY(-3px) scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 0 14px rgba(0, 200, 83, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#00c853";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Scopri la vetrina <ArrowRight size={19} />
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <Row className="g-3">
                {" "}
                {/* BLOCCO 1 */}{" "}
                <Col xs={6}>
                  {" "}
                  <div
                    className="bg-black border border-secondary p-4 h-100 text-center"
                    style={{ minHeight: "150px" }}
                  >
                    {" "}
                    <div
                      className=" display-5 fw-light"
                      style={{ color: "#00c853" }}
                    >
                      1°
                    </div>
                    <div className="text-uppercase fw-bold mt-2">
                      {" "}
                      Passione{" "}
                    </div>{" "}
                    <small className="text-secondary">
                      {" "}
                      per l'automobile{" "}
                    </small>{" "}
                  </div>{" "}
                </Col>{" "}
                {/* BLOCCO 2 */}{" "}
                <Col xs={6}>
                  {" "}
                  <div
                    className="bg-black border border-secondary p-4 h-100 text-center"
                    style={{ minHeight: "150px" }}
                  >
                    {" "}
                    <div
                      className=" display-5 fw-light"
                      style={{ color: "#00c853" }}
                    >
                      {" "}
                      2°{" "}
                    </div>{" "}
                    <div className="text-uppercase fw-bold mt-2">
                      {" "}
                      Qualità{" "}
                    </div>{" "}
                    <small className="text-secondary">
                      {" "}
                      nella selezione{" "}
                    </small>{" "}
                  </div>{" "}
                </Col>{" "}
                {/* BLOCCO 3 */}{" "}
                <Col xs={6}>
                  {" "}
                  <div
                    className="bg-black border border-secondary p-4 h-100 text-center"
                    style={{ minHeight: "150px" }}
                  >
                    {" "}
                    <div
                      className="display-5 fw-light"
                      style={{ color: "#00c853" }}
                    >
                      {" "}
                      3°{" "}
                    </div>{" "}
                    <div className="text-uppercase fw-bold mt-2">
                      {" "}
                      Attenzione{" "}
                    </div>{" "}
                    <small className="text-secondary">
                      {" "}
                      per ogni cliente{" "}
                    </small>{" "}
                  </div>{" "}
                </Col>{" "}
                {/* BLOCCO 4 */}{" "}
                <Col xs={6}>
                  {" "}
                  <div
                    className="bg-black border border-secondary p-4 px-3 h-100 text-center"
                    style={{ minHeight: "150px" }}
                  >
                    {" "}
                    <div
                      className="display-5 fw-light"
                      style={{ color: "#00c853" }}
                    >
                      {" "}
                      4°{" "}
                    </div>{" "}
                    <div className="text-uppercase fw-bold mt-2">
                      {" "}
                      Professione
                    </div>{" "}
                    <small className="text-secondary">
                      {" "}
                      nel servizio{" "}
                    </small>{" "}
                  </div>{" "}
                </Col>{" "}
              </Row>{" "}
            </Col>{" "}
          </Row>{" "}
        </Container>{" "}
      </section>{" "}
      {/* ========================================= */}{" "}
      {/* CALL TO ACTION FINALE */}{" "}
      {/* ========================================= */}{" "}
      <section className="py-5 border-top border-secondary">
        {" "}
        <Container>
          {" "}
          <div
            className="position-relative overflow-hidden bg-black border border-secondary p-4 p-md-5 text-center"
            style={{ borderRadius: "4px" }}
          >
            {" "}
            {/* Bagliore verde */}{" "}
            <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(0,200,83,0.10) 0%, rgba(0,200,83,0) 70%)",
                pointerEvents: "none",
              }}
            />{" "}
            <div className="position-relative">
              {" "}
              <img
                src={LogoCogna}
                alt="PieroCar"
                style={{ width: "120px", marginBottom: "25px" }}
              />{" "}
              <h2 className="fw-bold text-uppercase mb-3">
                {" "}
                Hai trovato la tua prossima auto?
              </h2>{" "}
              <p
                className="text-secondary mx-auto"
                style={{ maxWidth: "650px", lineHeight: "1.8" }}
              >
                {" "}
                Non esitare a contattarci. Siamo a disposizione per fornirti
                maggiori informazioni sulle vetture presenti nella nostra
                vetrina.
              </p>
              <p className="text-secondary small mb-4">
                La tua prossima vettura potrebbe essere più vicina di quanto
                pensi.
              </p>
              <div
                className="d-flex flex-column align-items-center"
                style={{ marginTop: "10px" }}
              >
                <span
                  className="text-secondary text-uppercase small fw-semibold mb-2"
                  style={{ letterSpacing: "2px" }}
                >
                  Per informazioni scrivici a{" "}
                </span>
                <h5
                  className="fw-bold mt-2 mb-2"
                  style={{ wordBreak: "break-word" }}
                >
                  {" "}
                  <a
                    href="mailto:pierocar25@libero.it?subject=Richiesta%20informazioni%20PieroCar&body=Buongiorno,%0A%0Asono%20interessato%20a%20ricevere%20maggiori%20informazioni%20sulle%20vetture%20PieroCar.%0A%0AGrazie."
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {" "}
                    <span
                      style={{
                        display: "inline-block",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                        e.currentTarget.style.color = "#00ff66";
                        e.currentTarget.style.textShadow =
                          "0 0 10px rgba(0, 200, 83, 0.55)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.color = "";
                        e.currentTarget.style.textShadow = "";
                      }}
                    >
                      {" "}
                      pierocar25@libero.it{" "}
                    </span>{" "}
                  </a>{" "}
                </h5>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-5">
        <Container>
          <div className="text-center">
            <div
              className="d-flex justify-content-center align-items-center gap-2 mb-3"
              style={{ color: "#00c853" }}
            ></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
