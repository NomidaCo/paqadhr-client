"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  Plus,
  Building,
  Network,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const Teams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDepts, setExpandedDepts] = useState<string[]>(["1"]);

  const departments = [
    {
      id: "1",
      name: "Engineering",
      description: "Software development and technical operations",
      manager: {
        name: "John Smith",
        email: "john@company.com",
        phone: "+1234567890",
        avatar: "",
        initials: "JS",
      },
      color: "bg-blue-500",
      members: [
        {
          name: "Sarah Chen",
          role: "Senior Developer",
          email: "sarah@company.com",
          avatar: "",
          initials: "SC",
        },
        {
          name: "Mike Johnson",
          role: "Frontend Developer",
          email: "mike@company.com",
          avatar: "",
          initials: "MJ",
        },
        {
          name: "Lisa Wang",
          role: "Backend Developer",
          email: "lisa@company.com",
          avatar: "",
          initials: "LW",
        },
        {
          name: "Tom Brown",
          role: "DevOps Engineer",
          email: "tom@company.com",
          avatar: "",
          initials: "TB",
        },
      ],
    },
    {
      id: "2",
      name: "Marketing",
      description: "Brand management and digital marketing",
      manager: {
        name: "Alice Johnson",
        email: "alice@company.com",
        phone: "+1234567891",
        avatar: "",
        initials: "AJ",
      },
      color: "bg-green-500",
      members: [
        {
          name: "David Kim",
          role: "Marketing Manager",
          email: "david@company.com",
          avatar: "",
          initials: "DK",
        },
        {
          name: "Emma Wilson",
          role: "Content Creator",
          email: "emma@company.com",
          avatar: "",
          initials: "EW",
        },
        {
          name: "Ryan Lee",
          role: "Social Media Specialist",
          email: "ryan@company.com",
          avatar: "",
          initials: "RL",
        },
      ],
    },
    {
      id: "3",
      name: "Sales",
      description: "Customer acquisition and revenue generation",
      manager: {
        name: "Bob Wilson",
        email: "bob@company.com",
        phone: "+1234567892",
        avatar: "",
        initials: "BW",
      },
      color: "bg-purple-500",
      members: [
        {
          name: "Jennifer Davis",
          role: "Sales Manager",
          email: "jennifer@company.com",
          avatar: "",
          initials: "JD",
        },
        {
          name: "Chris Martinez",
          role: "Account Executive",
          email: "chris@company.com",
          avatar: "",
          initials: "CM",
        },
        {
          name: "Amy Taylor",
          role: "Sales Representative",
          email: "amy@company.com",
          avatar: "",
          initials: "AT",
        },
      ],
    },
    {
      id: "4",
      name: "Human Resources",
      description: "People operations and talent management",
      manager: {
        name: "Maria Garcia",
        email: "maria@company.com",
        phone: "+1234567893",
        avatar: "",
        initials: "MG",
      },
      color: "bg-orange-500",
      members: [
        {
          name: "Kevin Anderson",
          role: "HR Specialist",
          email: "kevin@company.com",
          avatar: "",
          initials: "KA",
        },
        {
          name: "Sophie Clark",
          role: "Recruiter",
          email: "sophie@company.com",
          avatar: "",
          initials: "SC",
        },
      ],
    },
  ];

  const toggleDepartment = (deptId: string) => {
    setExpandedDepts((prev) =>
      prev.includes(deptId)
        ? prev.filter((id) => id !== deptId)
        : [...prev, deptId],
    );
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.members.some(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const orgChartData = {
    name: "PaqadHR",
    role: "Organization",
    children: [
      {
        name: "John Smith",
        role: "Engineering Manager",
        children: [
          { name: "Sarah Chen", role: "Senior Developer" },
          { name: "Mike Johnson", role: "Frontend Developer" },
          { name: "Lisa Wang", role: "Backend Developer" },
          { name: "Tom Brown", role: "DevOps Engineer" },
        ],
      },
      {
        name: "Alice Johnson",
        role: "Marketing Manager",
        children: [
          { name: "David Kim", role: "Marketing Manager" },
          { name: "Emma Wilson", role: "Content Creator" },
          { name: "Ryan Lee", role: "Social Media Specialist" },
        ],
      },
      {
        name: "Bob Wilson",
        role: "Sales Manager",
        children: [
          { name: "Jennifer Davis", role: "Sales Manager" },
          { name: "Chris Martinez", role: "Account Executive" },
          { name: "Amy Taylor", role: "Sales Representative" },
        ],
      },
      {
        name: "Maria Garcia",
        role: "HR Manager",
        children: [
          { name: "Kevin Anderson", role: "HR Specialist" },
          { name: "Sophie Clark", role: "Recruiter" },
        ],
      },
    ],
  };

  const renderOrgNode = (node: any, level = 0) => (
    <div key={node.name} className={`${level > 0 ? "ml-8" : ""}`}>
      <Card className="mb-4 glass-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {node.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{node.name}</p>
              <p className="text-sm text-muted-foreground">{node.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {node.children && (
        <div className="ml-4 border-l-2 border-gray-200 pl-4">
          {node.children.map((child: any) => renderOrgNode(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teams & Departments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization structure and team members
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Add Employee
        </Button>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="departments" className="gap-2">
            <Building size={16} />
            Departments
          </TabsTrigger>
          <TabsTrigger value="org-chart" className="gap-2">
            <Network size={16} />
            Organization Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search departments, employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDepartments.map((dept) => (
              <Card key={dept.id} className="glass-card">
                <Collapsible
                  open={expandedDepts.includes(dept.id)}
                  onOpenChange={() => toggleDepartment(dept.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`${dept.color} p-3 rounded-lg text-white`}
                          >
                            <Building size={20} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {dept.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {dept.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {dept.members.length + 1} members
                          </Badge>
                          {expandedDepts.includes(dept.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      {/* Manager */}
                      <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">Department Manager</h4>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={dept.manager.avatar} />
                            <AvatarFallback>
                              {dept.manager.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{dept.manager.name}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail size={12} />
                                {dept.manager.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone size={12} />
                                {dept.manager.phone}
                              </div>
                            </div>
                          </div>
                          <Badge className={`${dept.color} text-white`}>
                            Manager
                          </Badge>
                        </div>
                      </div>

                      {/* Team Members */}
                      <div>
                        <h4 className="font-medium mb-3">Team Members</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dept.members.map((member, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="text-sm">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {member.name}
                                </p>
                                <p className="text-sm text-muted-foreground truncate">
                                  {member.role}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="org-chart">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Organization Chart
              </CardTitle>
              <p className="text-muted-foreground">
                Visual representation of your company structure
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-[600px]">
                {renderOrgNode(orgChartData)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
