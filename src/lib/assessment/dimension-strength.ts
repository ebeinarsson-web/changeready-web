export function describeDimensionStrength(sum: number): string {
  if (sum >= 18) {
    return "Mjög sterk";
  }

  if (sum >= 16) {
    return "Sterk";
  }

  if (sum >= 13) {
    return "Góð";
  }

  if (sum >= 11) {
    return "Í meðallagi";
  }

  if (sum >= 9) {
    return "Hófleg";
  }

  return "Varkár";
}

export function formatTotalScoreLine(total: number): string {
  return `${total} af 50`;
}
