export const HeadingLevel1 = ({ text, ...props }: { text: string }) => (
  <h1 className="text-2xl font-semibold text-gray-900" {...props}>
    {text}
  </h1>
);
