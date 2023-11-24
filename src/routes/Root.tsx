import { Feed } from '@/components/feed';

export default function Home() {
  return (
    <main className="flex justify-center">
      {/* Left Navigation */}
      {/* News Feed & Stories */}
      <Feed />
      {/* Right Profile, Suggestions & Footer */}
    </main>
  );
}
