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
