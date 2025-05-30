const inputControles = ["input", "textarea", "select"];

export default function Input({
  type,
  label,
  placeholder,
  className,
  contolTag = "input",
  ...rest
}) {
  let ControlTag = inputControles.find((element) => element === contolTag);
  return (
    <div className={className}>
      <label htmlFor={type} className="block text-sm font-semibold  ">
        {label}
      </label>
      <ControlTag
        placeholder={placeholder}
        type={type}
        id={type}
        className="mt-2.5 w-full py-4 rounded-[15px] pl-4 bg-[#F5F7F9] placeholder:text-[#BABABA] placeholder:text-sm  font-medium"
        {...rest}
      ></ControlTag>
    </div>
  );
}
