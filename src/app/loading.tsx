export default function Loading() {
  return (
    <div className="container loading-state" role="status" aria-live="polite">
      <span className="eyebrow">ALDER & ROW</span>
      <p>Opening your everyday care experience…</p>
      <div className="loading-bar" aria-hidden="true" />
    </div>
  );
}
