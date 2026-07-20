/**
 * Line illustrations for the four case studies.
 *
 * Drawn rather than sourced: the artwork in public/images is AI-generated and
 * carries garbled baked-in text ("Loar AI Appovealy", "Loan Recommendios"),
 * which reads as unserious at card size. These use the page's own ink, hairline
 * and accent tokens, so the four cards read as one system.
 *
 * Each depicts the actual mechanism of the project — a chat thread resolving
 * tickets, invoices consolidating, an order placed in a conversation, an
 * application moving through approval stages.
 */
type ArtProps = { className?: string };

const stroke = "var(--rk-ink)";
const hair = "var(--rk-hair)";
const accent = "var(--rk-accent)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

/** Resident support: enquiries arriving, answered automatically. */
export function ResidentSupportArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Frame>
        {/* building */}
        <rect x="26" y="46" width="62" height="106" rx="4" stroke={hair} strokeWidth="1.5" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={36 + col * 17}
              y={58 + row * 22}
              width="10"
              height="13"
              rx="1.5"
              fill={row === 1 && col === 1 ? accent : hair}
              opacity={row === 1 && col === 1 ? 1 : 0.75}
            />
          ))
        )}
        {/* thread */}
        <rect x="118" y="44" width="122" height="30" rx="15" stroke={hair} strokeWidth="1.5" />
        <rect x="132" y="55" width="66" height="7" rx="3.5" fill={hair} />
        <rect x="152" y="86" width="142" height="30" rx="15" stroke={stroke} strokeWidth="1.5" />
        <rect x="166" y="97" width="88" height="7" rx="3.5" fill={stroke} opacity="0.32" />
        <rect x="118" y="128" width="104" height="30" rx="15" stroke={hair} strokeWidth="1.5" />
        <rect x="132" y="139" width="52" height="7" rx="3.5" fill={hair} />
        {/* resolved tick */}
        <circle cx="272" cy="143" r="13" fill={accent} />
        <path
          d="M266 143.5l4.2 4.2 7.8-8.4"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Frame>
    </div>
  );
}

/** Finance automation: many branch invoices consolidating into one close. */
export function FinanceArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Frame>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={26}
              y={34 + i * 42}
              width="72"
              height="34"
              rx="5"
              stroke={hair}
              strokeWidth="1.5"
            />
            <rect x={38} y={44 + i * 42} width="34" height="5" rx="2.5" fill={hair} />
            <rect x={38} y={54 + i * 42} width="22" height="5" rx="2.5" fill={hair} />
            <path
              d={`M104 ${51 + i * 42} L150 90`}
              stroke={hair}
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
          </g>
        ))}
        {/* consolidated ledger */}
        <rect x="158" y="46" width="132" height="88" rx="8" stroke={stroke} strokeWidth="1.5" />
        <rect x="158" y="46" width="132" height="22" rx="8" fill={stroke} opacity="0.06" />
        <rect x="172" y="53" width="48" height="7" rx="3.5" fill={stroke} opacity="0.35" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={172} y={80 + i * 16} width="62" height="6" rx="3" fill={hair} />
            <rect
              x={244}
              y={80 + i * 16}
              width="32"
              height="6"
              rx="3"
              fill={i === 0 ? accent : hair}
            />
          </g>
        ))}
      </Frame>
    </div>
  );
}

/** Conversational commerce: an order placed inside a chat. */
export function CommerceArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Frame>
        {/* phone */}
        <rect x="30" y="24" width="104" height="132" rx="14" stroke={stroke} strokeWidth="1.5" />
        <rect x="44" y="46" width="58" height="22" rx="11" stroke={hair} strokeWidth="1.5" />
        <rect x="62" y="78" width="58" height="22" rx="11" fill={stroke} opacity="0.08" />
        <rect x="44" y="110" width="44" height="22" rx="11" stroke={hair} strokeWidth="1.5" />
        {/* product cards */}
        {[0, 1].map((i) => (
          <g key={i}>
            <rect
              x={160}
              y={38 + i * 62}
              width="130"
              height="52"
              rx="8"
              stroke={hair}
              strokeWidth="1.5"
            />
            <rect x={172} y={50 + i * 62} width="28" height="28" rx="5" fill={hair} />
            <rect x={210} y={54 + i * 62} width="56" height="6" rx="3" fill={hair} />
            <rect
              x={210}
              y={68 + i * 62}
              width="30"
              height="6"
              rx="3"
              fill={i === 0 ? accent : hair}
            />
          </g>
        ))}
        <circle cx="282" cy="146" r="12" fill={accent} />
        <path d="M277 146h10M282 141v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </Frame>
    </div>
  );
}

/** Loan origination: an application moving through stages to approval. */
export function LoanArt({ className }: ArtProps) {
  return (
    <div className={className}>
      <Frame>
        <path d="M40 90h236" stroke={hair} strokeWidth="1.5" strokeDasharray="3 5" />
        {[
          { x: 40, label: 0 },
          { x: 118, label: 1 },
          { x: 196, label: 2 },
          { x: 274, label: 3 },
        ].map((stage, i) => {
          const done = i < 3;
          return (
            <g key={stage.x}>
              <circle
                cx={stage.x}
                cy={90}
                r={i === 3 ? 17 : 13}
                fill={i === 3 ? accent : "var(--rk-paper)"}
                stroke={i === 3 ? accent : done ? stroke : hair}
                strokeWidth="1.5"
              />
              {i === 3 ? (
                <path
                  d="M267 90.5l5 5 9.5-10"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <circle cx={stage.x} cy={90} r="4" fill={done ? stroke : hair} />
              )}
            </g>
          );
        })}
        {/* documents feeding in */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={28 + i * 78}
              y={30}
              width="26"
              height="32"
              rx="3"
              stroke={hair}
              strokeWidth="1.5"
            />
            <rect x={34 + i * 78} y={38} width="14" height="4" rx="2" fill={hair} />
            <rect x={34 + i * 78} y={46} width="10" height="4" rx="2" fill={hair} />
          </g>
        ))}
        <rect x="242" y="122" width="62" height="30" rx="6" stroke={stroke} strokeWidth="1.5" />
        <rect x="254" y="133" width="38" height="8" rx="4" fill={accent} />
      </Frame>
    </div>
  );
}

export const CASE_ART = {
  "/case-studies/ai-resident-support-automation": ResidentSupportArt,
  "/case-studies/ai-finance-automation": FinanceArt,
  "/case-studies/ai-conversational-commerce": CommerceArt,
  "/case-studies/ai-loan-automation": LoanArt,
} as const;
