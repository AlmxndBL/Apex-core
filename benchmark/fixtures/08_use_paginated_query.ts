import { ref, computed, type Ref } from 'vue';
import { z } from 'zod';

export const PaginatedResponse = z.object({
  items: z.array(z.unknown()),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});

export type PaginatedResponse<T> = z.infer<typeof PaginatedResponse> & { items: T[] };

export interface UsePaginatedQueryOptions<T> {
  fetchPage: (page: number, pageSize: number) => Promise<PaginatedResponse<T>>;
  pageSize?: number;
}

export function usePaginatedQuery<T>(options: UsePaginatedQueryOptions<T>) {
  const page = ref(1);
  const items: Ref<T[]> = ref([]);
  const total = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / (options.pageSize ?? 20))));
  const hasNext = computed(() => page.value < totalPages.value);
  const hasPrev = computed(() => page.value > 1);

  async function load(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const size = options.pageSize ?? 20;
      const res = await options.fetchPage(page.value, size);
      items.value = res.items;
      total.value = res.total;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load page';
    } finally {
      isLoading.value = false;
    }
  }

  async function next(): Promise<void> {
    if (!hasNext.value) return;
    page.value += 1;
    await load();
  }

  async function prev(): Promise<void> {
    if (!hasPrev.value) return;
    page.value -= 1;
    await load();
  }

  return { page, items, total, isLoading, error, totalPages, hasNext, hasPrev, load, next, prev };
}
