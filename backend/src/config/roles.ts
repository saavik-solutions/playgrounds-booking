// Define the roles and permissions in a type-safe manner
const allRoles: { [key: string]: string[] } = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

// Get the list of roles as an array of strings
const roles: string[] = Object.keys(allRoles);

// Create a Map for quick lookups of role permissions
const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));

// Export roles and roleRights
export {
  roles,
  roleRights,
};
