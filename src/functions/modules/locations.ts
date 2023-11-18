function levenshteinDistance(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  return a[0] === b[0]
    ? levenshteinDistance(a.slice(1), b.slice(1))
    : Math.min(
        levenshteinDistance(a.slice(1), b),
        levenshteinDistance(a, b.slice(1)),
        levenshteinDistance(a.slice(1), b.slice(1))
      ) + 1;
}

export function findClosestCommand(command: string, validCommands: any) {
  let closestCommand = '';
  let shortestDistance = Infinity;

  for (const validCommand of validCommands) {
    const distance = levenshteinDistance(command, validCommand);
    if (distance < shortestDistance) {
      closestCommand = validCommand;
      shortestDistance = distance;
    }
  }
  return closestCommand;
}
