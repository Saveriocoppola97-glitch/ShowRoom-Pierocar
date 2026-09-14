import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Euro,
  ShieldCheck,
  CarFront,
  PhoneCall,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Gauge,
  Crown,
} from "lucide-react";
import SfondoCarbonioFull from "../public/SfondoCarbonioFull.jpg";
export default function Servizi() {
  const premiumCars = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=85",
  ];
  const services = [
    {
      number: "01",
      icon: <Euro size={28} />,
      title: "Finanziamenti",
      description:
        "Soluzioni di finanziamento pensate per rendere l'acquisto della tua prossima vettura semplice e sostenibile.",
      points: [
        "Rate personalizzabili",
        "Soluzioni su misura",
        "Assistenza nella pratica",
      ],
    },
    {
      number: "02",
      icon: <ShieldCheck size={28} />,
      title: "Garanzia",
      description:
        "Acquista con maggiore tranquillità grazie alle nostre soluzioni di garanzia dedicate alle vetture disponibili in showroom.",
      points: [
        "Copertura dedicata",
        "Maggiore sicurezza nell'acquisto",
        "Assistenza post-vendita",
      ],
    },
    {
      number: "03",
      icon: <CarFront size={28} />,
      title: "Noleggio",
      description:
        "Hai bisogno di una vettura senza acquistarla? Scopri le nostre soluzioni di noleggio pensate per offrirti maggiore flessibilità.",
      points: [
        "Soluzioni flessibili",
        "Vetture selezionate",
        "Consulenza dedicata",
      ],
    },
    {
      number: "04",
      icon: <PhoneCall size={28} />,
      title: "Soccorso stradale H24",
      description:
        "In caso di necessità puoi contare su un servizio di assistenza stradale disponibile 24 ore su 24.",
      points: [
        "Assistenza 24 ore su 24",
        "Intervento rapido",
        "Supporto in caso di emergenza",
      ],
    },
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.78) ), url(${SfondoCarbonioFull}) `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <style>
        {` @keyframes serviziFadeUp { 0% { opacity: 0; transform: translateY(35px); } 100% { opacity: 1; transform: translateY(0); } } @keyframes serviziGlow { 0% { opacity: 0.35; transform: scaleX(0.7); } 50% { opacity: 1; transform: scaleX(1); } 100% { opacity: 0.35; transform: scaleX(0.7); } } @keyframes serviziScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } @keyframes serviziPulse { 0% { box-shadow: 0 0 0 rgba(0, 200, 83, 0), 0 0 0 rgba(0, 200, 83, 0); } 50% { box-shadow: 0 0 18px rgba(0, 200, 83, 0.16), 0 0 45px rgba(0, 200, 83, 0.08); } 100% { box-shadow: 0 0 0 rgba(0, 200, 83, 0), 0 0 0 rgba(0, 200, 83, 0); } } @keyframes serviziIconFloat { 0% { transform: translateY(0); } 50% { transform: translateY(-4px); } 100% { transform: translateY(0); } } @keyframes serviziShine { 0% { left: -120%; } 100% { left: 120%; } } @keyframes serviziDot { 0% { opacity: 0.25; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } 100% { opacity: 0.25; transform: scale(0.8); } } .servizi-fade-1 { animation: serviziFadeUp 0.8s ease-out 0.1s both; } .servizi-fade-2 { animation: serviziFadeUp 0.8s ease-out 0.25s both; } .servizi-fade-3 { animation: serviziFadeUp 0.8s ease-out 0.4s both; } .servizi-fade-4 { animation: serviziFadeUp 0.8s ease-out 0.55s both; } .servizi-card { position: relative; overflow: hidden; animation: serviziPulse 4s ease-in-out infinite; } .servizi-card::before { content: ""; position: absolute; top: 0; bottom: 0; width: 80px; left: -120%; background: linear-gradient( 90deg, transparent, rgba(255,255,255,0.10), transparent ); transform: skewX(-18deg); pointer-events: none; } .servizi-card:hover::before { animation: serviziShine 0.9s ease; } .servizi-card:hover { transform: translateY(-8px) !important; } .servizi-card:hover .servizi-icon { animation: serviziIconFloat 1.5s ease-in-out infinite; } .servizi-gallery-wrapper { overflow: hidden; width: 100%; position: relative; } .servizi-gallery-wrapper::before, .servizi-gallery-wrapper::after { content: ""; position: absolute; top: 0; bottom: 0; width: 12%; z-index: 2; pointer-events: none; } .servizi-gallery-wrapper::before { left: 0; background: linear-gradient( 90deg, rgba(0,0,0,0.95), transparent ); } .servizi-gallery-wrapper::after { right: 0; background: linear-gradient( 270deg, rgba(0,0,0,0.95), transparent ); } .servizi-gallery-track { display: flex; width: max-content; animation: serviziScroll 38s linear infinite; } .servizi-gallery-track:hover { animation-play-state: paused; } .servizi-gallery-item { width: 320px; height: 205px; margin-right: 18px; flex-shrink: 0; position: relative; overflow: hidden; border: 1px solid rgba(0, 200, 83, 0.18); background: #050505; } .servizi-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(0.85); transition: all 0.6s ease; } .servizi-gallery-item:hover img { transform: scale(1.08); filter: saturate(1.1); } .servizi-gallery-item::after { content: ""; position: absolute; inset: 0; background: linear-gradient( 180deg, transparent 45%, rgba(0,0,0,0.72) ); pointer-events: none; } .servizi-section-line { width: 90px; height: 2px; margin: 22px auto 0; background: #00c853; box-shadow: 0 0 15px rgba(0,200,83,0.7); animation: serviziGlow 3s ease-in-out infinite; } .servizi-dot { width: 6px; height: 6px; border-radius: 50%; background: #00c853; box-shadow: 0 0 10px rgba(0,200,83,0.8); animation: serviziDot 2s ease-in-out infinite; } .servizi-mini-line { height: 1px; flex: 1; background: linear-gradient( 90deg, rgba(0,200,83,0.5), transparent ); } @media (max-width: 768px) { .servizi-gallery-item { width: 260px; height: 175px; } } `}
      </style>
      {/* HERO */}
      <section
        className="servizi-fade-1"
        style={{
          padding: "90px 20px 70px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Container>
          <h1
            className="fw-bold text-uppercase"
            style={{
              fontSize: "clamp(2.3rem, 5vw, 4rem)",
              letterSpacing: "4px",
              marginTop: "24px",
              marginBottom: "20px",
              textShadow: "0 0 25px rgba(0,200,83,0.10)",
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
          <div className="servizi-section-line" />
          <div
            className="d-flex justify-content-center align-items-center gap-3 mt-4"
            style={{
              color: "#777777",
              fontSize: "0.68rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            <div className="servizi-dot" /> Esperienza
            <div className="servizi-mini-line" style={{ maxWidth: "70px" }} />
            Qualità
            <div className="servizi-mini-line" style={{ maxWidth: "70px" }} />
            Assistenza <div className="servizi-dot" />
          </div>
        </Container>
      </section>
      {/* GALLERIA PREMIUM */}
      <section className="servizi-fade-2" style={{ padding: "15px 0 70px" }}>
        <div
          className="text-center mb-4"
          style={{
            color: "#777777",
            fontSize: "0.68rem",
            fontWeight: "700",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#00c853" }}>///</span> L'universo PieroCar
        </div>
        <div className="servizi-gallery-wrapper">
          <div className="servizi-gallery-track">
            {[...premiumCars, ...premiumCars].map((image, index) => (
              <div className="servizi-gallery-item" key={index}>
                <img src={image} alt="Vettura premium PieroCar" />
                <div
                  style={{
                    position: "absolute",
                    left: "18px",
                    bottom: "14px",
                    zIndex: 3,
                    color: "#ffffff",
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  PIERO<span style={{ color: "#00c853" }}>CAR</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* INTRO SERVIZI */}
      <section className="servizi-fade-3" style={{ paddingBottom: "25px" }}>
        <Container>
          <div
            className="d-flex align-items-center gap-3 mb-4"
            style={{
              color: "#00c853",
              fontSize: "0.7rem",
              fontWeight: "700",
              letterSpacing: "3px",
            }}
          >
            <span>01</span>
            <div
              style={{ width: "80px", height: "1px", background: "#00c853" }}
            />
            SERVIZI DEDICATI
          </div>
          <div style={{ maxWidth: "720px" }}>
            <h2
              className="fw-bold text-uppercase"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                letterSpacing: "2px",
                marginBottom: "15px",
              }}
            >
              Tutto ciò che serve, <br />
              <span style={{ color: "#00c853" }}>prima e dopo l'acquisto.</span>
            </h2>
            <p
              style={{ color: "#858585", lineHeight: "1.8", maxWidth: "620px" }}
            >
              Un'esperienza completa costruita intorno alla tua vettura e alle
              tue esigenze.
            </p>
          </div>
        </Container>
      </section>
      {/* CARDS */}
      <Container className="py-5">
        <Row className="g-4">
          {services.map(function (service, index) {
            return (
              <Col
                xs={12}
                md={6}
                key={service.number}
                className={
                  index === 0
                    ? "servizi-fade-1"
                    : index === 1
                      ? "servizi-fade-2"
                      : index === 2
                        ? "servizi-fade-3"
                        : "servizi-fade-4"
                }
              >
                <Card
                  className="h-100 border-0 servizi-card"
                  style={{
                    background: "rgba(10, 10, 10, 0.94)",
                    borderRadius: "4px",
                    borderTop: "2px solid #00c853",
                    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.45)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={function (e) {
                    e.currentTarget.style.boxShadow =
                      "0 18px 50px rgba(0, 200, 83, 0.15)";
                  }}
                  onMouseLeave={function (e) {
                    e.currentTarget.style.boxShadow =
                      "0 10px 35px rgba(0, 0, 0, 0.45)";
                  }}
                >
                  <Card.Body className="p-4 p-lg-5">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div
                        className="servizi-icon"
                        style={{
                          width: "58px",
                          height: "58px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0, 200, 83, 0.08)",
                          border: "1px solid rgba(0, 200, 83, 0.35)",
                          borderRadius: "4px",
                          color: "#00c853",
                        }}
                      >
                        {service.icon}
                      </div>
                      <div
                        style={{
                          color: "rgba(0,200,83,0.35)",
                          fontSize: "2.2rem",
                          fontWeight: "800",
                          lineHeight: "1",
                          letterSpacing: "-2px",
                        }}
                      >
                        {service.number}
                      </div>
                    </div>
                    <h3 className="fw-bold text-uppercase mb-3">
                      {service.title}
                    </h3>
                    <p
                      style={{
                        color: "#a8a8a8",
                        lineHeight: "1.8",
                        minHeight: "86px",
                      }}
                    >
                      {service.description}
                    </p>
                    <div
                      style={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, rgba(0,200,83,0.4), transparent)",
                        margin: "25px 0",
                      }}
                    />
                    <div>
                      {service.points.map(function (point, pointIndex) {
                        return (
                          <div
                            className="d-flex align-items-center gap-2 mb-3"
                            key={pointIndex}
                          >
                            <CheckCircle size={17} color="#00c853" />
                            <span
                              style={{ color: "#dddddd", fontSize: "0.92rem" }}
                            >
                              {point}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        {/* EXPERIENCE STRIP */}
        <section
          className="servizi-fade-4"
          style={{
            marginTop: "85px",
            padding: "35px 25px",
            borderTop: "1px solid rgba(0, 200, 83, 0.18)",
            borderBottom: "1px solid rgba(0, 200, 83, 0.18)",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.65), rgba(0,200,83,0.035), rgba(0,0,0,0.65))",
          }}
        >
          <Row className="align-items-center g-4">
            <Col xs={12} lg={5}>
              <div
                className="d-flex align-items-center gap-3"
                style={{
                  color: "#00c853",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                <Crown size={18} /> PieroCar Experience
              </div>
              <h3
                className="fw-bold text-uppercase mt-3 mb-0"
                style={{ letterSpacing: "1.5px" }}
              >
                Un servizio pensato <br />
                <span style={{ color: "#00c853" }}>per la tua auto.</span>
              </h3>
            </Col>
            <Col xs={12} lg={7}>
              <Row className="g-3">
                <Col xs={12} sm={4}>
                  <div
                    style={{
                      borderLeft: "1px solid rgba(0,200,83,0.35)",
                      paddingLeft: "15px",
                    }}
                  >
                    <Gauge size={20} color="#00c853" />
                    <div
                      className="mt-2"
                      style={{
                        fontSize: "0.78rem",
                        color: "#ffffff",
                        fontWeight: "700",
                      }}
                    >
                      PROFESSIONALITÀ
                    </div>
                    <div
                      style={{
                        color: "#777777",
                        fontSize: "0.72rem",
                        marginTop: "4px",
                      }}
                    >
                      Ogni dettaglio conta
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div
                    style={{
                      borderLeft: "1px solid rgba(0,200,83,0.35)",
                      paddingLeft: "15px",
                    }}
                  >
                    <ShieldCheck size={20} color="#00c853" />
                    <div
                      className="mt-2"
                      style={{
                        fontSize: "0.78rem",
                        color: "#ffffff",
                        fontWeight: "700",
                      }}
                    >
                      SICUREZZA
                    </div>
                    <div
                      style={{
                        color: "#777777",
                        fontSize: "0.72rem",
                        marginTop: "4px",
                      }}
                    >
                      Sempre al tuo fianco
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div
                    style={{
                      borderLeft: "1px solid rgba(0,200,83,0.35)",
                      paddingLeft: "15px",
                    }}
                  >
                    <Sparkles size={20} color="#00c853" />
                    <div
                      className="mt-2"
                      style={{
                        fontSize: "0.78rem",
                        color: "#ffffff",
                        fontWeight: "700",
                      }}
                    >
                      QUALITÀ
                    </div>
                    <div
                      style={{
                        color: "#777777",
                        fontSize: "0.72rem",
                        marginTop: "4px",
                      }}
                    >
                      Esperienza premium
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
        {/* CTA */}
        <div
          className="text-center servizi-fade-4"
          style={{
            marginTop: "75px",
            padding: "60px 25px",
            position: "relative",
            borderTop: "1px solid rgba(0, 200, 83, 0.2)",
            borderBottom: "1px solid rgba(0, 200, 83, 0.2)",
            background:
              "radial-gradient(circle at center, rgba(0,200,83,0.08), rgba(0,0,0,0.55) 55%)",
          }}
        >
          <div
            style={{
              color: "#00c853",
              fontSize: "0.68rem",
              fontWeight: "700",
              letterSpacing: "4px",
              marginBottom: "15px",
            }}
          ></div>
          <h2
            className="fw-bold text-uppercase"
            style={{
              letterSpacing: "2px",
              fontSize: "clamp(1.5rem, 4vw, 2.3rem)",
            }}
          >
            Hai bisogno di maggiori informazioni?
          </h2>
          <p
            style={{
              color: "#999999",
              marginTop: "15px",
              marginBottom: "30px",
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
                color: "#ffffff",
                borderRadius: "3px",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
                boxShadow: "0 0 15px rgba(0,200,83,0.08)",
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.background = "#00c853";
                e.currentTarget.style.color = "#000000";
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(0,200,83,0.35)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.background = "#000000";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(0,200,83,0.08)";
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
