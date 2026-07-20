import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaDollarSign,
  FaArrowRight,
  FaEdit,
  FaTrash,
  FaCarSide,
  FaPlus,
  FaExclamationTriangle,
} from 'react-icons/fa';

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const deleteRide = async (rideId) => {
    if (!window.confirm('Are you sure you want to delete this ride?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadProfile();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete ride');
    }
  };

  const leaveRide = async (rideId) => {
    if (!window.confirm('Are you sure you want to leave this ride?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.post(
        `/rides/${rideId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      loadProfile();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to leave ride');
    }
  };

  const deleteAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? This will also delete all your created rides and cannot be undone.',
      )
    )
      return;
    try {
      const token = localStorage.getItem('token');
      await api.delete('/users/account', {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete account');
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div
          style={{
            width: 48,
            height: 48,
            border: '4px solid var(--border)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
          Loading your profile...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  if (!profile)
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <p style={{ color: 'var(--text-muted)' }}>Profile not found.</p>
      </div>
    );

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 68px)',
        background: 'var(--bg)',
        padding: '48px 20px 64px',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Profile header */}
        <div
          className="card"
          style={{
            padding: '28px 32px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background:
                'linear-gradient(135deg,var(--primary),var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 28,
              flexShrink: 0,
            }}
          >
            <FaUser />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
              {profile.user.name}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--text-muted)',
                fontSize: 14,
              }}
            >
              <FaEnvelope style={{ color: 'var(--primary)' }} />
              <span>{profile.user.email}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, textAlign: 'center' }}>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: 'var(--primary)',
                }}
              >
                {profile.createdRides.length}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                }}
              >
                Created
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: 'var(--secondary)',
                }}
              >
                {profile.joinedRides.length}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                }}
              >
                Joined
              </div>
            </div>
          </div>
        </div>

        {/* Created rides */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>My Created Rides</h2>
            <Link to="/create-ride">
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  fontSize: 13,
                }}
              >
                <FaPlus /> New Ride
              </button>
            </Link>
          </div>

          {profile.createdRides.length === 0 ? (
            <div
              className="card"
              style={{ textAlign: 'center', padding: '40px 24px' }}
            >
              <FaCarSide
                size={40}
                style={{ color: 'var(--border)', marginBottom: 12 }}
              />
              <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                No rides created yet.
              </p>
            </div>
          ) : (
            profile.createdRides.map((ride) => (
              <RideRow key={ride._id} ride={ride}>
                <Link to={`/edit-ride/${ride._id}`}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      fontSize: 13,
                      background: 'transparent',
                      border: '1.5px solid var(--primary)',
                      color: 'var(--primary)',
                      boxShadow: 'none',
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteRide(ride._id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    fontSize: 13,
                    background: 'transparent',
                    border: '1.5px solid var(--danger)',
                    color: 'var(--danger)',
                    boxShadow: 'none',
                  }}
                >
                  <FaTrash /> Delete
                </button>
              </RideRow>
            ))
          )}
        </div>

        {/* Joined rides */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            My Joined Rides
          </h2>

          {profile.joinedRides.length === 0 ? (
            <div
              className="card"
              style={{ textAlign: 'center', padding: '40px 24px' }}
            >
              <FaCarSide
                size={40}
                style={{ color: 'var(--border)', marginBottom: 12 }}
              />
              <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                You haven&apos;t joined any rides yet.
              </p>
            </div>
          ) : (
            profile.joinedRides.map((ride) => (
              <RideRow key={ride._id} ride={ride}>
                <button
                  onClick={() => leaveRide(ride._id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    fontSize: 13,
                    background: 'transparent',
                    border: '1.5px solid var(--danger)',
                    color: 'var(--danger)',
                    boxShadow: 'none',
                  }}
                >
                  <FaTrash /> Leave
                </button>
              </RideRow>
            ))
          )}
        </div>

        {/* ── Danger Zone ── */}
        <div className="danger-zone" style={{ marginTop: 40 }}>
          <p className="danger-zone-title">⚠ Danger Zone</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>
                Delete Account
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                Permanently deletes your account and all your created rides.
                This cannot be undone.
              </p>
            </div>
            <button
              onClick={deleteAccount}
              style={{
                background: 'var(--danger)',
                color: '#fff',
                padding: '9px 20px',
                fontSize: 13,
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(239,68,68,0.3)',
              }}
            >
              <FaExclamationTriangle /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RideRow({ ride, children }) {
  return (
    <div className="card" style={{ marginBottom: 12, padding: '18px 22px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 10,
              color: 'var(--text)',
            }}
          >
            <FaMapMarkerAlt style={{ color: 'var(--primary)' }} />
            {ride.from}{' '}
            <FaArrowRight
              style={{ fontSize: 12, color: 'var(--text-muted)' }}
            />{' '}
            {ride.to}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              [FaCalendarAlt, new Date(ride.date).toLocaleDateString()],
              [FaClock, ride.time],
              [FaChair, `${ride.seats} seats`],
              [FaDollarSign, `$${ride.price}`],
            ].map(([Icon, label]) => (
              <span
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  background: 'var(--bg)',
                  padding: '3px 10px',
                  borderRadius: 20,
                }}
              >
                <Icon style={{ color: 'var(--primary)' }} /> {label}
              </span>
            ))}
          </div>
        </div>
        {children && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
