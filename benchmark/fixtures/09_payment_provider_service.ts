export interface ChargeRequest {
  amountMinor: number;
  currency: 'THB' | 'USD';
  sourceId: string;
  idempotencyKey: string;
}

export interface ChargeResult {
  providerChargeId: string;
  status: 'SUCCEEDED' | 'PENDING' | 'FAILED';
  failureReason?: string;
}

export interface PaymentProvider {
  charge(request: ChargeRequest): Promise<ChargeResult>;
  refund(providerChargeId: string, amountMinor: number): Promise<ChargeResult>;
}

export class InsufficientBalanceError extends Error {
  constructor(public readonly requiredMinor: number) {
    super('Insufficient balance');
    this.name = 'InsufficientBalanceError';
  }
}

export class MockPaymentProvider implements PaymentProvider {
  private ledger = new Map<string, ChargeResult>();

  async charge(request: ChargeRequest): Promise<ChargeResult> {
    if (request.amountMinor <= 0) {
      throw new RangeError('amountMinor must be positive');
    }
    const replayed = this.ledger.get(request.idempotencyKey);
    if (replayed) return replayed;

    const result: ChargeResult = request.amountMinor > 5_000_00
      ? { providerChargeId: `ch_${Date.now()}`, status: 'FAILED', failureReason: 'limit_exceeded' }
      : { providerChargeId: `ch_${Date.now()}`, status: 'SUCCEEDED' };

    this.ledger.set(request.idempotencyKey, result);
    return result;
  }

  async refund(providerChargeId: string, amountMinor: number): Promise<ChargeResult> {
    if (amountMinor <= 0) throw new RangeError('refund must be positive');
    return { providerChargeId, status: 'SUCCEEDED' };
  }
}
