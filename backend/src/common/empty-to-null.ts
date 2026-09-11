import { Transform } from 'class-transformer';

/**
 * Treats an empty string as "not set" for an optional relation id.
 *
 * An unselected dropdown posts `''`, not `null`. Stored verbatim, that empty
 * string is neither a real id nor an absent one, so it falls through every
 * scoping clause written as `OR: [{ siteId: mine }, { siteId: null }]` — the
 * row becomes invisible to the people it belongs to while still showing to an
 * admin who reads the table unscoped. Normalising at the boundary keeps the
 * column to ids and nulls, which is what the scoping assumes.
 *
 * `@IsOptional()` skips validation for `null` as well as `undefined`, so this
 * composes with the `@IsString()` on the same field.
 */
export const EmptyToNull = () =>
  Transform(({ value }) => (typeof value === 'string' && value.trim() === '' ? null : value));
