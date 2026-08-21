/**
 * PDPA & PII Data Masking Utilities
 * มาตรฐานการเซ็นเซอร์/มาสก์ข้อมูลส่วนบุคคลสำหรับแอปพลิเคชันไทย
 */

/**
 * มาสก์เบอร์โทรศัพท์ (รองรับเบอร์มือถือ 10 หลัก และเบอร์บ้าน 9 หลัก)
 * ตัวอย่าง: '0812345678' -> '081-xxx-5678'
 */
export function maskPhone(phone?: string | null): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-xxx-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 2)}-xxx-${cleaned.slice(5)}`;
  }
  if (cleaned.length > 4) {
    return `${cleaned.slice(0, 2)}****${cleaned.slice(-2)}`;
  }
  return "****";
}

/**
 * มาสก์เลขประจำตัวประชาชนไทย (13 หลัก)
 * ตัวอย่าง: '1103701234567' -> '1-xxxx-xxxxx-67-x'
 */
export function maskCitizenId(id?: string | null): string {
  if (!id) return "";
  const cleaned = id.replace(/\D/g, "");
  if (cleaned.length === 13) {
    return `${cleaned[0]}-xxxx-xxxxx-${cleaned.slice(10, 12)}-x`;
  }
  if (cleaned.length > 4) {
    return `${cleaned.slice(0, 1)}***********${cleaned.slice(-1)}`;
  }
  return "*-****-*****-**-*";
}

/**
 * มาสก์เลขบัญชีธนาคาร (10-12 หลัก)
 * ตัวอย่าง: '1234567890' -> 'xxx-x-xx890'
 */
export function maskBankAccount(account?: string | null): string {
  if (!account) return "";
  const cleaned = account.replace(/\D/g, "");
  if (cleaned.length >= 10) {
    const last3 = cleaned.slice(-3);
    return `xxx-x-xx${last3}`;
  }
  if (cleaned.length > 3) {
    return `******${cleaned.slice(-3)}`;
  }
  return "******";
}

/**
 * มาสก์อีเมล
 * ตัวอย่าง: 'jack.stxrfxll@gmail.com' -> 'j***l@gmail.com'
 */
export function maskEmail(email?: string | null): string {
  if (!email || !email.includes("@")) return "";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return `*@${domain}`;
  }
  const first = localPart[0];
  const last = localPart[localPart.length - 1];
  return `${first}***${last}@${domain}`;
}
