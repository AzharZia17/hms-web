export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="grid min-h-[60vh] place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-gold" />
    </div>
  );
}
