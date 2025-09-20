"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, Users, Settings } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
}

interface RolePermission {
  role: string
  permissions: Permission[]
}

const RoleManagementPage = () => {
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([])
  const [allPermissions, setAllPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRolePermissions()
    fetchAllPermissions()
  }, [])

  const fetchRolePermissions = async () => {
    try {
      const response = await fetch("/api/roles/permissions")
      if (response.ok) {
        const data = await response.json()
        setRolePermissions(data)
      }
    } catch (error) {
      console.error("Failed to fetch role permissions:", error)
    }
  }

  const fetchAllPermissions = async () => {
    try {
      const response = await fetch("/api/permissions")
      if (response.ok) {
        const data = await response.json()
        setAllPermissions(data)
      }
    } catch (error) {
      console.error("Failed to fetch permissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleRolePermission = async (role: string, permissionId: string, hasPermission: boolean) => {
    try {
      const response = await fetch("/api/roles/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          permission_id: permissionId,
          action: hasPermission ? "remove" : "add",
        }),
      })

      if (response.ok) {
        fetchRolePermissions()
      }
    } catch (error) {
      console.error("Failed to update role permission:", error)
    }
  }

  const hasPermission = (role: string, permissionId: string) => {
    const roleData = rolePermissions.find((rp) => rp.role === role)
    return roleData?.permissions.some((p) => p.id === permissionId) || false
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "hr":
        return "default"
      case "employee":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const roles = ["admin", "hr", "employee"]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading roles and permissions...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600 mt-1">Manage roles and their permissions</p>
        </div>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const roleData = rolePermissions.find((rp) => rp.role === role)
          const permissionCount = roleData?.permissions.length || 0

          return (
            <Card key={role}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-2">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Badge variant={getRoleBadgeVariant(role)}>{role.toUpperCase()}</Badge>
                </CardTitle>
                <CardDescription>{permissionCount} permissions assigned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {role === "admin" && "Full system access and user management"}
                    {role === "hr" && "HR operations and employee management"}
                    {role === "employee" && "Personal data and self-service features"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Permission Matrix
          </CardTitle>
          <CardDescription>Configure which permissions each role has access to</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Permission</th>
                  {roles.map((role) => (
                    <th key={role} className="text-center py-3 px-4 font-medium">
                      <Badge variant={getRoleBadgeVariant(role)}>{role.toUpperCase()}</Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allPermissions.map((permission) => (
                  <tr key={permission.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-sm">{permission.name.replace(/_/g, " ").toUpperCase()}</p>
                        <p className="text-xs text-gray-600">{permission.description}</p>
                      </div>
                    </td>
                    {roles.map((role) => {
                      const hasAccess = hasPermission(role, permission.id)
                      return (
                        <td key={`${role}-${permission.id}`} className="py-4 px-4 text-center">
                          <Switch
                            checked={hasAccess}
                            onCheckedChange={() => toggleRolePermission(role, permission.id, hasAccess)}
                            disabled={role === "admin"} // Admin always has all permissions
                          />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Role Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => {
                const roleData = rolePermissions.find((rp) => rp.role === role)
                const permissionCount = roleData?.permissions.length || 0
                const maxPermissions = allPermissions.length
                const percentage = maxPermissions > 0 ? (permissionCount / maxPermissions) * 100 : 0

                return (
                  <div key={role} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={getRoleBadgeVariant(role)} className="w-20 justify-center">
                        {role.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-16">
                        {permissionCount}/{maxPermissions}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => window.location.reload()}
              >
                <Settings className="h-4 w-4 mr-2" />
                Refresh Permissions
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="h-4 w-4 mr-2" />
                Export Role Configuration
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                View User Assignments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RoleManagementPage