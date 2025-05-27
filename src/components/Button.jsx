export default function Button({ children }) {
  return (
    <button className="bg-[#007fff] text-white w-full py-4 rounded-2xl font-semibold cursor-pointer ">
      {children}
    </button>
  );
}
