import { Text, type TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export type TypographyProps = TextProps & {
  variant?: 'default' | 'defaultSemibold' | 'title' | 'subTitle' | 'link' | 'muted';
  className?: string;
};

const variantClasses: Record<NonNullable<TypographyProps['variant']>, string> = {
  default:        'text-base text-text dark:text-text-dark tracking-wide',
  defaultSemibold:'text-base font-semibold text-text dark:text-text-dark tracking-wide',
  title:          'text-2xl font-bold text-text dark:text-text-dark tracking-wide',
  subTitle:       'text-xl font-semibold text-text dark:text-text-dark tracking-wide',
  link:           'text-base text-link dark:text-link-dark underline tracking-wide',
  muted:          'text-muted dark:text-muted-dark tracking-wide',
};

export const Typography = ({ variant = 'default', className = '', ...rest }: TypographyProps) => (
  <Text className={twMerge(variantClasses[variant], className)} {...rest} />
);

export default Typography;
