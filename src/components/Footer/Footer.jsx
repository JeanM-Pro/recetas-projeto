import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-title-container">
        <h3 className="footer-title">Site feito por:</h3>
        <div className="imgs-container">
          <div className="img-container">
            <img src="https://i.ibb.co/7bmSmtz/antonio-imbana.jpg" alt="" />
            <p>António Imbana</p>
          </div>
          <div className="img-container">
            <img src="https://i.ibb.co/5YYhNbp/norelys.jpg" alt="" />
            <p>Norelys Borges</p>
          </div>
          <div className="img-container">
            <img src="https://i.ibb.co/HTgkbJR/yop.png" alt="" />
            <p>Jean Centeno</p>
          </div>
          <div className="img-container">
            <img src="https://i.ibb.co/JvKHMX3/yumelys.jpg" alt="" />
            <p>Yumelys Borges</p>
          </div>
        </div>
      </div>
      <div className="footer-information">
        ©2023 por Grupo 1 da Turma 33 da Toti.
        <div className="emails-footer-container">
          <p>{`antonioimbanajr92@gmail.com | norelysb99@gmail.com | jeancenteno54@gmail.com | borgesyumelys@gmail.com`}</p>
        </div>
      </div>
    </div>
  );
};
