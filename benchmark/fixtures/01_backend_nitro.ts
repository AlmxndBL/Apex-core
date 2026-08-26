import { defineEventHandler, getQuery, createError } from 'h3';
import { prisma } from '~/server/utils/prisma';
import { z } from 'zod';

export const userQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  role: z.enum(['ADMIN', 'MEMBER', 'GUEST']).optional(),
  sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type UserQueryContract = z.infer<typeof userQuerySchema>;

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUserResponse {
  success: boolean;
  data: UserDTO[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default defineEventHandler(async (event): Promise<PaginatedUserResponse> => {
  const query = getQuery(event);
  const parsed = userQuerySchema.safeParse(query);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Query Parameters',
      data: parsed.error.flatten(),
    });
  }

  const { page, limit, search, role, sortBy, sortOrder } = parsed.data;

  const whereClause: any = {
    deletedAt: null,
  };

  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (role) {
    whereClause.role = role;
  }

  const [total, users] = await prisma.$transaction([
    prisma.user.count({ where: whereClause }),
    prisma.user.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
  ]);

  return {
    success: true,
    data: users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
});
