import type { DetailedHTMLProps, HTMLAttributes } from "react";

type LordIconProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  colors?: string;
  trigger?: string;
  state?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": LordIconProps;
    }
  }
}

export {};
