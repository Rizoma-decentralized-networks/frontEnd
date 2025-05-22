import { Link } from "react-router";


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
          <h1 className="mb-5 text-5xl font-bold">Your city, from the ground up</h1>
          <p className="mb-5">
            Map, share and connect what flourishes in the collective.
          </p>
          <Link to="/explore">
            <button className="btn btn-primary mr-4">View Initiatives</button>
          </Link>
          <button className="btn btn-secondary">View Map</button>
        </div>
      </div>
    </div>
  );
}
