CREATE TABLE consultations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  date DATE NOT NULL,
  commentaire TEXT,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);
