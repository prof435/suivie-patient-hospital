import React from 'react';
import { NavBAr ,TopNav } from '../partials/header';
import Footer from '../partials/footer';

const Accueil = () => {
    return (
        <>
             <TopNav/>
            <NavBAr/>
           
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex flex-column">
                                <img className="img-fluid rounded w-75 align-self-end" src="img/departments-1.jpg" alt="" />
                                <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="img/about-2.jpg" alt="" style={{ "marginTop": "-25%"}} />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <p className="d-inline-block border rounded-pill py-1 px-4">À Propos</p>
                            <h1 className="mb-4">Pourquoi Nous Faire Confiance ? Apprenez à Nous Connaître !</h1>
                            <p>Notre engagement est de fournir des soins de santé de qualité supérieure, soutenus par une équipe de médecins qualifiés et de professionnels de la recherche médicale. Nous sommes déterminés à offrir des services qui répondent aux besoins uniques de chaque patient, en mettant l'accent sur l'excellence clinique et le confort du patient.</p>
                            <p className="mb-4">Chez nous, vous trouverez une équipe de médecins expérimentés, spécialisés dans divers domaines tels que la cardiologie, la pneumologie, la neurologie, l'orthopédie, la chirurgie dentaire, et bien d'autres encore.</p>
                            <p><i className="far fa-check-circle text-primary me-3"></i>Soins de santé de qualité</p>
                            <p><i className="far fa-check-circle text-primary me-3"></i>Médecins Qualifiés Uniquement</p>
                            <p><i className="far fa-check-circle text-primary me-3"></i>Professionnels de la Recherche Médicale</p>
                            <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">En Savoir Plus</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ "maxWidth": "600px"}}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Services</p>
                        <h1>Solutions de Soins de Santé</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ "width": "65px", "height": "65px"}}>
                                    <i className="fa fa-heartbeat text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Cardiologie</h4>
                                <p className="mb-4">Notre équipe de cardiologues expérimentés est dédiée à fournir des soins de haute qualité pour les maladies cardiaques, en mettant l'accent sur la prévention, le diagnostic et le traitement.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>En Savoir Plus</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ "width": "65px", "height": "65px"}}>
                                    <i className="fa fa-x-ray text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Pneumologie</h4>
                                <p className="mb-4">Nos pneumologues experts offrent des services de diagnostic et de traitement pour une gamme de maladies respiratoires, assurant des soins complets et personnalisés pour chaque patient.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>En Savoir Plus</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item bg-light rounded h-100 p-5">
                                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ "width": "65px", "height": "65px"}}>
                                    <i className="fa fa-brain text-primary fs-4"></i>
                                </div>
                                <h4 className="mb-3">Neurologie</h4>
                                <p className="mb-4">Notre équipe de neurologues qualifiés est spécialisée dans le diagnostic et le traitement des troubles neurologiques, fournissant des soins complets et personnalisés pour les patients atteints de maladies du système nerveux.</p>
                                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>En Savoir Plus</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
                <div className="container feature px-lg-0">
                <div className="row g-0 mx-lg-0">
                        <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
                            <div className="p-lg-5 ps-lg-0">
                                <p className="d-inline-block border rounded-pill text-light py-1 px-4">Fonctionnalités</p>
                                <h1 className="text-white mb-4">Pourquoi Nous Choisir</h1>
                                <p className="text-white mb-4 pb-2">Notre équipe s'engage à fournir des soins de santé de la plus haute qualité, soutenus par une expérience clinique éprouvée, des services de qualité supérieure et un engagement envers l'excellence médicale.</p>
                                <div className="row g-4">
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ "width": "55px", "height": "55px"}}>
                                                <i className="fa fa-user-md text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Expérience</p>
                                                <h5 className="text-white mb-0">Médecins</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ "width":" 55px", "height":" 55px"}}>
                                                <i className="fa fa-check text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Qualité</p>
                                                <h5 className="text-white mb-0">Services</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ "width": "55px", "height": "55px"}}>
                                                <i className="fa fa-comment-medical text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Consultation</p>
                                                <h5 className="text-white mb-0">Positive</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ "width": "55px", "height": "55px"}}>
                                                <i className="fa fa-headphones text-primary"></i>
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Support</p>
                                                <h5 className="text-white mb-0">24/7</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{ "minHeight": "400px"}}>
                            <div className="position-relative h-100">
                                <img className="position-absolute img-fluid w-100 h-100" src="img/feature.jpg" style={{ "objectFit": "cover"}} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ "maxWidth": "600px"}}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Médecins</p>
                        <h1>Nos Médecins Expérimentés</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src="img/team-1.jpg" alt=""/>
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Nom du Médecin</h5>
                                    <p className="text-primary">Cardiologue</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src="img/team-2.jpg" alt=""/>
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Nom du Médecin</h5>
                                    <p className="text-primary">Pneumologue</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src="img/team-3.jpg" alt=""/>
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Nom du Médecin</h5>
                                    <p className="text-primary">Neurologue</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="team-item position-relative rounded overflow-hidden">
                                <div className="overflow-hidden">
                                    <img clas    sName="img-fluid" src="img/team-4.jpg" alt=""/>
                                </div>
                                <div className="team-text bg-light text-center p-4">
                                    <h5>Nom du Médecin</h5>
                                    <p className="text-primary">Orthopédiste</p>
                                    <div className="team-social text-center">
                                        <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p className="d-inline-block border rounded-pill py-1 px-4">Rendez-vous</p>
                            <h1 className="mb-4">Prenez un Rendez-vous Pour Consulter Nos Médecins</h1>
                            <p className="mb-4">Nous comprenons l'importance de votre santé. Prenez un rendez-vous dès aujourd'hui pour une consultation personnalisée avec nos médecins experts.</p>
                            <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ "width": "55px", "height": "55px"}}>
                                    <i className="fa fa-phone-alt text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Appelez-nous maintenant</p>
                                    <h5 className="mb-0">+237 658 90 33 73 </h5>
                                </div>
                            </div>
                            <div className="bg-light rounded d-flex align-items-center p-5">
                                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ "width": "55px", "height": "55px"}}>
                                    <i className="fa fa-envelope-open text-primary"></i>
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Envoyez-nous un e-mail</p>
                                    <h5 className="mb-0">info@example.com</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ "maxWidth": "600px"}}>
                        <p className="d-inline-block border rounded-pill py-1 px-4">Témoignages</p>
                        <h1>Ce Que Disent Nos Patients !</h1>
                    </div>
                    <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light rounded
                            -circle p-2 mx-auto mb-4" src="img/testimonial-1.jpg" style={{ "width": "100px", "height": "100px"}}/>
                            <div className="testimonial-text rounded text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                                <h5 className="mb-1">Nom du Patient</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src="img/testimonial-2.jpg" style={{ "width": "100px", "height": "100px"}}/>
                            <div className="testimonial-text rounded text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                                <h5 className="mb-1">Nom du Patient</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src="img/testimonial-3.jpg" style={{ "width": "100px", "height": "100px"}}/>
                            <div className="testimonial-text rounded text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                                <h5 className="mb-1">Nom du Patient</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Accueil;



