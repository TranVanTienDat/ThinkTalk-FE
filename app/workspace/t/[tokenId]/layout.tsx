export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white h-full rounded-[14px] p-2.5">{children}</div>;
}
