import React from "react";
import Header, { NavBAr, TopNav } from "../partials/header";
import Footer from "../partials/footer";

const MedHome  = ()=>{
    return(
        <>
        <TopNav/>
        <NavBAr />
            La liste des patients reclamant actullement votre service:


            <div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nom</th>
                    <th scope="col">problème</th>
                    <th scope="col">Date Arrive</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Il y a 3 min</td>
                    <td><span className="btn text-primary">Accepter</span></td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Il y a 5 min</td>
                    <td><span className="btn text-primary">Accepter</span></td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>Il y a 47 min</td>
                    <td><span className="btn text-primary">Accepter</span></td>
                    </tr>
                </tbody>
                </table>


            </div>
        <Footer />
        </>
    );
};

export default MedHome;


