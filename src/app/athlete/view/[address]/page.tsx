import AthleteView from "@/app/components/ViewAthlete";

export default function AthleteViewPage({ params }: { params: { address: string } }) {
  return <AthleteView address={params.address} />;
}
