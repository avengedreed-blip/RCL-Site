/** Decorative stroke follows the actual frame perimeter without covering media. */
export function FrameGlint() {
  return (
    <svg className="frame-glint" aria-hidden="true" focusable="false">
      <rect x="1" y="1" pathLength="100" />
    </svg>
  );
}
