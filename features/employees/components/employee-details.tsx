"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash, Edit, Pencil, Book } from "lucide-react";
import {
  EmergencyContactForm,
  EmergencyContactFormValues,
} from "./emergency-contact-form";
import { EducationForm, EducationFormValues } from "./education-form";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ToastMessage } from "@/components/toast-message";

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
  isEmergencyContact: boolean;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

const EmployeeDetail = () => {
  const { employeeID: id } = useParams<{ employeeID: string }>();
  const [isDirty, setIsDirty] = useState(false);
  const [emergencyContactDialogOpen, setEmergencyContactDialogOpen] =
    useState(false);
  const [educationDialogOpen, setEducationDialogOpen] = useState(false);

  // Mock employee data
  const [employee, setEmployee] = useState({
    id: parseInt(id || "1"),
    name: "Jane Smith",
    preferredName: "",
    position: "Senior UX Designer",
    department: "Design",
    email: "jane.smith@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    hireDate: "2018-05-10",
    status: "Active",
    manager: "John Doe",
    profileImage: "",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    },
    emergencyContacts: [
      {
        name: "Michael Smith",
        relationship: "Spouse",
        phone: "+1 (555) 987-6543",
        email: "michael.smith@example.com",
        address: "123 Main Street, San Francisco, CA 94105",
        isEmergencyContact: true,
      },
    ] as EmergencyContact[],
    personalInfo: {
      gender: "Female",
      maritalStatus: "Married",
      nationality: "American",
      bloodGroup: "O+",
    },
    employment: {
      employeeId: "EMP-2018-045",
      employeeType: "Full-Time",
      division: "Product",
      team: "User Experience",
      workLocation: "San Francisco HQ",
      joinDate: "2018-05-10",
      reportingTo: "John Doe",
      payGrade: "L4",
      workSchedule: "Monday - Friday, 9 AM - 5 PM",
    },
    compensation: {
      salary: "$120,000",
      payFrequency: "Monthly",
      bonusPlan: "Performance-Based Annual",
      lastIncrement: {
        date: "2023-01-15",
        percentage: "8%",
        amount: "$9,600",
      },
      benefits: [
        "Health Insurance",
        "Dental Insurance",
        "401k with 5% match",
        "Stock Options",
      ],
    },
    documents: [
      {
        id: 1,
        name: "Employment Contract",
        type: "PDF",
        dateUploaded: "2018-05-10",
        status: "Signed",
      },
      {
        id: 2,
        name: "Performance Review 2023",
        type: "PDF",
        dateUploaded: "2023-06-15",
        status: "Approved",
      },
      {
        id: 3,
        name: "Promotion Letter",
        type: "PDF",
        dateUploaded: "2021-03-20",
        status: "Signed",
      },
    ],
    timeOff: {
      availableBalance: {
        vacation: 15,
        sick: 8,
        personal: 3,
      },
      recentRequests: [
        {
          id: 1,
          type: "Vacation",
          dates: "July 10-15, 2023",
          status: "Approved",
          days: 5,
        },
        {
          id: 2,
          type: "Sick",
          dates: "March 3, 2023",
          status: "Approved",
          days: 1,
        },
      ],
    },
    skills: ["UX Design", "Figma", "User Research", "Prototyping", "UI Design"],
    education: [
      {
        degree: "Master of Fine Arts in Design",
        institution: "Rhode Island School of Design",
        year: "2013",
      },
      {
        degree: "Bachelor of Arts in Graphic Design",
        institution: "University of California, Los Angeles",
        year: "2011",
      },
    ] as Education[],
  });

  const handleInputChange = (field: string, value: string) => {
    setEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: string,
  ) => {
    setEmployee((prev) => {
      // Create a proper typed copy to avoid spread type issues
      const updatedParent = {
        ...(prev[parent as keyof typeof prev] as Record<string, any>),
      };
      updatedParent[field] = value;

      return {
        ...prev,
        [parent]: updatedParent,
      };
    });
    setIsDirty(true);
  };

  const handleSaveChanges = () => {
    // Here would be the API call to save the employee data
    toast.success(
      <ToastMessage
        title="Changes saved"
        description="Employee information has been updated successfully."
      />,
    );
    setIsDirty(false);
  };

  const handleAddEmergencyContact = (contact: EmergencyContactFormValues) => {
    const newContact: EmergencyContact = {
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      isEmergencyContact: contact.isEmergencyContact,
    };

    setEmployee((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, newContact],
    }));
    setIsDirty(true);
  };

  const handleAddEducation = (education: EducationFormValues) => {
    const newEducation: Education = {
      degree: education.degree,
      institution: education.institution,
      year: education.year,
    };

    setEmployee((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
    setIsDirty(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            Employee Details
          </h2>
          <p className="text-muted-foreground">
            View and manage employee information
          </p>
        </div>
        <div className="flex gap-2">
          {isDirty && (
            <Button onClick={handleSaveChanges} variant="default">
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{employee.name}</CardTitle>
                <CardDescription>{employee.position}</CardDescription>
              </div>
              <Badge
                variant={employee.status === "Active" ? "default" : "outline"}
              >
                {employee.status}
              </Badge>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                {employee.profileImage ? (
                  <AvatarImage
                    src={employee.profileImage}
                    alt={employee.name}
                  />
                ) : (
                  <AvatarFallback className="text-4xl">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <Label htmlFor="preferred-name">
                    Preferred Name (Optional)
                  </Label>
                  <Input
                    id="preferred-name"
                    value={employee.preferredName}
                    onChange={(e) =>
                      handleInputChange("preferredName", e.target.value)
                    }
                    placeholder="Enter preferred name"
                  />
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    ID:
                  </span>
                  <span>{employee.employment.employeeId}</span>

                  <span className="text-sm font-medium text-muted-foreground">
                    Dept:
                  </span>
                  <span>{employee.department}</span>

                  <span className="text-sm font-medium text-muted-foreground">
                    Email:
                  </span>
                  <span className="break-all">{employee.email}</span>

                  <span className="text-sm font-medium text-muted-foreground">
                    Phone:
                  </span>
                  <span>{employee.phone}</span>

                  <span className="text-sm font-medium text-muted-foreground">
                    Manager:
                  </span>
                  <span>{employee.manager}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Employee's personal and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input
                        id="full-name"
                        value={employee.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={employee.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={employee.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={employee.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        id="gender"
                        value={employee.personalInfo.gender}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "personalInfo",
                            "gender",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marital-status">Marital Status</Label>
                      <Input
                        id="marital-status"
                        value={employee.personalInfo.maritalStatus}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "personalInfo",
                            "maritalStatus",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        value={employee.personalInfo.nationality}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "personalInfo",
                            "nationality",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blood-group">Blood Group</Label>
                      <Input
                        id="blood-group"
                        value={employee.personalInfo.bloodGroup}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "personalInfo",
                            "bloodGroup",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Address Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={employee.address.street}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "address",
                              "street",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={employee.address.city}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "address",
                              "city",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={employee.address.state}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "address",
                              "state",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input
                          id="zip"
                          value={employee.address.zipCode}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "address",
                              "zipCode",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={employee.address.country}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "address",
                              "country",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Emergency Contacts</CardTitle>
                    <CardDescription>
                      Employee's emergency contact information
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setEmergencyContactDialogOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Contact
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {employee.emergencyContacts.map((contact, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {contact.relationship}
                          </p>
                        </div>
                        {contact.isEmergencyContact && (
                          <Badge>Primary Contact</Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p>{contact.phone}</p>
                        </div>
                        {contact.email && (
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p>{contact.email}</p>
                          </div>
                        )}
                      </div>

                      {contact.address && (
                        <div className="mt-4">
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm">{contact.address}</p>
                        </div>
                      )}

                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          <Trash className="mr-2 h-3 w-3" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}

                  {employee.emergencyContacts.length === 0 && (
                    <div className="bg-muted/50 p-6 rounded-lg text-center">
                      <p className="text-muted-foreground">
                        No emergency contacts added
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setEmergencyContactDialogOpen(true)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Emergency Contact
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <EmergencyContactForm
                open={emergencyContactDialogOpen}
                onOpenChange={setEmergencyContactDialogOpen}
                onSubmit={handleAddEmergencyContact}
              />
            </TabsContent>

            <TabsContent value="employment">
              <Card>
                <CardHeader>
                  <CardTitle>Employment Details</CardTitle>
                  <CardDescription>
                    Job and compensation information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Employee ID</Label>
                      <Input
                        id="employee-id"
                        value={employee.employment.employeeId}
                        readOnly
                        className="bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input
                        id="job-title"
                        value={employee.position}
                        onChange={(e) =>
                          handleInputChange("position", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={employee.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team">Team</Label>
                      <Input
                        id="team"
                        value={employee.employment.team}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "employment",
                            "team",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Employment Type</Label>
                      <Input
                        id="type"
                        value={employee.employment.employeeType}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "employment",
                            "employeeType",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="join-date">Join Date</Label>
                      <Input
                        id="join-date"
                        type="date"
                        value={employee.employment.joinDate}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "employment",
                            "joinDate",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="work-location">Work Location</Label>
                      <Input
                        id="work-location"
                        value={employee.employment.workLocation}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "employment",
                            "workLocation",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reporting-to">Reports To</Label>
                      <Input
                        id="reporting-to"
                        value={employee.employment.reportingTo}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "employment",
                            "reportingTo",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Compensation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                          id="salary"
                          value={employee.compensation.salary}
                          readOnly
                          className="bg-muted/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pay-frequency">Pay Frequency</Label>
                        <Input
                          id="pay-frequency"
                          value={employee.compensation.payFrequency}
                          readOnly
                          className="bg-muted/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pay-grade">Pay Grade</Label>
                        <Input
                          id="pay-grade"
                          value={employee.employment.payGrade}
                          readOnly
                          className="bg-muted/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bonus-plan">Bonus Plan</Label>
                        <Input
                          id="bonus-plan"
                          value={employee.compensation.bonusPlan}
                          readOnly
                          className="bg-muted/50"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                      Employee's educational background
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setEducationDialogOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {employee.education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                            <h3 className="font-medium">{edu.degree}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {edu.institution}
                          </p>
                        </div>
                        <Badge variant="outline">{edu.year}</Badge>
                      </div>

                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">
                          <Pencil className="mr-2 h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          <Trash className="mr-2 h-3 w-3" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}

                  {employee.education.length === 0 && (
                    <div className="bg-muted/50 p-6 rounded-lg text-center">
                      <p className="text-muted-foreground">
                        No education records added
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setEducationDialogOpen(true)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <EducationForm
                open={educationDialogOpen}
                onOpenChange={setEducationDialogOpen}
                onSubmit={handleAddEducation}
              />
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents & Files</CardTitle>
                  <CardDescription>
                    View and manage employee documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Employee Documents</h4>
                      <Button variant="outline" size="sm">
                        Upload New
                      </Button>
                    </div>

                    <div className="border rounded-lg divide-y">
                      {employee.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4"
                        >
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • Added on {doc.dateUploaded}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{doc.status}</Badge>
                            <Button variant="ghost" size="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" x2="12" y1="15" y2="3" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
