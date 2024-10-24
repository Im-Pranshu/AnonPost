import React, { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";

export const Public = (props) => {
  const { Comp } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      <Comp />
    </div>
  );
};
