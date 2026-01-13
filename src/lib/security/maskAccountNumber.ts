/**
 * 口座番号をマスキングする
 * 最後の4桁以外を伏せ字にする
 * @param accountNumber - 口座番号
 * @returns マスキングされた口座番号
 */
export function maskAccountNumber(
  accountNumber: string | null | undefined
): string {
  if (!accountNumber) return "";

  // 口座番号が4桁以下の場合は全てマスク
  if (accountNumber.length <= 4) {
    return "*".repeat(accountNumber.length);
  }

  // 最後の4桁以外をマスク
  const lastFourDigits = accountNumber.slice(-4);
  const maskedPart = "*".repeat(accountNumber.length - 4);

  return maskedPart + lastFourDigits;
}
