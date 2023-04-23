import { useSelector } from "react-redux";
import "./CoachInfo.css";
import { dancersSelector } from "../../../../../../redux/dancers/selectors";
import { statusesSelector } from "../../../../../../redux/statuses/selectors";
import DancerCard from "../../DancerCard/DancerCard";
import Loader from "../../../../../Loader/Loader";
import { clubsSelector } from "../../../../../../redux/clubs/selectors";

export default function CoachInfo() {
  const dancers = useSelector(dancersSelector);
  const statuses = useSelector(statusesSelector);
  const clubs = useSelector(clubsSelector);
  const dancerClasses = useSelector(dancersSelector);
  return (
    <section className="coach-info">
      <div className="coach">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt=""
          className="coach-avatar"
        />
        <div className="coach-inner">
          <h2 className="coach-name">Євгеній Овчаренко</h2>
          <dl className="coach-details">
            <div className="coach-details-wrapper">
              <dt className="coach-dancers">Танцюристів тренера:</dt>
              <dd>12</dd>
            </div>
            <div className="coach-details-wrapper">
              <dt className="coach-city">Місто:</dt>
              <dd>Київ</dd>
            </div>
            <div className="coach-details-wrapper">
              <dt className="coach-club">Клуб:</dt>
              <dd>Diamant Elite</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="coach-dancers">
        <span className="coach-dancers-title">Список танцюристів тренера:</span>
        {dancers.length !== 0 ? (
          dancers
            .filter((dancer) =>
              statuses
                .filter((status) => status.Name !== "Не активний")
                .map((status) => status.Dancers)
                .flat()
                .includes(dancer.id)
            )
            .filter((dancer) => dancer.Dancer_Verify)
            .map((dancer) => (
              <DancerCard
                classes={dancerClasses}
                dancer={dancer}
                clubs={clubs}
                key={dancer.id}
              />
            ))
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
