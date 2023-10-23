import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { loadProyectosFavoritos } from "../helpers/loadProyectosFavoritos";

export const useCheckAuth = () => {

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, email, uid, photoURL } = user;
      const ProyectosFavoritos = await loadProyectosFavoritos(uid);
      dispatch(login({ displayName, email, uid, photoURL, ProyectosFavoritos }));
    });
  }, [])

  return { status }
}
