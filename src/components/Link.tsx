import { Link as RouterLink } from "react-router-dom";

export const Link = ({ text, to, ...props }: { text: string; to: string }) => (
  <RouterLink to={to} className="underline hover:no-underline" {...props}>
    {text}
  </RouterLink>
);
