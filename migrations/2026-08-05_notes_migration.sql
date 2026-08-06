-- Migration notes : conversion bytea -> text + ajout colonnes manquantes
-- À exécuter en entier, ce fichier ne contient PAS de rollback.

-- 1) Vérification préalable
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'notes'
  AND column_name IN ('encrypted_content','content_iv','title_iv','history');

-- 2) Convertir encrypted_content (bytea -> text) si nécessaire
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='notes' AND column_name='encrypted_content' AND data_type='bytea'
  ) THEN
    ALTER TABLE public.notes
      ALTER COLUMN encrypted_content TYPE text
      USING convert_from(encrypted_content, 'UTF8');
  END IF;
END
$$;

-- 3) Convertir content_iv (bytea -> text) si nécessaire
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='notes' AND column_name='content_iv' AND data_type='bytea'
  ) THEN
    ALTER TABLE public.notes
      ALTER COLUMN content_iv TYPE text
      USING convert_from(content_iv, 'UTF8');
  END IF;
END
$$;

-- 4) Ajouter history si absente
ALTER TABLE public.notes
  ADD COLUMN IF NOT EXISTS history jsonb NOT NULL DEFAULT '[]'::jsonb;

-- 5) Ajouter title_iv si absente
ALTER TABLE public.notes
  ADD COLUMN IF NOT EXISTS title_iv text;

-- 6) Vérification finale : tout doit être présent
SELECT column_name, data_type=
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'notes'
  AND column_name IN ('encrypted_content','content_iv','title_iv','history');

SELECT id, content_iv, title_iv, left(encrypted_content, 60) AS apercu
FROM public.notes
LIMIT 5;