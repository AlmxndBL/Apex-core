# 🐍 Modular Stack Adapter: Polyglot Core (Python / C# .NET / CLI & Shell)

> **Apex v7.0.0 Adapter Module · Domain: Non-Node Runtimes & Multi-Language Systems**
> Covers Python 3.10+ (FastAPI, pytest, mypy, Pydantic), C# / .NET 8+ (ASP.NET Core, EF Core, xUnit), and Cross-Platform Automation CLI / Shell.

---

## 🎯 1. Trigger Conditions (Detection Gate)

Activate this adapter when ANY of the following conditions are met:
- **Python Manifests:**
  - `pyproject.toml`, `requirements.txt`, `Pipfile`, `setup.py`, `poetry.lock`, `uv.lock`
  - Python source structures: `app/main.py`, `routers/`, `models/`, `tests/test_*.py`
- **C# / .NET Manifests:**
  - `*.csproj`, `*.sln`, `Directory.Build.props`, `global.json`
  - C# source files: `Program.cs`, `Controllers/`, `Services/`, `*Tests.cs`
- **Automation & CLI Scripts:**
  - Stand-alone automation scripts: `*.ps1`, `*.sh`, `Makefile`, `justfile`
- **Exclusion Check:** If root does NOT contain Node manifests (`package.json`) and contains polyglot manifests, activate this adapter exclusively.

---

## 🏛️ 2. Architectural Boundaries & Clean Separation

- **In Scope:**
  - Native language idioms, conventions, and style guides (PEP 8 for Python; Microsoft .NET Guidelines for C#).
  - Strict type safety native to the language (Pydantic / `typing` in Python; Nullable Reference Types in C#).
  - API architectures (FastAPI routers, ASP.NET Core Minimal APIs / Controllers).
  - Database layers (SQLAlchemy 2.0 / Alembic for Python; EF Core / DbContext for C#).
  - Automation scripts and CLI tools (PowerShell 7+, Bash POSIX).
  - Native fast in-memory verification (`pytest`, `mypy`, `ruff`, `dotnet build`, `dotnet test`).
- **Out of Scope (Zero Cross-Domain Pollution):**
  - Node.js / NPM / Bun / Vite / Vue / React / Tailwind tooling and concepts $\to$ Strictly prohibited in polyglot projects.
  - Prisma ORM or Better Auth concepts $\to$ Replaced by native SQLAlchemy / EF Core and native auth libraries.

---

## 📐 3. Core Architecture Rules & Patterns by Ecosystem

### 🐍 Section 1: Python Stack (FastAPI, Pydantic, SQLAlchemy)

#### A. Naming & Style Conventions (PEP 8)
- **Functions, Methods & Variables:** `snake_case` (e.g., `get_user_by_id`, `total_amount`)
- **Classes & Pydantic Models:** `PascalCase` (e.g., `UserCreateRequest`, `OrderService`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`)
- **File & Module Names:** `snake_case.py` (e.g., `auth_service.py`, `database.py`)

#### B. Strict Type Safety & Pydantic v2
- **Zero Untyped Functions:** All function parameters and return values must have explicit type annotations.
- Prohibit bare `Any`. Use `Union`, `Optional`, or generics when types vary.
- **Request/Response Models:** Define explicit Pydantic models for incoming payloads and outgoing responses. Set `model_config = ConfigDict(from_attributes=True)` for ORM compatibility.

#### C. FastAPI Handler Pipeline
```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies import get_db, get_current_user
from app.schemas.order import OrderCreate, OrderResponse
from app.services.order_service import process_order

router = APIRouter(prefix="/api/v1/orders", tags=["orders"])

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    payload: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> OrderResponse:
    # 1. Authorize Actor
    if not current_user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive account")
    
    # 2. Service Layer Execution within Database Session
    order = await process_order(db=db, user_id=current_user.id, payload=payload)
    return order
```

#### D. Database & Migrations (SQLAlchemy 2.0 & Alembic)
- Use modern 2.0 style queries: `select(Model).where(...)` (avoid legacy 1.x `session.query`).
- Bind values in SQLAlchemy expressions or `text("... WHERE id = :id")` with a separate parameter mapping; never interpolate values into SQL strings. Allowlist dynamic identifiers and sort directions.
- **Transactions:** Wrap multi-table operations inside `async with session.begin():` blocks.
- **Migrations:** All schema alterations must go through versioned Alembic migrations (`alembic revision --autogenerate -m "..."`). Review generated migration scripts before applying.

---

### ⚡ Section 2: C# / .NET Stack (.NET 8+, ASP.NET Core, EF Core)

#### A. Naming & Style Conventions (Microsoft Guidelines)
- **Methods, Classes & Properties:** `PascalCase` (e.g., `GetUserByIdAsync`, `UserProfile`, `CreatedAt`)
- **Parameters & Local Variables:** `camelCase` (e.g., `userId`, `cancellationToken`)
- **Private Fields:** `_camelCase` with leading underscore (e.g., `_dbContext`, `_logger`)
- **Interfaces:** Prefix with `I` (e.g., `IOrderService`, `IUserRepository`)
- **Nullable Context:** `<Nullable>enable</Nullable>` must be enabled in `*.csproj`. Never suppress null warnings with `!` unless proven safe.

#### B. ASP.NET Core Endpoint Pipeline & Dependency Injection
```csharp
[ApiController]
[Route("api/v1/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    [ProducesResponseType(typeof(OrderResponseDto), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto, CancellationToken ct)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _orderService.CreateOrderAsync(userId!, dto, ct);
        return CreatedAtAction(nameof(GetOrderById), new { id = result.Id }, result);
    }
}
```

#### C. EF Core Concurrency & Query Hygiene
- **Optimistic Concurrency:** Use `[Timestamp]` byte array or `RowVersion` for concurrency control:
  ```csharp
  public class Account
  {
      public Guid Id { get; set; }
      public decimal Balance { get; set; }
      [Timestamp]
      public byte[] RowVersion { get; set; } = null!;
  }
  ```
- **AsNoTracking:** Read-only queries must explicitly call `.AsNoTracking()` to avoid change tracking overhead.
- Prefer LINQ or EF Core `FromSqlInterpolated` for raw SQL. If `FromSqlRaw` is necessary, bind values through separate `DbParameter` instances; never concatenate or interpolate untrusted input into SQL. Allowlist dynamic identifiers and sort directions.

#### D. Personal Data Lifecycle
- Collect only fields required by the feature's approved purpose. Apply project-defined retention and deletion rules to records, exports, and derived data; follow the request and legal-hold process when access, correction, restriction, or deletion is requested.
- Do not log personal data or expose it in errors. Escalate unclear retention, processor/transfer requirements, or suspected exposure to the project owner/privacy contact.

---

### 💻 Section 3: Cross-Platform Shell & CLI Automation

#### A. POSIX Bash Best Practices
- Every `.sh` script must begin with strict error trapping:
  ```bash
  #!/usr/bin/env bash
  set -euo pipefail
  IFS=$'\n\t'
  ```
- Always quote variables: `rm -rf "$TARGET_DIR"` (never `rm -rf $TARGET_DIR`).

#### B. PowerShell 7+ Best Practices
- Every script must enforce stop on error:
  ```powershell
  $ErrorActionPreference = 'Stop'
  Set-StrictMode -Version Latest
  ```
- Prefer native pipeline objects over text scraping.

---

## ⚡ 4. Fast Targeted Verification Commands

| Ecosystem | Fast TypeCheck / Lint | Fast Targeted Test |
|---|---|---|
| **Python** | `uv run ruff check .`<br>`uv run mypy app/` | `uv run pytest -q tests/test_<feature>.py` |
| **C# / .NET** | `dotnet build --no-incremental /p:TreatWarningsAsErrors=true` | `dotnet test --filter "FullyQualifiedName~<Feature>"` |
| **Shell** | `shellcheck script.sh` | Bash syntax check: `bash -n script.sh` |
