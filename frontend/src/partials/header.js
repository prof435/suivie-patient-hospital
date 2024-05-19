import React, { useEffect, useState } from "react";  
import axios from 'axios';


const TopNav = ()=>{
    
    return (
        <div class="container-fluid bg-light p-0 wow fadeIn" data-wow-delay="0.1s">
        <div class="row gx-0 d-none d-lg-flex">
            <div class="col-lg-7 px-5 text-start">
                <div class="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small class="fa fa-map-marker-alt text-primary me-2"></small>
                    <small>123 Street,yaounde , cameroun</small>
                </div>
                <div class="h-100 d-inline-flex align-items-center py-3">
                    <small class="far fa-clock text-primary me-2"></small>
                    <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                </div>
            </div>
            <div class="col-lg-5 px-5 text-end">
                <div class="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small class="fa fa-phone-alt text-primary me-2"></small>
                    <small>+237 658 90 33 73</small>
                </div>
                <div class="h-100 d-inline-flex align-items-center">
                    <a class="btn btn-sm-square rounded-circle bg-white text-primary me-1" href=""><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-sm-square rounded-circle bg-white text-primary me-1" href=""><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-sm-square rounded-circle bg-white text-primary me-1" href=""><i class="fab fa-linkedin-in"></i></a>
                    <a class="btn btn-sm-square rounded-circle bg-white text-primary me-0" href=""><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>
    );
};

const NavBAr = ()=>{
    const [loaded, setLoaded] = useState(false)
    const [user, setUser] = useState(null);
    
    const getUser = async()=>{
        setUser(null);
        const authToken = localStorage.getItem('authToken');
        await axios.get("http://localhost:5000/user", {
            headers: {
                'Authorization': `Bearer ${authToken}`
              
            }
        }).then((res)=>{
            if(res.status === 200){
                setUser(res.data);
            }
            else{
                alert("Une erreur s'est produite !!");
            }
        })
    };
    useEffect(()=>{
        if (!loaded){
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                getUser()
                setLoaded(true);
            } else {
                window.location.href = '/login';
            }
        }
    })
    return(
        <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
                <a href="index.html" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <h1 class="m-0 text-primary"><i class="far fa-hospital me-3"></i>dimisante</h1>
                </a>
                <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto p-4 p-lg-0">
                        <a href="/Acceuil" class="nav-item nav-link"> Accueil</a>
                        <a href="/consultation" class="nav-item nav-link">Consultation{user?.role === "Patient" ? "" : "s"}</a>
                        <a href="/rendezvous" class="nav-item nav-link">rendezvous</a>
                        <a href="/Docteur" class="nav-item nav-link"> Docteur</a>
                        <a href="/Actualite" class="nav-item nav-link"> Actualite</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">langue</a>
                            <div class="dropdown-menu rounded-0 rounded-bottom m-0">
                                <a href="feature.html" class="dropdown-item">Francais</a>
                                <a href="team.html" class="dropdown-item"> english</a>
                                <a href="appointment.html" class="dropdown-item">spanish</a>
                                <a href="testimonial.html" class="dropdown-item">Deutsch</a>             
                            </div>
                        </div>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user?.nom + user?.prenom}</a>
                            <div class="dropdown-menu rounded-0 rounded-bottom m-0">
                                <a href="#" class="dropdown-item">Profile</a>
                                <a href="#" onClick={()=>{localStorage.removeItem("authToken"); window.location.href='/'}} class="dropdown-item">Déconnexion</a>
                                           
                            </div>
                        </div>
                    </div>
                    <a href="/" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">retour<i class="fa fa-arrow-right ms-3"></i></a>
                </div>
            </nav>
    );
};
const BonttonNav = ()=>{
    
    return(
        <div class="container-fluid header bg-primary p-0 mb-5">
                <div class="row g-0 align-items-center flex-column-reverse flex-lg-row">
                    <div class="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
                        <h1 class="display-4 text-white mb-5">Good Health Is The Root Of All Heppiness take an appointment  </h1>
                        <div class="row g-4">
                            <div class="col-sm-4">
                                <div class="border-start border-light ps-4">
                                    <h2 class="text-white mb-1" data-toggle="counter-up">123</h2>
                                   {/* <!--<p class="text-light mb-0">Expert Doctors</p>-->*/}
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="border-start border-light ps-4">
                                    <h2 class="text-white mb-1" data-toggle="counter-up">1234</h2>
                                    <p class="text-light mb-0">Medical Stuff</p>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="border-start border-light ps-4">
                                    <h2 class="text-white mb-1" data-toggle="counter-up">12345</h2>
                                    <p class="text-light mb-0">Total Patients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <div class="owl-carousel header-carousel">
                            <div class="owl-carousel-item position-relative">
                                <img class="img-fluid" src="img/carousel-1.jpg" alt=""/>
                                <div class="owl-carousel-text">
                                    <h1 class="display-1 text-white mb-0">Cardiology</h1>
                                </div>
                            </div>
                            <div class="owl-carousel-item position-relative">
                                <img class="img-fluid" src="img/carousel-2.jpg" alt=""/>
                                <div class="owl-carousel-text">
                                    <h1 class="display-1 text-white mb-0">Neurology</h1>
                                </div>
                            </div>
                            <div class="owl-carousel-item position-relative">
                                <img class="img-fluid" src="img/carousel-3.jpg" alt="" />
                                <div class="owl-carousel-text">
                                    <h1 class="display-1 text-white mb-0">Pulmonary</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};


const Header = ()=>{
    
    return(
        <>
           
            {/*<!-- Topbar End -->*/
        <TopNav />
        
        /* <!-- Navbar Start -->*/}
            <NavBAr />
        {/* <!-- Navbar End -->*/}
        
        
        {/* <!-- Header Start -->*/}
            <BonttonNav />
        </>
    
    );
};

export { NavBAr, TopNav, BonttonNav};
export default Header;