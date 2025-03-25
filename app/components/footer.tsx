export default function Footer() {
  return (
    <footer className="relative px-4 h-50 flex flex-col items-center gap-2 mb-5">
      <div className="w-full md:w-[750px] mx-aut0 mb-2 mt-5 dark:bg-[#1f1f1f]">
        <iframe
          src="https://coupa.ng/chFqOC"
          height="75"
          className="w-full md:w-[750px] mx-auto mb-2 mt-5 dark:bg-[#1f1f1f]"
          frameBorder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
        />

        <p className="text-xs mb-14 text-center text-muted-foreground">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
          제공받습니다.
        </p>
      </div>

      <p className="text-muted-foreground text-xs md:text-sm text-center mt-10">
        All rights reserved @2025
      </p>
    </footer>
  );
}
