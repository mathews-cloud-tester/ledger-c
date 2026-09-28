import assert from "node:assert/strict";
import { test } from "node:test";
import { createInvoice, listInvoices, validateInvoice } from "../src/api/invoices.ts";

test("creates an invoice with the region fee", () => {
  const response = createInvoice({ customerId: "c_1", amount: 100_000, region: "eu-west" });
  assert.equal(response.status, 201);
  assert.equal(response.body.fee, 250);
  assert.equal(response.body.customerId, "c_1");
  assert.equal(response.body.currency, "EUR");
  assert.equal(listInvoices().status, 200);
});

test("trims customerId and applies defaults", () => {
  const response = createInvoice({ customerId: "  c_2  ", amount: 5_000 });
  assert.equal(response.status, 201);
  assert.equal(response.body.customerId, "c_2");
  assert.equal(response.body.currency, "EUR");
  assert.equal(response.body.memo, "");
});

test("accepts an explicit currency and memo", () => {
  const response = createInvoice({ customerId: "c_3", amount: 1_000, currency: "USD", memo: "hello" });
  assert.equal(response.status, 201);
  assert.equal(response.body.currency, "USD");
  assert.equal(response.body.memo, "hello");
});

test("rejects a missing customerId", () => {
  const response = createInvoice({ amount: 100 } as never);
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /customerId/);
});

test("rejects an empty customerId", () => {
  const response = createInvoice({ customerId: "   ", amount: 100 });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /customerId/);
});

test("rejects a missing amount", () => {
  const response = createInvoice({ customerId: "c_4" } as never);
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /amount/);
});

test("rejects a non-numeric amount", () => {
  const response = createInvoice({ customerId: "c_5", amount: "12" as unknown as number });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /amount/);
});

test("rejects a non-integer amount", () => {
  const response = createInvoice({ customerId: "c_6", amount: 12.5 });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /integer/);
});

test("rejects a non-finite amount", () => {
  const response = createInvoice({ customerId: "c_7", amount: Number.POSITIVE_INFINITY });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /finite/);
});

test("rejects a zero or negative amount", () => {
  assert.equal(createInvoice({ customerId: "c_8", amount: 0 }).status, 400);
  assert.equal(createInvoice({ customerId: "c_9", amount: -5 }).status, 400);
});

test("rejects an amount above the maximum", () => {
  const response = createInvoice({ customerId: "c_10", amount: 1_000_000_000_001 });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /at most/);
});

test("rejects an invalid currency", () => {
  const response = createInvoice({ customerId: "c_11", amount: 100, currency: "eur" });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /currency/);
});

test("rejects an unsupported region", () => {
  const response = createInvoice({ customerId: "c_12", amount: 100, region: "mars-1" });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /region/);
});

test("rejects a non-string memo", () => {
  const response = createInvoice({ customerId: "c_13", amount: 100, memo: 5 as unknown as string });
  assert.equal(response.status, 400);
  assert.match(response.body.error as string, /memo/);
});

test("rejects a non-object body", () => {
  assert.equal(createInvoice(null as never).status, 400);
  assert.equal(validateInvoice(null as never), "request body must be a JSON object");
});
