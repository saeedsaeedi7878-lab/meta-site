export type TeamMember = {
  id: string;
  name: string;
  role: string;
  portrait: string | null;
};

/** Verified members only. Empty until names, roles, and portraits are supplied. */
export const teamMembers: TeamMember[] = [];

export const teamPlaceholders = 3;
