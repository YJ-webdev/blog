import { Preview } from './components/preview';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <Preview />
      <Preview />
      <Preview />
      <Preview />
      <Preview />
    </div>
  );
}
