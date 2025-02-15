"use client";

import { useEffect, useState } from "react";
import { Modal, Input, Form, Button, message } from "antd";
import axios, { AxiosError } from "axios";
import { formatCPF_CNPJ, formatCurrency, getNumbersFromString, handleKeyDownOnlyNumbers, parseCurrencyToNumber } from "@/app/utils/functions";
import { ClientModel } from "@/models/client.model";
import StButton from "../Button/StButton";
import StInput from "../Input/StInput";
import { SelectClientModel } from "@/models/select.client.model";

export default function ClientModal({ isOpen, onClose, action, getClients, client }: { isOpen: boolean; onClose: () => void, getClients: () => void, action: "CREATE" | "DELETE" | "UPDATE" | "SELECT" | "UNSELECT_ALL", client?: ClientModel | SelectClientModel | undefined }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [documentValue, setDocumentValue] = useState("");
  const [wage, setWage] = useState(formatCurrency("0"));
  const [companyEvaluation, setCompanyEvaluation] = useState(formatCurrency("0"));
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  let modalAction = "";
  let pastAction = "";

  switch (action) {
    case "CREATE":
      modalAction = "Criar";
      pastAction = "criado";
      break;
    case "DELETE":
      modalAction = "Excluir";
      pastAction = "excluído";
      break;
    case "UPDATE":
      modalAction = "Alterar";
      pastAction = "alterado";
      break;
    case "SELECT":
      modalAction = client?.isSelected ? "Selecionar" : "Desselecionar";
      pastAction = client?.isSelected ? "selecionado" : "deselecionado";
      break;
    default:
      break;
  }

  useEffect(() => {
    if (action === "CREATE") {
      form.resetFields();
      setDocumentValue("");
      setWage(formatCurrency("0"));
      setCompanyEvaluation(formatCurrency("0"));
      return;
    }
    form.setFieldsValue({
      name: (client as ClientModel)?.name,
      wage: formatCurrency((client as ClientModel)?.wage?.toString() ?? "0"),
      companyEvaluation: formatCurrency((client as ClientModel)?.companyEvaluation?.toString() ?? "0"),
      document: formatCPF_CNPJ((client as ClientModel)?.document),
    });
    setDocumentValue(formatCPF_CNPJ((client as ClientModel)?.document) ?? '');
    setWage(formatCurrency((client as ClientModel)?.wage?.toString() ?? "0"));
    setCompanyEvaluation(formatCurrency((client as ClientModel)?.companyEvaluation?.toString() ?? "0"));
  }, [client]);


  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      if (action === "CREATE" || action === "UPDATE") {
        values = {
          ...values,
          document: getNumbersFromString(documentValue),
          wage: parseCurrencyToNumber(wage),
          companyEvaluation: parseCurrencyToNumber(companyEvaluation),
        }
      }

      const response = await axios.request({
        url: `${API_BASE_URL}/clients` + (action === "CREATE" ? "" : action === "SELECT" || action === "UNSELECT_ALL" ? "/changeSelection" : `/${(client as ClientModel)?.id}`),
        method: action === "CREATE" || action === "SELECT" || action === "UNSELECT_ALL" ? "POST" : action === "DELETE" ? "DELETE" : "PATCH",
        data: action !== "DELETE" ? values : undefined,
      });
      message.success(action === "UNSELECT_ALL" ? 'Cliente(s) desselecionado(s) com sucesso' : `Cliente ${pastAction} com sucesso!`);
      form.resetFields();
      setDocumentValue("");
      getClients();
      onClose();
    } catch (error: AxiosError | any) {
      if (error?.response) {
        message.error(error.response.data?.message);
        return;
      }
      message.error(`Erro ao ${action} cliente.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ document: documentValue, wage, companyEvaluation });
  }, [documentValue, wage, companyEvaluation, form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF_CNPJ(e.target.value);
    setDocumentValue(formattedValue);
  };

  return (
    <Modal
      title={`${modalAction} Cliente`}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <StButton key="submit" type="primary" loading={loading} onClick={() => { if (action === "CREATE" || action === "UPDATE") { form.submit() } else { handleSubmit(client) } }} label={action === "UNSELECT_ALL" ? 'Desselecionar clientes' : `${modalAction} Cliente`} />
      ]}
    >
      {(action === "DELETE" || action === "SELECT") && <div>Você está prestes a {modalAction} o cliente: <span style={{fontWeight: 'bold'}}>{(client as ClientModel)?.name}</span></div>}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {(action === "CREATE" || action === "UPDATE")
      && <><Form.Item name="name" rules={[{ required: true, message: "Digite o nome" }]}>
          <StInput placeholder="Digite o nome" />
        </Form.Item>
        <Form.Item name="document" rules={[{ required: true, message: "Digite o CPF ou CNPJ" }]}>
            <StInput
              value={documentValue}
              onChange={handleChange}
              onKeyDown={handleKeyDownOnlyNumbers}
              placeholder="Digite CPF ou CNPJ"
              maxLength={18}
            />
        </Form.Item>
        <Form.Item name="wage" rules={[{ required: true, message: "Digite o salário" }]}>
          <StInput value={wage} onChange={(e) => setWage(formatCurrency(e.target.value))} placeholder="Digite o salário" />
        </Form.Item>

        <Form.Item name="companyEvaluation" rules={[{ required: true, message: "Digite o valor da empresa" }]}>
          <StInput value={companyEvaluation} onChange={(e) => setCompanyEvaluation(formatCurrency(e.target.value))} placeholder="Digite o valor da empresa" />
        </Form.Item></>}
      </Form>
    </Modal>
  );
}