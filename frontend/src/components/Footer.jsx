import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        padding: '36px 20px 24px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 32,
            marginBottom: 28,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                background:
                  'linear-gradient(135deg,var(--primary),var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8,
              }}
            >
              🚗 Khedni Maak
            </div>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: 13,
                lineHeight: 1.65,
              }}
            >
              Lebanon&apos;s carpooling platform — connecting cities, saving
              costs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: 'var(--text-muted)',
                marginBottom: 12,
              }}
            >
              Navigate
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['/', 'Home'],
                ['/search', 'Search Rides'],
                ['/create-ride', 'Offer a Ride'],
                ['/profile', 'My Profile'],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 13,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = 'var(--primary)')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = 'var(--text-muted)')
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: 'var(--text-muted)',
                marginBottom: 12,
              }}
            >
              Account
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['/login', 'Login'],
                ['/register', 'Register'],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 13,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = 'var(--primary)')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = 'var(--text-muted)')
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 18,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            © {new Date().getFullYear()} Khedni Maak. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            🇱🇧 Made with ❤️ in Lebanon
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
