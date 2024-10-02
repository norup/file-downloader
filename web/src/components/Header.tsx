import { Menu, MenuItemLink, MenuList } from "@fluentui/react-components";

export const Header = () => {
  return (
    <nav>
      <Menu open>
        <MenuList
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100vw",
            alignItems: "center",
          }}
        >
          <MenuItemLink as="a" href="/">
            Home
          </MenuItemLink>
          <MenuItemLink as="a" href="/data-table">
            Table
          </MenuItemLink>
        </MenuList>
      </Menu>
    </nav>
  );
};
