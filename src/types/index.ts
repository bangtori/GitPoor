import type { User } from "@supabase/supabase-js";

export interface AuthProps {
  user: User;
  onLogout: () => void;
}
