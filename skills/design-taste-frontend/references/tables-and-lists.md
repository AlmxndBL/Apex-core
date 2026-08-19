# 📊 Tables & Responsive Lists Guide (TanStack + Nuxt UI)

คู่มือและ Boilerplate การสร้างตารางข้อมูลและรายการแสดงผลแบบ **Dual Responsive Strategy** สำหรับ Enterprise Dashboard

---

## 🏗️ 1. The Dual Responsive Architecture (Desktop Table vs Mobile Cards)

ในระบบ Enterprise Dashboard ห้ามปล่อยให้ Table เลื่อนแนวนอนบนหน้าจอมือถือเด็ดขาด ให้ใช้โครงสร้างแยก 2 View เสมอ:
- **Desktop (≥ 768px - `hidden md:block`):** Full-featured `<UTable>` (TanStack Table Core) พร้อม Sticky Header, Checkbox Selection, และ Sortable Columns
- **Mobile (< 768px - `space-y-1 md:hidden`):** Touch-friendly Card List ที่แสดงข้อมูลสำคัญ ครบถ้วน กระชับ

---

## 💻 2. Desktop `UTable` Setup & Sizing (`adminTableUi`)

กำหนด Styling ให้ตารางมี Sticky Header, สลับสีแถว (Zebra/Subtle highlight) และมี Hover effect:

```typescript
export const adminTableUi = {
  root: "relative overflow-x-auto",
  base: "table-fixed border-separate border-spacing-0",
  thead: "sticky top-0 z-1 [&>tr]:bg-muted dark:[&>tr]:bg-elevated/60 [&>tr]:after:content-none",
  tbody: "[&>tr]:last:[&>td]:border-b-0 [&>tr>td:nth-child(even)]:bg-elevated/20 dark:[&>tr>td:nth-child(even)]:bg-elevated/25 [&>tr:hover>td]:bg-primary/5 dark:[&>tr:hover>td]:bg-elevated/45",
  th: "border-b border-default bg-muted dark:bg-elevated/60 py-2.5 font-semibold text-toned text-xs uppercase tracking-wide dark:border-default/30",
  td: "border-b border-default py-2.5 transition-colors dark:border-default/25",
  separator: "h-0",
} as const;
```

### Table Column Definition with `h()` Renderers:
```typescript
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");
const UIcon = resolveComponent("UIcon");

export interface DataItem {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive" | "pending";
  amount: number;
  createdAt: string;
}

export const createColumns = (
  onEdit: (item: DataItem) => void,
  onDelete: (item: DataItem) => void,
  cycleSorting: (col: any) => void
): TableColumn<DataItem>[] => [
  {
    id: "select",
    header: ({ table }) =>
      h("div", h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (v: boolean | "indeterminate") => table.toggleAllPageRowsSelected(Boolean(v)),
        ariaLabel: "Select all rows",
      })),
    cell: ({ row }) =>
      h("div", h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (v: boolean | "indeterminate") => row.toggleSelected(Boolean(v)),
        ariaLabel: "Select row",
      })),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const icon = !isSorted
        ? "i-lucide-arrow-up-down"
        : isSorted === "asc"
          ? "i-lucide-arrow-up-narrow-wide"
          : "i-lucide-arrow-down-wide-narrow";

      return h(UButton, {
        label: "ชื่อรายการ",
        color: "neutral",
        variant: "ghost",
        class: "-mx-2.5",
        icon,
        onClick: () => cycleSorting(column),
      });
    },
    cell: ({ row }) =>
      h("div", { class: "flex items-center gap-3" }, [
        h("div", { class: "size-9 rounded-lg flex items-center justify-center bg-primary/10 text-primary shrink-0" }, [
          h(UIcon, { name: "i-lucide-box", class: "size-5" }),
        ]),
        h("div", { class: "min-w-0" }, [
          h("p", { class: "font-semibold text-highlighted truncate" }, row.original.name),
          h("p", { class: "text-xs text-muted truncate max-w-48" }, row.original.category),
        ]),
      ]),
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const statusMap = {
        active: { label: "เปิดใช้งาน", color: "success" },
        pending: { label: "รอดำเนินการ", color: "warning" },
        inactive: { label: "ปิดใช้งาน", color: "error" },
      } as const;
      const target = statusMap[row.original.status] || { label: row.original.status, color: "neutral" };
      return h(UBadge, { color: target.color, variant: "subtle", size: "sm" }, () => target.label);
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) =>
      h("div", { class: "flex items-center justify-end gap-1" }, [
        h(UButton, { icon: "i-lucide-pencil", size: "xs", color: "neutral", variant: "ghost", onClick: () => onEdit(row.original) }),
        h(UButton, { icon: "i-lucide-trash-2", size: "xs", color: "error", variant: "ghost", onClick: () => onDelete(row.original) }),
      ]),
  },
];
```

---

## 📱 3. Mobile Card List Blueprint

```vue
<div class="space-y-1 md:hidden">
  <div
    v-for="item in items"
    :key="item.id"
    class="overflow-hidden rounded-md border border-default/30 bg-default p-2.5 transition duration-200 hover:border-default/45 dark:border-default/20 dark:bg-elevated/55"
  >
    <div class="flex items-center gap-2.5">
      <!-- Checkbox (Optional) -->
      <UCheckbox v-model="selectedMap[item.id]" class="shrink-0" />
      
      <!-- Leading Icon / Avatar -->
      <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <UIcon name="i-lucide-box" class="size-5" />
      </div>

      <!-- Main Content -->
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-highlighted">{{ item.name }}</p>
            <p class="truncate text-[11px] text-muted">{{ item.category }}</p>
          </div>
          <UBadge :color="item.status === 'active' ? 'success' : 'neutral'" variant="subtle" size="xs">
            {{ item.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
          </UBadge>
        </div>

        <!-- Meta Line: Created Date + Price/Value -->
        <div class="mt-1 flex items-center justify-between text-xs text-muted">
          <span>{{ item.createdAt }}</span>
          <span class="font-semibold text-primary tabular-nums">฿{{ item.amount.toLocaleString() }}</span>
        </div>

        <!-- Action Row -->
        <div class="mt-1 flex items-center justify-end border-t border-default/15 pt-1">
          <div class="flex items-center gap-1">
            <UButton icon="i-lucide-pencil" size="xs" color="neutral" variant="ghost" @click="handleEdit(item)" />
            <UButton icon="i-lucide-trash-2" size="xs" color="error" variant="ghost" @click="handleDelete(item)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🔍 4. List Toolbar & Filter Bar (`AdminListToolbar.vue`)

วางไว้เหนือ Table/List ทุกครั้งเพื่อรวม Search และ Action ไว้ในแถบเดียว:

```vue
<div class="flex flex-wrap items-center justify-between gap-2 rounded-md border border-default/30 bg-default p-2 dark:border-default/20 dark:bg-elevated/55">
  <!-- Search Input -->
  <div class="flex-1 min-w-[200px] max-w-sm">
    <UInput
      v-model="searchQuery"
      icon="i-lucide-search"
      placeholder="ค้นหาชื่อหรือข้อมูล..."
      size="sm"
      class="w-full"
    />
  </div>

  <!-- Filters & Primary Actions -->
  <div class="flex items-center gap-2">
    <USelectMenu
      v-model="statusFilter"
      :items="statusOptions"
      placeholder="สถานะทั้งหมด"
      size="sm"
    />
    <UButton
      label="สร้างรายการใหม่"
      icon="i-lucide-plus"
      color="primary"
      size="sm"
      @click="openCreateModal"
    />
  </div>
</div>
```

---

## 💀 5. Skeletons & Empty States

### Standard Empty State
```vue
<div class="flex flex-col items-center justify-center rounded-lg border border-dashed border-default/30 bg-default/55 px-4 py-10 text-center text-muted dark:border-default/20 dark:bg-elevated/30">
  <UIcon name="i-lucide-inbox" class="mb-3 size-10 opacity-50" />
  <p class="font-medium text-highlighted">ไม่พบข้อมูลในระบบ</p>
  <p class="mt-1 text-xs text-muted">ลองปรับคำค้นหา ตัวกรอง หรือกดสร้างรายการใหม่</p>
</div>
```

### Loading Skeleton (Dual Responsive)
```vue
<!-- Mobile skeleton -->
<div class="space-y-1.5 md:hidden">
  <USkeleton v-for="i in 5" :key="i" class="h-20 w-full rounded-md" />
</div>

<!-- Desktop skeleton -->
<div class="hidden space-y-2 rounded-lg border border-default/30 bg-default p-3 dark:border-default/20 dark:bg-elevated/55 md:block">
  <USkeleton v-for="i in 6" :key="i" class="h-10 w-full rounded-md" />
</div>
```
