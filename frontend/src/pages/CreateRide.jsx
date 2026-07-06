import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaDollarSign,
  FaArrowRight,
} from 'react-icons/fa';
import CitySelect from '../components/CitySelect';
function CreateRide() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (formData.from === formData.to) {
      setError('Departure and destination cannot be the same.');
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await api.post('/rides', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/search');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 68px)',
        padding: '48px 20px',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 className="page-title">Create a Ride</h1>
          <p className="page-subtitle">
            Share your trip and help others travel smarter.
          </p>
        </div>

        <div className="card" style={{ padding: 32 }}>
          {error && (
            <div
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8,
                padding: '12px 16px',
                color: 'var(--danger)',
                fontSize: 14,
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Route row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'end',
                gap: 12,
                marginBottom: 18,
              }}
            >
              <div className="form-group" style={{ margin: 0 }}>
                <label>From</label>
                <CitySelect
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  placeholder="Select departure city"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 2,
                }}
              >
                <FaArrowRight
                  style={{ color: 'var(--text-muted)', fontSize: 16 }}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label>To</label>
                <CitySelect
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  placeholder="Select destination city"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid-2">
              <div className="form-group">
                <label>Date</label>
                <div style={{ position: 'relative' }}>
                  <FaCalendarAlt
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--primary)',
                      fontSize: 13,
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: 34 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Time</label>
                <div style={{ position: 'relative' }}>
                  <FaClock
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--primary)',
                      fontSize: 13,
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="time"
                    name="time"
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: 34 }}
                  />
                </div>
              </div>
            </div>

            {/* Seats & Price */}
            <div className="grid-2">
              <div className="form-group">
                <label>Available Seats</label>
                <div style={{ position: 'relative' }}>
                  <FaChair
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--primary)',
                      fontSize: 13,
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="number"
                    name="seats"
                    placeholder="e.g. 3"
                    min="1"
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: 34 }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <div style={{ position: 'relative' }}>
                  <FaDollarSign
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--primary)',
                      fontSize: 13,
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 5"
                    min="0"
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: 34 }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                fontSize: 15,
                marginTop: 8,
              }}
            >
              {loading ? 'Creating...' : '🚗  Create Ride'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRide;
