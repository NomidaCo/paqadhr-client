"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data
const leaveRequests = [
  {
    id: 1,
    employee: "John Doe",
    type: "Annual Leave",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    days: 4,
    status: "Approved",
    reason: "Family vacation",
  },
  {
    id: 2,
    employee: "Jane Smith",
    type: "Sick Leave",
    startDate: "2023-06-20",
    endDate: "2023-06-22",
    days: 3,
    status: "Pending",
    reason: "Not feeling well",
  },
  {
    id: 3,
    employee: "Michael Johnson",
    type: "Personal Leave",
    startDate: "2023-06-25",
    endDate: "2023-06-25",
    days: 1,
    status: "Pending",
    reason: "Personal matter",
  },
  {
    id: 4,
    employee: "Emily Williams",
    type: "Annual Leave",
    startDate: "2023-07-05",
    endDate: "2023-07-10",
    days: 6,
    status: "Approved",
    reason: "Summer vacation",
  },
  {
    id: 5,
    employee: "David Brown",
    type: "Sick Leave",
    startDate: "2023-06-10",
    endDate: "2023-06-12",
    days: 3,
    status: "Rejected",
    reason: "Medical appointment",
  },
  {
    id: 6,
    employee: "Sarah Wilson",
    type: "Annual Leave",
    startDate: "2023-08-01",
    endDate: "2023-08-07",
    days: 7,
    status: "Pending",
    reason: "Summer vacation",
  },
  {
    id: 7,
    employee: "Robert Miller",
    type: "Sick Leave",
    startDate: "2023-06-30",
    endDate: "2023-07-02",
    days: 3,
    status: "Approved",
    reason: "Doctor's appointment",
  },
  {
    id: 8,
    employee: "Jennifer Davis",
    type: "Personal Leave",
    startDate: "2023-07-15",
    endDate: "2023-07-15",
    days: 1,
    status: "Approved",
    reason: "Family matter",
  },
];

const LeaveManagement = () => {
  const [isRequestLeaveOpen, setIsRequestLeaveOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(leaveRequests.length / itemsPerPage);

  // Get current leave requests
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveRequests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Leave Management
          </h1>
          <p className="text-muted-foreground">
            Manage and track employee leave requests.
          </p>
        </div>
        <Dialog open={isRequestLeaveOpen} onOpenChange={setIsRequestLeaveOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Request Leave</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
              <DialogDescription>
                Fill in the leave request details. Click submit when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="leaveType" className="text-sm font-medium">
                  Leave Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                    <SelectItem value="paternity">Paternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start-date" className="text-sm font-medium">
                    Start Date
                  </label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="end-date" className="text-sm font-medium">
                    End Date
                  </label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Reason
                </label>
                <Textarea
                  id="reason"
                  placeholder="Briefly describe the reason for your leave"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRequestLeaveOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => setIsRequestLeaveOpen(false)}
              >
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.employee}
                </TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.days}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {request.reason}
                </TableCell>
                <TableCell>
                  {request.status === "Pending" ? (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-xs"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-xs text-red-500 border-red-200 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2 text-xs"
                    >
                      View
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* First page */}
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis */}
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Page before current */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Current page */}
          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>

          {/* Page after current */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis */}
          {currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page */}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default LeaveManagement;
