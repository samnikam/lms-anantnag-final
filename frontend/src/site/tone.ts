/**
 * The accent families, in one place.
 *
 * Each tone carries four class strings: a `soft` wash for a blocked card, a
 * `solid` fill, the `text` colour that stays legible on the soft wash, and
 * `on` — the colour an icon or label takes when it sits on the solid fill.
 * Gold is bright enough that white disappears on it, so `on` is not the same
 * for every tone, which is exactly why it is recorded rather than assumed.
 */
export const TONE = {
  coral: {
    soft: 'bg-accent-coral-soft',
    solid: 'bg-accent-coral',
    text: 'text-accent-coral-deep',
    on: 'text-white',
  },
  mint: {
    soft: 'bg-accent-mint-soft',
    solid: 'bg-accent-mint',
    text: 'text-accent-mint-deep',
    on: 'text-white',
  },
  sky: {
    soft: 'bg-accent-sky-soft',
    solid: 'bg-accent-sky',
    text: 'text-accent-sky-deep',
    on: 'text-white',
  },
  amber: {
    soft: 'bg-accent-amber-soft',
    solid: 'bg-accent-amber',
    text: 'text-accent-amber-deep',
    // White vanishes on gold; the near-black reads at 8.7:1.
    on: 'text-ink',
  },
  violet: {
    soft: 'bg-accent-violet-soft',
    solid: 'bg-accent-violet',
    text: 'text-accent-violet-deep',
    on: 'text-white',
  },
  brand: {
    soft: 'bg-tint-brand',
    solid: 'bg-brand-700',
    text: 'text-brand-600',
    on: 'text-white',
  },
} as const;

export type Tone = keyof typeof TONE;
