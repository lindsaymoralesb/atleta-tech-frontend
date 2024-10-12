import { ThirdwebProvider } from "thirdweb/react";
import CreateAthlete from "../../components/CreateAthlete";

export default function CreateAthletePage() {
  return (
    <ThirdwebProvider>
      <CreateAthlete />
    </ThirdwebProvider>
  );
}
