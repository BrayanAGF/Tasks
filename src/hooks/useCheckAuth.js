import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth} from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { loadProyectosFavoritos } from "../helpers/loadProyectosFavoritos";
import { getInfoUser } from "../tasks/helpers";

export const useCheckAuth = () => {

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, providerData } = user;
      const infoUser = await getInfoUser(uid);
      const ProyectosFavoritos = await loadProyectosFavoritos(uid);
      dispatch(login({ uid, ...infoUser, ProyectosFavoritos, 'providerId': providerData[0].providerId}));
    });
  }, [])

  return { status }
}
