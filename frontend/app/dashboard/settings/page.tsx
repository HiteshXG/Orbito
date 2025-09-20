"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  Building2,
  Mail,
  Shield,
  Bell,
  Database,
  Clock,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface SystemSettings {
  company: {
    name: string
    address: string
    phone: string
    email: string
    website: string
    timezone: string
  }
  email: {
    smtp_host: string
    smtp_port: string
    smtp_username: string
    smtp_password: string
    from_email: string
    from_name: string
    enabled: boolean
  }
  security: {
    password_min_length: number
    require_2fa: boolean
    session_timeout: number
    max_login_attempts: number
    password_expiry_days: number
  }
  notifications: {
    email_notifications: boolean
    leave_request_notifications: boolean
    interview_reminders: boolean
    achievement_notifications: boolean
    system_alerts: boolean
  }
  system: {
    maintenance_mode: boolean
    auto_backup: boolean
    backup_frequency: string
    data_retention_days: number
    debug_mode: boolean
  }
}

const SystemSettingsPage = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    company: {
      name: "Your Company Name",
      address: "123 Business Street, City, State 12345",
      phone: "+1 (555) 123-4567",
      email: "contact@company.com",
      website: "https://company.com",
      timezone: "America/New_York",
    },
    email: {
      smtp_host: "smtp.gmail.com",
      smtp_port: "587",
      smtp_username: "",
      smtp_password: "",
      from_email: "noreply@company.com",
      from_name: "ERP System",
      enabled: false,
    },
    security: {
      password_min_length: 8,
      require_2fa: false,
      session_timeout: 30,
      max_login_attempts: 5,
      password_expiry_days: 90,
    },
    notifications: {
      email_notifications: true,
      leave_request_notifications: true,
      interview_reminders: true,
      achievement_notifications: true,
      system_alerts: true,
    },
    system: {
      maintenance_mode: false,
      auto_backup: true,
      backup_frequency: "daily",
      data_retention_days: 365,
      debug_mode: false,
    },
  })

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Failed to save settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : saved ? (
              <CheckCircle className="h-4 w-4 mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            Company Information
          </CardTitle>
          <CardDescription>Basic company details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={settings.company.name}
                onChange={(e) => updateSetting("company", "name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company-phone">Phone Number</Label>
              <Input
                id="company-phone"
                value={settings.company.phone}
                onChange={(e) => updateSetting("company", "phone", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="company-address">Address</Label>
            <Textarea
              id="company-address"
              value={settings.company.address}
              onChange={(e) => updateSetting("company", "address", e.target.value)}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-email">Contact Email</Label>
              <Input
                id="company-email"
                type="email"
                value={settings.company.email}
                onChange={(e) => updateSetting("company", "email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company-website">Website</Label>
              <Input
                id="company-website"
                value={settings.company.website}
                onChange={(e) => updateSetting("company", "website", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={settings.company.timezone}
              onValueChange={(value) => updateSetting("company", "timezone", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Email Configuration
          </CardTitle>
          <CardDescription>SMTP settings for system email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Email Notifications</Label>
              <p className="text-sm text-gray-600">Allow system to send email notifications</p>
            </div>
            <Switch
              checked={settings.email.enabled}
              onCheckedChange={(checked) => updateSetting("email", "enabled", checked)}
            />
          </div>

          {settings.email.enabled && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={settings.email.smtp_host}
                    onChange={(e) => updateSetting("email", "smtp_host", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={settings.email.smtp_port}
                    onChange={(e) => updateSetting("email", "smtp_port", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    value={settings.email.smtp_username}
                    onChange={(e) => updateSetting("email", "smtp_username", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={settings.email.smtp_password}
                    onChange={(e) => updateSetting("email", "smtp_password", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    type="email"
                    value={settings.email.from_email}
                    onChange={(e) => updateSetting("email", "from_email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    value={settings.email.from_name}
                    onChange={(e) => updateSetting("email", "from_name", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Security Settings
          </CardTitle>
          <CardDescription>Configure security policies and authentication requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password-length">Minimum Password Length</Label>
              <Input
                id="password-length"
                type="number"
                min="6"
                max="20"
                value={settings.security.password_min_length}
                onChange={(e) => updateSetting("security", "password_min_length", Number.parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                min="5"
                max="480"
                value={settings.security.session_timeout}
                onChange={(e) => updateSetting("security", "session_timeout", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max-attempts">Max Login Attempts</Label>
              <Input
                id="max-attempts"
                type="number"
                min="3"
                max="10"
                value={settings.security.max_login_attempts}
                onChange={(e) => updateSetting("security", "max_login_attempts", Number.parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="password-expiry">Password Expiry (days)</Label>
              <Input
                id="password-expiry"
                type="number"
                min="30"
                max="365"
                value={settings.security.password_expiry_days}
                onChange={(e) => updateSetting("security", "password_expiry_days", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Force all users to enable 2FA</p>
            </div>
            <Switch
              checked={settings.security.require_2fa}
              onCheckedChange={(checked) => updateSetting("security", "require_2fa", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-600" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure system notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label>{key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</Label>
                <p className="text-sm text-gray-600">
                  {key === "email_notifications" && "Send email notifications to users"}
                  {key === "leave_request_notifications" && "Notify HR when leave requests are submitted"}
                  {key === "interview_reminders" && "Send interview reminders to candidates and HR"}
                  {key === "achievement_notifications" && "Notify employees about new achievements"}
                  {key === "system_alerts" && "Send system maintenance and error alerts"}
                </p>
              </div>
              <Switch checked={value} onCheckedChange={(checked) => updateSetting("notifications", key, checked)} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-orange-600" />
            System Maintenance
          </CardTitle>
          <CardDescription>Configure system maintenance and backup settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Temporarily disable system access for maintenance</p>
              </div>
            </div>
            <Switch
              checked={settings.system.maintenance_mode}
              onCheckedChange={(checked) => updateSetting("system", "maintenance_mode", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic Backups</Label>
              <p className="text-sm text-gray-600">Enable scheduled database backups</p>
            </div>
            <Switch
              checked={settings.system.auto_backup}
              onCheckedChange={(checked) => updateSetting("system", "auto_backup", checked)}
            />
          </div>

          {settings.system.auto_backup && (
            <div>
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select
                value={settings.system.backup_frequency}
                onValueChange={(value) => updateSetting("system", "backup_frequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="data-retention">Data Retention (days)</Label>
            <Input
              id="data-retention"
              type="number"
              min="30"
              max="2555"
              value={settings.system.data_retention_days}
              onChange={(e) => updateSetting("system", "data_retention_days", Number.parseInt(e.target.value))}
            />
            <p className="text-sm text-gray-600 mt-1">How long to keep deleted records before permanent removal</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Debug Mode</Label>
              <p className="text-sm text-gray-600">Enable detailed logging for troubleshooting</p>
            </div>
            <Switch
              checked={settings.system.debug_mode}
              onCheckedChange={(checked) => updateSetting("system", "debug_mode", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            System Status
          </CardTitle>
          <CardDescription>Current system information and health status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-800">System Online</p>
              <p className="text-sm text-green-600">All services operational</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-800">Database Connected</p>
              <p className="text-sm text-blue-600">Last backup: 2 hours ago</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-purple-800">Version 1.0.0</p>
              <p className="text-sm text-purple-600">Up to date</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SystemSettingsPage