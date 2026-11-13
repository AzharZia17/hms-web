/** Colours every HMS product is available in (supplied by the client). */
export const colours = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Pink", hex: "#D6ACAD" },
  { name: "Blue", hex: "#7A9EB6" },
  { name: "Sage Green", hex: "#909B7B" },
  { name: "Gray", hex: "#7D7D7F" },
  { name: "Beige", hex: "#C5AF97" },
  { name: "Ivory", hex: "#EFE8D3" },
] as const;

export type Colour = (typeof colours)[number];
export type ColourName = Colour["name"];
