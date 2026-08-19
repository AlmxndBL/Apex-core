# 📑 Universal Table Multi-Select & Floating Bulk Bar Blueprint

## 1. Overview
พิมพ์เขียวสำหรับการสร้างตารางข้อมูลที่รองรับการเลือกหลายรายการพร้อมกัน (Multi-Select Checkboxes) และแถบควบคุมลอยตัวด้านล่าง (Floating Bulk Action Bar) สำหรับสั่งลบหรืออัปเดตสถานะแบบกลุ่ม

## 2. Frontend Reactive Selection Logic (Vue 3 / Nuxt 4)
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import AppFloatingBulkBar from '@/components/ui/AppFloatingBulkBar.vue'

const items = ref<any[]>([])
const selectedIds = ref<string[]>([])
const deleting = ref(false)

const isAllSelected = computed(() => {
  return items.value.length > 0 && selectedIds.value.length === items.value.length
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = items.value.map(i => i.id)
  }
}

const toggleRowSelect = (id: string) => {
  const index = selectedIds.value.indexOf(id)
  if (index >= 0) selectedIds.value.splice(index, 1)
  else selectedIds.value.push(id)
}

const handleBulkDelete = async () => {
  if (!confirm(`คุณต้องการลบรายการที่เลือกจำนวน ${selectedIds.value.length} รายการ ใช่หรือไม่?`)) return
  deleting.value = true
  try {
    await $fetch('/api/v1/resource/bulk-delete', {
      method: 'POST',
      body: { ids: selectedIds.value }
    })
    selectedIds.value = []
    // refresh items
  } finally {
    deleting.value = false
  }
}
</script>
```

## 3. Backend Atomic Bulk Delete Endpoint (H3 / Nitro / Prisma)
```ts
import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { ids } = body

  if (!Array.isArray(ids) || ids.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'กรุณาระบุรายการที่ต้องการลบ' })
  }

  const result = await prisma.resource.deleteMany({
    where: { id: { in: ids } }
  })

  return {
    success: true,
    message: `ลบข้อมูลจำนวน ${result.count} รายการสำเร็จ`,
    count: result.count
  }
})
```
