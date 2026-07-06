import {
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaDollarSign,
  FaArrowRight,
} from 'react-icons/fa';

function RideCard({ ride, children }) {
  return (
    <div
      className="card"
      style={{ marginBottom: '16px', padding: '20px 24px' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Route */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              <FaMapMarkerAlt />
            </div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {ride.from}
              <FaArrowRight
                style={{ color: 'var(--primary)', fontSize: '14px' }}
              />
              {ride.to}
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <span style={detailStyle}>
              <FaCalendarAlt style={{ color: 'var(--primary)' }} />{' '}
              {new Date(ride.date).toLocaleDateString()}
            </span>
            <span style={detailStyle}>
              <FaClock style={{ color: 'var(--primary)' }} /> {ride.time}
            </span>
            <span style={detailStyle}>
              <FaChair style={{ color: 'var(--primary)' }} /> {ride.seats} seats
            </span>
            <span
              style={{
                ...detailStyle,
                fontWeight: 700,
                color: 'var(--success)',
              }}
            >
              <FaDollarSign /> {ride.price}
            </span>
          </div>

          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '13px',
            }}
          >
            <FaUser style={{ color: 'var(--primary)' }} />
            <span>{ride.driver?.name}</span>
          </div>
        </div>

        {/* Action */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'flex-end',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const detailStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '13px',
  color: 'var(--text-muted)',
  background: 'var(--bg)',
  padding: '4px 10px',
  borderRadius: '20px',
  fontWeight: 500,
};

export default RideCard;
