export default function extractAddressFromUrl(url: string): string | null {
  const regex = /0x[a-fA-F0-9]+/;
  const match = url.match(regex);
  return match ? match[0] : null;
}
