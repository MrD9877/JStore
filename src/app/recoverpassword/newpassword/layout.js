import NewPasswordForm from "@/app/components/NewPasswordForm";

export default function NewPasswordLayout({ children }) {
  return (
    <>
      <NewPasswordForm />
      {children}
    </>
  );
}
