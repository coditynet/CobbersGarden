const LoadingDots = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="w-2 h-2 bg-garden-primary rounded-full animate-[bounce_0.7s_infinite]" />
      <div className="w-2 h-2 bg-garden-primary rounded-full animate-[bounce_0.7s_0.1s_infinite]" />
      <div className="w-2 h-2 bg-garden-primary rounded-full animate-[bounce_0.7s_0.2s_infinite]" />
    </div>
  );
};

export default LoadingDots; 