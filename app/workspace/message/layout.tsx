import MessagePanel from "./_components/MessagePanel";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="w-[250px] border-r">
        <MessagePanel />
      </div>

      <div className="flex-1 ">{children}</div>
    </div>
  );
}
