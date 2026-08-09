import BookingForm from "@/components/public/BookingForm";
import { residentialBookingSchema } from "@/lib/validators/booking";

const fields = [
  { name: "name", label: "Full Name" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "unitType", label: "Unit Type", options: ["apartment", "villa", "premium-villa"] },
  { name: "budget", label: "Budget Range", options: ["₹50L–₹80L", "₹80L–₹1.5Cr", "₹1.5Cr–₹3Cr", "₹3Cr+"] },
  { name: "preferredFloor", label: "Preferred Floor (optional)" },
  { name: "message", label: "Additional Message (optional)" },
];

export default function ResidentialBookingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Residential Booking</h1>
      <p className="text-slate-400 mb-8">Fill in your details to enquire about residential units in Raga Infra Smart Township.</p>
      <BookingForm type="residential" schema={residentialBookingSchema} fields={fields} />
    </div>
  );
}
