import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-100 p-12 relative overflow-hidden">
      {/* Animated Layered Blobs */}
      <div className="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl top-10 left-10 animate-blob opacity-70" />
      <div className="absolute w-80 h-80 bg-secondary/30 rounded-full blur-2xl bottom-20 right-10 animate-blob animation-delay-2000 opacity-50" />
      <div className="absolute w-60 h-60 bg-accent/40 rounded-full blur-xl top-1/3 left-1/2 animate-blob animation-delay-4000 opacity-30" />

      {/* Floating Squares */}
      <div className="absolute top-12 right-12 w-4 h-4 bg-primary/50 rounded animate-float" />
      <div className="absolute bottom-12 left-24 w-5 h-5 bg-secondary/50 rounded animate-float animation-delay-3000" />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />

      {/* Text Content */}
      <div className="relative z-10 text-center max-w-md animate-fade-in-up transform">
        <h2 className="text-4xl font-bold text-primary mb-3 tracking-wide">{title}</h2>
        <p className="text-base-content/70 text-lg">{subtitle}</p>

        {/* Floating Social Icons with Hover Animations */}
        <div className="mt-6 flex flex-row items-center justify-center gap-6">
          <a
            href="https://github.com/Chirag076"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 p-4 rounded-full text-3xl text-primary hover:text-primary hover:bg-white/20 transition duration-300 transform hover:scale-110 hover:animate-pulse hover:rotate-6"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/chirag-chhabra-766154293/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 p-4 rounded-full text-3xl text-primary hover:text-secondary hover:bg-white/20 transition duration-300 transform hover:rotate-6 hover:scale-110 hover:animate-pulse animation-delay-2000"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/chirag_chhabra07/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 p-4 rounded-full text-3xl text-primary hover:text-accent hover:bg-white/20 transition duration-300 transform hover:rotate-6 hover:scale-110 hover:animate-pulse animation-delay-4000"
            title="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
