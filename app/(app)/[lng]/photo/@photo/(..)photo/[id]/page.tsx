import Modal from "./modal";
export default async function Photo({
  params,
}: {
  params: Promise<{ id: string; lng: string }>;
}) {
  const { id } = await params;
  return <Modal id={id} />;
}
