import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig/firebase";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [receitas, setReceitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    fetch("http://localhost:80/api/usuarios")
      .then((response) => response.json())
      .then((data) => {
        // Comprobar si el usuario ya existe en la lista
        const userId = user ? user.uid : null; // Verificar si user es nulo
        const usuarioExistente = data.find(
          (usuario) => usuario.userId === userId
        );

        if (!usuarioExistente && userId) {
          // Verificar si userId existe
          // Si el usuario no existe y userId no es nulo, crearlo automáticamente
          const nuevoUsuario = {
            userId,
            nombre: user.displayName,
            correo: user.email,
            img: user.photoURL
              ? user.photoURL
              : "https://i.ibb.co/3crnvk2/1077114.jpg",
            redesSociales: {
              facebook: "",
              twitter: "",
              instagram: "",
              linkedin: "",
            },
          };

          // Realizar una solicitud POST para crear al nuevo usuario
          fetch("http://localhost:80/api/usuarios", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoUsuario),
          })
            .then((response) => response.json())
            .then((usuarioCreado) => {
              setUsuarios([...data, usuarioCreado]);
            })
            .catch((error) =>
              console.error("Error al crear el usuario:", error)
            );
        }

        setUsuarios(data);
      })
      .catch((error) =>
        console.error("Error al obtener la lista de usuarios:", error)
      );
  }, [user]);

  const compararReceitas = (recetaA, recetaB) => {
    const puntuacionA = recetaA.likes.length - recetaA.disLikes.length;
    const puntuacionB = recetaB.likes.length - recetaB.disLikes.length;
    if (puntuacionA > puntuacionB) {
      return -1;
    } else if (puntuacionA < puntuacionB) {
      return 1;
    } else {
      return 0;
    }
  };

  const recetasFiltradas = [...receitas];

  const recetasAgrupadas = receitas.reduce((acumulador, receita) => {
    const userId = receita.userId;

    if (!acumulador[userId]) {
      acumulador[userId] = [];
    }

    acumulador[userId].push(receita);

    return acumulador;
  }, {});

  const promediosUsuarios = Object.keys(recetasAgrupadas).map((userId) => {
    const recetasDelUsuario = recetasAgrupadas[userId];
    const totalLikes = recetasDelUsuario.reduce(
      (total, receta) => total + receta.likes.length,
      0
    );
    const totalDisLikes = recetasDelUsuario.reduce(
      (total, receta) => total + receta.disLikes.length,
      0
    );
    const numeroDeVotos = totalLikes + totalDisLikes;
    const promedio = totalLikes - totalDisLikes;

    const { userName, userImage } = recetasDelUsuario[0];

    return {
      userId,
      userName,
      userImage,
      promedioUsuario: promedio,
      numeroDeVotos: numeroDeVotos,
    };
  });

  function obtenerPromedioUsuarioPorUid(uid) {
    // Buscar el usuario con el userId igual a uid
    const usuarioEncontrado = promediosUsuarios.find(
      (usuario) => usuario.userId === uid
    );

    // Si el usuario existe, retornar sus propiedades numeroDeVotos y promedioUsuario
    if (usuarioEncontrado) {
      const { numeroDeVotos, promedioUsuario } = usuarioEncontrado;
      return { numeroDeVotos, promedioUsuario };
    }

    // Si el usuario no existe, retornar false
    return false;
  }

  console.log(usuarios);

  useEffect(() => {
    fetch("http://localhost:80/api/receitas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las recetas");
        }
        return response.json();
      })
      .then((data) => setReceitas(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [setReceitas]);

  const newName = (name) => {
    const originalName = name.split(" ");
    const nameUpper = originalName.map((p) => {
      return p.charAt(0).toUpperCase() + p.slice(1);
    });
    return nameUpper.join(" ");
  };

  const formatearNumero = (numero) => {
    const decimalString = numero.toString().split(".")[1];
    if (decimalString) {
      return numero.toFixed(1);
    } else {
      return numero.toString();
    }
  };

  return (
    <Context.Provider
      value={{
        receitas,
        setReceitas,
        promediosUsuarios,
        recetasFiltradas,
        compararReceitas,
        obtenerPromedioUsuarioPorUid,
        usuarios,
        newName,
        formatearNumero,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context };
