import { RolePermissions } from "@/types";

export const USER_PERMISSIONS: RolePermissions = {
    users: {
        view: true,
        update: (user, otherUser) => user.id === otherUser.id,
        view_all: false,
        delete: (user, otherUser) => user.id === otherUser.id,
        manage: false,
    },
};
