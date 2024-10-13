import logo from "/logo.webp";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/60 backdrop-blur">
      <div className="container flex h-14 items-center justify-center space-x-4">
        <h1 className="text-xl font-bold text-zinc-200">FIT3164: HallucinAI</h1>
      </div>
    </header>
  );
}

export default Header;
