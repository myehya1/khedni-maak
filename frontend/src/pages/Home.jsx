import { Link } from 'react-router-dom';
import {
  FaCarSide,
  FaSearch,
  FaUsers,
  FaShieldAlt,
  FaLeaf,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const features = [
  {
    icon: FaSearch,
    title: 'Find Rides Easily',
    desc: 'Search rides across Lebanon in seconds with smart filters.',
    color: '#0ea5e9',
  },
  {
    icon: FaCarSide,
    title: 'Offer Your Ride',
    desc: 'Share your trip, reduce costs, and earn on the way.',
    color: '#0ea5e9',
  },
  {
    icon: FaUsers,
    title: 'Travel Together',
    desc: 'Meet trusted passengers and make every journey better.',
    color: '#10b981',
  },
  {
    icon: FaShieldAlt,
    title: 'Safe & Verified',
    desc: 'Verified profiles and ratings for peace of mind.',
    color: '#f59e0b',
  },
  {
    icon: FaLeaf,
    title: 'Eco-Friendly',
    desc: 'Reduce your carbon footprint by sharing rides.',
    color: '#10b981',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Nationwide Routes',
    desc: 'Coverage across all Lebanese cities and regions.',
    color: '#0284c7',
  },
];

const stats = [
  ['10,000+', 'Rides Shared'],
  ['5,000+', 'Happy Riders'],
  ['50+', 'Cities'],
  ['-40%', 'CO₂ Saved'],
];

function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background:
            'linear-gradient(140deg, #0369a1 0%, #0ea5e9 50%, #38bdf8 100%)',
          color: 'white',
          padding: 'clamp(64px,10vw,120px) 20px clamp(80px,12vw,140px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '10%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 99,
              padding: '5px 14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 22,
            }}
          >
            🇱🇧 Lebanon&apos;s #1 Carpooling Platform
          </span>
          <h1
            style={{
              fontSize: 'clamp(34px,6vw,58px)',
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: 18,
              letterSpacing: '-1.5px',
            }}
          >
            Travel Smarter
            <br />
            Across Lebanon
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px,2.5vw,19px)',
              opacity: 0.88,
              marginBottom: 38,
              lineHeight: 1.65,
              maxWidth: 520,
              margin: '0 auto 38px',
            }}
          >
            Find affordable rides or offer your own — connecting Lebanese
            cities, saving costs, and reducing traffic every day.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
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
                  fontSize: 15,
                  padding: '13px 28px',
                  borderRadius: 10,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                  gap: 8,
                }}
              >
                🔍 Find a Ride
              </button>
            </Link>
            <Link to="/create-ride">
              <button
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 15,
                  padding: '13px 28px',
                  borderRadius: 10,
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(6px)',
                  boxShadow: 'none',
                }}
              >
                🚗 Offer a Ride
              </button>
            </Link>
          </div>
        </div>

        {/* Wave bottom */}
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            height: 56,
            display: 'block',
          }}
        >
          <path
            d="M0,32 C360,64 1080,0 1440,32 L1440,56 L0,56 Z"
            fill="var(--bg)"
          />
        </svg>
      </section>

      {/* ── Stats strip ── */}
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
            gap: 'clamp(28px,6vw,80px)',
            padding: '22px 0',
            flexWrap: 'wrap',
          }}
        >
          {stats.map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(20px,3.5vw,28px)',
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg,var(--primary),var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <div className="container" style={{ padding: '72px 0 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge" style={{ marginBottom: 12 }}>
            Why us
          </span>
          <h2
            style={{
              fontSize: 'clamp(22px,4vw,32px)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              marginBottom: 10,
            }}
          >
            Why Choose Khedni Maak?
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 15,
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Everything you need for hassle-free shared travel across Lebanon.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 20,
          }}
        >
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="card"
              style={{ textAlign: 'center', padding: '28px 22px' }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  margin: '0 auto 16px',
                  background: `${color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 7,
                  color: 'var(--text)',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: 13.5,
                  lineHeight: 1.65,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div
        style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '64px 20px',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge" style={{ marginBottom: 12 }}>
              Simple steps
            </span>
            <h2
              style={{
                fontSize: 'clamp(22px,4vw,30px)',
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              How It Works
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: 24,
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {[
              {
                step: '1',
                title: 'Create Account',
                desc: 'Sign up for free in under a minute.',
              },
              {
                step: '2',
                title: 'Search or Offer',
                desc: 'Find available rides or post your own.',
              },
              {
                step: '3',
                title: 'Travel Together',
                desc: 'Connect with your fellow travellers and hit the road.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                style={{ textAlign: 'center', padding: '8px 16px' }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    margin: '0 auto 14px',
                    background:
                      'linear-gradient(135deg,var(--primary),var(--secondary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 17,
                  }}
                >
                  {step}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
                  {title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 13.5,
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div
        style={{
          background:
            'linear-gradient(135deg,var(--primary-dark),var(--secondary))',
          padding: '56px 20px',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
          <h2
            style={{
              fontSize: 'clamp(22px,4vw,32px)',
              fontWeight: 800,
              marginBottom: 10,
              letterSpacing: '-0.5px',
            }}
          >
            Ready to hit the road?
          </h2>
          <p
            style={{
              opacity: 0.88,
              marginBottom: 28,
              fontSize: 15,
              lineHeight: 1.65,
            }}
          >
            Join thousands of Lebanese commuters saving time and money every
            day.
          </p>
          <Link to="/register">
            <button
              style={{
                background: '#fff',
                color: 'var(--primary-dark)',
                fontWeight: 700,
                fontSize: 15,
                padding: '13px 30px',
                borderRadius: 10,
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              }}
            >
              Get Started — It&apos;s Free
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
