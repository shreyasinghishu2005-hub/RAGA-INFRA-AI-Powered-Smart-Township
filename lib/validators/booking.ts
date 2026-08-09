import { z } from "zod";

export const residentialBookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  unitType: z.enum(["apartment", "villa", "premium-villa"]),
  budget: z.string().min(1, "Budget range is required"),
  preferredFloor: z.string().optional(),
  message: z.string().optional(),
});

export const commercialBookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  companyName: z.string().min(2, "Company name is required"),
  spaceType: z.enum(["retail", "office", "food-court", "co-working"]),
  areaSqft: z.string().min(1, "Area requirement is required"),
  message: z.string().optional(),
});

export type ResidentialBookingInput = z.infer<typeof residentialBookingSchema>;
export type CommercialBookingInput = z.infer<typeof commercialBookingSchema>;
