import React from "react";
import { MenuItemProps } from "antd";

export interface Menus extends MenuItemProps {
  path: string;
  menutext: string;
  component: React.FC<any>;
}

export interface AdminHeaderProps {
  menus: Menus[];
  selectedKeys?: string[];
}

export interface AdminSilderProps {
  menus: Menus[]
}

export interface MenuRouteProps extends AdminSilderProps {}

export interface AdminContentProps {
  text: string;
}