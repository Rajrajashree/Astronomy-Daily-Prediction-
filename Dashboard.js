import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaSun, FaMoon, FaRupeeSign, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import horoscopeImg from './horoscope.jfif';
import careerImg from './career.png';
import healthImg from './health.jfif';
import relationshipImg from './relationship.jfif';
import personalityImg from './personality.jpeg';
import successImg from './success.jfif';
import travelImg from './travel.jfif';
import lifeImg from './life.png';

// import axios from 'axios';

// const notifyPaymentSuccess = async (email) => {
//   try {
//     await axios.post('http://localhost:8080/api/payment/notify', {
//       email: email
//     });
//     console.log("✅ Email notification sent to user.");
//   } catch (error) {
//     console.error("❌ Failed to send email notification:", error);
//   }
// };


const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedBox, setSelectedBox] = useState(null);
  const [modalStep, setModalStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [theme, setTheme] = useState('light');
  // New state to manage unsubscribe messages per plan
  const [unsubMessages, setUnsubMessages] = useState({});

  const [formData, setFormData] = useState({
    name: '', dob: '', birthPlace: '', birthTime: '', preferredTime: '', email: ''
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    const userPhone = sessionStorage.getItem('userPhone');
    if (!userPhone) {
      alert('You are not logged in. Please login again.');
      navigate('/');
      return;
    }
    
    const userEmail = sessionStorage.getItem("userEmail") || "";
    setFormData(prev => ({ ...prev, email: userEmail }));

    const fetchUserSubscriptions = async (phone) => {
      try {
        const response = await fetch(`http://localhost:8080/api/subscriptions/user/${phone}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data && data.activeSubscriptions) {
          console.log('Subscriptions loaded:', data.activeSubscriptions);
          setSubscriptions(data.activeSubscriptions);
        } else {
          setSubscriptions([]);
        }
      } catch (error) {
        console.error("Failed to fetch user subscriptions:", error);
        alert('Failed to load your subscription data.');
      }
    };
    
    
    fetchUserSubscriptions(userPhone);

  }, [navigate]);

  const handleSubscribeClick = (box) => {
    console.log('--- handleSubscribeClick called ---');
    console.log('Attempting to set selectedBox to:', box.title);
    setSelectedBox(box);
    setModalStep(1); // Ensure modal starts at Step 1
    console.log('selectedBox state should now be set.');
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProceedToPayment = () => {
    // Validate required fields for Step 1
    if (!formData.name || !formData.dob || !formData.email) {
      alert("Please fill in Name, Date of Birth, and Email ID.");
      return;
    }
    setModalStep(2); // Move to Step 2 (Payment)
  };
  
  const processPayment = async () => {
    const userPhone = sessionStorage.getItem('userPhone');
    if (!userPhone) {
      alert("User not logged in. Please log in again.");
      navigate('/');
      return;
    }

    try {
      // Step 1: Create Razorpay Order
      const res = await fetch('http://localhost:8080/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(selectedBox.price.replace('₹', '')) * 100, currency: 'INR' }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const order = await res.json();

      // Step 2: Open Razorpay Checkout
      const options = {
        key: 'rzp_live_qIBPkGYUdLQG4h', // Replace with your actual Razorpay Key
        amount: order.amount,
        currency: order.currency,
        name: 'Astronomy',
        description: `${selectedBox.title} Plan`,
        order_id: order.id,
        handler: async function (response) {
          // This handler is called on successful payment
          try {
            // Step 3: Process subscription on your backend
            const subscriptionRes = await fetch('http://localhost:8080/api/payment/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userPhone,
                email: formData.email,
                planName: selectedBox.title,
                preferredTimeOfDay: formData.preferredTime,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                dateOfBirth: formData.dob,        // format: 'YYYY-MM-DD'
                timeOfBirth: formData.birthTime,  // format: 'HH:mm'
                placeOfBirth: formData.birthPlace
              }),
            });

            if (!subscriptionRes.ok) {
                const errorData = await subscriptionRes.json();
                throw new Error(`Subscription processing error: ${errorData.message || 'Unknown error'}`);
            }
            //send
            //await notifyPaymentSuccess(formData.email);

            // Update local state to reflect new subscription
            setSubscriptions(prev => {
              if (!prev.includes(selectedBox.title)) {
                return [...prev, selectedBox.title];
              }
              return prev; // Already subscribed, no change
            });
            
            alert('✅ Payment successful! Your subscription is active.');
            closeModal();
          } catch (subscriptionError) {
              console.error("Failed to process subscription after payment:", subscriptionError);
              alert('❌ Payment successful, but failed to activate subscription. Please contact support.');
          }
        },
        prefill: { contact: userPhone, email: formData.email },
        theme: { color: '#528FF0' }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert('❌ Payment failed or server error during order creation.');
    }
  };

  const handleUnsubscribe = async (planName) => {
    const phone = sessionStorage.getItem('userPhone');
    if (!phone) {
      console.error("User phone not found for unsubscribe.");
      setUnsubMessages(prev => ({ ...prev, [planName]: 'Please log in to manage subscriptions.' }));
      setTimeout(() => setUnsubMessages(prev => { const newState = { ...prev }; delete newState[planName]; return newState; }), 5000);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/subscriptions/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, planName }),
      });
  
      if (response.ok) {
        setUnsubMessages(prev => ({ ...prev, [planName]: `Successfully unsubscribed from ${planName}.` }));
        setSubscriptions(prev => prev.filter(title => title !== planName));
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error during unsubscribe.' }));
        let msg = errorData.message || 'You cannot unsubscribe now. Please contact support.';

        // Check for the specific message and replace it
        if (msg === 'No static resource api/subscriptions/unsubscribe.') {
            msg = 'You cant unsubscripe now!.';
        }
        
        setUnsubMessages(prev => ({ ...prev, [planName]: msg }));
      }
    } catch (err) {
      console.error('Error unsubscribing:', err);
      setUnsubMessages(prev => ({ ...prev, [planName]: 'An error occurred. Please try again later.' }));
    } finally {
      setTimeout(() => {
        setUnsubMessages(prev => {
          const newState = { ...prev };
          delete newState[planName];
          return newState;
        });
      }, 5000);
    }
  };
  

  const closeModal = () => {
    console.log('--- closeModal called ---');
    setSelectedBox(null);
    setModalStep(1);
    setSelectedPaymentMethod('');
    setFormData({ name: '', dob: '', birthPlace: '', birthTime: '', preferredTime: '', email: sessionStorage.getItem("userEmail") || ""});
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/astronomy');
  };

  const user = JSON.parse(sessionStorage.getItem("user"));
console.log("Logged in user:", user?.name);


  const boxes = [
    { title: 'Daily Horoscope 🔮 ', thumbnail: horoscopeImg, price: '1', duration: '7 Days', description: 'Unlock daily insights into your destiny with personalized horoscope readings.' },
    { title: 'Career and Finances 💼', thumbnail: careerImg, price: '110', duration: '15 Days', description: 'Astrologers analyze the 10th house (career) and the positions of planets like Saturn, the Sun, and Jupiter to provide insights into career paths, financial stability, and potential challenges. ' },
    { title: 'Health 💪', thumbnail: healthImg, price: '149', duration: '30 Days', description: 'The 6th house and the Moons placement are often examined to assess potential health issues and offer remedies.' },
    { title: 'Travel and Foreign Opportunities 🚗', thumbnail: travelImg, price: '159', duration: '28 Days', description: 'Settling abroad-12th house, Rahu/Ketu, Jupiter and Long or short-term travel periods , Spiritual journeys (9th house, Jupiter).' },
    { title: 'Personality and Temperament 🧘', thumbnail: personalityImg, price: '100', duration: '25 Days', description: 'Astrological charts can reveal a persons inherent personality traits and tendencies.' },
    { title: 'Success in Life 🌟', thumbnail: successImg, price: '189', duration: '30 Days', description: 'By analyzing the birth chart and planetary transits, astrologers can speculate about significant life events, both positive and challenging.' },
    { title: 'Past Life Karma and Spiritual Growth  challenges 🧿 ', thumbnail: lifeImg, price: '200', duration: '45 Days', description: 'Karmic debts-Rahu/Ketu, 12th house,Moksha (liberation) indicators and Intuition, dreams, spiritual awakening.' },
    {title: 'Relationships ❤️', thumbnail: relationshipImg, price: '179', duration: '20 Days', description: 'The 7th house (marriage) and Venus influence are used to understand relationship dynamics and potential marriage prospects.'}
  
  ];

  useEffect(() => {
    console.log('selectedBox state updated:', selectedBox);
  }, [selectedBox]);


  return (
    <>
      <div className={`dashboard-container ${theme}`}>
        <div className="celestial-graphics">
          {/* ... (celestial graphics remain the same) ... */}
          <div className="crescent-moon"></div>
          <div className="crescent-moon moon2"></div>
          <div className="nebula"></div>
          <div className="star s1"></div>
          <div className="star s2"></div>
          <div className="star s3"></div>
          <div className="star s4"></div>
          <div className="star s5"></div>
          <div className="star s6"></div>
          <div className="star s7"></div>
          <div className="star s8"></div>
          <div className="star s9"></div>
          <div className="star s10"></div>
          <div className="star s11"></div>
          <div className="star s12"></div>
          <div className="star s13"></div>
          <div className="star s14"></div>
          <div className="star s15"></div>
          <div className="cluster c1"></div>
          <div className="cluster c2"></div>
          <div className="cluster c3"></div>
          <div className="cluster c4"></div>
          <div className="cluster c5"></div>
          <div className="cluster c6"></div>
          <div className="cluster c7"></div>
          <div className="cluster c8"></div>
          <div className="cluster c9"></div>
          <div className="cluster c10"></div>
          <div className="cluster c11"></div>
          <div className="cluster c12"></div>
          <div className="cluster c13"></div>
          <div className="cluster c14"></div>
        </div>

        <header className="dashboard-header">
          <h1 className="dashboard-title">My Subscriptions</h1>
          <div className="header-controls">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </header>
        

        <div className="dashboard-grid">
          {boxes.map((box) => {
            const isSubscribed = subscriptions.map(s => s.toLowerCase()).includes(box.title.toLowerCase());
            return (
              <div key={box.title} className="card">
                {/* <video src={box.thumbnail} className="card-thumbnail" autoPlay loop muted playsInline /> */}
                <img src={box.thumbnail} alt={box.title} className="card-thumbnail" />

                <div className="card-content">
                  <h3 className="card-title">{box.title}</h3>
                  <p className="card-description">{box.description}</p>
                  <div className="card-info">
                    <span><FaRupeeSign /> {box.price}</span>
                    <span><FaCalendarAlt /> {box.duration}</span>
                  </div>
                  {/* The card-footer itself might need flex-direction: column if message is inside */}
                  <div className="card-footer two-buttons">
                    <button
                      onClick={() => handleSubscribeClick(box)}
                      className={`subscribe-button ${isSubscribed ? 'is-subscribed' : ''}`}
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? <>Active <FaCheckCircle /></> : 'Subscribe Now'}
                    </button>
                    {/* Conditional rendering for Unsubscribe button */}
                    {isSubscribed && (
                      <button
                        onClick={() => handleUnsubscribe(box.title)}
                        className="unsubscribe-button"
                        disabled={!isSubscribed}
                      >
                        Unsubscribe
                      </button>
                    )}
                  </div>
                  {/* MESSAGE PLACEMENT: Moved outside card-footer but still inside card-content */}
                  {unsubMessages[box.title] && (
                    <p className="unsub-message">{unsubMessages[box.title]}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {console.log('--- Rendering Modal Conditional ---', selectedBox)}
      {selectedBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={closeModal} className="close-modal-button">×</button>
            <div className="modal-header">
              <h3>Subscribe to {selectedBox.title}</h3>
              <div className="modal-steps">
                <div className={`step ${modalStep === 1 ? 'active' : 'complete'}`}><span>1</span> Details</div>
                <div className="step-connector"></div>
                <div className={`step ${modalStep === 2 ? 'active' : ''}`}><span>2</span> Payment</div>
              </div>
            </div>
            {modalStep === 1 && (
              <div className="modal-content">
                <form className="details-form">
                  <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleFormChange} required />
                  <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleFormChange} required />
                  <input type="text" name="dob" placeholder="Date of Birth (YYYY-MM-DD)" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} value={formData.dob} onChange={handleFormChange} required />
                  <input type="text" name="birthPlace" placeholder="Place of Birth" value={formData.birthPlace} onChange={handleFormChange} />
                  <input type="text" name="birthTime" placeholder="Time of Birth (HH:MM)" onFocus={(e) => e.target.type='time'} onBlur={(e) => e.target.type='text'} value={formData.birthTime} onChange={handleFormChange} />
                  <select name="preferredTime" value={formData.preferredTime} onChange={handleFormChange}>
                    <option value="">Preferred Time of Day</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>


                  </select>
                </form>
                
                <div className="modal-buttons">
                  <button onClick={handleProceedToPayment} className="primary-button">Proceed to Payment</button>
                </div>
              </div>
            )}
            {modalStep === 2 && (
               <div className="modal-content">
                <form className="payment-options">
                  {['Google Pay', 'UPI', 'PhonePe', 'Card'].map(method => (
                    <label key={method}><input type="radio" name="payment" value={method} checked={selectedPaymentMethod === method} onChange={(e)=>setSelectedPaymentMethod(e.target.value)} />{method}</label>
                  ))}
                </form>
                <div className="modal-buttons">
                  <button onClick={() => setModalStep(1)} className="secondary-button">Back</button>
                  <button onClick={processPayment} disabled={!selectedPaymentMethod} className="primary-button">Pay <FaRupeeSign size={12}/>{selectedBox.price}</button>
                </div>
               </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
