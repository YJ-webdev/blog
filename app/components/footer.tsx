import { ModeToggle } from './mode-toggle';

export default async function Footer() {
  return (
    <footer className="relative h-50 flex flex-col items-center gap-2 mb-5">
      <div className="flex flex-col w-full md:w-1/2 mx-auto justify-center mt-10 mb-20 gap-4">
        <iframe
          src="https://coupa.ng/chFqOC"
          height="75"
          frameBorder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
        />
        <p className="text-xs text-center text-muted-foreground">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
          제공받습니다.
        </p>
      </div>

      <p className="text-muted-foreground text-xs md:text-sm text-center">
        All rights reserved @2025
      </p>

      <div className="absolute bottom-0 left-0">
        <ModeToggle />
      </div>
    </footer>
  );
}
