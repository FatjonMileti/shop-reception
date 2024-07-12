export const trimString = (string: string, length: number) => {
  if (string?.length <= length) return string

  const trimmedString = string?.slice(0, length)?.trim();
  return `${trimmedString}...`
}
