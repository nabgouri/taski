export default function Button({ children, className, ...rest }) {
  return (
    <button
      className={`bg-[#007fff] text-white py-4 px-5 rounded-2xl font-semibold cursor-pointer ${className} `}
      {...rest}
    >
      {children}
    </button>
  );
}
