import { z } from "zod";

/**
 * Lenient string schema: coerces accidental number/boolean inputs to strings,
 * then validates as a non-empty trimmed string.
 */
export function lenientString() {
  return z.preprocess(
    (v) => typeof v === 'number' || typeof v === 'boolean' ? String(v) : v,
    z.string().trim().min(1)
  );
}

/**
 * Lenient optional number: accepts numbers and non-blank numeric strings,
 * falls back to undefined on invalid input instead of throwing a validation error.
 */
export function lenientOptionalNumber() {
  return z.preprocess(optionalNumberInput, z.number().finite().optional()).catch(undefined);
}

function optionalNumberInput(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim() === '' ? undefined : Number(value);
  }
  // Number(null), Number(false), Number([]), and Number([1]) silently invent
  // numeric settings. In particular, a false/empty maxAgeHours forces a crawl.
  return typeof value === 'number' ? value : undefined;
}

/**
 * Lenient optional positive number: same as lenientOptionalNumber but requires min(1).
 */
export function lenientOptionalPositiveNumber() {
  return z.preprocess(optionalNumberInput, z.number().finite().min(1).optional()).catch(undefined);
}

/**
 * Lenient optional boolean: coerces common string representations
 * ("true", "True", "1", "yes", "false", "False", "0", "no") to booleans,
 * falls back to undefined on unrecognised input.
 */
export function lenientOptionalBoolean() {
  return z.preprocess(
    (v) => {
      if (typeof v === 'string') {
        const lower = v.toLowerCase();
        if (['true', '1', 'yes'].includes(lower)) return true;
        if (['false', '0', 'no'].includes(lower)) return false;
      }
      return v;
    },
    z.boolean().optional()
  ).catch(undefined);
}
