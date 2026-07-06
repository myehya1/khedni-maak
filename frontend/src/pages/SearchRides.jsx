import { useState } from 'react';
import {
  FaCarSide,
  FaSearch,
  FaMapMarkerAlt,
  FaArrowRight,
} from 'react-icons/fa';
import api from '../services/api';
import RideCard from '../components/RideCard';
import CitySelect from '../components/CitySelect';
function SearchRides() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchRides = async () => {
    try {
      setLoading(true);
      setSearched(true);
      const res = await api.get('/rides', { params: { from, to } });
      setRides(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const joinRide = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      await api.post(
        `/rides/${rideId}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      searchRides();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to join ride.');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', background: 'var(--bg)' }}>
      {/* Search header */}
      <div
        style={{
          background: 'linear-gradient(135deg,#4f46e5,#6366f1,#0ea5e9)',
          padding: '48px 20px 64px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(24px,4vw,36px)',
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Find Your Ride
        </h1>
        <p style={{ opacity: 0.88, marginBottom: 32, fontSize: 16 }}>
          Search available rides across Lebanon
        </p>

        {/* Search bar */}
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FaMapMarkerAlt
                style={{ color: 'var(--primary)', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <CitySelect
                  name="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Departure City"
                />
              </div>
            </div>
            <FaArrowRight style={{ color: 'var(--border)', flexShrink: 0 }} />
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FaMapMarkerAlt
                style={{ color: 'var(--secondary)', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <CitySelect
                  name="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Destination City"
                />
              </div>
            </div>
            <button
              onClick={searchRides}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 22px',
                borderRadius: 10,
                flexShrink: 0,
              }}
            >
              <FaSearch /> {loading ? 'Searching...' : 'Search'}
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
              Enter your departure and destination to find available rides.
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
            {rides.map((ride) => (
              <RideCard key={ride._id} ride={ride}>
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
              </RideCard>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchRides;
