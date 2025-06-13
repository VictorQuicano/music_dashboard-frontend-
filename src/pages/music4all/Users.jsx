import { Music4All as Layout } from "@/components/layouts/Music4All";
import { useEffect } from "react";
import MultiMetricChart from "@/components/custom/BarGraphs";
import ArtistSearch from "@/pages/music4all/tabs/ArtistSearch";
import React, { useState } from "react";
import ArtistView from "./tabs/ArtistView";
import api from "@/api/axios";

async function fetchUsers() {}

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/test-user");
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("error fetch: ", error);
      }
    }
    fetchData();
  });
  return (
    <Layout
      title="Usuarios con registros"
      back={{ to: "/", label: "Volver al inicio" }}
    >
      <MultiMetricChart data={users} />
    </Layout>
  );
}
