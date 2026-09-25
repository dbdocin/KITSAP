export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
}

// PLACEHOLDER — leave empty until real team details are supplied. The About
// page hides the team block in production while this list is empty. Never
// add invented names or bios.
export const team: TeamMember[] = [];
