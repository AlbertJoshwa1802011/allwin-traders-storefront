import React, { useState, useEffect } from 'react';
import { X, Phone, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import './OtpModal.css';

const OtpModal = ({ isOpen, onClose, onVerified }) => {
  const [step, setStep] = useState(1); // 1: Phone Input, 2: OTP Input
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setStep(2);
      setTimer(30);
      setLoading(false);
      // In a real app, this would be sent via SMS
      alert(`[MOCK SMS] Your Allwin Traders verification code is: ${code}`);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);

    // Simulate verification
    setTimeout(() => {
      if (enteredOtp === generatedOtp || enteredOtp === '123456') { // Allow 123456 for testing
        onVerified(phone);
        onClose();
      } else {
        setError('Invalid OTP. Please try again.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal-content">
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="otp-header">
          <div className="icon-badge">
            {step === 1 ? <Phone size={32} /> : <ShieldCheck size={32} />}
          </div>
          <h2>{step === 1 ? 'Verify Your Mobile' : 'Enter Verification Code'}</h2>
          <p>
            {step === 1 
              ? 'Enter your mobile number to receive a verification code.' 
              : `We've sent a 6-digit code to +91 ${phone}`}
          </p>
        </div>

        {error && <div className="otp-error">{error}</div>}

        <div className="otp-body">
          {step === 1 ? (
            <div className="phone-input-container">
              <span className="country-code">+91</span>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
            </div>
          ) : (
            <div className="otp-inputs">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  autoFocus={idx === 0}
                />
              ))}
            </div>
          )}
        </div>

        <div className="otp-footer">
          {step === 1 ? (
            <button 
              className="btn-primary w-100" 
              onClick={handleSendOtp}
              disabled={loading || phone.length < 10}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : 'Send OTP'}
              {!loading && <ArrowRight size={20} style={{marginLeft: '8px'}} />}
            </button>
          ) : (
            <>
              <button 
                className="btn-primary w-100 mb-4" 
                onClick={handleVerifyOtp}
                disabled={loading || otp.join('').length < 6}
              >
                {loading ? <RefreshCw className="spin" size={20} /> : 'Verify & Proceed'}
              </button>
              <div className="resend-container">
                {timer > 0 ? (
                  <span className="text-gray">Resend code in {timer}s</span>
                ) : (
                  <button className="resend-btn" onClick={handleSendOtp}>Resend OTP</button>
                )}
              </div>
              <button className="change-num-btn" onClick={() => setStep(1)}>
                Change phone number
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
