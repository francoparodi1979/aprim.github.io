import Image from "next/image";

export function LungAnatomy() {
  return (
    <div className="lung-anatomy" style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        src="/realistic-lungs.png"
        alt="Anatomically detailed pair of human lungs, breathing"
        fill
        style={{ 
          objectFit: 'contain', 
          filter: 'drop-shadow(0 18px 28px rgba(120,40,30,0.30)) drop-shadow(0 4px 8px rgba(80,20,16,0.25))' 
        }}
        priority
      />
    </div>
  );
}
