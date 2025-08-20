import React, { useState } from "react";
import { Camera } from "lucide-react";

// Helper components
const Label: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label className="text-xs sm:text-[13px] font-medium text-violet-600 mb-1 inline-flex items-center gap-1">
    {children}
    {required && <span className="text-violet-600">*</span>}
  </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={[
      "w-full h-11 rounded-md border border-neutral-300",
      "bg-white px-3 text-[14px] placeholder:text-neutral-400",
      "outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500",
      props.className,
    ].join(" ")}
  />
);

const Divider: React.FC = () => (
  <div className="w-full border-t border-dashed border-neutral-300" />
);

// Main component (exported as default)
const PopXUI: React.FC = () => {
  type Screen = "welcome" | "login" | "register" | "account";
  const [screen, setScreen] = useState<Screen>("welcome");

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        {screen === "welcome" && <Welcome onCreate={() => setScreen("register")} onLogin={() => setScreen("login")} />}
        {screen === "login" && <Login onBack={() => setScreen("welcome")} />}
        {screen === "register" && <Register onBack={() => setScreen("welcome")} onSubmit={() => setScreen("account")} />}
        {screen === "account" && <Account />}
      </div>
    </div>
  );
};

export default PopXUI;

// Screens
const CardShell: React.FC<{ children: React.ReactNode } & { title?: string }> = ({ children, title }) => (
  <div className="p-5 sm:p-6">
    {title ? <h1 className="text-lg sm:text-[20px] font-semibold text-neutral-800 mb-6">{title}</h1> : null}
    {children}
  </div>
);

function Welcome({ onCreate, onLogin }: { onCreate: () => void; onLogin: () => void }) {
  return (
    <CardShell>
      <div className="pt-16 sm:pt-24 pb-6" />
      <div className="text-2xl sm:text-2xl font-semibold text-neutral-800">Welcome to PopX</div>
      <p className="mt-2 text-[14px] leading-relaxed text-neutral-500 w-full sm:w-[85%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      </p>
      <div className="mt-8 space-y-3">
        <button
          onClick={onCreate}
          className="w-full h-12 rounded-lg bg-violet-600 text-white text-[16px] font-semibold disabled:opacity-50"
        >
          Create Account
        </button>
        <button
          onClick={onLogin}
          className="w-full h-12 rounded-lg bg-violet-300/70 text-violet-900 text-[15px] font-semibold"
        >
          Already Registered? Login
        </button>
      </div>
      <div className="pb-12 sm:pb-16" />
    </CardShell>
  );
}

function Login({ onBack }: { onBack: () => void }) {
  return (
    <CardShell>
      <div className="text-xl sm:text-[24px] font-semibold text-neutral-800 leading-snug">
        Signin to your<br />PopX account
      </div>
      <p className="mt-2 text-[14px] text-neutral-500 w-full sm:w-[92%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      </p>
      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label>Email Address</Label>
          <Input placeholder="Enter email address" type="email" />
        </div>
        <div>
          <Label>Password</Label>
          <Input placeholder="Enter password" type="password" />
        </div>
        <button
          type="button"
          onClick={onBack}
          className="w-full h-12 rounded-lg bg-neutral-300 text-white text-[16px] font-semibold"
        >
          Login
        </button>
      </form>
    </CardShell>
  );
}

function Register({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  return (
    <CardShell>
      <div className="text-2xl sm:text-[28px] font-semibold text-neutral-800 leading-tight">
        Create your<br />PopX account
      </div>
      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label required>Full Name</Label>
          <Input defaultValue="Marry Doe" />
        </div>
        <div>
          <Label required>Phone number</Label>
          <Input defaultValue="Marry Doe" />
        </div>
        <div>
          <Label required>Email address</Label>
          <Input defaultValue="Marry Doe" type="email" />
        </div>
        <div>
          <Label required>Password</Label>
          <Input defaultValue="Marry Doe" type="password" />
        </div>
        <div>
          <Label>Company name</Label>
          <Input defaultValue="Marry Doe" />
        </div>
        <div>
          <Label required>Are you an Agency?</Label>
          <div className="flex items-center gap-8 mt-1">
            <label className="flex items-center gap-2 text-[14px]">
              <input type="radio" name="agency" defaultChecked className="accent-violet-600" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 text-[14px]">
              <input type="radio" name="agency" className="accent-violet-600" />
              <span>No</span>
            </label>
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="w-full h-12 rounded-lg bg-violet-600 text-white text-[16px] font-semibold"
        >
          Create Account
        </button>
        <button type="button" onClick={onBack} className="hidden">back</button>
      </form>
    </CardShell>
  );
}

function AvatarBadge() {
  return (
    <div className="relative">
      <div className="h-14 w-14 rounded-full bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-violet-600 flex items-center justify-center shadow ring-2 ring-white">
        <Camera className="h-3.5 w-3.5 text-white" />
      </div>
    </div>
  );
}

function Account() {
  return (
    <div>
      <div className="px-6 py-4 border-b border-neutral-200">
        <h2 className="text-base sm:text-[18px] font-semibold text-neutral-800">Account Settings</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <AvatarBadge />
          <div className="pt-1">
            <div className="text-sm sm:text-[15px] font-semibold text-neutral-800">Marry Doe</div>
            <div className="text-xs sm:text-[13px] text-neutral-500">Marry@Gmail.Com</div>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed text-neutral-600 w-full sm:w-[92%]">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
          Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>
        <Divider />
        <div className="h-[420px] bg-neutral-100 rounded-lg border border-dashed border-neutral-300" />
        <Divider />
      </div>
    </div>
  );
}
