import { PrismaClient } from '@prisma/client';
import { USE_MOCK_DB } from '../config.js';
import bcrypt from 'bcryptjs';

// Setup real prisma client (do not connect immediately to avoid errors if PostgreSQL is offline)
let realPrisma: any = null;
try {
  realPrisma = new PrismaClient();
} catch (e) {
  console.warn('[DB] Failed to initialize PrismaClient:', e);
}

// In-Memory Database store for mock mode
class MockDatabase {
  users: any[] = [];
  projects: any[] = [];
  reports: any[] = [];
  settings: any[] = [];

  constructor() {
    this.seedMockData();
  }

  private seedMockData() {
    const passwordHash = bcrypt.hashSync('password123', 10);
    
    // Seed default users
    const admin = {
      id: 'admin-id-123',
      email: 'admin@company.com',
      name: 'Admin User',
      passwordHash,
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const member = {
      id: 'member-id-456',
      email: 'member@company.com',
      name: 'Teammate 4',
      passwordHash,
      role: 'MEMBER',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(admin, member);

    // Seed default settings
    this.settings.push({
      id: 'settings-id-1',
      userId: member.id,
      routerTransitions: true,
      routerTelemetry: true,
      routerCache: false,
      updatedAt: new Date()
    });

    this.settings.push({
      id: 'settings-id-2',
      userId: admin.id,
      routerTransitions: true,
      routerTelemetry: false,
      routerCache: true,
      updatedAt: new Date()
    });

    // Seed default projects
    this.projects.push(
      { id: 'p1', name: 'Navbar & Header Modules', ownerId: admin.id, status: 'IN_REVIEW', progress: 85, createdAt: new Date(), updatedAt: new Date() },
      { id: 'p2', name: 'Drawer & Drawer Transition animations', ownerId: admin.id, status: 'IN_PROGRESS', progress: 45, createdAt: new Date(), updatedAt: new Date() },
      { id: 'p3', name: 'Responsive Layout & Grid System', ownerId: admin.id, status: 'NOT_STARTED', progress: 10, createdAt: new Date(), updatedAt: new Date() },
      { id: 'p4', name: 'Router & SPA Dynamic Area', ownerId: member.id, status: 'ACTIVE_CODING', progress: 99, createdAt: new Date(), updatedAt: new Date() },
      { id: 'p5', name: 'Global Palette Switcher & Integration', ownerId: member.id, status: 'NOT_STARTED', progress: 5, createdAt: new Date(), updatedAt: new Date() }
    );

    console.log('[DB Mock] In-memory database seeded with default mock records.');
  }

  // User methods
  user = {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return this.users.find(u => u.email === where.email) || null;
      }
      if (where.id) {
        return this.users.find(u => u.id === where.id) || null;
      }
      return null;
    },
    create: async ({ data }: { data: any }) => {
      const newUser = {
        id: `user-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'MEMBER',
        ...data
      };
      this.users.push(newUser);
      // Auto seed settings for new users
      this.workspaceSettings.upsert({
        where: { userId: newUser.id },
        update: {},
        create: {
          userId: newUser.id,
          routerTransitions: true,
          routerTelemetry: true,
          routerCache: false
        }
      });
      return newUser;
    }
  };

  // WorkspaceSettings methods
  workspaceSettings = {
    findUnique: async ({ where }: { where: { userId: string } }) => {
      return this.settings.find(s => s.userId === where.userId) || null;
    },
    upsert: async ({ where, update, create }: { where: { userId: string }; update: any; create: any }) => {
      const idx = this.settings.findIndex(s => s.userId === where.userId);
      if (idx !== -1) {
        this.settings[idx] = {
          ...this.settings[idx],
          ...update,
          updatedAt: new Date()
        };
        return this.settings[idx];
      } else {
        const newSettings = {
          id: `settings-${Date.now()}`,
          userId: where.userId,
          routerTransitions: true,
          routerTelemetry: true,
          routerCache: false,
          ...create,
          updatedAt: new Date()
        };
        this.settings.push(newSettings);
        return newSettings;
      }
    }
  };

  // Project methods
  project = {
    findMany: async (args?: { where?: { name?: { contains: string } } }) => {
      // Return projects, attach owner name
      const result = this.projects.map(p => {
        const owner = this.users.find(u => u.id === p.ownerId);
        return {
          ...p,
          owner: owner ? { id: owner.id, name: owner.name, email: owner.email } : null
        };
      });

      if (args?.where?.name?.contains) {
        const query = args.where.name.contains.toLowerCase();
        return result.filter(p => p.name.toLowerCase().includes(query));
      }
      return result;
    },
    create: async ({ data }: { data: any }) => {
      const newProj = {
        id: `proj-${Date.now()}`,
        status: 'NOT_STARTED',
        progress: 0,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.projects.push(newProj);
      const owner = this.users.find(u => u.id === newProj.ownerId);
      return {
        ...newProj,
        owner: owner ? { id: owner.id, name: owner.name, email: owner.email } : null
      };
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const idx = this.projects.findIndex(p => p.id === where.id);
      if (idx === -1) throw new Error('Project not found');
      this.projects[idx] = {
        ...this.projects[idx],
        ...data,
        updatedAt: new Date()
      };
      const owner = this.users.find(u => u.id === this.projects[idx].ownerId);
      return {
        ...this.projects[idx],
        owner: owner ? { id: owner.id, name: owner.name, email: owner.email } : null
      };
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const idx = this.projects.findIndex(p => p.id === where.id);
      if (idx === -1) throw new Error('Project not found');
      const deleted = this.projects[idx];
      this.projects.splice(idx, 1);
      return deleted;
    }
  };

  // Report methods
  report = {
    findMany: async (args?: { where?: { requestedBy: string } }) => {
      const requestedBy = args?.where?.requestedBy;
      const list = requestedBy 
        ? this.reports.filter(r => r.requestedBy === requestedBy)
        : this.reports;
      
      return list.map(r => {
        const requester = this.users.find(u => u.id === r.requestedBy);
        return {
          ...r,
          requester: requester ? { id: requester.id, name: requester.name } : null
        };
      });
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      const r = this.reports.find(x => x.id === where.id) || null;
      if (r) {
        const requester = this.users.find(u => u.id === r.requestedBy);
        return {
          ...r,
          requester: requester ? { id: requester.id, name: requester.name } : null
        };
      }
      return null;
    },
    create: async ({ data }: { data: any }) => {
      const newReport = {
        id: `report-${Date.now()}`,
        status: 'PENDING',
        fileUrl: null,
        fileSizeKb: null,
        completedAt: null,
        ...data,
        createdAt: new Date()
      };
      this.reports.push(newReport);
      return newReport;
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const idx = this.reports.findIndex(r => r.id === where.id);
      if (idx === -1) throw new Error('Report not found');
      this.reports[idx] = {
        ...this.reports[idx],
        ...data
      };
      return this.reports[idx];
    }
  };
}

export const db = USE_MOCK_DB ? (new MockDatabase() as any) : realPrisma;
