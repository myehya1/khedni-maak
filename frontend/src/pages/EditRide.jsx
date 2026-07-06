import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import {
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaDollarSign,
  FaArrowRight,
} from 'react-icons/fa';
import CitySelect from '../components/CitySelect';
function EditRide() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRide() {
      try {
        const res = await api.get(`/rides/${id}`);
        const ride = res.data;
        setFormData({
          from: ride.from,
          to: ride.to,
          date: ride.date.split('T')[0],
          time: ride.time,
          seats: ride.seats,
          price: ride.price,
        });
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || 'Failed to load ride.');
      } finally {
        setLoading(false);
      }
    }
    fetchRide();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await api.put(`/rides/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update ride.');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div
        style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
        <p>Loading ride details...</p>
      </div>
    );

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
          <h1 className="page-title">Edit Ride</h1>
          <p className="page-subtitle">Update your ride details below.</p>
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
                  placeholder="Departure City"
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
                  placeholder="Destination City"
                />
              </div>
            </div>

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
                    value={formData.date}
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
                    value={formData.time}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: 34 }}
                  />
                </div>
              </div>
            </div>

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
                    value={formData.seats}
                    onChange={handleChange}
                    min="1"
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
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                    style={{ paddingLeft: 34 }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                style={{
                  flex: 1,
                  padding: '13px',
                  background: 'transparent',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-muted)',
                  boxShadow: 'none',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{ flex: 2, padding: '13px', fontSize: 15 }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRide;
