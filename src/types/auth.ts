export type UserRole = 'victim' | 'support_staff' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  // ... other user properties ...
}
