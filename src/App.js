import React, { useState } from 'react';
import './App.css';
import logo from './Digicel.svg'; // Assuming you have a logo file

function CaptivePortal() {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleCheckboxChange = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isTermsAccepted) {
      const currentUrl = new URL(window.location.href);
      const pathSegments = currentUrl.pathname.split('/').filter(segment => segment); // Extract path segments
      const params = new URLSearchParams(currentUrl.search); // Get search parameters
      params.set('freeAccess', 'true'); // Add freeAccess parameter

      const baseUrl = `https://${params.get('post')}/cn-ctlr/guest`;
      const extractedPath = pathSegments.slice(-3, -1).join('/'); // Extract the required parts from the path
      const postUrl = `${baseUrl}/${extractedPath}/ga_login`; // Construct the URL using the extracted parts

      // Create the request body as a URL-encoded string
      const requestBody = params.toString();

      try {
        const response = await fetch(postUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
        });

        if (response.ok) {
          console.log('Form submitted successfully');
        } else {
          console.error('Form submission failed:', response.statusText);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  };

  return (
      <div className="portal-container">
        <div className="portal-header">
          <img src={logo} className="portal-logo" alt="logo" />
          <h1>Welcome to New External Captive Portal</h1>
        </div>
        <div className="portal-content">
          <p>Please fill to access the network</p>
          <form onSubmit={handleSubmit} className="portal-form">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <div className="terms-container">
              <input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={isTermsAccepted}
                  onChange={handleCheckboxChange}
                  required
              />
              <label htmlFor="termsCheckbox">
                I accept the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">terms and conditions</a>.
              </label>
            </div>
            <button type="submit" disabled={!isTermsAccepted} className="portal-button">
              Continue
            </button>
          </form>
        </div>
      </div>
  );
}

function App() {
  return (
      <div className="App">
        <CaptivePortal />
      </div>
  );
}

export default App;
