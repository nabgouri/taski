export default function Input({ type, label, placeholder }) {
  return (
    <div>
      <label htmlFor={type} className="block text-sm font-semibold  ">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={type}
        className="mt-2.5 py-4 rounded-[15px] pl-4 bg-[#F5F7F9] placeholder:text-[#BABABA] placeholder:text-sm  font-medium"
      />
    </div>
  );
}
