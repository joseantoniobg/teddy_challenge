import { useState } from "react";
import { Drawer, Menu } from "antd";
import { MenuOutlined, HomeOutlined, UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useAppContext } from "../../context/AppContext";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { usePathname } from "next/navigation";

export default function StNavbar() {
  const { name, setName, selectedClients, setSelectedClients } = useAppContext();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleSelectedClients = (value: boolean) => {
    setSelectedClients(value);
  }

  const returnToHome = () => {
    setName("");
  }

  return (
    <div className={styles.navbar}>
      <MenuOutlined className="burger" onClick={() => setOpen(true)} />
      <img src="./teddy-logo.png" alt="Company Logo" className={styles.logo} />

      <div className={styles.links}>
        <Link href="#" onClick={() => toggleSelectedClients(false)} className={!selectedClients ? styles.activeLink : ""}>Clientes</Link>
        <Link href="#" onClick={() => toggleSelectedClients(true)} className={selectedClients ? styles.activeLink : ""}>Clientes selecionados</Link>
        <Link href="/" onClick={returnToHome}>Sair</Link>
      </div>

      <div className={styles.username}>Olá, <strong>{name || "Usuário"}</strong>!</div>

      <Drawer title="Menu" placement="left" onClose={() => setOpen(false)} open={open}>
        <Menu mode="vertical">
          <Menu.Item icon={<HomeOutlined />}><Link href="/">Home</Link></Menu.Item>
          <Menu.Item icon={<UserOutlined />}><Link href="/clients">Clientes</Link></Menu.Item>
          <Menu.Item icon={<ShoppingCartOutlined />}><Link href="/products">Produtos</Link></Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
}