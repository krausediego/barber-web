import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findUserProfileService } from "@/services/user-profile";
import { Skeleton } from "./ui/skeleton";
import { Building, LogOut } from "lucide-react";
import { signOutService } from "@/services";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { CompanyProfileDialog } from "./company-profile-dialog";

export function AccountMenu() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: findUserProfileService,
    staleTime: Infinity,
  });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOutService,
    onSuccess: () => {
      queryClient.clear();
      navigate("/sign-in", { replace: true });
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            {isProfileLoading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : (
              <Avatar>
                <AvatarImage src={userProfile?.avatarUrl} />
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col">
            {isProfileLoading ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            ) : (
              <>
                <span>{userProfile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {userProfile?.user?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userProfile?.user?.role === "ADMIN" && (
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil da loja</span>
              </DropdownMenuItem>
            </DialogTrigger>
          )}
          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
            asChild
          >
            <button
              className="w-full flex items-center"
              onClick={() => signOutFn()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CompanyProfileDialog />
    </Dialog>
  );
}
