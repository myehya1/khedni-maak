import { Link } from 'react-router-dom';
import {
  FaCarSide,
  FaSearch,
  FaUsers,
  FaShieldAlt,
  FaLeaf,
} from 'react-icons/fa';

const features = [
  {
    icon: FaSearch,
    title: 'Find Rides Easily',
    desc: 'Search rides across Lebanon in seconds with smart filters.',
  },
  {
    icon: FaCarSide,
    title: 'Offer Your Ride',
    desc: 'Share your trip, reduce costs, and earn on the way.',
  },
  {
    icon: FaUsers,
    title: 'Travel Together',
    desc: 'Meet trusted passengers and make every journey better.',
  },
  {
    icon: FaShieldAlt,
    title: 'Safe & Verified',
    desc: 'Verified profiles and ratings for peace of mind.',
  },
  {
    icon: FaLeaf,
    title: 'Eco-Friendly',
    desc: 'Reduce your carbon footprint by sharing rides.',
  },
  {
    icon: FaCarSide,
    title: 'Nationwide Routes',
    desc: 'Coverage across all Lebanese cities and regions.',
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background:
            'linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #0ea5e9 100%)',
          color: 'white',
          padding: 'clamp(60px,10vw,110px) 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 20,
              padding: '6px 16px',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginBottom: 20,
            }}
          >
            🇱🇧 Lebanon&apos;s Carpooling Platform
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px,6vw,56px)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: '-1px',
            }}
          >
            Travel Smarter
            <br />
            Across Lebanon
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px,2.5vw,20px)',
              opacity: 0.88,
              marginBottom: 40,
              lineHeight: 1.6,
            }}
          >
            Find affordable rides or offer your own — connecting cities, saving
            costs, and reducing traffic.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/search">
              <button
                style={{
                  background: '#fff',
                  color: 'var(--primary-dark)',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 32px',
                  borderRadius: 10,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
              >
                🔍 Search Rides
              </button>
            </Link>
            <Link to="/create-ride">
              <button
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '14px 32px',
                  borderRadius: 10,
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                + Offer a Ride
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(24px,6vw,80px)',
            padding: '24px 0',
            flexWrap: 'wrap',
          }}
        >
          {[
            ['10,000+', 'Rides Shared'],
            ['5,000+', 'Happy Riders'],
            ['50+', 'Cities'],
            ['-40%', 'CO₂ Saved'],
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(22px,4vw,30px)',
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg,var(--primary),var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ padding: '64px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 'clamp(22px,4vw,32px)',
              fontWeight: 800,
              marginBottom: 10,
            }}
          >
            Why Choose Khedni Maak?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>
            Everything you need for hassle-free shared travel.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))',
            gap: 22,
          }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card"
              style={{ textAlign: 'center', padding: '32px 24px' }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background:
                    'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(14,165,233,0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                }}
              >
                <Icon size={26} style={{ color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                {title}
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div
        style={{
          background:
            'linear-gradient(135deg,var(--primary-dark),var(--secondary))',
          margin: '0 0 64px',
          padding: '48px 20px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(20px,4vw,30px)',
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          Ready to hit the road?
        </h2>
        <p style={{ opacity: 0.88, marginBottom: 28, fontSize: 16 }}>
          Join thousands of Lebanese commuters saving time and money every day.
        </p>
        <Link to="/register">
          <button
            style={{
              background: '#fff',
              color: 'var(--primary-dark)',
              fontWeight: 700,
              fontSize: 16,
              padding: '13px 32px',
              borderRadius: 10,
            }}
          >
            Get Started Free
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;
