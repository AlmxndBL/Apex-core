---
name: sandbox-testing
description: Automated Sandbox Test Suite & Verification Engine for Rapid QA (Python unittest/pytest, TypeScript vitest/jest, RBAC persona matrix, and stateful database verification)
---

# Automated Sandbox Testing & Verification Skill

> สกิลสำหรับสร้างและรันชุดทดสอบอัตโนมัติ (Automated Sandbox Test Suite) เพื่อปฏิบัติตาม **Step 4: Verification (Universal Quality Gate & Definition of Done)** ได้อย่างรวดเร็ว แม่นยำ และมีหลักฐาน Terminal Output 100%

---

## 🎯 เมื่อไหร่ที่ควรใช้ Skill นี้
- เมื่อเริ่มพัฒนาฟีเจอร์ใหม่ หรือทำการ Refactor โครงสร้างระบบ
- เมื่อต้องการสร้างระบบ **Verification Gate** ประจำโปรเจกต์ (ทั้ง Python และ TypeScript)
- เมื่อต้องการทดสอบ **Multi-Role & RBAC Persona Matrix** ให้ครบทุก Role ใน 1 วินาที
- เมื่อต้องการทดสอบความถูกต้องของ **Business Logic, Form Validation, และ Stateful Database**

---

## 🏗️ โครงสร้าง Sandbox Test Suite มาตรฐาน

```text
tests/
├── run_all_tests.py          # 🚀 Master Test Runner (มี ASCII Banner & Summary)
├── test_auth_rbac.py         # 👥 ทดสอบ Authentication & สิทธิ์ทุก Role
├── test_form_validation.py   # 🛡️ ทดสอบ Input Validation (ราคา, วันที่, ตัวเลขติดลบ)
├── test_business_logic.py    # 📦 ทดสอบ Logic สำคัญ (BOM, คำนวณเงิน, ตัดสต๊อก)
└── test_crud_lifecycle.py    # 🔄 ทดสอบการสร้าง แก้ไข ลบ และ Soft-delete
```

---

## 📋 4 เสาหลักของ Sandbox Test Suite

### 1. 👥 Multi-Role Persona Matrix Verification
ทดสอบว่าทุกบทบาท (Seeded Users) สามารถล็อกอินได้จริง และระบบ RBAC ป้องกัน Role ที่ไม่มีสิทธิ์เข้าถึง:
```python
def test_all_roles_can_authenticate(self):
    roles_credentials = [
        ("owner", "admin1234", UserRole.OWNER),
        ("manager", "mgr1234", UserRole.MANAGER),
        ("cashier", "cash1234", UserRole.CASHIER),
        ("waiter", "waiter1234", UserRole.WAITER),
        ("kitchen", "cook1234", UserRole.KITCHEN),
    ]
    for username, password, expected_role in roles_credentials:
        user = AuthService.authenticate(self.db, username, password)
        self.assertIsNotNone(user, f"Failed to auth as {username}")
        self.assertEqual(user.role, expected_role)
```

### 2. 🛡️ Input & Boundary Form Validation
ทดสอบความทนทานของ Input Form เมื่อเจอข้อมูลผิดปกติ:
```python
def test_price_input_validation(self):
    # ป้องกันตัวเลขติดลบ หรือตัวอักษรแปลกปลอม
    with self.assertRaises(ValueError):
        validate_price("-50.00")
    with self.assertRaises(ValueError):
        validate_price("ห้าร้อยบาท")
```

### 3. 📦 Stateful Business Logic & Database Transactions
ทดสอบความแม่นยำของ Business Engine (เช่น FIFO Lot, BOM Deduction, Discount calculation):
```python
def test_order_checkout_and_stock_deduction(self):
    # เปิดบิล -> สั่งอาหาร -> เช็คสต๊อกว่าถูกตัดออกตาม Lot จริง
    initial_stock = get_stock_qty(self.db, item_id=1)
    create_and_pay_order(self.db, item_id=1, qty=2)
    final_stock = get_stock_qty(self.db, item_id=1)
    self.assertEqual(final_stock, initial_stock - 2)
```

### 4. 🚀 Master Test Runner with Evidence Banner
ตัวรันเทสต์รวมที่แสดงผลลัพธ์ผ่าน Terminal พร้อมสรุป Pass/Fail ชัดเจน:
```python
# tests/run_all_tests.py
import unittest
import sys

def run_tests():
    print("=" * 60)
    print("  🚀 RUNNING AUTOMATED SANDBOX TEST SUITE")
    print("=" * 60)
    
    loader = unittest.TestLoader()
    suite = loader.discover("tests", pattern="test_*.py")
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    print("\n" + "=" * 60)
    print(f"  📊 TEST SUMMARY: Ran {result.testsRun} tests")
    print(f"  ✅ Passed: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"  ❌ Failures: {len(result.failures)}")
    print(f"  ⚠️  Errors: {len(result.errors)}")
    print("=" * 60)
    
    if result.wasSuccessful():
        print("  🎉 ALL SANDBOX VERIFICATION TESTS PASSED 100%!\n")
        sys.exit(0)
    else:
        print("  🚨 SOME TESTS FAILED!\n")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
```

---

## ⚡ คำสั่งรันเทสต์สำหรับแต่ละสภาพแวดล้อม

| Environment | คำสั่งรัน |
|---|---|
| **Python (Docker)** | `docker-compose exec -e PYTHONPATH=/app -T app python tests/run_all_tests.py` |
| **Python (Local)** | `python -m unittest discover -s tests -p "test_*.py"` |
| **Node / Nuxt (Vitest)** | `npx vitest run --reporter=verbose` |
| **Node / TypeScript (Jest)** | `npm test -- --verbose` |
