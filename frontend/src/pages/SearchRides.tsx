import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCarSide,
  FaSearch,
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaCalendarAlt,
  FaLock,
} from 'react-icons/fa';
import api from '../services/api';
import RideCard from '../components/RideCard';
import CitySelect from '../components/CitySelect';
import { useAuth } from '../context/AuthContext';
import './SearchRides.css';

const todayStr = () => new Date().toISOString().split('T')[0];

function SearchRides() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(todayStr());
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [authPrompt, setAuthPrompt] = useState(false);

  const searchRides = async () => {
    try {
      setLoading(true);
      setSearched(true);
      const res = await api.get('/rides', { params: { from, to, date } });
      setRides(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const joinRide = async (rideId) => {
    if (!user) {
      setAuthPrompt(true);
      setTimeout(() => {
        setAuthPrompt(false);
        navigate('/login');
      }, 2000);
      return;
    }
    try {
      await api.post(`/rides/${rideId}/join`, {}, { headers: authHeaders() });
      searchRides();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to join ride.');
    }
  };

  const leaveRide = async (rideId) => {
    try {
      await api.post(`/rides/${rideId}/cancel`, {}, { headers: authHeaders() });
      searchRides();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to leave ride.');
    }
  };

  const hasJoined = (ride) =>
    user && ride.passengers?.some((p) => (p._id || p) === user._id);

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', background: 'var(--bg)' }}>
      {authPrompt && (
        <div
          style={{
            position: 'fixed',
            top: 88,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--primary)',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 600,
            fontSize: 15,
            zIndex: 2000,
            animation: 'fadeInUp 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <FaLock /> Please sign in to join a ride. Redirecting...
        </div>
      )}
      {/* Search hero */}
      <div className="sr-hero">
        <h1 className="sr-hero-title">Where are you heading?</h1>
        <p className="sr-hero-sub">
          Find affordable rides across Lebanon in seconds
        </p>

        {/* Search card */}
        <div className="sr-card">
          <div className="sr-fields">
            {/* FROM */}
            <div className="sr-field">
              <div className="sr-field-label">
                <FaMapMarkerAlt /> From
              </div>
              <CitySelect
                name="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Departure city"
              />
            </div>

            {/* Swap */}
            <div className="sr-divider-wrap">
              <div className="sr-divider" />
              <button
                type="button"
                className="sr-swap"
                title="Swap cities"
                onClick={() => {
                  const tmp = from;
                  setFrom(to);
                  setTo(tmp);
                }}
              >
                <FaExchangeAlt />
              </button>
            </div>

            {/* TO */}
            <div className="sr-field">
              <div className="sr-field-label sr-field-label--blue">
                <FaMapMarkerAlt /> To
              </div>
              <CitySelect
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination city"
              />
            </div>

            <div className="sr-divider" />

            {/* DATE */}
            <div className="sr-field sr-field--date">
              <div className="sr-field-label">
                <FaCalendarAlt /> Date
              </div>
              <input
                type="date"
                value={date}
                min={todayStr()}
                onChange={(e) => setDate(e.target.value)}
                className="sr-date-input"
              />
            </div>

            {/* SEARCH */}
            <button
              className="sr-search-btn"
              onClick={searchRides}
              disabled={loading}
            >
              <FaSearch /> {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
        {!searched ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <FaCarSide
              size={56}
              style={{ color: 'var(--border)', marginBottom: 16 }}
            />
            <h2
              style={{
                color: 'var(--text-muted)',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Search for rides above
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              Enter your departure, destination and date to find available
              rides.
            </p>
          </div>
        ) : loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <p style={{ color: 'var(--text-muted)' }}>Searching for rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            <FaCarSide
              size={52}
              style={{
                color: 'var(--primary)',
                opacity: 0.3,
                marginBottom: 16,
              }}
            />
            <h2 style={{ fontWeight: 700, marginBottom: 8 }}>No rides found</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Try adjusting your search or check back later.
            </p>
          </div>
        ) : (
          <>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: 14,
                marginBottom: 20,
                fontWeight: 500,
              }}
            >
              {rides.length} ride{rides.length !== 1 ? 's' : ''} found
            </p>
            {rides.map((ride) => {
              const joined = hasJoined(ride);
              const isDriver =
                user && (ride.driver?._id || ride.driver) === user._id;
              return (
                <RideCard key={ride._id} ride={ride}>
                  {isDriver ? (
                    <button
                      disabled
                      style={{
                        background: 'var(--border)',
                        color: 'var(--text-muted)',
                        cursor: 'not-allowed',
                        boxShadow: 'none',
                        transform: 'none',
                      }}
                    >
                      Your Ride
                    </button>
                  ) : joined ? (
                    <button
                      onClick={() => leaveRide(ride._id)}
                      style={{
                        background: 'transparent',
                        border: '1.5px solid var(--danger)',
                        color: 'var(--danger)',
                        boxShadow: 'none',
                      }}
                    >
                      Leave Ride
                    </button>
                  ) : (
                    <button
                      onClick={() => joinRide(ride._id)}
                      disabled={ride.seats === 0}
                      style={
                        ride.seats === 0
                          ? {
                              background: 'var(--border)',
                              color: 'var(--text-muted)',
                              cursor: 'not-allowed',
                              boxShadow: 'none',
                              transform: 'none',
                            }
                          : {}
                      }
                    >
                      {ride.seats === 0 ? 'Ride Full' : '⭐ Join Ride'}
                    </button>
                  )}
                </RideCard>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchRides;
