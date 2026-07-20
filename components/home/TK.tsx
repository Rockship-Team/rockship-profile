/**
 * Marks a claim we cannot yet substantiate.
 *
 * Visible only in development: reviewers and engineers see exactly which
 * figures are placeholders, while production renders the text plainly so a
 * half-finished marker can never ship. Nothing here invents data — see
 * docs/rebrand/copy-v2.md for the outstanding list.
 */
export default function TK({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return <>{children}</>;
  return (
    <span
      title="Unverified — needs real data before launch"
      style={{
        backgroundColor: "#FBEFDC",
        boxShadow: "0 0 0 2px #FBEFDC",
        borderRadius: 2,
      }}
    >
      {children}
    </span>
  );
}
