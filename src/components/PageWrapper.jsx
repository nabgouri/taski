export default function PageWrapper({ children, className }) {
  return <article className={className}>{children}</article>;
}
