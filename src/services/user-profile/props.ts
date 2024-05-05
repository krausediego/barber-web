export type SpecialtyTypes =
  | "HAIRCUTS"
  | "MAKE_UP"
  | "MANICURE"
  | "MASSAGE"
  | "BARBER";

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  specialties: SpecialtyTypes[];
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface FindByUserIdResponse extends UserProfile {
  user: {
    email: string;
    role: "EMPLOYEE" | "ADMIN";
  };
}
