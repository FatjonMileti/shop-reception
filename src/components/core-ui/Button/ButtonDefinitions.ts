export interface ButtonProps {
  label: string
  startIcon?: string
  endIcon?: string
  href?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  variable?: string
}
