import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Bell, Link, Shield, LogOut } from "lucide-react";

/**
 * PRD Section: User Settings
 *
 * Update profile information, notification preferences, and connect health devices/apps.
 *
 * This component allows users to manage their account settings, including:
 * - Personal profile information
 * - Notification preferences for alerts and reminders
 * - Connection settings for health devices and third-party apps
 * - Privacy and security settings
 */

interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data for demonstration
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    height: "5'11\"",
    weight: "180 lbs",
    notifications: {
      email: true,
      push: true,
      sms: false,
      weeklyReport: true,
      biomarkerAlerts: true,
      recommendationUpdates: true,
    },
    connectedDevices: [
      { name: "Apple Health", connected: true, lastSync: "Today, 2:30 PM" },
      { name: "Oura Ring", connected: true, lastSync: "Today, 10:15 AM" },
      { name: "Fitbit", connected: false, lastSync: "Never" },
      { name: "Garmin", connected: false, lastSync: "Never" },
    ],
    privacySettings: {
      dataSharing: false,
      anonymizedResearch: true,
      twoFactorAuth: false,
    },
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, notifications, and connected devices
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {userData.email}
                </p>
              </div>

              <div className="space-y-1">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" /> Profile Information
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" /> Notification Preferences
                </Button>
                <Button
                  variant={activeTab === "connections" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("connections")}
                >
                  <Link className="mr-2 h-4 w-4" /> Connected Devices & Apps
                </Button>
                <Button
                  variant={activeTab === "privacy" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("privacy")}
                >
                  <Shield className="mr-2 h-4 w-4" /> Privacy & Security
                </Button>
              </div>

              <Separator className="my-4" />

              <Button
                variant="ghost"
                className="w-full justify-start text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-3/4">
          <Tabs
            defaultValue="profile"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue={userData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={userData.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        defaultValue={userData.dateOfBirth}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        className="w-full p-2 border rounded-md"
                        defaultValue={userData.gender}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" defaultValue={userData.height} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input id="weight" defaultValue={userData.weight} />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Notification Channels
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates and alerts via email
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={userData.notifications.email}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications">
                            Push Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications on your device
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={userData.notifications.push}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications">
                            SMS Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive text message alerts
                          </p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={userData.notifications.sms}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mt-6">
                      Notification Types
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="weekly-report">
                            Weekly Health Report
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a summary of your weekly health metrics
                          </p>
                        </div>
                        <Switch
                          id="weekly-report"
                          checked={userData.notifications.weeklyReport}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="biomarker-alerts">
                            Biomarker Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when biomarkers are out of range
                          </p>
                        </div>
                        <Switch
                          id="biomarker-alerts"
                          checked={userData.notifications.biomarkerAlerts}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="recommendation-updates">
                            Recommendation Updates
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates when new recommendations are
                            available
                          </p>
                        </div>
                        <Switch
                          id="recommendation-updates"
                          checked={userData.notifications.recommendationUpdates}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Devices & Apps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Connect your health devices and apps to automatically sync
                      your data
                    </p>

                    <div className="space-y-4">
                      {userData.connectedDevices.map((device, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Last synced: {device.lastSync}
                            </p>
                          </div>
                          <Button
                            variant={device.connected ? "outline" : "default"}
                            size="sm"
                          >
                            {device.connected ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">
                        Add New Connection
                      </h3>
                      <div className="flex gap-2">
                        <select className="flex-1 p-2 border rounded-md">
                          <option>Select a device or app</option>
                          <option>Google Fit</option>
                          <option>Samsung Health</option>
                          <option>Whoop</option>
                          <option>MyFitnessPal</option>
                        </select>
                        <Button>Add</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Sharing</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="data-sharing">
                            Share Data with Healthcare Providers
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Allow your healthcare providers to access your
                            health data
                          </p>
                        </div>
                        <Switch
                          id="data-sharing"
                          checked={userData.privacySettings.dataSharing}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="anonymized-research">
                            Contribute to Anonymized Research
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Allow your anonymized data to be used for research
                            purposes
                          </p>
                        </div>
                        <Switch
                          id="anonymized-research"
                          checked={userData.privacySettings.anonymizedResearch}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mt-6">Security</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor-auth">
                            Two-Factor Authentication
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          id="two-factor-auth"
                          checked={userData.privacySettings.twoFactorAuth}
                        />
                      </div>
                      <Separator />
                      <div>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Change Password
                        </Button>
                      </div>
                      <div>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Download Your Data
                        </Button>
                      </div>
                      <div>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-500"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button>Save Settings</Button>
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

export default UserSettings;
