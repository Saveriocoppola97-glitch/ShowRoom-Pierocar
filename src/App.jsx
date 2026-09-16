import { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Badge,
  Alert,
} from "react-bootstrap";
import {
  PlusCircle,
  Edit,
  Trash2,
  Gauge,
  Zap,
  Calendar,
  Info,
  Lock,
  LogOut,
} from "lucide-react";
import "./App.css";
import { Carousel } from "react-bootstrap";
import LogoCogna from "../public/LogoCogna.png";
import SfondoCarbonioFull from "../public/SfondoCarbonioFull.jpg";
import {
  Routes,
  Route,
  Link,
  Navigate,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Contatti from "./Contatti";
import Servizi from "./Servizi";
import { supabase } from "./supabaseClient";

export default function App() {
  // Stato principali
  const [cars, setCars] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Stati Autenticazione Admin
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Stati Modale Dettagli
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState("");
  const [fullscreenGallery, setFullscreenGallery] = useState([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // Stati Modale Form Admin
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    id: null,
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    category: "Supercar",
    fuel: "Benzina",
    hp: "",
    price: "",
    transmission: "",
    image: "",
    description: "",
    specs: {
      acceleration: "",
      topSpeed: "",
      engine: "",
      weight: "",
    },
    gallery: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    status: "In Esposizione",
  });

  const cloudName = "tdlnalfb";
  const uploadPreset = "PieroCar";

  const uploadImageToCloudinary = async (file) => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      },
    );

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error?.message || "Errore nel caricamento");

    return data.secure_url;
  };

  useEffect(() => {
    const timer = setTimeout(function () {
      setIsFirstLoad(false);
    }, 1800);

    return function () {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    function loadCars() {
      supabase
        .from("cars")
        .select("*")
        .then(function (result) {
          if (result.error) {
            console.error("Errore caricamento auto:", result.error);
            return;
          }

          const data = result.data;

          const convertedCars = data.map(function (car) {
            return {
              id: car.id,
              brand: car.marca,
              model: car.modello,
              year: car.anno,
              category: car.categoria,
              fuel: car.alimentazione,
              hp: car.potenza,
              status: car.stato_vettura,
              price: car.prezzo,
              image: car.image,
              gallery: car.gallery || [],
              description: car.description || "",
              transmission: car.transmission || "",
              specs: car.specs || {
                acceleration: "",
                topSpeed: "",
                engine: "",
                weight: "",
              },
            };
          });
          setCars(convertedCars);
        });
    }

    loadCars();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(function (result) {
      if (result.data.session) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
      }
    });
  }, []);

  // Gestione click sulla Navbar
  const handleNavClick = () => {
    if (isAdminLoggedIn) {
      navigate("/backoffice");
    } else {
      setShowLoginModal(true);
    }
  };

  // Login Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_ADMIN_EMAIL,
      password: passwordInput,
    });

    if (error) {
      console.error("ERRORE LOGIN SUPABASE:", error);
      setLoginError(true);
      return;
    }

    setIsAdminLoggedIn(true);
    setShowLoginModal(false);
    setPasswordInput("");
    setLoginError(false);
    navigate("/backoffice");
  };

  // LOGIN AUTOMATICO SENZA CLIK
  const handleAutoLogin = async (password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_ADMIN_EMAIL,
      password: password,
    });

    if (error) {
      return;
    }

    setIsAdminLoggedIn(true);
    setShowLoginModal(false);
    setPasswordInput("");
    setLoginError(false);
    navigate("/backoffice");
  };

  // Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();

    setIsAdminLoggedIn(false);
    navigate("/");
  };

  // Gestione apertura dettagli
  const handleOpenDetails = (car) => {
    setSelectedCar(car);
    setActiveGalleryImage(car.image);
    setShowDetailModal(true);
  };

  // Funzione per leggere un'immagine dal PC
  const handleImageUpload = async (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      if (field === "image") {
        const updatedFormData = { ...formData, image: imageUrl };
        setFormData(updatedFormData);
        if (isEditing) {
          setCars(
            cars.map((c) => (c.id === formData.id ? updatedFormData : c)),
          );
        }
      }
      if (field === "gallery") {
        const newGallery = [...formData.gallery];
        newGallery[index] = imageUrl;
        const updatedFormData = { ...formData, gallery: newGallery };
        setFormData(updatedFormData);
        if (isEditing) {
          setCars(
            cars.map((c) => (c.id === formData.id ? updatedFormData : c)),
          );
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDescription = (description) => {
    if (!description) {
      return [];
    }
    return description
      .split(/\n\s*\n/)
      .map(function (paragraph) {
        return paragraph.trim();
      })
      .filter(function (paragraph) {
        return paragraph.length > 0;
      });
  };

  // Modifica URL immagine principale
  const handleMainImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.value,
    });
  };

  const handleDeleteGalleryImage = (index) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = "";
    const updatedFormData = { ...formData, gallery: newGallery };
    setFormData(updatedFormData);
    if (isEditing) {
      setCars(cars.map((c) => (c.id === formData.id ? updatedFormData : c)));
    }
  };

  const goToFullscreenImage = (direction) => {
    if (fullscreenGallery.length === 0) {
      return;
    }
    let newIndex = fullscreenIndex + direction;
    if (newIndex < 0) {
      newIndex = fullscreenGallery.length - 1;
    }
    if (newIndex >= fullscreenGallery.length) {
      newIndex = 0;
    }
    setFullscreenIndex(newIndex);
    setFullscreenImage(fullscreenGallery[newIndex]);
  };

  // Gestione form Admin - nuova auto
  const handleOpenAddModal = () => {
    setIsEditing(false);

    setFormData({
      id: null,
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      category: "Supercar",
      fuel: "Benzina",
      hp: "",
      price: "",
      transmission: "",
      image: "",
      description: "",
      specs: {
        acceleration: "",
        topSpeed: "",
        engine: "",
        weight: "",
      },
      gallery: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      status: "In Esposizione",
    });

    setShowAdminModal(true);
  };

  // Gestione form Admin - modifica auto
  const handleOpenEditModal = (car) => {
    setIsEditing(true);

    setFormData({
      ...car,
      gallery: [
        ...(car.gallery || []),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ].slice(0, 17),
    });

    setShowAdminModal(true);
  };

  // Salvataggio auto
  const handleSaveCar = (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Inserisci un'immagine principale tramite URL o caricamento.");
      return;
    }

    const newCar = {
      marca: formData.brand,
      modello: formData.model,
      anno: formData.year,
      categoria: formData.category,
      alimentazione: formData.fuel,
      potenza: formData.hp,
      stato_vettura: formData.status,
      prezzo: formData.price,
      image: formData.image,
      gallery: formData.gallery,
      description: formData.description,
      transmission: formData.transmission,
      specs: formData.specs,
    };

    if (isEditing) {
      supabase
        .from("cars")
        .update(newCar)
        .eq("id", formData.id)
        .select()
        .then(function (result) {
          if (result.error) {
            console.error("Errore modifica auto:", result.error);
            alert("Errore durante la modifica dell'auto.");
            return;
          }

          const updatedCar = result.data[0];

          const convertedCar = {
            id: updatedCar.id,
            brand: updatedCar.marca,
            model: updatedCar.modello,
            year: updatedCar.anno,
            category: updatedCar.categoria,
            fuel: updatedCar.alimentazione,
            hp: updatedCar.potenza,
            status: updatedCar.stato_vettura,
            price: updatedCar.prezzo,
            image: updatedCar.image,
            gallery: updatedCar.gallery || [],
            description: updatedCar.description || "",
            transmission: updatedCar.transmission || "",
            specs: updatedCar.specs || {
              acceleration: "",
              topSpeed: "",
              engine: "",
              weight: "",
            },
          };

          setCars(
            cars.map(function (car) {
              return car.id === convertedCar.id ? convertedCar : car;
            }),
          );

          setShowAdminModal(false);

          console.log("Auto modificata su Supabase:", updatedCar);
        });

      return;
    }

    supabase
      .from("cars")
      .insert([newCar])
      .select()
      .then(function (result) {
        if (result.error) {
          console.error("Errore salvataggio auto:", result.error);
          alert("Errore durante il salvataggio dell'auto.");
          return;
        }

        const savedCar = result.data[0];

        const convertedCar = {
          id: savedCar.id,
          brand: savedCar.marca,
          model: savedCar.modello,
          year: savedCar.anno,
          category: savedCar.categoria,
          fuel: savedCar.alimentazione,
          hp: savedCar.potenza,
          status: savedCar.stato_vettura,
          price: savedCar.prezzo,
          image: savedCar.image,
          gallery: savedCar.gallery || [],
          description: savedCar.description || "",
          transmission: savedCar.transmission || "",
          specs: savedCar.specs || {
            acceleration: "",
            topSpeed: "",
            engine: "",
            weight: "",
          },
        };

        setCars([convertedCar, ...cars]);

        setShowAdminModal(false);

        console.log("Auto salvata su Supabase:", savedCar);
      });
  };

  // Eliminazione auto
  const handleDeleteCar = (id) => {
    if (
      window.confirm(
        "Sei sicuro di voler rimuovere questa vettura dalla vetrina?",
      )
    ) {
      supabase
        .from("cars")
        .delete()
        .eq("id", id)
        .then(function (result) {
          if (result.error) {
            console.error("Errore eliminazione auto:", result.error);
            alert("Errore durante l'eliminazione dell'auto.");
            return;
          }
          setCars(
            cars.filter(function (car) {
              return car.id !== id;
            }),
          );
          console.log("Auto eliminata da Supabase:", id);
        });
    }
  };
  //------------------------------------------------------------------------ INIZIO PAGINA VETRINA-----------------------------------------------------------
  //------------------------------------------------------------------------ INIZIO PAGINA VETRINA-----------------------------------------------------------
  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      <Navbar
        expand="lg"
        className="sticky-top px-3 py-2"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(8,8,8,0.96) 50%, rgba(0,0,0,0.98) 100%)",
          borderBottom: "1px solid rgba(0,200,83,0.35)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 25px rgba(0,0,0,0.45)",
        }}
      >
        <Container fluid>
          {/* LOGO */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold d-flex align-items-center gap-2"
            style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.filter =
                "drop-shadow(0 0 10px rgba(0,200,83,0.35))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "none";
            }}
          >
            <span className="fs-4 tracking-wider text-uppercase font-monospace">
              <img className="LogoCogna" src={LogoCogna} alt="Logo" />
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="gap-2 gap-lg-3 align-items-lg-center">
              {/* VETRINA */}
              <Nav.Link
                as={NavLink}
                to="/"
                className="fw-semibold text-uppercase position-relative px-3 py-2"
                style={{
                  cursor: "pointer",
                  color: "#ffffff",
                  letterSpacing: "1.5px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00c853";
                  e.currentTarget.style.textShadow =
                    "0 0 10px rgba(0,200,83,0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.textShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Vetrina
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    right: "12px",
                    bottom: "2px",
                    height: "2px",
                    background: "#00c853",
                    boxShadow: "0 0 8px rgba(0,200,83,0.7)",
                    opacity: location.pathname === "/" ? 1 : 0,
                    transition: "all 0.3s ease",
                  }}
                />
              </Nav.Link>
              {/* CONTATTI */}
              <Nav.Link
                as={Link}
                to="/contatti"
                className="fw-semibold text-uppercase position-relative px-3 py-2"
                style={{
                  letterSpacing: "1.5px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00c853";
                  e.currentTarget.style.textShadow =
                    "0 0 10px rgba(0,200,83,0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.textShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                CONTATTI
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    right: "12px",
                    bottom: "2px",
                    height: "2px",
                    background: "#00c853",
                    boxShadow: "0 0 8px rgba(0,200,83,0.7)",
                    opacity: location.pathname === "/contatti" ? 1 : 0,
                    transition: "all 0.3s ease",
                  }}
                />
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/servizi"
                className="fw-semibold text-uppercase position-relative px-3 py-2"
                style={{
                  letterSpacing: "1.5px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00c853";
                  e.currentTarget.style.textShadow =
                    "0 0 10px rgba(0,200,83,0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.textShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Servizi
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    right: "12px",
                    bottom: "2px",
                    height: "2px",
                    background: "#00c853",
                    boxShadow: "0 0 8px rgba(0,200,83,0.7)",
                    opacity: location.pathname === "/servizi" ? 1 : 0,
                    transition: "all 0.3s ease",
                  }}
                />
              </Nav.Link>
              {/* ADMIN LOGGATO */}
              {isAdminLoggedIn && (
                <>
                  {/* BACKOFFICE */}
                  <Nav.Link
                    as={NavLink}
                    to="/backoffice"
                    className="fw-semibold text-uppercase position-relative px-3 py-2"
                    style={{
                      cursor: "pointer",
                      color: "#ffffff",
                      letterSpacing: "1.5px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00c853";
                      e.currentTarget.style.textShadow =
                        "0 0 10px rgba(0,200,83,0.45)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.textShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Backoffice
                    <span
                      style={{
                        position: "absolute",
                        left: "12px",
                        right: "12px",
                        bottom: "2px",
                        height: "2px",
                        background: "#00c853",
                        boxShadow: "0 0 8px rgba(0,200,83,0.7)",
                        opacity: location.pathname === "/backoffice" ? 1 : 0,
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Nav.Link>
                  {/* ESCI ADMIN */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                    className="d-flex align-items-center gap-1 ms-lg-2 text-uppercase fw-semibold"
                    style={{ transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 0 14px rgba(220,53,69,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <LogOut size={16} />
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* CONTENUTO PRINCIPALE */}
      <main
        style={{
          backgroundImage: `url(${SfondoCarbonioFull})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex-grow-1"
      >
        <div key={location.pathname} className="page-transition">
          <Routes>
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/servizi" element={<Servizi />} />

            {/* BACKOFFICE*/}
            <Route
              path="/backoffice"
              element={
                isAdminLoggedIn ? (
                  <Container className="py-5">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                      <div>
                        <div
                          className="text-uppercase fw-semibold mb-2"
                          style={{
                            color: "#00c853",
                            letterSpacing: "4px",
                            fontSize: "0.75rem",
                            textShadow: "0 0 10px rgba(0,200,83,0.25)",
                          }}
                        >
                          BACK OFFICE
                        </div>

                        <h2
                          className="fw-bold text-uppercase m-0 text-white"
                          style={{
                            letterSpacing: "1px",
                          }}
                        >
                          Gestione Vetrina Auto
                        </h2>

                        <p
                          className="m-0 mt-2"
                          style={{
                            color: "#ffffff",
                            opacity: 0.9,
                          }}
                        >
                          Aggiungi, modifica o rimuovi i veicoli presenti nel
                          database locale.
                        </p>
                      </div>

                      <Button
                        variant="dark"
                        className="fw-semibold px-4 py-2 text-uppercase d-flex align-items-center gap-2 pulse-green-button"
                        onClick={handleOpenAddModal}
                        style={{
                          background: "rgb(0, 0, 0)",
                          border: "1px solid #00c853",
                          color: "#000d06",
                          borderRadius: "3px",
                          boxShadow: "0 0 18px rgba(0,200,83,0.20)",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#00c85396";
                          e.currentTarget.style.borderColor = "#00c85396";
                          e.currentTarget.style.boxShadow =
                            "0 0 22px rgba(0, 200, 83, 0.09)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#000000";
                          e.currentTarget.style.borderColor = "#000000";
                          e.currentTarget.style.boxShadow =
                            "0 0 18px rgba(0,200,83,0.20)";
                        }}
                      >
                        <PlusCircle size={20} />
                        Aggiungi Nuova Auto
                      </Button>
                    </div>

                    <div
                      className="bg-black rounded shadow-lg overflow-hidden"
                      style={{
                        border: "1px solid rgba(0,200,83,0.25)",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.55)",
                      }}
                    >
                      <Table
                        responsive
                        hover
                        className="align-middle mb-0 backoffice-table"
                        variant="dark"
                      >
                        <thead
                          className="text-uppercase"
                          style={{
                            color: "#00c853",
                            fontSize: "0.78rem",
                            letterSpacing: "1px",
                          }}
                        >
                          <tr>
                            <th className="py-3 px-4">Anteprima</th>
                            <th className="py-3">Marca & Modello</th>
                            <th className="py-3">Categoria</th>
                            <th className="py-3">Potenza</th>
                            <th className="py-3">Stato</th>
                            <th className="py-3 text-end px-4">Azioni</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cars.map((car) => (
                            <tr key={car.id}>
                              <td
                                className="py-3 px-4"
                                style={{ width: "100px" }}
                              >
                                <img
                                  src={
                                    car.image ||
                                    "https://via.placeholder.com/150"
                                  }
                                  alt={car.model}
                                  className="rounded object-fit-cover"
                                  style={{
                                    width: "80px",
                                    height: "50px",
                                    border: "1px solid rgba(0,200,83,0.25)",
                                  }}
                                />
                              </td>

                              <td className="py-3">
                                <div
                                  className="fw-bold"
                                  style={{
                                    color: "#00c853",
                                  }}
                                >
                                  {car.brand} {car.model}
                                </div>

                                <small
                                  style={{
                                    color: "#ffffff",
                                    opacity: 0.85,
                                  }}
                                >
                                  {car.year} • {car.fuel}
                                </small>
                              </td>

                              <td className="py-3">
                                <Badge
                                  style={{
                                    background: "#000",
                                    color: "#ffffff",
                                    border: "1px solid rgba(0,200,83,0.40)",
                                  }}
                                >
                                  {car.category}
                                </Badge>
                              </td>

                              <td
                                className="py-3 fw-semibold"
                                style={{
                                  color: "#00c853",
                                }}
                              >
                                {car.hp} CV
                              </td>

                              <td className="py-3">
                                <Badge
                                  style={{
                                    border: "1px solid #00c853",
                                    color: "#00c853",
                                  }}
                                >
                                  {car.status}
                                </Badge>
                              </td>

                              <td className="py-3 text-end px-4">
                                <div className="d-flex justify-content-end gap-2">
                                  <Button
                                    variant="dark"
                                    size="sm"
                                    onClick={() => handleOpenEditModal(car)}
                                    title="Modifica"
                                    style={{
                                      color: "#00c853",
                                      border: "1px solid rgba(0,200,83,0.50)",
                                    }}
                                  >
                                    <Edit size={16} />
                                  </Button>

                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteCar(car.id)}
                                    title="Elimina"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Container>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* VETRINA*/}
            <Route
              path="/"
              element={
                <div>
                  {/*  HERO */}
                  <div
                    style={{
                      height: "33em",
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                      background: "#000",
                    }}
                    className={
                      isFirstLoad ? "w-100 page-load-item page-load-1" : "w-100"
                    }
                  >
                    <Carousel
                      fade
                      interval={4000}
                      pause={false}
                      controls={false}
                      indicators={false}
                      className="w-100"
                    >
                      {/* Slide 1 */}
                      <Carousel.Item className="w-100">
                        <div
                          style={{
                            height: "530px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            className="d-block w-100 h-100"
                            src="https://media.gqitalia.it/photos/629125f50108b03dbd34fcfe/4:3/w_1420,h_1065,c_limit/bmw_m4_csl_84.JPG"
                            alt="Audi RS Sport"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                              filter: "brightness(0.52) contrast(1.08)",
                            }}
                          />
                        </div>
                      </Carousel.Item>

                      {/* Slide 2 */}
                      <Carousel.Item className="w-100">
                        <div
                          style={{
                            height: "530px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            className="d-block w-100 h-100"
                            src="https://cdn.motor1.com/images/mgl/7g6A1/s1/bmw-m2-coupe-edition-black-shadow.webp"
                            alt="BMW M2 Competition"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                              filter: "brightness(0.52) contrast(1.08)",
                            }}
                          />
                        </div>
                      </Carousel.Item>

                      {/* Slide 3 */}
                      <Carousel.Item className="w-100">
                        <div
                          style={{
                            height: "530px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            className="d-block w-100 h-100"
                            src="https://cdnwp.dealerk.com/27fd7ecf/uploads/sites/3/2026/05/26c0129_001-scaled.jpg"
                            alt="Mercedes-AMG GT"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                              filter: "brightness(0.52) contrast(1.08)",
                            }}
                          />
                        </div>
                      </Carousel.Item>

                      {/* Slide 4 */}
                      <Carousel.Item className="w-100">
                        <div
                          style={{
                            height: "530px",
                            width: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            className="d-block w-100 h-100"
                            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1920&q=80"
                            alt="Porsche Track Edition"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                              filter: "brightness(0.52) contrast(1.08)",
                            }}
                          />
                        </div>
                      </Carousel.Item>
                    </Carousel>

                    {/* OVERLAY NERO */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.30) 100%)",
                        zIndex: 2,
                        pointerEvents: "none",
                      }}
                    />
                    {/* CONTENUTO HERO */}
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 4,
                        left: "7%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        maxWidth: "650px",
                      }}
                    >
                      <div
                        className="text-uppercase fw-semibold mb-3"
                        style={{
                          color: "#00c853",
                          letterSpacing: "5px",
                          fontSize: "0.8rem",
                          textShadow: "0 0 12px rgba(0,200,83,0.35)",
                        }}
                      ></div>

                      <h1
                        className="text-white fw-bold mb-4"
                        style={{
                          fontSize: "clamp(2.5rem, 5vw, 4.8rem)",
                          lineHeight: "0.95",
                          letterSpacing: "2px",
                          textShadow: "0 8px 25px rgba(0,0,0,0.8)",
                        }}
                      >
                        La passione
                        <br />
                        <span style={{ color: "#00c853" }}>prende forma.</span>
                      </h1>

                      <div
                        style={{
                          width: "75px",
                          height: "4px",
                          background: "#00c853",
                          marginBottom: "25px",
                          boxShadow: "0 0 15px rgba(0,200,83,0.60)",
                        }}
                      />

                      <p
                        className="mb-0 special-p"
                        style={{
                          fontSize: "1rem",
                          maxWidth: "500px",
                          lineHeight: "1.7",
                        }}
                      >
                        Scopri la nostra selezione di automobili esclusive,
                        sportive e ad alte prestazioni. Un'esperienza pensata
                        per chi vive la passione per le quattro ruote.
                      </p>
                    </div>
                  </div>
                  {/* LINEA DIVISORIA 2 */}
                  <div
                    className={isFirstLoad ? "page-load-item page-load-2" : ""}
                    style={{
                      height: "2px",
                      marginBottom: "4em",
                      background:
                        "linear-gradient(90deg, transparent, #00c853ee, transparent)",
                      opacity: "0.50",
                      margin: "0 0 2.5em",
                    }}
                  />
                  {/*GRIGLIA VETRINA CARD */}
                  <Container className="pb-5 mb-3">
                    {cars.length === 0 ? (
                      <Alert
                        variant="dark"
                        className="text-center py-5"
                        style={{
                          background: "#000",
                          border: "1px solid rgba(0,200,83,0.25)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.45)",
                        }}
                      >
                        <Info
                          size={40}
                          className="mb-3"
                          style={{
                            color: "#00c853",
                          }}
                        />

                        <h4 className="text-white fw-bold">
                          Nessuna vettura trovata
                        </h4>

                        <p
                          className="mb-0"
                          style={{
                            color: "#ffffff",
                            opacity: 0.9,
                          }}
                        >
                          Prova a modificare i termini di ricerca o i filtri
                          selezionati.
                        </p>
                      </Alert>
                    ) : (
                      <Row className="g-4">
                        {cars.map((car) => (
                          <Col
                            key={car.id}
                            xs={12}
                            md={12}
                            lg={6}
                            xl={4}
                            className={isFirstLoad ? "page-load-item" : ""}
                            style={{
                              animationDelay: `${0.45 + cars.indexOf(car) * 0.15}s`,
                            }}
                          >
                            <Card
                              className="h-100 overflow-hidden"
                              style={{
                                animationDelay: `${0.45 + cars.indexOf(car) * 0.15}s`,
                                background:
                                  "linear-gradient(145deg, #090909, #000000)",
                                border: "1px solid rgba(0,200,83,0.22)",
                                borderRadius: "4px",
                                boxShadow: "0 15px 40px rgba(0,0,0,0.55)",
                                transition:
                                  "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-8px)";
                                e.currentTarget.style.borderColor =
                                  "rgba(0,200,83,0.65)";
                                e.currentTarget.style.boxShadow =
                                  "0 20px 45px rgba(0,0,0,0.75), 0 0 25px rgba(0,200,83,0.12)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.borderColor =
                                  "rgba(0,200,83,0.22)";
                                e.currentTarget.style.boxShadow =
                                  "0 15px 40px rgba(0,0,0,0.55)";
                              }}
                            >
                              {/* IMMAGINE CARD */}
                              <div
                                className="position-relative"
                                style={{
                                  height: "330px",
                                  overflow: "hidden",
                                }}
                              >
                                <Card.Img
                                  variant="top"
                                  src={
                                    car.image ||
                                    "https://via.placeholder.com/600x400?text=No+Image"
                                  }
                                  alt={`${car.brand} ${car.model}`}
                                  className="w-100 h-100 object-fit-cover"
                                  onClick={() => handleOpenDetails(car)}
                                  style={{
                                    cursor: "pointer",
                                    transition:
                                      "transform 0.5s ease, filter 0.5s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1.06)";
                                    e.currentTarget.style.filter =
                                      "brightness(1.08)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1)";
                                    e.currentTarget.style.filter =
                                      "brightness(1)";
                                  }}
                                />

                                {/* GRADIENT IMMAGINE */}
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                      "linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.85) 100%)",
                                    pointerEvents: "none",
                                  }}
                                />

                                {/* STATUS */}
                                <div className="position-absolute top-0 end-0 m-2">
                                  <Badge
                                    className="fw-bold p-2 text-uppercase shadow"
                                    style={{
                                      backgroundColor: "#00c853",
                                      color: "#000000",
                                      border: "1px solid #00c853",
                                      boxShadow: "0 0 15px rgba(0,200,83,0.30)",
                                    }}
                                  >
                                    {car.status}
                                  </Badge>
                                </div>

                                {/* CATEGORIA */}
                                <div className="position-absolute bottom-0 start-0 m-2">
                                  <Badge
                                    className="p-1 small pills-small"
                                    style={{
                                      color: "#ffffff",
                                      border:
                                        "1px solid rgba(255,255,255,0.25)",
                                    }}
                                  >
                                    {car.category}
                                  </Badge>
                                </div>
                              </div>

                              <Card.Body className="d-flex flex-column p-3">
                                <div
                                  className="d-flex align-items-start justify-content-between"
                                  style={{ height: "110px" }}
                                >
                                  <div>
                                    <span
                                      className="text-uppercase small fw-bold"
                                      style={{
                                        color: "#00c853",
                                        letterSpacing: "2px",
                                      }}
                                    >
                                      {car.brand}
                                    </span>

                                    <Card.Title
                                      className="fw-bold fs-3 m-0"
                                      style={{
                                        color: "#ffffff",
                                      }}
                                    >
                                      {car.model}
                                    </Card.Title>
                                  </div>

                                  <h4
                                    className="m-0 fs-5"
                                    style={{
                                      color: "#ffffff",
                                    }}
                                  >
                                    {car.price} €
                                  </h4>
                                </div>

                                {/* SPECIFICHE RAPIDE */}
                                <div
                                  className="bg-black p-2 py-3 rounded mb-4 mt-auto"
                                  style={{
                                    border: "1px solid rgba(0,200,83,0.18)",
                                  }}
                                >
                                  <Row className="text-center g-2 align-items-stretch">
                                    <Col
                                      xs={4}
                                      className="d-flex flex-column justify-content-between"
                                    >
                                      <div
                                        className="small d-flex align-items-center justify-content-center gap-1"
                                        style={{
                                          color: "#ffffff",
                                        }}
                                      >
                                        <Zap
                                          size={14}
                                          style={{
                                            color: "#00c853",
                                          }}
                                        />
                                        CV
                                      </div>

                                      <span
                                        className="fw-bold mt-2"
                                        style={{
                                          color: "#ffffff",
                                        }}
                                      >
                                        {car.hp}
                                      </span>
                                    </Col>

                                    <Col
                                      xs={4}
                                      className="d-flex flex-column justify-content-between"
                                    >
                                      <div
                                        className="small d-flex align-items-center justify-content-center gap-1"
                                        style={{
                                          color: "#ffffff",
                                        }}
                                      >
                                        <Gauge
                                          size={14}
                                          style={{
                                            color: "#00c853",
                                          }}
                                        />
                                        Alimentazione
                                      </div>

                                      <span
                                        className="fw-bold small text-nowrap mt-2"
                                        style={{
                                          color: "#ffffff",
                                        }}
                                      >
                                        {car.fuel}
                                      </span>
                                    </Col>

                                    <Col
                                      xs={4}
                                      className="d-flex flex-column justify-content-between"
                                    >
                                      <div
                                        className="small d-flex align-items-center justify-content-center gap-1"
                                        style={{
                                          color: "#ffffff",
                                        }}
                                      >
                                        <Calendar
                                          size={14}
                                          style={{
                                            color: "#00c853",
                                          }}
                                        />
                                        Anno
                                      </div>

                                      <span
                                        className="fw-bold mt-2"
                                        style={{
                                          color: "#ffffff",
                                        }}
                                      >
                                        {car.year}
                                      </span>
                                    </Col>
                                  </Row>
                                </div>
                                {/* BOTTONE DETTAGLI */}
                                <Button
                                  variant="dark"
                                  className="w-100 fw-semibold text-uppercase py-2 bg-black mt-auto"
                                  onClick={() => handleOpenDetails(car)}
                                  style={{
                                    border: "1px solid #00c853",
                                    color: "#000",
                                    borderRadius: "3px",
                                    letterSpacing: "0.5px",
                                    transition: "all 0.25s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "#ffffff";
                                    e.currentTarget.style.borderColor =
                                      "#ffffff";
                                    e.currentTarget.style.color = "#000";
                                    e.currentTarget.style.boxShadow =
                                      "0 0 20px rgba(0,200,83,0.35)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "#00c853";
                                    e.currentTarget.style.borderColor =
                                      "#00c853";
                                    e.currentTarget.style.color = "#000";
                                    e.currentTarget.style.boxShadow = "none";
                                  }}
                                >
                                  Scopri Dettagli & Foto
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Container>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
      {/* FOOTER */}
      <footer
        style={{
          background: "linear-gradient(180deg, #050505 0%, #000000 100%)",
          borderTop: "1px solid rgba(0, 200, 83, 0.26)",
          boxShadow: "0 -10px 35px rgba(0,0,0,0.45)",
        }}
      >
        <Container className="py-5">
          <Row className="g-4">
            {/* BRAND */}
            <Col xs={12} md={5}>
              <div className="mb-3">
                <h4
                  className="fw-bold text-uppercase m-0"
                  style={{
                    color: "#00c853",
                    letterSpacing: "1.2rem",
                    textShadow: "0 0 12px rgba(0,200,83,0.35)",
                  }}
                >
                  PieroCar
                </h4>
              </div>
              <p
                className="mb-0 text-white"
                style={{
                  maxWidth: "500px",
                  lineHeight: "1.7",
                }}
              >
                Passione, prestazioni ed esclusività. Scopri la nostra selezione
                di automobili e lasciati guidare alla ricerca della vettura
                perfetta.
              </p>
            </Col>

            {/* NAVIGAZIONE */}
            <Col xs={12} sm={6} md={3}>
              <h6
                className="fw-bold text-uppercase mb-3"
                style={{
                  color: "#00c853",
                  letterSpacing: "1.5px",
                }}
              >
                Navigazione
              </h6>

              <div className="d-flex flex-column gap-2">
                <Link
                  to="/"
                  className="text-decoration-none footer-link text-white"
                >
                  Vetrina
                </Link>

                <Link
                  to="/contatti"
                  className="text-decoration-none footer-link text-white"
                >
                  Contatti
                </Link>
                <Link
                  to="/servizi"
                  className="text-decoration-none footer-link text-white"
                >
                  Servizi
                </Link>
              </div>
            </Col>

            {/* CONTATTI */}
            <Col xs={12} sm={6} md={4}>
              <h6
                className="fw-bold text-uppercase mb-3"
                style={{
                  color: "#00c853",
                  letterSpacing: "1.5px",
                }}
              >
                Contatti
              </h6>

              <div
                style={{
                  color: "#bdbdbd",
                  lineHeight: "1.9",
                }}
              >
                <div style={{ color: "#00c853" }}>
                  <strong>Sede:</strong>
                  <span className="text-white">
                    Via Val Demone 65A, 91026 Mazara del Vallo (TP)
                  </span>
                </div>

                <div style={{ color: "#00c853" }}>
                  <strong>Telefono:</strong>
                  <span className="text-white">+39 340.35.43.806</span>
                </div>
                <div style={{ color: "#00c853" }}>
                  <strong>Email:</strong>
                  <span className="text-white">pierocar25@libero.it</span>
                </div>

                <div style={{ color: "#00c853" }}>
                  <strong>Orari:</strong>
                  <span className="text-white">Lun–Sab · 09:00–20:00</span>
                </div>
              </div>
            </Col>
          </Row>
          {/* LINEA DIVISORIA */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #00c853c3, transparent)",
              opacity: "0.50",
              margin: "3em 0 2.5em",
            }}
          />
          {/* PARTE INFERIORE */}
          <Row className="align-items-center g-3">
            <Col xs={12} md={7}>
              <div
                className="small"
                style={{ color: "#00c853", lineHeight: "1.7" }}
              >
                © {new Date().getFullYear()} PieroCar Showroom. Tutti i diritti
                riservati. <br />
                <span style={{ color: "#777777", fontSize: "0.55rem" }}>
                  Sito web realizzato da
                  <a
                    href="https://wa.me/393456101086?text=Ciao%20Saverio%2C%20ho%20visto%20il%20sito%20PieroCar%20e%20vorrei%20avere%20maggiori%20informazioni."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#00c853",
                      textDecoration: "none",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow =
                        "0 0 8px rgba(0, 200, 83, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = "none";
                    }}
                  >
                    -Saverio
                  </a>
                  -Web Developer
                </span>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div className="d-flex small justify-content-md-end gap-3 flex-wrap">
                <Link to="#" className="text-decoration-none footer-legal-link">
                  Privacy Policy
                </Link>

                <Link to="#" className="text-decoration-none footer-legal-link">
                  Cookie Policy
                </Link>

                <Link to="#" className="text-decoration-none footer-legal-link">
                  Note legali
                </Link>
                <span
                  className="footer-legal-link"
                  onClick={handleNavClick}
                  style={{
                    cursor: "pointer",
                    opacity: 0.4,
                  }}
                >
                  Area riservata
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* MODALE LOGIN ADMIN */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
        contentClassName="bg-dark text-light border border-secondary"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-secondary"
        >
          <Modal.Title
            style={{ color: "#00c853c3" }}
            className="text-uppercase fw-bold fs-5 d-flex align-items-center gap-2"
          >
            <Lock size={18} />
            Accesso Riservato Admin
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleLoginSubmit}>
          <Modal.Body className="p-4">
            {loginError && (
              <Alert variant="danger" className="py-2 mb-3">
                Password errata.
              </Alert>
            )}

            <p className="text-white small mb-3">
              Inserisci la password di amministrazione per sbloccare il pannello
              di gestione contenuti.
            </p>

            <Form.Group>
              <Form.Label className="text-secondary small text-uppercase fw-semibold">
                Password
              </Form.Label>

              <Form.Control
                type="password"
                placeholder="Inserisci password..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);

                  if (e.target.value.length > 0) {
                    clearTimeout(window.autoLoginTimer);

                    window.autoLoginTimer = setTimeout(function () {
                      handleAutoLogin(e.target.value);
                    }, 300);
                  }
                }}
                className="bg-black text-light border-secondary"
                autoFocus
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="border-secondary ">
            <Button
              className="text-black"
              style={{
                backgroundColor: "#00c853c3",
                border: "0px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(0,200,83,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => setShowLoginModal(false)}
            >
              Annulla
            </Button>

            <Button
              style={{
                backgroundColor: "#00c853c3",
                border: "0px",
                transition: "all 0.3s ease",
              }}
              type="submit"
              className="text-uppercase fw-semibold px-4 text-black"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(0,200,83,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Accedi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* MODALE DETTAGLI AUTO */}
      {selectedCar && (
        <Modal
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}
          size="lg"
          centered
          contentClassName="bg-black text-light border-0"
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title
              style={{ color: "#00c853" }}
              className="fw-bold text-uppercase"
            >
              {selectedCar.brand} {selectedCar.model}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">
            <div
              className="mb-3 rounded overflow-hidden "
              style={{ height: "360px" }}
            >
              <img
                src={activeGalleryImage}
                alt="Vista principale"
                className="w-100 h-100 object-fit-cover"
                onClick={() => {
                  const images = [
                    selectedCar.image,
                    ...selectedCar.gallery,
                  ].filter(function (img) {
                    return img;
                  });

                  const index = images.indexOf(activeGalleryImage);

                  setFullscreenGallery(images);
                  setFullscreenIndex(index);
                  setFullscreenImage(activeGalleryImage);
                  setShowImageModal(true);
                }}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>

            {selectedCar.gallery &&
              selectedCar.gallery.some((imgUrl) => imgUrl) && (
                <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
                  {/* MINIATURA IMMAGINE PRINCIPALE */}
                  {selectedCar.image && (
                    <div
                      onClick={() => setActiveGalleryImage(selectedCar.image)}
                      className={`border rounded overflow-hidden ${
                        activeGalleryImage === selectedCar.image
                          ? "border-warning border-2"
                          : "border-secondary opacity-50"
                      }`}
                      style={{
                        width: "80px",
                        height: "50px",
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={selectedCar.image}
                        alt="thumb"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  )}

                  {/* MINIATURE GALLERIA */}
                  {selectedCar.gallery.map((imgUrl, i) =>
                    imgUrl ? (
                      <div
                        key={i}
                        onClick={() => setActiveGalleryImage(imgUrl)}
                        className={`border rounded overflow-hidden ${
                          activeGalleryImage === imgUrl
                            ? "border-warning border-2"
                            : "border-secondary opacity-50"
                        }`}
                        style={{
                          width: "80px",
                          height: "50px",
                          flexShrink: 0,
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt={`thumb-${i}`}
                          className="w-100 h-100 object-fit-cover"
                        />
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            <h5 className="text-uppercase fw-bold text-succes mb-2">
              Panoramica
            </h5>
            <div className="text-white mb-4">
              {formatDescription(selectedCar.description).map(
                function (paragraph, index) {
                  var isUppercase =
                    paragraph === paragraph.toUpperCase() &&
                    paragraph !== paragraph.toLowerCase();

                  return (
                    <div
                      key={index}
                      style={{
                        fontSize: isUppercase ? "0.95rem" : "0.7rem",
                        lineHeight: "2.1",
                        marginBottom: "1.2rem",
                        whiteSpace: "pre-line",
                        textTransform: "none",
                        fontWeight: isUppercase ? "bold" : "normal",
                      }}
                    >
                      {paragraph}
                    </div>
                  );
                },
              )}
            </div>
          </Modal.Body>

          <Modal.Footer className="border-0">
            <Button
              variant="dark"
              className="w-100 fw-semibold text-uppercase py-2 bg-black"
              onClick={() => setShowDetailModal(false)}
              style={{
                border: "1px solid #00c853",
                color: "#000",
                borderRadius: "3px",
                letterSpacing: "0.5px",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "#ffffff";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(0,200,83,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#00c853";
                e.currentTarget.style.borderColor = "#00c853";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* MODALE FOTO A SCHERMO INTERO */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        fullscreen
        centered
        contentClassName="bg-black border-0"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-0 position-absolute top-0 end-0 w-100"
          style={{ zIndex: 10 }}
        />
        <Modal.Body className="p-0 d-flex justify-content-center align-items-center bg-black position-relative">
          {fullscreenImage && (
            <>
              {fullscreenGallery.length > 1 && (
                <button
                  type="button"
                  onClick={() => goToFullscreenImage(-1)}
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "50px",
                    opacity: "0.35",
                    cursor: "pointer",
                    zIndex: 5,
                  }}
                >
                  ‹
                </button>
              )}

              <img
                src={fullscreenImage}
                alt="Immagine ingrandita"
                className="img-fluid"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100vh",
                  objectFit: "contain",
                }}
              />

              {fullscreenGallery.length > 1 && (
                <button
                  type="button"
                  onClick={() => goToFullscreenImage(1)}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "50px",
                    opacity: "0.35",
                    cursor: "pointer",
                    zIndex: 5,
                  }}
                >
                  ›
                </button>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
      {/* MODALE ADMIN: AGGIUNGI / MODIFICA AUTO */}
      <Modal
        show={showAdminModal}
        onHide={() => setShowAdminModal(false)}
        size="lg"
        centered
        contentClassName="bg-dark text-light border border-secondary"
      >
        <Modal.Header closeButton closeVariant="white" className="border-0">
          <Modal.Title className="fw-bold text-uppercase text-warning">
            {isEditing
              ? "Modifica Vettura"
              : "Aggiungi Nuova Vettura in Vetrina"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSaveCar}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              {/* MARCA */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    Marca
                  </Form.Label>

                  <Form.Control
                    type="text"
                    required
                    placeholder="Es. BMW, Audi..."
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: e.target.value,
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
              </Col>
              {/* MODELLO */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    Modello
                  </Form.Label>

                  <Form.Control
                    type="text"
                    required
                    placeholder="Es. M3, X2"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        model: e.target.value,
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
              </Col>
              {/* ANNO */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    Anno
                  </Form.Label>

                  <Form.Control
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value) || 2026,
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
              </Col>
              {/* CATEGORIA */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    Categoria
                  </Form.Label>

                  <Form.Control
                    type="text"
                    required
                    placeholder="Es. Citycar"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
              </Col>
              {/* ALIMENTAZIONE */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    Alimentazione
                  </Form.Label>

                  <Form.Control
                    type="text"
                    required
                    placeholder="Es. Benzina"
                    value={formData.fuel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fuel: e.target.value,
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
              </Col>
              {/* PREZZO */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    Potenza (CV)
                  </Form.Label>

                  <Form.Control
                    type="number"
                    required
                    placeholder="Es. 525"
                    value={formData.hp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hp: parseInt(e.target.value) || "",
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold mt-3">
                    Prezzo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Es. 10000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
              </Col>
              {/* STATO */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    Stato Vettura
                  </Form.Label>

                  <Form.Control
                    type="text"
                    required
                    placeholder="Es. In Esposizione"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className="bg-black text-light border-secondary"
                  />
                </Form.Group>
              </Col>
              {/* IMMAGINE PRINCIPALE */}
              <Col md={12}>
                <div className="bg-black border border-secondary rounded p-3 ">
                  <Form.Label className="text-warning small text-uppercase fw-bold">
                    Immagine Principale
                  </Form.Label>
                  <Form.Text className=" d-block mb-3 text-light">
                    Carica un'immagine.
                  </Form.Text>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="url"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={handleMainImageChange}
                      className="bg-dark text-light border-secondary"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-light small">
                      Carica dal PC
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleImageUpload(e, "image")}
                      className="bg-dark text-light border-secondary"
                    />
                  </Form.Group>
                  {formData.image && (
                    <div className="mt-3">
                      <small className="text-light d-block mb-2">
                        Anteprima:
                      </small>
                      <img
                        src={formData.image}
                        alt="Anteprima principale"
                        className="rounded border border-secondary"
                        style={{
                          width: "180px",
                          height: "110px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>
              </Col>
              {/* GALLERIA */}
              <Col md={12}>
                <div className="bg-black border border-secondary rounded p-3">
                  <Form.Label className="text-warning small text-uppercase fw-bold">
                    Galleria Immagini
                  </Form.Label>
                  <Form.Text className="d-block mb-3 text-light">
                    Carica un'immagine dal PC.
                  </Form.Text>
                  {formData.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="border border-secondary rounded p-3 mb-3"
                    >
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-light fw-semibold">
                          Immagine {index + 1}
                        </span>
                        <div className="d-flex align-items-center gap-2">
                          {image && (
                            <>
                              <Badge bg="success" className="text-uppercase">
                                Caricata
                              </Badge>
                              <Button
                                type="button"
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteGalleryImage(index)}
                                title={`Elimina immagine ${index + 1}`}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      {/* FILE */}
                      <Form.Group>
                        <Form.Label className="text-light small">
                          Carica dal PC
                        </Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) =>
                            handleImageUpload(e, "gallery", index)
                          }
                          className="bg-dark text-light border-secondary"
                        />
                      </Form.Group>
                      {/* ANTEPRIMA */}
                      {image && (
                        <div className="mt-3">
                          <small className="text-light d-block mb-2">
                            Anteprima:
                          </small>
                          <img
                            src={image}
                            alt={`Anteprima ${index + 1}`}
                            className="rounded border border-secondary"
                            style={{
                              width: "140px",
                              height: "85px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Col>
              {/* DESCRIZIONE */}
              <Col md={12}>
                <Form.Group>
                  {" "}
                  <Form.Label className="text-secondary small text-uppercase fw-semibold">
                    {" "}
                    Descrizione{" "}
                  </Form.Label>{" "}
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Descrivi la vettura..."
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = e.clipboardData.getData("text/plain");
                      setFormData({ ...formData, description: text });
                    }}
                    className="bg-black text-light border-secondary"
                    style={{
                      resize: "vertical",
                      lineHeight: "1.7",
                      whiteSpace: "pre-wrap",
                    }}
                  />{" "}
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="border-secondary">
            <Button
              variant="warning"
              className="text-uppercase fw-semibold px-4"
              style={{ backgroundColor: "#00c853c3", border: "0px" }}
              onClick={() => setShowAdminModal(false)}
            >
              Annulla
            </Button>

            <Button
              type="submit"
              variant="warning"
              className="text-uppercase fw-semibold px-4"
            >
              Salva Vettura
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
