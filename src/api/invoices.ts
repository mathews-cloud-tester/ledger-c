import { applyFee, feeScheduleFor } from "../ledger/index.ts";

export interface InvoiceRequest {
  customerId?: string;
  amount?: number;
  currency?: string;
  region?: string;
  memo?: string;
}

export interface ApiResponse {
  status: number;
  body: Record<string, unknown>;
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  fee: number;
  currency: string;
  memo: string;
}

const invoices: Invoice[] = [];

const MAX_AMOUNT = 1_000_000_000_000;
const MAX_CUSTOMER_ID_LENGTH = 64;
const MAX_MEMO_LENGTH = 500;
const CURRENCY_PATTERN = /^[A-Z]{3}$/;

function hasKnownFeeSchedule(region: string): boolean {
  try {
    feeScheduleFor(region);
    return true;
  } catch {
    return false;
  }
}

export function validateInvoice(body: InvoiceRequest): string | null {
  if (typeof body !== "object" || body === null) return "request body must be a JSON object";

  if (typeof body.customerId !== "string") return "customerId is required and must be a string";
  if (body.customerId.trim().length === 0) return "customerId must not be empty";
  if (body.customerId.length > MAX_CUSTOMER_ID_LENGTH) {
    return `customerId must be at most ${MAX_CUSTOMER_ID_LENGTH} characters`;
  }

  if (typeof body.amount !== "number") return "amount is required and must be a number";
  if (!Number.isFinite(body.amount)) return "amount must be a finite number";
  if (!Number.isInteger(body.amount)) return "amount must be an integer number of minor units";
  if (body.amount <= 0) return "amount must be greater than 0";
  if (body.amount > MAX_AMOUNT) return `amount must be at most ${MAX_AMOUNT}`;

  if (body.currency !== undefined) {
    if (typeof body.currency !== "string") return "currency must be a string";
    if (!CURRENCY_PATTERN.test(body.currency)) {
      return "currency must be a 3-letter uppercase ISO code";
    }
  }

  if (body.region !== undefined) {
    if (typeof body.region !== "string") return "region must be a string";
    if (!hasKnownFeeSchedule(body.region)) return `region ${body.region} is not supported`;
  }

  if (body.memo !== undefined) {
    if (typeof body.memo !== "string") return "memo must be a string";
    if (body.memo.length > MAX_MEMO_LENGTH) return `memo must be at most ${MAX_MEMO_LENGTH} characters`;
  }

  return null;
}

export function createInvoice(body: InvoiceRequest): ApiResponse {
  const problem = validateInvoice(body);
  if (problem) return { status: 400, body: { error: problem } };
  const region = body.region ?? "eu-west";
  const amount = body.amount as number;
  const fee = applyFee(amount, feeScheduleFor(region));
  const invoice: Invoice = {
    id: `inv_${invoices.length + 1}`,
    customerId: (body.customerId as string).trim(),
    amount,
    fee,
    currency: body.currency ?? "EUR",
    memo: body.memo ?? "",
  };
  invoices.push(invoice);
  return { status: 201, body: { ...invoice } };
}

export function listInvoices(): ApiResponse {
  return { status: 200, body: { invoices: [...invoices] } };
}
