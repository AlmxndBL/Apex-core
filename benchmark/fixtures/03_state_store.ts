import { ref, computed } from 'vue';

export interface MemberItem {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
}

export interface QueryFilter {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export function useMemberStore() {
  const members = ref<MemberItem[]>([]);
  const activeMember = ref<MemberItem | null>(null);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);
  const totalCount = ref<number>(0);

  const adminMembers = computed(() => members.value.filter((m) => m.role === 'ADMIN'));
  const memberCount = computed(() => members.value.length);

  async function loadMembers(filters: QueryFilter = {}) {
    isLoading.value = true;
    errorMessage.value = null;
    try {
      // Simulated typed fetch query
      const response = await fetch(`/api/v1/members?page=${filters.page || 1}`);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const result = await response.json();
      members.value = result.data;
      totalCount.value = result.pagination?.total || result.data.length;
    } catch (err: any) {
      errorMessage.value = err.message || 'Failed to retrieve member list.';
    } finally {
      isLoading.value = false;
    }
  }

  async function updateMemberOptimistic(id: string, updates: Partial<MemberItem>) {
    const originalList = [...members.value];
    const targetIdx = members.value.findIndex((m) => m.id === id);
    if (targetIdx === -1) return;

    // 1. Optimistic Update in RAM
    members.value[targetIdx] = { ...members.value[targetIdx], ...updates };

    try {
      const res = await fetch(`/api/v1/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Update mutation rejected by server');
    } catch (err: any) {
      // 2. Rollback on failure
      members.value = originalList;
      errorMessage.value = 'Failed to persist changes. State rolled back.';
    }
  }

  return {
    members,
    activeMember,
    isLoading,
    errorMessage,
    totalCount,
    adminMembers,
    memberCount,
    loadMembers,
    updateMemberOptimistic,
  };
}
