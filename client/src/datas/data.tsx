import { BookMarked, CalendarDays, LibraryBig, Users } from "lucide-react";

export interface CardType {
  title: string;
  value: number;
  percentageChange: string;
  icon: React.ReactNode;
  order?: number;
}

export const cardData: CardType[] = [
  {
    title: "Total Fields",
    value: 45231.89,
    percentageChange: "+20.1% from last month",
    icon: <LibraryBig className="text-white h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Sessions",
    value: 2350,
    percentageChange: "+180.1% from last month",
    icon: <CalendarDays className="text-white h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Students",
    value: 12.234,
    percentageChange: "+19% from last month",
    icon: <Users className="text-white h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Certificates",
    value: 573,
    percentageChange: "+201 from last month",
    icon: <BookMarked className="text-white h-4 w-4 text-muted-foreground" />,
  },
];

export interface UserType {
  name: string;
  email: string;
  avatar: string;
  balance: string;
  order?: number;
}

export const userData: UserType[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/images/avatars/01.png",
    balance: "57",
  },

  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/images/avatars/02.png",
    balance: "39",
  },

  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/images/avatars/03.png",
    balance: "299",
  },

  {
    name: "William Kim",
    email: "will@email.com",
    avatar: "/images/avatars/04.png",
    balance: "99",
  },

  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatar: "/images/avatars/05.png",
    balance: "39",
  },
];
