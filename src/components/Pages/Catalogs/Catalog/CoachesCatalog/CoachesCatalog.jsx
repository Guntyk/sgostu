import Loader from "../../../../Loader/Loader";
import CoachCard from "./CoachCard/CoachCard";
import { useEffect } from "react";

export default function CoachesCatalog({
  setEntitiesList,
  entitiesList,
  setLoading,
  loading,
  coaches,
  clubs,
}) {
  window.scrollTo(0, 0);

  useEffect(() => {
    if (coaches.length !== 0) {
      setEntitiesList(coaches);
      setLoading(false);
    }
  }, [coaches]);

  return;
}
