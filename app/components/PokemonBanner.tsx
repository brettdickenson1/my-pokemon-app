import React from "react";
import Image from "next/image";

const PokemonBanner: React.FC = () => {
  return (
    <div
      className="relative"
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "var(--radius-2)",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Image
        src="https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Pokemon banner"
        className="object-cover w-full h-full transition-opacity opacity-0 duration-[0.3s]"
        layout="fill"
        loading="eager"
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
    </div>
  );
};

export default PokemonBanner;
