import NewPasswordForm from "@/components/NewPasswordForm";

export default function NewPasswordLayout({ children }) {
  return (
    <>
      <NewPasswordForm />
      {children}
    </>
  );
}
