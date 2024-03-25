import React, { useState, useEffect } from 'react';
import './CustomAlert.css'; 

function CustomAlert({ message, visible, onClose, type }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const alertClass = `custom-alert ${type === 'success' ? 'success' : 'failure'}`;

  return (
    visible && (
      <div className={alertClass}>
        {message}
      </div>
    )
  );
}

export default CustomAlert;
