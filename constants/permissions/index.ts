import { User } from "@/db/schema";
import { RolesWithPermissions } from "@/types";
import { ADMIN_PERMISSIONS } from "@/constants/permissions/admin";
import { USER_PERMISSIONS } from "@/constants/permissions/user";

export type Permissions = {
    users: {
        dataType: User;
        action: "view" | "update" | "view_all" | "delete" | "manage";
    };
};

export const ROLES = {
    admin: ADMIN_PERMISSIONS,
    user: USER_PERMISSIONS,
} as const satisfies RolesWithPermissions;
