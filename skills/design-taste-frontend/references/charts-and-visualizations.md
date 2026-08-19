# 📈 Charts & Visualizations Guide (@unovis/vue + Thai Calendar)

คู่มือการสร้าง Data Visualizations ระดับโปรดักชันด้วย **Unovis (`@unovis/vue`)**, **DateRangePicker พ.ศ.** และ **Period Selector**

---

## 💵 1. Cashflow Dual Line + Area Chart

แสดงกระแสเงินสดเปรียบเทียบ รายรับ (Emerald Green `#10b981`) vs รายจ่าย (Amber `#f59e0b`) พร้อมยอดสุทธิและ Tooltip ภาษาไทย:

```vue
<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from "@unovis/vue";
import { useElementSize } from "@vueuse/core";

const cardRef = useTemplateRef<HTMLElement | null>("cardRef");
const { width } = useElementSize(cardRef);

export interface CashflowPoint {
  date: Date;
  income: number;
  expense: number;
  net: number;
}

const props = defineProps<{
  data: CashflowPoint[];
  totalNet: number;
}>();

const x = (_: CashflowPoint, i: number) => i;
const yIncome = (d: CashflowPoint) => d.income;
const yExpense = (d: CashflowPoint) => d.expense;

const xTicks = (i: number) => {
  if (!props.data[i]) return "";
  const d = props.data[i].date;
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const formatCurrency = (val: number) => `฿${val.toLocaleString("th-TH")}`;

const tooltipTemplate = (d: CashflowPoint) => `
  <div class="p-2 space-y-1 text-xs rounded shadow-lg bg-default border border-default">
    <div class="font-semibold text-muted">${d.date.toLocaleDateString("th-TH")}</div>
    <div class="text-emerald-600 dark:text-emerald-400">รายรับ: ${formatCurrency(d.income)}</div>
    <div class="text-amber-600 dark:text-amber-400">รายจ่าย: ${formatCurrency(d.expense)}</div>
    <div class="font-bold ${d.net >= 0 ? 'text-primary' : 'text-rose-600'}">สุทธิ: ${formatCurrency(d.net)}</div>
  </div>
`;
</script>

<template>
  <section
    ref="cardRef"
    class="border border-default/30 bg-default p-4 dark:border-default/20 dark:bg-elevated/55 rounded-lg"
  >
    <!-- Header with KPI Summary & Legend -->
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <div>
        <p class="text-xs text-muted">สรุปกระแสเงินสดสุทธิ</p>
        <p class="text-2xl font-bold text-highlighted sm:text-3xl tabular-nums">
          {{ formatCurrency(totalNet) }}
        </p>
      </div>
      <div class="flex items-center gap-3 text-xs">
        <span class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <span class="size-2.5 rounded-full bg-emerald-500" />
          รายรับ
        </span>
        <span class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
          <span class="size-2.5 rounded-full bg-amber-500" />
          รายจ่าย
        </span>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="relative h-72 sm:h-80">
      <VisXYContainer
        v-if="data.length"
        :data="data"
        :padding="{ top: 24, right: 12, bottom: 24, left: 12 }"
        class="h-full"
        :width="width"
      >
        <!-- Income Plot -->
        <VisLine :x="x" :y="yIncome" color="#10b981" :stroke-width="2" />
        <VisArea :x="x" :y="yIncome" color="#10b981" :opacity="0.1" />

        <!-- Expense Plot -->
        <VisLine :x="x" :y="yExpense" color="#f59e0b" :stroke-width="2" />
        <VisArea :x="x" :y="yExpense" color="#f59e0b" :opacity="0.1" />

        <VisAxis type="x" :x="x" :tick-format="xTicks" />
        <VisCrosshair :x="x" :template="tooltipTemplate" />
        <VisTooltip />
      </VisXYContainer>
    </div>
  </section>
</template>
```

---

## 📊 2. Grouped Bar Chart (Category Breakdown)

เปรียบเทียบสัดส่วนยอดขายหรือกิจกรรมตามหมวดหมู่:

```vue
<script setup lang="ts">
import { VisXYContainer, VisGroupedBar, VisAxis, VisCrosshair, VisTooltip } from "@unovis/vue";
import { useElementSize } from "@vueuse/core";

const cardRef = useTemplateRef<HTMLElement | null>("cardRef");
const { width } = useElementSize(cardRef);

const COLORS = ["var(--ui-primary)", "var(--ui-secondary)", "var(--ui-success)"];
const LABELS = ["หน้าร้าน", "ออนไลน์", "ตัวแทน"];
</script>

<template>
  <section ref="cardRef" class="border border-default/30 bg-default p-4 dark:border-default/20 dark:bg-elevated/55 rounded-lg">
    <div class="flex items-center justify-between mb-3">
      <p class="text-xs text-muted">เปรียบเทียบยอดขายตามช่องทาง</p>
      <div class="flex gap-3 text-xs text-muted">
        <span v-for="(label, i) in LABELS" :key="i" class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-sm" :style="{ background: COLORS[i] }" />
          {{ label }}
        </span>
      </div>
    </div>

    <div class="relative h-64 sm:h-72">
      <VisXYContainer :data="data" :padding="{ top: 24, right: 12, bottom: 24, left: 12 }" :y-domain="[0, undefined]" class="h-full" :width="width">
        <VisGroupedBar
          :x="x"
          :y="y"
          :color="COLORS"
          :rounded-corners="3"
          :bar-padding="0.1"
          :group-padding="0.2"
        />
        <VisAxis type="x" :x="x" :tick-format="xTicks" />
        <VisCrosshair :x="x" :y="y" :color="COLORS" :template="tooltipTemplate" />
        <VisTooltip />
      </VisXYContainer>
    </div>
  </section>
</template>
```

---

## 📅 3. DateRangePicker พ.ศ. & Period Selector (Toolbar Pattern)

วางไว้ใน `<UDashboardToolbar>`:

```vue
<UDashboardToolbar>
  <template #left>
    <ClientOnly>
      <div class="-ms-1 flex flex-wrap gap-2">
        <AdminDateRangePicker v-model="range" />
        <AdminPeriodSelect v-model="period" :range="range" />
      </div>
    </ClientOnly>
  </template>
</UDashboardToolbar>
```

### Key Conventions:
1. **พ.ศ. (Buddhist Era):** แปลงปีใน Dropdown หรือปฏิทินเสมอ (`year + 543`)
2. **Quick Presets:** ปุ่มลัดช่วงเวลา ("วันนี้", "7 วันที่ผ่านมา", "30 วันที่ผ่านมา", "3 เดือนที่ผ่านมา", "ปีนี้")
3. **Adaptive Calendar:** แสดง 1 เดือนบน Mobile และ 2 เดือนเคียงข้างกันบน Desktop
