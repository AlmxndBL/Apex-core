export type Permission =
  | 'order:read'
  | 'order:write'
  | 'user:invite'
  | 'billing:manage'
  | 'audit:read';

export type RoleKey = 'OWNER' | 'ADMIN' | 'AUDITOR' | 'MEMBER';

const ROLE_PERMISSIONS: Record<RoleKey, Permission[]> = {
  OWNER: ['order:read', 'order:write', 'user:invite', 'billing:manage', 'audit:read'],
  ADMIN: ['order:read', 'order:write', 'user:invite', 'audit:read'],
  AUDITOR: ['order:read', 'audit:read'],
  MEMBER: ['order:read'],
};

export interface AccessContext {
  userId: string;
  organizationId: string;
  role: RoleKey;
}

export class PermissionDeniedError extends Error {
  constructor(public readonly required: Permission) {
    super(`Missing permission: ${required}`);
    this.name = 'PermissionDeniedError';
  }
}

export function can(context: AccessContext, permission: Permission): boolean {
  return ROLE_PERMISSIONS[context.role].includes(permission);
}

export function assertCan(context: AccessContext, permission: Permission): void {
  if (!can(context, permission)) {
    throw new PermissionDeniedError(permission);
  }
}

export function permissionsFor(role: RoleKey): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}
