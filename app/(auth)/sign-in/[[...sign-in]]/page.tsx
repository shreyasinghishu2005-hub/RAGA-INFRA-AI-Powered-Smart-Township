import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy px-4">
      <div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Raga Infra</h1>
          <p className="text-slate-400 text-sm mt-1">Smart Township Management Platform</p>
        </div>
        <SignIn afterSignInUrl="/dashboard" />
      </div>
    </div>
  );
}
