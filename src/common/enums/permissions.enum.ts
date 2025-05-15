export enum PermissionKeys {
  // === USER ===
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_ROLE_ASSIGN = 'user-role:assign',
  USER_ROLE_REVOKE = 'user-role:revoke',

  // === VEHICLE ===
  VEHICLE_CREATE = 'vehicle:create',
  VEHICLE_READ = 'vehicle:read',
  VEHICLE_UPDATE = 'vehicle:update',
  VEHICLE_DELETE = 'vehicle:delete',

  // === CATEGORY ===
  CATEGORY_CREATE = 'category:create',
  CATEGORY_READ = 'category:read',
  CATEGORY_UPDATE = 'category:update',
  CATEGORY_DELETE = 'category:delete',

  // === HIRING / RENTAL ===
  HIRING_CREATE = 'hiring:create',
  HIRING_READ = 'hiring:read',
  HIRING_UPDATE = 'hiring:update',
  HIRING_DELETE = 'hiring:delete',

  // === REVIEW ===
  REVIEW_CREATE = 'review:create',
  REVIEW_READ = 'review:read',
  REVIEW_UPDATE = 'review:update',
  REVIEW_DELETE = 'review:delete',

  // === NOTIFICATION ===
  NOTIFICATION_READ = 'notification:read',
  NOTIFICATION_SEND = 'notification:send',
  NOTIFICATION_DELETE = 'notification:delete',

  // === ROLE ===
  ROLE_CREATE = 'role:create',
  ROLE_READ = 'role:read',
  ROLE_UPDATE = 'role:update',
  ROLE_DELETE = 'role:delete',

  // === PERMISSION ===
  PERMISSION_CREATE = 'permission:create',
  PERMISSION_READ = 'permission:read',
  PERMISSION_UPDATE = 'permission:update',
  PERMISSION_DELETE = 'permission:delete',

  ROLE_PERMISSION_ASSIGN = 'role-permission:assign',
  ROLE_PERMISSION_REVOKE = 'role-permission:revoke',
}
