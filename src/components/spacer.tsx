import React from "react";

interface IProps {
  spacing: number;
}

export const Spacer: React.FunctionComponent<IProps> = ({ spacing }) => {
  return <div style={{ marginBottom: spacing * 4 }}></div>;
};
