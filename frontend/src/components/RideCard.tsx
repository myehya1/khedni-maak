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
  const isFull = ride.seats === 0;
  const seatColor = isFull
    ? 'var(--danger)'
    : ride.seats <= 2
      ? 'var(--warning)'
      : 'var(--success)';

  return (
    <div
      className="card animate-in"
      style={{ marginBottom: 14, padding: '18px 22px' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
        }}
      >
        {/* Route */}
        <div style={{ flex: 1, minWidth: 200 }}>
          {/* From → To */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                flexShrink: 0,
                background:
                  'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 13,
              }}
            >
              <FaMapMarkerAlt />
            </div>
            <h2
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <span>{ride.from}</span>
              <FaArrowRight
                style={{ color: 'var(--primary)', fontSize: 12, flexShrink: 0 }}
              />
              <span>{ride.to}</span>
            </h2>
          </div>

          {/* Details pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span style={pill}>
              <FaCalendarAlt style={{ color: 'var(--primary)' }} />
              {new Date(ride.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span style={pill}>
              <FaClock style={{ color: 'var(--primary)' }} />
              {ride.time}
            </span>
            <span
              style={{
                ...pill,
                color: seatColor,
                fontWeight: 700,
                background: isFull
                  ? 'rgba(239,68,68,0.08)'
                  : ride.seats <= 2
                    ? 'rgba(245,158,11,0.08)'
                    : 'rgba(16,185,129,0.08)',
              }}
            >
              <FaChair />
              {isFull
                ? 'Full'
                : `${ride.seats} seat${ride.seats !== 1 ? 's' : ''}`}
            </span>
            <span
              style={{
                ...pill,
                color: 'var(--success)',
                fontWeight: 700,
                background: 'rgba(16,185,129,0.08)',
              }}
            >
              <FaDollarSign />
              {ride.price}
            </span>
          </div>

          {/* Driver */}
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--text-muted)',
              fontSize: 12,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--bg)',
                border: '1.5px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FaUser style={{ fontSize: 10, color: 'var(--primary)' }} />
            </div>
            <span style={{ fontWeight: 500 }}>{ride.driver?.name}</span>
          </div>
        </div>

        {/* Action */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'flex-end',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const pill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  fontSize: 12,
  color: 'var(--text-muted)',
  background: 'var(--bg)',
  padding: '4px 10px',
  borderRadius: 99,
  fontWeight: 500,
  border: '1px solid var(--border)',
};

export default RideCard;
