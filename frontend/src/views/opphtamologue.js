<>
  <h1>Informations du patient</h1>
  {/* Patient information inputs */}
  <p>Nom : <input type="text" required /></p>
  <p>Prénom : <input type="text" required /></p>
  <p>Date de naissance : <input type="date" required /></p>
  <p>Sexe :
    <label><input type="radio" name="sexe" value="homme" required /> Homme</label>
    <label><input type="radio" name="sexe" value="femme" required /> Femme</label>
  </p>

  <h2>Questions ophtalmologiques</h2>

  {/* Questions about ophthalmic issues */}
  <p>Avez-vous des problèmes de vision de près ou de loin ?</p>
  <label><input type="radio" name="visionPres" value="oui" required /> Oui</label>
  <label><input type="radio" name="visionPres" value="non" required /> Non</label>

  <p>Avez-vous des douleurs oculaires ?</p>
  <label><input type="radio" name="douleursOculaires" value="oui" required /> Oui</label>
  <label><input type="radio" name="douleursOculaires" value="non" required /> Non</label>

  <p>Avez-vous des difficultés à voir la nuit ?</p>
  <label><input type="radio" name="difficultesVisionNuit" value="oui" required /> Oui</label>
  <label><input type="radio" name="difficultesVisionNuit" value="non" required /> Non</label>

  <p>Avez-vous des antécédents familiaux de maladies oculaires ?</p>
  <label><input type="radio" name="antecedentsFamiliaux" value="oui" required /> Oui</label>
  <label><input type="radio" name="antecedentsFamiliaux" value="non" required /> Non</label>

  <p>Avez-vous des antécédents de traumatisme oculaire ?</p>
  <label><input type="radio" name="antecedentsTraumatisme" value="oui" required /> Oui</label>
  <label><input type="radio" name="antecedentsTraumatisme" value="non" required /> Non</label>

  <p>Avez-vous des problèmes de vision des couleurs ?</p>
  <label><input type="radio" name="visionCouleurs" value="oui" required /> Oui</label>
  <label><input type="radio" name="visionCouleurs" value="non" required /> Non</label>

  <p>Avez-vous des antécédents de glaucome ou de cataracte ?</p>
  <label><input type="radio" name="antecedentsGlaucomeCataracte" value="oui" required /> Oui</label>
  <label><input type="radio" name="antecedentsGlaucomeCataracte" value="non" required /> Non</label>

  <p>Avez-vous des antécédents de sécheresse oculaire ?</p>
  <label><input type="radio" name="antecedentsSecheresseOculaire" value="oui" required /> Oui</label>
  <label><input type="radio" name="antecedentsSecheresseOculaire" value="non" required /> Non</label>

  <p>Avez-vous des problèmes de vision floue ?</p>
  <label><input type="radio" name="visionFloue" value="oui" required /> Oui</label>
  <label><input type="radio" name="visionFloue" value="non" required /> Non</label>

  <p>Avez-vous des antécédents de chirurgie oculaire ?</p>
  <label><input type="radio" name="antecedentsChirurgieOculaire" value="oui" required /> Oui</label>
  <label><input type="radio" name="antecedentsChirurgieOculaire" value="non" required /> Non</label>
  <button>Valider</button>
  {/* Button to submit the form */}
  <button>Valider</button>
  <Link to="/resultats">
   
  </Link>

  <Footer />
</>