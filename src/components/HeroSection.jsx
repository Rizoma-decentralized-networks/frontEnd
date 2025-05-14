export default function HeroSection() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('/heroWelcome.jpg')",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Tu ciudad, desde abajo</h1>
          <p className="mb-5">
          Mapea, comparte y conecta lo que florece en lo colectivo.
          </p>
          <button className="btn btn-primary">Ver iniciativas</button>
          <button className="btn btn-primary">Ver mapa</button>
        </div>
      </div>
    </div>
  );
}
