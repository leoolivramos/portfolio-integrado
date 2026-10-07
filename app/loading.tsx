export default function Loading() {
  return (
    <main className="min-h-screen bg-background font-sans pt-16 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 space-y-16 animate-pulse">

        {/* Hero Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-36 bg-parchment rounded-sm" />
            <div className="h-14 w-2/3 bg-parchment rounded-sm" />
            <div className="h-4 w-full max-w-lg bg-parchment/60 rounded-sm" />
            <div className="h-4 w-2/3 max-w-md bg-parchment/60 rounded-sm" />
          </div>

          <div className="flex gap-3 pt-2">
            <div className="h-9 w-32 bg-parchment rounded-sm" />
            <div className="h-9 w-9 bg-parchment rounded-sm" />
            <div className="h-9 w-9 bg-parchment rounded-sm" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 border border-border rounded-sm bg-card space-y-3">
              <div className="h-3 w-20 bg-parchment rounded-sm" />
              <div className="h-8 w-16 bg-parchment rounded-sm" />
              <div className="h-3 w-32 bg-parchment/60 rounded-sm" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-44 bg-parchment rounded-sm" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-48 bg-card border border-border rounded-sm" />
            <div className="h-48 bg-card border border-border rounded-sm" />
          </div>
        </div>

      </div>
    </main>
  );
}