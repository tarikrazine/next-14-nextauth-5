import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  className?: string;
}

function UserAvatar(props: UserAvatarProps) {
  console.log(props.name);
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", props.className)}>
      {!props.src ? (
        <AvatarFallback>{props.name}</AvatarFallback>
      ) : (
        <AvatarImage src={props.src!} />
      )}
    </Avatar>
  );
}

export default UserAvatar;
