export type IconKey =
  | "show-password"
  | "hide-password"
  | "attach-file"
  | "congratulations"
  | "close";

export default function Icon({
  src,
  size = 25,
  alt
}: {
  src: IconKey;
  alt?: string;
  size?: number;
  inverted?: boolean;
}) {
  return (
    <img
      width={size}
      height={size}
      src={`../../src/assets/icons/${src}.svg`}
      alt={alt ? alt : src}
    />
  );
}
