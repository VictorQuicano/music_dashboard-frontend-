import { Streamed as Layout } from "@/components/layouts/Streamed";
import dataset from "@/constants/Streamed/dataset";
//import StreamContainer from "./Graph/StreamContainer";
import { StreamGraphPageViews } from "./Graph/StreamGraphPageViews";

export function Index() {
  const back = {
    to: "/",
    label: "Volver al inicio",
  };
  return (
    <Layout title="Streamed Graph" back={back}>
      <StreamGraphPageViews />
    </Layout>
  );
}
