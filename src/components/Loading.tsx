import logo from "../assets/full-logo.png";

export default function Loading() {
  return (
    <div className="w-screen h-full flex items-center justify-center">
      <img className="animate-pulse" src={logo} />
    </div>
  );
}
