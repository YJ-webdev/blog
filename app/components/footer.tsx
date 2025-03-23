import { ModeToggle } from './mode-toggle';

export default async function Footer() {
  // const session = await auth();
  return (
    <footer className="relative h-10">
      <p className="text-muted-foreground md:text-sm text-xs text-center">
        All rights reserved @2025
      </p>
      <div className="absolute bottom-[1rem] left-[1rem]">
        <ModeToggle />
      </div>
    </footer>
  );
}
