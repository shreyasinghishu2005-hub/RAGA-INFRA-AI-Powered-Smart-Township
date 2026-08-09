import BookingForm from "@/components/public/BookingForm";
import { commercialBookingSchema } from "@/lib/validators/booking";

const fields = [
  { name: "name", label: "Contact Name" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "companyName", label: "Company Name" },
  { name: "spaceType", label: "Space Type", options: ["retail", "office", "food-court", "co-working"] },
  { name: "areaSqft", label: "Required Area (sq ft)" },
  { name: "message", label: "Additional Requirements (optional)" },
];

export default function CommercialBookingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Commercial Booking</h1>
      <p className="text-slate-400 mb-8">Enquire about retail, office, or commercial space in Raga Infra Smart Township.</p>
      <BookingForm type="commercial" schema={commercialBookingSchema} fields={fields} />
    </div>
  );
}
