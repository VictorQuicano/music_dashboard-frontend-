export default function CardContainer({ children, className = "" }) {
  return (
    <div
      className={`w-full flex flex-col bg-[#282b33] rounded-2xl p-4 mb-2 ${className}`}
    >
      {children}
    </div>
  );
}
