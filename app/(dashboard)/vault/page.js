"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getFullPasswordInfo,
  getPasswordsByUserId,
} from "@/lib/actions/password/password.actions";
import useAuthStore from "@/store/useAuthStore";
import usePasswordStore from "@/store/usePasswordStore";
import Locked from "@/components/locked";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { CreatePasswordDialog } from "@/components/dialogs/create-password-dialog";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import { VaultTable } from "@/components/table/table";

import {
  Plus,
  Search,
  Shield,
  Eye,
  EyeOff,
  Grid3X3,
  List,
  Download,
} from "lucide-react";

export default function VaultPage() {
  const { user } = useAuthStore();
  const { passwords, setPasswords } = usePasswordStore();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [sortBy, setSortBy] = useState("updated"); // 'updated', 'created', 'source', 'strength'

  const { data, isLoading } = useQuery({
    queryFn: () => getPasswordsByUserId(user?._id),
    queryKey: ["passwords", user?._id],
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setPasswords(data);
    }
  }, [data, setPasswords]);

  if (!user) return <Locked />;

  // Filter and sort passwords
  const filteredPasswords = passwords
    ?.filter((password) =>
      password.source.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      switch (sortBy) {
        case "source":
          return a.source.localeCompare(b.source);
        case "strength":
          const strengthOrder = {
            Critical: 0,
            Bad: 1,
            Dubious: 2,
            Good: 3,
            Great: 4,
          };
          return (
            (strengthOrder[b.strength] || 0) - (strengthOrder[a.strength] || 0)
          );
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

  const getStrengthStats = () => {
    if (!passwords?.length) return { strong: 0, weak: 0, total: 0 };
    const strong = passwords.filter((p) =>
      ["Good", "Great"].includes(p.strength)
    ).length;
    const weak = passwords.filter((p) =>
      ["Bad", "Critical", "Dubious"].includes(p.strength)
    ).length;
    return { strong, weak, total: passwords.length };
  };

  const stats = getStrengthStats();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Password Vault
                </h1>
                <p className="text-muted-foreground">
                  Manage your secure passwords
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {stats.total} passwords
              </Badge>
              <Badge
                variant={stats.strong > stats.weak ? "default" : "destructive"}
                className={
                  stats.strong > stats.weak
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }
              >
                {stats.strong} strong, {stats.weak} weak
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search passwords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Show More Info Toggle */}
                  <div className="flex items-center space-x-2">
                    {!showMoreInfo ? (
                      <PasswordDialog
                        action={getFullPasswordInfo}
                        onSuccess={(data) => {
                          setPasswords(data);
                          setShowMoreInfo(true);
                        }}
                      >
                        <div className="flex items-center space-x-2 cursor-pointer">
                          <Switch checked={false} />
                          <Label className="cursor-pointer">Show details</Label>
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </PasswordDialog>
                    ) : (
                      <div
                        onClick={() => {
                          setPasswords(data);
                          setShowMoreInfo(false);
                        }}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Switch checked={true} />
                        <Label className="cursor-pointer">Show details</Label>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Sort Options */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="updated">Last Updated</option>
                    <option value="created">Date Created</option>
                    <option value="source">Source (A-Z)</option>
                    <option value="strength">Strength</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-input rounded-md">
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="rounded-r-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-l-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator orientation="vertical" className="h-8" />

                  {/* Action Buttons */}
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>

                  <CreatePasswordDialog>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Password
                    </Button>
                  </CreatePasswordDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                      <Skeleton className="h-8 w-[100px]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : filteredPasswords?.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      No passwords found
                    </h3>
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? "Try adjusting your search terms"
                        : "Start by adding your first password"}
                    </p>
                  </div>
                  {!searchTerm && (
                    <CreatePasswordDialog>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Password
                      </Button>
                    </CreatePasswordDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : viewMode === "table" ? (
            <Card>
              <CardContent className="p-0">
                <VaultTable
                  items={filteredPasswords}
                  showMoreInfo={showMoreInfo}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPasswords?.map((password, index) => (
                <PasswordCard
                  key={password._id || index}
                  password={password}
                  showMoreInfo={showMoreInfo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Grid view password card component
function PasswordCard({ password, showMoreInfo }) {
  const [showPassword, setShowPassword] = useState(false);

  const getStrengthColor = (strength) => {
    switch (strength) {
      case "Great":
        return "bg-green-500";
      case "Good":
        return "bg-lime-500";
      case "Dubious":
        return "bg-orange-500";
      case "Bad":
        return "bg-red-500";
      case "Critical":
        return "bg-red-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {password.source[0].toUpperCase()}
              </span>
            </div>
            <div>
              <CardTitle className="text-base">{password.source}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(password.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {showMoreInfo && (
            <div
              className={`w-3 h-3 rounded-full ${getStrengthColor(
                password.strength
              )}`}
              title={password.strength}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Password</Label>
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-sm">
              {showPassword ? password.password : "••••••••••••"}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        {password.notes && (
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Notes</Label>
            <p className="text-sm">{password.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
