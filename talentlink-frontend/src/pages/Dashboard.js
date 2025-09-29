import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.warn("No access token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profiles/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.length > 0) {
          setProfile(response.data[0]);
        } else {
          toast.info("No profile found. Redirecting to setup...");
          setTimeout(() => navigate('/profile-setup'), 1500);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const badgeColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          No profile found. Redirecting to setup...
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Gradient Welcome Banner */}
      <div className="p-4 mb-4 text-white rounded" style={{
        background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
      }}>
        <div className="d-flex align-items-center">
          <div className="rounded-circle bg-white text-danger d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
            {profile.user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="ms-3">
            <h3 className="mb-0">Welcome, {profile.user?.username || 'User'}!</h3>
            <small>Your personalized dashboard is ready.</small>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-end mb-3">
        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
          🔄 Refresh Dashboard
        </button>
      </div>

      {/* Profile Info Cards */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-info shadow-sm p-3">
            <h5 className="card-title">Role</h5>
            <p className="card-text">{profile.role}</p>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-success shadow-sm p-3">
            <h5 className="card-title">Hourly Rate</h5>
            <p className="card-text">₹{profile.hourly_rate}</p>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div className="card bg-light shadow-sm p-3">
            <h5 className="card-title">Availability</h5>
            <span className={`badge bg-${profile.availability ? 'success' : 'secondary'}`}>
              {profile.availability ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div className="card bg-light shadow-sm p-3">
            <h5 className="card-title">Bio</h5>
            <p className="card-text">{profile.bio}</p>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div className="card bg-light shadow-sm p-3">
            <h5 className="card-title">Skills</h5>
            <div>
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span key={skill.id} className={`badge bg-${badgeColors[index % badgeColors.length]} me-2 mb-2`}>
                    {skill.name}
                  </span>
                ))
              ) : (
                <span className="text-muted">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Section Placeholder */}
      {profile.role === 'client' && (
        <div className="card p-3 shadow-sm mt-4">
          <h5>Your Posted Projects</h5>
          <p className="text-muted">Coming soon...</p>
        </div>
      )}

      {profile.role === 'freelancer' && (
        <div className="card p-3 shadow-sm mt-4">
          <h5>Your Proposals</h5>
          <p className="text-muted">Coming soon...</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
