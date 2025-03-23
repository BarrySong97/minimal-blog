export default async function Photo({
  params,
}: {
  params: Promise<{ id: string; lng: string }>;
}) {
  return (
    <div className="fixed inset-0 z-[99999] flex bg-transparent">
      <div className="bg-white flex-1"></div>
    </div>
  );
}
