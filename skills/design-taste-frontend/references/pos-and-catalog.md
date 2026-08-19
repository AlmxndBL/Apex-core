# 🛒 POS & Fast-Catalog Workspace Guide

คู่มือสถาปัตยกรรมหน้าจอขายหน้าร้าน (Point of Sale), ระบบแคตตาล็อกสินค้าด่วน (Fast-Action Catalog Grid) และแผงชำระเงิน (Checkout Panel)

---

## 🏛️ 1. Workspace Layout Rhythm

หน้าจอ POS แบ่งโครงสร้างแบบ **2 คอลัมน์ Responsive**:
- **คอลัมน์ซ้าย (7-8 cols บนจอใหญ่):** แผงค้นหา, หมวดหมู่ และ Catalog Card Grid (2-4 คอลัมน์)
- **คอลัมน์ขวา (4-5 cols บนจอใหญ่ - Sticky):** แผงสรุปคำสั่งซื้อ, สลับลูกค้า, คำนวณยอดเงิน และปุ่มยืนยัน

```vue
<div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
  <!-- Left: Catalog (7-8 cols) -->
  <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-3">
    <!-- Category Tabs & Search Bar -->
    <div class="flex items-center gap-2">
      <UInput v-model="search" icon="i-lucide-search" placeholder="ค้นหาสินค้า/บริการ..." class="flex-1" />
    </div>

    <!-- Catalog Grid: 2-cols mobile, 3-cols tablet, 4-cols desktop -->
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
      <PosCatalogCard
        v-for="item in catalogItems"
        :key="item.id"
        :title="item.name"
        :price-label="`฿${item.price.toLocaleString()}`"
        :quantity="cart[item.id] || 0"
        @increment="addToCart(item)"
        @decrement="removeFromCart(item)"
        @change="setCartQuantity(item, $event)"
      />
    </div>
  </div>

  <!-- Right: Sticky Checkout Panel (4-5 cols) -->
  <div class="lg:col-span-5 xl:col-span-4">
    <PosCheckoutPanel
      title="สรุปรายการขาย"
      v-model:customer-mode="customerMode"
      v-model:customer-id="selectedCustomerId"
      v-model:walk-in-name="walkInName"
      :cart-items="cartList"
      :grand-total="grandTotal"
      @submit="handleCheckout"
      @clear="clearCart"
    />
  </div>
</div>
```

---

## ⚡ 2. Fast Gestures & Catalog Card (`PosCatalogCard.vue`)

- **คลิกซ้าย (Left-Click / Tap):** เพิ่มจำนวนสินค้า (+1)
- **คลิกขวา (Right-Click `@contextmenu.prevent`):** ลดจำนวนสินค้า (-1)
- **Direct Input Stepper:** รองรับการพิมพ์ตัวเลขจำนวนโดยตรง
- **Category Pastel Tones:** กำหนดสีขอบบางๆ ตามหมวดหมู่สินค้าเพื่อการจดจำที่รวดเร็ว

```vue
<template>
  <div
    role="button"
    tabindex="0"
    class="group relative flex flex-col justify-between rounded-lg border border-default/30 bg-default p-3 select-none transition duration-150 hover:border-primary/50 hover:shadow-sm dark:border-default/20 dark:bg-elevated/55"
    @click="$emit('increment')"
    @contextmenu.prevent="$emit('decrement')"
  >
    <!-- Card Header: Title & Category -->
    <div>
      <p class="font-semibold text-highlighted text-sm truncate">{{ title }}</p>
      <p class="text-xs text-muted mt-0.5">{{ category }}</p>
    </div>

    <!-- Card Footer: Price & Quantity Badge -->
    <div class="mt-3 flex items-center justify-between">
      <span class="text-sm font-bold text-primary tabular-nums">{{ priceLabel }}</span>
      <UBadge v-if="quantity > 0" color="primary" variant="solid" size="sm">
        {{ quantity }}
      </UBadge>
    </div>
  </div>
</template>
```

---

## 👥 3. Customer Mode Switch (Member vs Walk-In "ไม่ระบุ")

รองรับทั้งลูกค้าสมาชิกประจำ และลูกค้าขาจรหน้าร้านที่ต้องการความเร็ว:

```vue
<!-- Mode Switch -->
<URadioGroup
  v-model="customerMode"
  orientation="horizontal"
  :items="[
    { label: 'สมาชิกระบบ', value: 'member' },
    { label: 'ลูกค้าทั่วไป', value: 'walk-in' }
  ]"
/>

<!-- Walk-In Mode: Quick Name with 'ไม่ระบุ' Badge -->
<div v-if="customerMode === 'walk-in'" class="space-y-2">
  <UFormField label="ชื่อลูกค้า / โต๊ะ">
    <UInput v-model="walkInName" placeholder="เช่น ลูกค้าหน้าร้าน หรือ โต๊ะ 3">
      <template #trailing>
        <UBadge
          label="ไม่ระบุ"
          color="neutral"
          variant="subtle"
          size="xs"
          class="cursor-pointer"
          @click="walkInName = 'ลูกค้าทั่วไป (ไม่ระบุ)'"
        />
      </template>
    </UInput>
  </UFormField>
</div>

<!-- Member Mode: Searchable Dropdown with Avatar & Phone -->
<USelectMenu
  v-else
  v-model="customerId"
  :items="memberOptions"
  searchable
  placeholder="ค้นหาชื่อ เบอร์โทร หรือรหัสสมาชิก..."
>
  <template #item="{ item }">
    <div class="flex items-center gap-2">
      <UAvatar :src="item.avatar" :alt="item.name" size="xs" />
      <div class="min-w-0">
        <p class="font-medium text-xs truncate">{{ item.name }}</p>
        <p class="text-[10px] text-muted truncate">{{ item.phone }}</p>
      </div>
    </div>
  </template>
</USelectMenu>
```
