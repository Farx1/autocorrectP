import { RolePermissions } from "@/types/auth/rbac";

export const ADMIN_PERMISSIONS: RolePermissions = {
    users: {
        view: true,
        update: true,
        view_all: true,
        delete: true,
        manage: true,
    },
};
