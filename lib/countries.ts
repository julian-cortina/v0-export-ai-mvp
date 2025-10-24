// List of countries for origin and destination selection
export const countries = [
  { code: "AR", name: "Argentina" },
  { code: "BR", name: "Brasil" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "DE", name: "Alemania" },
  { code: "ES", name: "España" },
  { code: "EU", name: "Unión Europea" },
  { code: "IN", name: "India" },
  { code: "KR", name: "Corea del Sur" },
  { code: "MX", name: "México" },
  { code: "PE", name: "Perú" },
  { code: "CH", name: "Suiza" },
  { code: "US", name: "Estados Unidos" },
  { code: "UY", name: "Uruguay" },
]

export function getCountryName(code: string): string {
  return countries.find((c) => c.code === code)?.name || code
}
