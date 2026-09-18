import ConfirmationClient from "./ConfirmationClient";

export const metadata = {
  title: "Reserva confirmada — AeroFind",
};

export default async function ConfirmationPage({ params }) {
  const { bookingId } = await params;
  return <ConfirmationClient bookingId={bookingId} />;
}
