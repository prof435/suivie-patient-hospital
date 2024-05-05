import React, { useEffect } from 'react';
import cron from 'node-cron';

const AlertsAndReminders = () => {
  useEffect(() => {
    // Planifier un rappel quotidien à 10h00
    cron.schedule('0 10 * * *', () => {
      // Envoyer une alerte ou un rappel
      console.log('Rappel quotidien !');
    });
  }, []);

  return (
    <div>
      {/* Votre interface utilisateur pour les alertes et les rappels */}
    </div>
  );
};

export default AlertsAndReminders;