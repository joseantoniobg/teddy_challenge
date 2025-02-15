"use client";

import { useEffect, useState } from "react";
import { Card, Button, Select, Pagination } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, MinusOutlined } from "@ant-design/icons";
import styles from "./Clients.module.scss";
import axios from "axios";
import { formatBRL, formatCpfCnpj } from "../utils/functions";
import StPage from "../components/Page/StPage";
import StButton from "../components/Button/StButton";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import ClientModal from "../components/ClientModal/ClientModal";
import { ClientModel } from "@/models/client.model";
import { SelectClientModel } from "@/models/select.client.model";

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalClients, setTotalClients] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const { selectedClients, setSelectedClients } = useAppContext();
  const navigate = useRouter();
  const { name } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"CREATE" | "DELETE" | "UPDATE" | "SELECT" | "UNSELECT_ALL">("CREATE");
  const [client, setClient] = useState<ClientModel | SelectClientModel | undefined>(undefined);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getClients = async (items?: number, currentPg?: number) => {
    setLoading(true);
    const fetchedClients = await axios.get(`${API_BASE_URL}/clients`, {
      params: { page: currentPg ?? currentPage, size: items ?? itemsPerPage, isSelected: selectedClients },
    })
    setClients(fetchedClients.data.content);
    setTotalClients(fetchedClients.data.totalRecords);
    setLoading(false);
  }

  const updateClientsPerPage = (totalItems: number) => {
    setItemsPerPage(totalItems);
    getClients(totalItems);
  }

  const changePage = (page: number) => {
    setCurrentPage(page);
    getClients(itemsPerPage, page);
  }

  const clientAction = (id: string, action: "CREATE" | "DELETE" | "UPDATE" | "SELECT" | "UNSELECT_ALL") => {
    setModalAction(action);
    if (action === "CREATE") {
      setIsModalOpen(true);
      setClient(undefined);
      return;
    }

    const foundClient = clients.find((client) => client.id === id);

    setIsModalOpen(true);

    if (action === "SELECT") {
      setClient({
        ids: [foundClient?.id as string],
        isSelected: !foundClient?.isSelected as boolean,
        name: foundClient?.name as string,
      })
      return;
    }

    if (action === "UNSELECT_ALL") {
      setClient({
        ids: clients.map((client) => client.id),
        isSelected: false,
      })
      return;
    }

    setClient(foundClient as ClientModel);
  }

  useEffect(() => {
    if (!name && name === '') {
      navigate.push("/");
    } else {
      getClients();
    }
  }, []);

  useEffect(() => {
    getClients();
  }, [selectedClients]);

  return (
    <StPage>
      <div className={styles.clientsContainer}>
        <div className={`${styles.content}`}>
          <div className={styles.clientsHeader}>
            <strong>{totalClients} clientes encontrados:</strong>
            <div className={styles.itemsPerPage}>
              <span>Clientes por página: </span>
              <Select
                defaultValue={8}
                options={[8, 16, 32, 64].map((value) => ({ value, label: value }))}
                onChange={updateClientsPerPage}
              />
            </div>
          </div>

          <div className={styles.clientsGrid}>
            {(clients as ClientModel[]).map((client) => (
              <Card key={client.id} title={client.name} className={styles.clientCard}>
                <p>CPF/CNPJ: {formatCpfCnpj(client.document)}</p>
                <p>Salário: {formatBRL(client.wage)}</p>
                <p>Empresa: {formatBRL(client.companyEvaluation)}</p>
                <div className={styles.cardActions}>
                  {!selectedClients && <><PlusOutlined onClick={() => clientAction(client.id, "SELECT")} className={`${styles.icon} ${styles.selectIcon}`} />
                  <EditOutlined onClick={() => clientAction(client.id, "UPDATE")} className={`${styles.icon} ${styles.editIcon}`} />
                  <DeleteOutlined onClick={() => clientAction(client.id, "DELETE")} className={`${styles.icon} ${styles.deleteIcon}`} /></>}
                  {selectedClients && <><p></p><MinusOutlined onClick={() => clientAction(client.id, "SELECT")} className={`${styles.icon} ${styles.deleteIcon}`} /></>}
                </div>
              </Card>
            ))}
          </div>

          <StButton onClick={() => clientAction("", selectedClients ? "UNSELECT_ALL" : "CREATE")} label={selectedClients ? "Limpar Clientes Selecionados" : "Criar Cliente"} outlined={true} />
          <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} action={modalAction} getClients={getClients} client={client} />
          <Pagination
            current={currentPage}
            total={totalClients}
            pageSize={itemsPerPage}
            onChange={changePage}
            className={styles.pagination}
            showSizeChanger={false}
          />
        </div>
      </div>
    </StPage>
  );
}