<template>
  <div class="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-zinc-200 dark:border-zinc-800">
          <th class="px-4 py-2 text-left">Timestamp</th>
          <th class="px-4 py-2 text-left">Actor</th>
          <th class="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id" class="border-b border-zinc-100 dark:border-zinc-800/50">
          <td class="px-4 py-2 font-mono text-xs">{{ entry.timestamp }}</td>
          <td class="px-4 py-2">{{ entry.actorEmail }}</td>
          <td class="px-4 py-2">
            <span class="rounded-full px-2 py-0.5 text-xs" :class="badgeClass(entry.action)">
              {{ entry.action }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface AuditEntry {
  id: string;
  timestamp: string;
  actorEmail: string | null;
  action: 'LOGIN' | 'ROLE_CHANGE' | 'EXPORT' | 'DELETE';
}

interface Props {
  entries: AuditEntry[];
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'rowClick', id: string): void }>();

const DANGER_ACTIONS = new Set(['DELETE', 'ROLE_CHANGE']);

function badgeClass(action: AuditEntry['action']): string {
  return DANGER_ACTIONS.has(action)
    ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'
    : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300';
}

props.entries.forEach((entry) => emit('rowClick', entry.id));
</script>
