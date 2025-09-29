import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaInfoCircle, FaMoneyBillWave, FaCheckCircle, FaTools } from 'react-icons/fa';

function ProfileSetup() {
  const [role, setRole] = useState('freelancer');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [availability, setAvailability] = useState(true);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('access');

  const handleSkillInput = (e) => {
    const input = e.target.value;
    setSkillInput(input);
    const parsed = input
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    setSkills(parsed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      role,
      bio,
      hourly_rate: parseFloat(hourlyRate),
      availability,
      skills, // assuming backend accepts skill names
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/profiles/', profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile created successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      toast.error('Error creating profile: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{
      background: 'linear-gradient(to right, #43cea2, #185a9d)',
    }}>
      <div className="card p-4 shadow-lg animate__animated animate__fadeIn" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center text-primary mb-3">Complete Your Profile</h3>
        <p className="text-muted text-center mb-4">Let clients know who you are and what you offer</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><FaUserTie /> Role</label>
            <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label"><FaInfoCircle /> Bio</label>
            <textarea className="form-control" value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about your experience..." />
          </div>

          <div className="mb-3">
            <label className="form-label"><FaMoneyBillWave /> Hourly Rate (₹)</label>
            <input type="number" className="form-control" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} placeholder="e.g. 500" />
          </div>

          <div className="mb-3">
            <label className="form-label"><FaCheckCircle /> Availability</label>
            <select className="form-select" value={availability} onChange={e => setAvailability(e.target.value === 'true')}>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label"><FaTools /> Skills</label>
            <input
              type="text"
              className="form-control"
              value={skillInput}
              onChange={handleSkillInput}
              placeholder="e.g. React, Django, REST"
            />
            <small className="text-muted">Separate skills with commas</small>
            {skills.length > 0 && (
              <div className="mt-2">
                <strong>Parsed Skills:</strong>
                <div className="mt-1">
                  {skills.map((skill, index) => (
                    <span key={index} className="badge bg-primary me-2 mb-2">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">Create Profile</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;
