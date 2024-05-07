export default function calcSb(SG: number) {
  const afterDecimal = SG - 1;
  return 1 + Math.round((afterDecimal * 2000) / 3) / 1000;
}
