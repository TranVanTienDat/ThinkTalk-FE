import MessagePanel from "./_components/MessagePanel";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="w-[250px]">
        <MessagePanel />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
