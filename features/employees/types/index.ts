export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: string;
  avatar: string;
}

export interface EmployeeFilters {
  searchTerm: string;
  department: string;
  status: string;
}

export type ViewMode = "list" | "card";
