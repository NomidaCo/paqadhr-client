"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Search, LayoutGrid, LayoutList } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Active",
    joinDate: "2023-01-15",
    avatar: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Design",
    role: "UI/UX Designer",
    status: "Active",
    joinDate: "2023-02-20",
    avatar: "",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    department: "Marketing",
    role: "Marketing Specialist",
    status: "On Leave",
    joinDate: "2022-11-05",
    avatar: "",
  },
  {
    id: 4,
    name: "Emily Williams",
    email: "emily@example.com",
    department: "HR",
    role: "HR Manager",
    status: "Active",
    joinDate: "2022-08-12",
    avatar: "",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    department: "Engineering",
    role: "Backend Developer",
    status: "Active",
    joinDate: "2023-03-10",
    avatar: "",
  },
  {
    id: 6,
    name: "Sarah Miller",
    email: "sarah@example.com",
    department: "Finance",
    role: "Accountant",
    status: "Inactive",
    joinDate: "2022-06-25",
    avatar: "",
  },
  {
    id: 7,
    name: "Robert Wilson",
    email: "robert@example.com",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "Active",
    joinDate: "2023-04-05",
    avatar: "",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    department: "Marketing",
    role: "Content Strategist",
    status: "Active",
    joinDate: "2023-01-30",
    avatar: "",
  },
  {
    id: 9,
    name: "Thomas Anderson",
    email: "thomas@example.com",
    department: "Engineering",
    role: "Systems Architect",
    status: "On Leave",
    joinDate: "2022-09-15",
    avatar: "",
  },
  {
    id: 10,
    name: "Lisa Moore",
    email: "lisa@example.com",
    department: "Sales",
    role: "Sales Executive",
    status: "Active",
    joinDate: "2023-02-10",
    avatar: "",
  },
  {
    id: 11,
    name: "Daniel White",
    email: "daniel@example.com",
    department: "Finance",
    role: "Financial Analyst",
    status: "Active",
    joinDate: "2023-03-22",
    avatar: "",
  },
  {
    id: 12,
    name: "Amanda Clark",
    email: "amanda@example.com",
    department: "HR",
    role: "Recruitment Specialist",
    status: "Inactive",
    joinDate: "2022-10-08",
    avatar: "",
  },
];

export const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Filter employees
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const finalEmployees = filteredEmployees.filter(
    (employee) =>
      (department === "" ||
        department === "all_departments" ||
        employee.department === department) &&
      (status === "" ||
        status === "all_statuses" ||
        employee.status === status),
  );

  // Get current employees for pagination
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = finalEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(finalEmployees.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage your employee directory.
          </p>
        </div>
        <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add Employee</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter employee details below. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department
                  </label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Input id="role" placeholder="Frontend Developer" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="join-date" className="text-sm font-medium">
                    Join Date
                  </label>
                  <Input id="join-date" type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddEmployeeOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={() => setIsAddEmployeeOpen(false)}>
                Save Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search employees..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_departments">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_statuses">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mb-4">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => setViewMode("list")}
        >
          <LayoutList size={16} />
          <span className="sr-only">List view</span>
        </Button>
        <Button
          variant={viewMode === "card" ? "default" : "outline"}
          size="icon"
          onClick={() => setViewMode("card")}
        >
          <LayoutGrid size={16} />
          <span className="sr-only">Card view</span>
        </Button>
      </div>

      {viewMode === "list" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/employees/${employee.id}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        {employee.name}
                      </Link>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "On Leave"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell>{employee.joinDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee) => (
              <Link href={`/employees/${employee.id}`} key={employee.id}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={employee.avatar}
                          alt={employee.name}
                        />
                        <AvatarFallback>
                          {getInitials(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {employee.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {employee.role}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium truncate max-w-[180px]">
                          {employee.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Department:
                        </span>
                        <span className="font-medium">
                          {employee.department}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Join Date:
                        </span>
                        <span className="font-medium">{employee.joinDate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : employee.status === "On Leave"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              No employees found
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(val) => {
              setItemsPerPage(parseInt(val, 10));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">per page</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={number === currentPage}
                  onClick={() => paginate(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < pageNumbers.length && paginate(currentPage + 1)
                }
                className={
                  currentPage === pageNumbers.length
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
