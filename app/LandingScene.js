/*
 * Decorative airfield scene: a twin-engine passenger jet lands once on load
 * and stays parked. Purely presentational, so it is hidden from assistive tech.
 * Animations live in globals.css (.landing-plane-*); reduced motion shows the
 * final parked position.
 *
 * Coordinate system: the viewBox is 620 x 280. The runway surface starts at
 * y = 230. The aircraft's main gear sits at the group origin, which is placed
 * on the runway at (300, 230) so the plane parks there.
 */
export default function LandingScene() {
  return (
    <div className="landing-scene" aria-hidden="true">
      <svg
        className="landing-svg"
        viewBox="0 0 620 280"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient id="landing-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1224" />
            <stop offset="60%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#38567f" />
          </linearGradient>
          <linearGradient id="landing-runway" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* Sky and distant ground */}
        <rect x="0" y="0" width="620" height="230" fill="url(#landing-sky)" />
        <path d="M0 230 L620 230 L620 236 L0 236 Z" fill="#14532d" opacity="0.55" />

        {/* Faint clouds */}
        <ellipse cx="90" cy="60" rx="46" ry="10" fill="#ffffff" opacity="0.08" />
        <ellipse cx="520" cy="40" rx="60" ry="11" fill="#ffffff" opacity="0.07" />
        <ellipse cx="410" cy="105" rx="38" ry="8" fill="#ffffff" opacity="0.06" />

        {/* Runway */}
        <rect x="0" y="230" width="620" height="50" fill="url(#landing-runway)" />
        <line x1="0" y1="231" x2="620" y2="231" stroke="#f8fafc" strokeWidth="2" opacity="0.7" />
        <line
          x1="0"
          y1="262"
          x2="620"
          y2="262"
          stroke="#f8fafc"
          strokeWidth="3"
          strokeDasharray="28 20"
          opacity="0.85"
        />

        {/* Edge lights */}
        <g fill="#fde68a">
          {[20, 70, 120, 170, 220, 270, 320, 370, 420, 470, 520, 570, 605].map((x) => (
            <circle key={x} cx={x} cy="233" r="2.4" />
          ))}
        </g>

        {/* Plane anchor: origin = main gear contact point at the parked position */}
        <g transform="translate(300 230)">
          {/* Approach path: horizontal travel */}
          <g className="landing-plane-x">
            {/* Vertical travel: descent, flare, touchdown, bounce */}
            <g className="landing-plane-y">
              {/* Attitude: nose pitches around the main gear */}
              <g className="landing-plane-attitude">
                <g transform="translate(2.4 0) scale(1.2)">
                  {/* Tailplane */}
                  <path d="M66 -44 L98 -58 L100 -52 L76 -40 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
                  {/* Vertical fin */}
                  <path d="M60 -54 L80 -98 L96 -98 L84 -54 Z" fill="#4f46e5" />

                  {/* Wing */}
                  <path d="M30 -28 L-30 -2 L-18 -2 L42 -28 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />

                  {/* Engine nacelle under the wing */}
                  <rect x="-6" y="-22" width="36" height="14" rx="7" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
                  <ellipse cx="30" cy="-15" rx="3" ry="6" fill="#334155" />

                  {/* Fuselage */}
                  <rect x="-90" y="-56" width="190" height="28" rx="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
                  <rect x="-86" y="-38" width="180" height="3" fill="#6366f1" />

                  {/* Cabin windows */}
                  <g fill="#38bdf8" opacity="0.85">
                    {[-74, -60, -46, -32, -18, -4, 10, 24, 38, 52].map((x) => (
                      <rect key={x} x={x} y="-49" width="9" height="8" rx="2" />
                    ))}
                  </g>
                  {/* Cockpit window */}
                  <path d="M78 -50 L92 -50 L96 -42 L78 -42 Z" fill="#38bdf8" />

                  {/* Landing gear (deployed) */}
                  <line x1="-2" y1="-28" x2="-2" y2="-8" stroke="#475569" strokeWidth="3" />
                  <circle cx="-2" cy="-7" r="7" fill="#0f172a" />
                  <circle cx="-2" cy="-7" r="2.5" fill="#64748b" />
                  <line x1="70" y1="-28" x2="70" y2="-12" stroke="#475569" strokeWidth="3" />
                  <circle cx="70" cy="-6" r="6" fill="#0f172a" />
                  <circle cx="70" cy="-6" r="2" fill="#64748b" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}