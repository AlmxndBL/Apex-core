# 🧩 Components, Modals & Utility Controls Guide

คู่มือและตัวอย่างโค้ดสำหรับ Standard Components ที่ใช้บ่อยในระบบ: โมดอลยืนยัน, ระบบอัปโหลดรูปพร้อมกล้องมือถือ และปุ่ม Action มาตรฐาน

---

## 🛑 1. Standard Confirmation Modal (`ConfirmModal.vue`)

ใช้สำหรับ Action ที่มีความสำคัญหรือเสี่ยงกระทบข้อมูล (ลบรายการ, ยกเลิกเอกสาร, ยืนยันการชำระเงิน):

```vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
    description?: string;
    message: string;
    subMessage?: string;
    icon?: string;
    type?: "error" | "warning" | "info" | "success";
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
  }>(),
  {
    icon: "i-lucide-alert-triangle",
    type: "warning",
    confirmLabel: "ยืนยัน",
    cancelLabel: "ยกเลิก",
    loading: false,
  }
);

const emit = defineEmits<{
  (e: "update:open", val: boolean): void;
  (e: "confirm"): void;
}>();

const iconColorMap = {
  error: "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
  warning: "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  info: "bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
  success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
};

const buttonColorMap = {
  error: "error",
  warning: "warning",
  info: "primary",
  success: "success",
} as const;
</script>

<template>
  <UModal :open="open" :title="title" :description="description" @update:open="emit('update:open', $event)">
    <template #body>
      <div class="flex gap-4">
        <!-- Colored circular icon container -->
        <div class="shrink-0 size-12 rounded-full flex items-center justify-center" :class="iconColorMap[type]">
          <UIcon :name="icon" class="size-6" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-highlighted">{{ message }}</p>
          <p v-if="subMessage" class="mt-1 text-xs text-muted">{{ subMessage }}</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton :label="cancelLabel" color="neutral" variant="outline" @click="emit('update:open', false)" />
        <UButton :label="confirmLabel" :color="buttonColorMap[type]" :loading="loading" @click="emit('confirm')" />
      </div>
    </template>
  </UModal>
</template>
```

---

## 📷 2. Photo Upload & Direct Camera Capture (`PhotoUpload.vue`)

รองรับทั้งการเลือกไฟล์จากเครื่อง และการเปิดกล้องถ่ายภาพทันทีบน Mobile/Tablet สำหรับงานหน้างาน:

```vue
<script setup lang="ts">
const props = defineProps<{
  label: string;
  helperText?: string;
  photos: { key: string; url: string }[];
}>();

const emit = defineEmits<{
  (e: "add", files: FileList): void;
  (e: "remove", key: string): void;
}>();

const galleryRef = useTemplateRef<HTMLInputElement>("galleryRef");
const cameraRef = useTemplateRef<HTMLInputElement>("cameraRef");

const openGallery = () => galleryRef.value?.click();
const openCamera = () => cameraRef.value?.click();

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.length) {
    emit("add", input.files);
    input.value = "";
  }
};
</script>

<template>
  <div class="rounded-lg border border-dashed border-default/40 bg-default/60 p-3 dark:border-default/25 dark:bg-elevated/35">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <p class="text-sm font-medium text-highlighted">{{ label }}</p>
        <p v-if="helperText" class="text-xs text-muted">{{ helperText }}</p>
      </div>

      <div class="flex gap-2">
        <UButton label="เลือกไฟล์" icon="i-lucide-image" color="neutral" variant="outline" size="xs" @click="openGallery" />
        <UButton label="ถ่ายรูป" icon="i-lucide-camera" color="neutral" variant="outline" size="xs" @click="openCamera" />
      </div>
    </div>

    <!-- Hidden Native Inputs -->
    <input ref="galleryRef" type="file" accept="image/*" multiple class="hidden" @change="handleFileChange" />
    <input ref="cameraRef" type="file" accept="image/*" capture="environment" class="hidden" @change="handleFileChange" />

    <!-- Preview Thumbnail Grid -->
    <div v-if="photos.length" class="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
      <div v-for="p in photos" :key="p.key" class="group relative overflow-hidden rounded-md border border-default/30 aspect-square">
        <img :src="p.url" class="h-full w-full object-cover" />
        <button
          type="button"
          class="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-rose-600 transition"
          @click="emit('remove', p.key)"
        >
          <UIcon name="i-lucide-x" class="size-3" />
        </button>
      </div>
    </div>
  </div>
</template>
```

---

## 🟢 3. LINE Action & Social Engagement Buttons

ปุ่ม LINE แบรนด์มาตรฐาน (`#06C755`) สำหรับแอปที่เน้นลูกค้ากลุ่มคนไทยและ LINE LIFF:

```vue
<!-- Add Friend / Link LINE Button -->
<UButton
  label="เพิ่มเพื่อน LINE Official"
  icon="i-simple-icons-line"
  class="bg-[#06C755] text-white hover:bg-[#05b34c] font-medium"
  @click="openLineLink"
/>

<!-- Login with LINE LIFF -->
<UButton
  label="เข้าสู่ระบบด้วย LINE"
  icon="i-simple-icons-line"
  block
  size="lg"
  class="bg-[#06C755] text-white hover:bg-[#05b34c] font-semibold"
  @click="loginWithLine"
/>
```

---

## 📝 4. Form Validation & Inline Errors Pattern (`UForm` + Zod)

การจัดการ Form ที่มี Schema Validation แสดง Inline Error ชัดเจน พร้อม Anti-Duplicate Submit และ Auto-Focus Error Field:

```vue
<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const toast = useToast();

const schema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  phone: z.string().regex(/^0[0-9]{8,9}$/, "เบอร์โทรศัพท์ไม่ถูกต้อง (ต้องขึ้นต้นด้วย 0 ตามด้วยตัวเลข 9-10 หลัก)"),
  amount: z.number({ invalid_type_error: "กรุณาระบุจำนวนเงิน" }).positive("จำนวนเงินต้องมากกว่า 0"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: "",
  phone: "",
  amount: undefined as number | undefined,
});

const isSubmitting = ref(false);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSubmitting.value = true;
  try {
    // API Call
    await $fetch("/api/rooms/billing", {
      method: "POST",
      body: event.data,
    });

    toast.add({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลถูกบันทึกลงระบบเรียบร้อยแล้ว",
      color: "success",
      icon: "i-lucide-check-circle",
    });

    // Reset Form only on SUCCESS
    state.name = "";
    state.phone = "";
    state.amount = undefined;
  } catch (err: any) {
    // Keep user state on error, show system toast
    toast.add({
      title: "บันทึกไม่สำเร็จ",
      description: err?.data?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="ชื่อผู้พักอาศัย" name="name" required>
      <UInput v-model="state.name" placeholder="ระบุชื่อ-นามสกุล" class="w-full" />
    </UFormField>

    <UFormField label="เบอร์โทรศัพท์" name="phone" required>
      <UInput v-model="state.phone" placeholder="08xxxxxxxx" class="w-full" />
    </UFormField>

    <UFormField label="จำนวนเงิน (บาท)" name="amount" required>
      <UInput v-model.number="state.amount" type="number" placeholder="0.00" class="w-full tabular-nums" />
    </UFormField>

    <div class="flex justify-end gap-2 pt-2">
      <UButton type="submit" label="บันทึกข้อมูล" color="primary" :loading="isSubmitting" :disabled="isSubmitting" />
    </div>
  </UForm>
</template>
```

---

## ♿ 5. Accessible Icon-Only Buttons & Tooltips

ปุ่มที่มีเฉพาะไอคอนต้องมี Accessible Label และ Tooltip เสมอ:

```vue
<!-- Accessible Icon-only Action Button -->
<UTooltip text="แก้ไขข้อมูล" :kbds="['meta', 'e']">
  <UButton
    icon="i-lucide-pencil"
    size="xs"
    color="neutral"
    variant="ghost"
    aria-label="แก้ไขข้อมูล"
    @click="handleEdit"
  />
</UTooltip>

<UTooltip text="ลบรายการนี้" color="error">
  <UButton
    icon="i-lucide-trash-2"
    size="xs"
    color="error"
    variant="ghost"
    aria-label="ลบรายการ"
    @click="handleDelete"
  />
</UTooltip>
```

---

## 🧭 6. Modern Enterprise Responsive Sidebar & Layout Shell

ชุดคอมโพเนนต์ Sidebar และ Layout Shell สำหรับระบบ Admin Dashboard สไตล์ Modern Enterprise (Compact SaaS Density):
- **Component File:** [`templates/ui/AppAdminSidebar.vue`](../../../templates/ui/AppAdminSidebar.vue)
- **Layout Shell File:** [`templates/ui/AdminLayoutShell.vue`](../../../templates/ui/AdminLayoutShell.vue)
- **Full Blueprint & Guide:** [`templates/blueprints/responsive-enterprise-sidebar.md`](../../../templates/blueprints/responsive-enterprise-sidebar.md)
- **คุณสมบัติ:**
  - Desktop: Dual State (`w-64` / `w-20`) พร้อม **Floating Border Button** และ `localStorage` Persistence
  - Mobile: Off-canvas Slide Drawer (`z-50`) พร้อม Backdrop Blur Overlay
  - โครงสร้าง 3-Tier Flexbox (Header Branding, Grouped Navigation, User Profile Upward Popover)
  - รองรับ Dark Mode และ Design Tokens เฉดสี Deep Navy & Ice Blue (`#1C4D8D`, `#0F2854`)


