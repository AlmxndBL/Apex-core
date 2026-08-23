---
name: cartography
description: AST Codebase Skeleton Mapping, Selective Token Diet, and Project Exploration for Fast Onboarding
---

# 🧭 Codebase Cartography & Token Diet Skill

> สกิลสำรวจโครงสร้างโค้ดด้วย AST Skeleton Mapping และควบคุมการใช้ Token ใน Context Window ให้กระชับที่สุด ไม่บวม ไม่หลอน

---

## 🗺️ 1. AST Skeleton Mapping (Fast Discovery in 1s)

* เมื่อเข้าสู่โปรเจกต์ใหม่ หรือรื้อฟื้นโปรเจกต์เก่า ให้สร้างแผนผังโครงสร้าง Type, Function Headers และ Endpoints แบบย่อ
* ใช้โครงสร้าง AST Skeleton เพื่อเห็นภาพรวมทั้งระบบใน 500-800 tokens โดยไม่ต้องเปิดอ่านโค้ดจริงทุกไฟล์

---

## 🥗 2. Selective Token Diet (Search First, Read Second)

* ❌ **ห้ามใช้ `view_file` อ่านไฟล์ทั้งดุ้น 2,000 บรรทัด** หรือเปิดดูโค้ดของโมดูลข้างเคียงที่ไม่เกี่ยวข้อง
* ✅ **Selective Retrieval:**
  1. ใช้ `grep_search` หรือ `find_by_name` หาจุดเป้าหมายก่อน
  2. ใช้ `view_file` พร้อมระบุ `StartLine` และ `EndLine` แคบๆ (ไม่เกิน 150-200 บรรทัด) เฉพาะจุดที่จะแก้จริง
  3. อาศัย Type Definitions และ Schema Interfaces ในการวางแผนแทนการอ่าน Implementation ทั้งหมด
