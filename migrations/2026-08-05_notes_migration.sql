-- Migration: notes table migration
-- Date: 2026-08-05
-- Purpose: Convert encrypted blobs from bytea -> text (base64), add history jsonb and title_iv text
-- IMPORTANT: Ensure public.profiles columns (salt, encrypted_verifier, verifier_iv) are of type text BEFORE running this migration.

-- 0) Quick check: confirm notes table is empty or not
--   SELECT COUNT(*) FROM public.notes;

-- 1) Safety check: ensure 'profiles' columns are text
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
  AND column_name IN ('salt','encrypted_verifier','verifier_iv');

-- === MIGRATION START ===

-- 2) Convert encrypted_content from bytea -> text (base64) if it's currently bytea
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='notes' AND column_name='encrypted_content' AND data_type='bytea'
  ) THEN
    RAISE NOTICE 'Converting encrypted_content from bytea to text (base64)';
    ALTER TABLE public.notes
      ALTER COLUMN encrypted_content TYPE text
      USING encode(encrypted_content, 'base64');
  ELSE
    RAISE NOTICE 'encrypted_content is not bytea; skipping conversion';
  END IF;
END
$$;

-- 3) Convert content_iv from bytea -> text (base64) if it's currently bytea
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='notes' AND column_name='content_iv' AND data_type='bytea'
  ) THEN
    RAISE NOTICE 'Converting content_iv from bytea to text (base64)';
    ALTER TABLE public.notes
      ALTER COLUMN content_iv TYPE text
      USING encode(content_iv, 'base64');
  ELSE
    RAISE NOTICE 'content_iv is not bytea; skipping conversion';
  END IF;
END
$$;

-- 4) Add history jsonb column if missing (default to empty array)
ALTER TABLE public.notes
  ADD COLUMN IF NOT EXISTS history jsonb NOT NULL DEFAULT '[]'::jsonb;

-- 5) Add title_iv text column if missing
ALTER TABLE public.notes
  ADD COLUMN IF NOT EXISTS title_iv text;

-- 6) Final quick inspection: show up to 10 rows (may be empty)
SELECT id, encrypted_content IS NOT NULL AS has_encrypted_content, content_iv IS NOT NULL AS has_iv, jsonb_array_length(history) AS history_len
FROM public.notes
LIMIT 10;

-- === MIGRATION END ===

-- === ROLLBACK (run ONLY if you need to revert the above changes) ===
-- Keep this ready before performing migration.

-- A) Revert encrypted_content text(base64) -> bytea
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='notes' AND column_name='encrypted_content' AND data_type='text'
  ) THEN
    RAISE NOTICE 'Reverting encrypted_content from text (base64) to bytea';
    ALTER TABLE public.notes
      ALTER COLUMN encrypted_content TYPE bytea
      USING decode(encrypted_content, 'base64');
  ELSE
    RAISE NOTICE 'encrypted_content is not text; skipping revert';
  END IF;
END
$$;

-- B) Revert content_iv text(base64) -> bytea
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='notes' AND column_name='content_iv' AND data_type='text'
  ) THEN
    RAISE NOTICE 'Reverting content_iv from text (base64) to bytea';
    ALTER TABLE public.notes
      ALTER COLUMN content_iv TYPE bytea
      USING decode(content_iv, 'base64');
  ELSE
    RAISE NOTICE 'content_iv is not text; skipping revert';
  END IF;
END
$$;

-- C) Drop history column
ALTER TABLE public.notes
  DROP COLUMN IF EXISTS history;

-- D) Drop title_iv column
ALTER TABLE public.notes
  DROP COLUMN IF EXISTS title_iv;

-- End of rollback

-- Notes:
-- - If encrypted_content/content_iv were proper bytea containing binary ciphertext/iv,
--   encode(...,'base64') safely converts them to text base64. decode(...,'base64') restores them.
-- - If these columns already contained base64 text that was incorrectly stored into bytea by a buggy client,
--   the conversion may produce unexpected content; inspect sample rows after migration.
-- - Always test end-to-end after migration: create a profile, derive key, save a note, reload and decrypt.
