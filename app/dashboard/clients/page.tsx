import { getClients } from "@/actions/get-clients";

const ClientsPage = async () => {
  const clients = await getClients();
  console.log("🚀 ~ ClientsPage ~ clients:", clients);

  if (!clients) {
    return <div>No clients found</div>;
  }

  return (
    <div>
      {clients.map((client) => (
        <div key={client.id}>{client.codecli}</div>
      ))}
    </div>
  );
};

export default ClientsPage;
