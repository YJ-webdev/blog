import { Preview } from './components/preview';

export default function Home() {
  return (
    <div className="grid grid-cols-1 mt-6 md:grid-cols-2 gap-10 md:gap-16">
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
    </div>
  );
}
