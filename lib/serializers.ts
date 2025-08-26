// lib/serializers.ts
import { createSerializer, parseAsString, parseAsIndex } from "nuqs";

export const searchParams = {
  q: parseAsString.withDefault(""),
  page: parseAsIndex.withDefault(1),
};

export const serialize = createSerializer(searchParams);
